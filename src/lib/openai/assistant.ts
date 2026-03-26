import OpenAI from 'openai';

// Initialize the OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'MISSING_KEY',
});

export const LUKAS_INSTRUCTIONS = `Eres 'Lukas AI', el pana financiero de la Gen Z en Colombia. Hablas con jerga colombiana suave ('pana', 'parce', 'lucas', 'mecato', 'vaca'). Eres analítico pero parchado. Tu objetivo es detectar 'Gastos Hormiga' y ayudar a ahorrar para rumbas o metas. Nunca regañes, solo advierte con datos sutiles en Coral #F36E53 y celebra éxitos en Oro #D8A93F. Toma los datos relevantes de las imagenes si el usuario te envía fotos de recibos o comprobantes.`;

// Tools (Function Calling) definition for the Assistant
export const LUKAS_TOOLS: OpenAI.Beta.Assistants.AssistantTool[] = [
  {
    type: 'function',
    function: {
      name: 'get_finscore',
      description: 'Obtiene el FinScore actual del usuario.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'create_meta',
      description: 'Inserta una nueva meta de ahorro en la base de datos para el usuario.',
      parameters: {
        type: 'object',
        properties: {
          nombre: {
            type: 'string',
            description: 'Nombre o título de la meta (ej. Rumba, Viaje).'
          },
          monto: {
            type: 'number',
            description: 'Monto objetivo a ahorrar para esta meta.'
          }
        },
        required: ['nombre', 'monto']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'add_gasto_hormiga',
      description: 'Registra un gasto hormiga que el usuario ha reportado o se ha detectado en una imagen, y calcula el impacto en su FinScore.',
      parameters: {
        type: 'object',
        properties: {
          monto: {
            type: 'number',
            description: 'El valor monetario del gasto.'
          },
          descripcion: {
            type: 'string',
            description: 'Una breve descripción de qué fue el gasto (ej. Empanada, Café, Domicilio).'
          }
        },
        required: ['monto', 'descripcion']
      }
    }
  }
];

export async function getOrCreateLukasAssistant() {
  // Option 1: Retrieve from env var if we already created it
  if (process.env.LUKAS_ASSISTANT_ID) {
    return openai.beta.assistants.retrieve(process.env.LUKAS_ASSISTANT_ID);
  }

  // Option 2: Search for existing assistant by name to avoid duplicates
  const assistantsList = await openai.beta.assistants.list({ limit: 20 });
  const existing = assistantsList.data.find(a => a.name === 'Lukas AI MVP');
  if (existing) {
    console.log('Found existing Lukas AI Assistant:', existing.id);
    return existing;
  }

  // Option 3: Create new
  console.log('Creating new Lukas AI Assistant...');
  const assistant = await openai.beta.assistants.create({
    name: 'Lukas AI MVP',
    instructions: LUKAS_INSTRUCTIONS,
    model: 'gpt-4o',
    tools: LUKAS_TOOLS,
  });
  return assistant;
}
