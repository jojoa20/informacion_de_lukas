import { openai } from '@/lib/openai/assistant';
import { createClient } from './actions';

export async function summarizeAndStoreThread(threadId: string) {
  try {
    const supabase = await createClient();
    
    // 1. Fetch all messages in the thread
    const messageList = await openai.beta.threads.messages.list(threadId, { limit: 100 });
    const messages = messageList.data.reverse().map(m => 
      `${m.role}: ${m.content.map(c => c.type === 'text' ? c.text.value : '[Media]').join(' ')}`
    ).join('\n');

    if (!messages) return;

    // 2. Summarize conversation using completions API
    const summaryResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an assistant that summarizes financial conversations briefly. Focus on key user entities, goals mentioned, spending behavior, or preferences.' },
        { role: 'user', content: `Summarize the following conversation:\n\n${messages}` }
      ],
      max_tokens: 300,
    });

    const summary = summaryResponse.choices[0].message?.content;
    if (!summary) return;

    // 3. Generate embedding for the summary
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: summary,
      encoding_format: 'float',
    });

    const embedding = embeddingResponse.data[0].embedding;

    // 4. Store in Supabase
    // Assuming a table `chat_memories` with columns (id, user_id, summary, embedding)
    const dummyUserId = '00000000-0000-0000-0000-000000000001';
    
    await supabase.from('chat_memories').insert({
      user_id: dummyUserId,
      summary: summary,
      embedding: embedding
    });

    console.log('Thread summarized and stored in pgvector successfully.');
  } catch (error) {
    console.error('Failed to summarize and store thread:', error);
  }
}

export async function fetchRelevantMemories(userQuery: string, limit: number = 3) {
  try {
    const supabase = await createClient();
    const dummyUserId = '00000000-0000-0000-0000-000000000001';

    // 1. Generate embedding for current query
    const queryEmbeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: userQuery,
      encoding_format: 'float',
    });
    const queryEmbedding = queryEmbeddingResponse.data[0].embedding;

    // 2. Retrieve from Supabase using pgvector RPC function (match_memories)
    // Needs a matching RPC function defined in Supabase
    const { data, error } = await supabase.rpc('match_memories', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7, // Adjust threshold
      match_count: limit,
      p_user_id: dummyUserId
    });

    if (error) {
       console.error('Error fetching vectors:', error);
       return [];
    }

    return (data || []).map((row: any) => row.summary);
  } catch (error) {
    console.error('Failed to fetch relevant memories:', error);
    return [];
  }
}
