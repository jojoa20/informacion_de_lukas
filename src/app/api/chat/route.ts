import { openai, getOrCreateLukasAssistant } from '@/lib/openai/assistant';
import { getFinscore, createMeta, addGastoHormiga } from '@/lib/supabase/actions';
import { summarizeAndStoreThread, fetchRelevantMemories } from '@/lib/supabase/memory';

export const maxDuration = 60; // Set a longer execution time for Assistants

export async function POST(req: Request) {
  try {
    const input = await req.json();
    const assistant = await getOrCreateLukasAssistant();
    let threadId = input.threadId;

    if (!threadId) {
      const thread = await openai.beta.threads.create();
      threadId = thread.id;
    }

    const messageContent: any[] = [{ type: 'text', text: input.message }];
    
    // Add OCR receipt image if uploaded
    if (input.imageUrl) {
      messageContent.push({
        type: 'image_url',
        image_url: { url: input.imageUrl },
      });
    }

    // Add user message to thread
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: messageContent,
    });

    let extraInstructions = '';
    if (!input.threadId) {
      const historicalContext = await fetchRelevantMemories(input.message, 3);
      if (historicalContext.length > 0) {
        extraInstructions = `\n\nContexto Histórico del Usuario (Memoria a Largo Plazo): \n${historicalContext.join('\n')}\nTen en cuenta este contexto al responderle.`;
      }
    }

    // Create a ReadableStream using standard Node streams so we don't depend on "ai" package
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const emitText = (text: string) => {
           // Emits chunk formatted for the simple parser in ChatView.tsx (0:"text")
           const payload = `0:${JSON.stringify(text)}\n`;
           controller.enqueue(encoder.encode(payload));
        };

        const runStream = openai.beta.threads.runs.stream(threadId, {
          assistant_id: assistant.id,
          additional_instructions: extraInstructions ? extraInstructions : undefined
        });

        runStream.on('textDelta', (textDelta) => {
          if (textDelta.value) {
            emitText(textDelta.value);
          }
        });

        runStream.on('event', async (event) => {
          if (event.event === 'thread.run.requires_action') {
            const requiredActions = event.data.required_action?.submit_tool_outputs.tool_calls || [];
            const toolOutputs: any[] = [];

            for (const toolCall of requiredActions) {
              const args = JSON.parse(toolCall.function.arguments);
              let result = '';

              try {
                if (toolCall.function.name === 'get_finscore') {
                  const finscore = await getFinscore();
                  result = JSON.stringify(finscore);
                } else if (toolCall.function.name === 'create_meta') {
                  const meta = await createMeta({ nombre: args.nombre, monto: args.montoObjetivo });
                  result = JSON.stringify(meta);
                } else if (toolCall.function.name === 'add_gasto_hormiga') {
                  const gasto = await addGastoHormiga({ monto: args.monto, descripcion: args.descripcion || 'Gasto Hormiga' });
                  result = JSON.stringify(gasto);
                } else {
                  result = 'Tool not found';
                }
              } catch (err: any) {
                result = `Error executing tool: ${err.message}`;
              }

              toolOutputs.push({
                tool_call_id: toolCall.id,
                output: result,
              });
            }

            // Submit tools and hook back into stream
            const toolRunStream = openai.beta.threads.runs.submitToolOutputsStream(
              event.data.id,
              { thread_id: threadId, tool_outputs: toolOutputs }
            );

            toolRunStream.on('textDelta', (textDelta) => {
               if (textDelta.value) emitText(textDelta.value);
            });

            // Wait for tool run to finish
            await new Promise<void>((resolve) => {
               toolRunStream.on('end', () => resolve());
               toolRunStream.on('error', () => resolve());
            });
          }
        });

        runStream.on('end', async () => {
          // Once the thread finishes streaming, we trigger long-term memory summary in background
          try {
            await summarizeAndStoreThread(threadId);
          } catch (e) {
            console.error("Memory Storage Error", e);
          }
          controller.close();
        });

        runStream.on('error', (err) => {
          console.error('RunStream Error:', err);
          controller.error(err);
        });
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
