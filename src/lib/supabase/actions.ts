'use server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Generic helper to get a Supabase server client inside Server Actions/Routes
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Can be ignored if called from a Server Component
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.delete({ name, ...options })
          } catch (error) {
            // Can be ignored if called from a Server Component
          }
        },
      },
    }
  )
}

// ----------------------------------------------------------------------
// SYSTEM TOOLS FOR THE GPT ASSISTANT
// ----------------------------------------------------------------------

export async function getFinscore() {
  const supabase = await createClient()
  
  // Para MVP devolvemos dummy o el primer usuario de prueba
  const dummyUserId = '00000000-0000-0000-0000-000000000001';
  const { data, error } = await supabase
    .from('profiles')
    .select('finscore_actual')
    .eq('id', dummyUserId)
    .single()
  
  if (error || !data) {
    return { finScore: 650, mensaje: "Uy parcero, no pude leer tu score, pero asumamos que tienes 650." };
  }
  
  return { 
    finScore: data.finscore_actual, 
    mensaje: `Tu FinScore actual es ${data.finscore_actual}. Vas bien pero cuidado con esas saliditas de fin de semana.`
  };
}

export async function createMeta(args: { nombre: string, monto: number }) {
  const supabase = await createClient()
  const dummyUserId = '00000000-0000-0000-0000-000000000001';
  
  const { data, error } = await supabase
    .from('metas')
    .insert([
      { 
        user_id: dummyUserId,
        nombre: args.nombre, 
        monto_objetivo: args.monto,
        monto_actual: 0,
        estado: 'activa',
        tipo: 'ahorro'
      }
    ])
    .select()

  if (error) {
    console.error('Error creating meta:', error)
    return { success: false, error: error.message }
  }

  return { 
    success: true, 
    meta: data?.[0],
    mensaje: `Listo el pollo, meta '${args.nombre}' creada con un objetivo de $${args.monto}. ¡A ahorrar pues!` 
  };
}

export async function addGastoHormiga(args: { monto: number, descripcion: string }) {
  const supabase = await createClient()
  const dummyUserId = '00000000-0000-0000-0000-000000000001';

  // Calculamos el impacto negativo del gasto hormiga. 
  // -1 punto por cada $5.000 gastados en hormigas.
  const impacto = Math.max(1, Math.floor(args.monto / 5000));

  const { data, error } = await supabase
    .from('transactions')
    .insert([
      { 
        user_id: dummyUserId,
        tipo: 'gasto',
        monto: args.monto,
        descripcion: args.descripcion,
        es_gasto_hormiga: true,
        metodo_entrada: 'ai'
      }
    ])
    .select()

  if (error) {
    console.error('Error adding gasto:', error)
    return { success: false, error: error.message }
  }

  return {
    success: true,
    impactoFinScore: -impacto,
    mensaje: `Uy zona... Registre un gasto hormiga de $${args.monto} por '${args.descripcion}'. Esto te baja el FinScore en ${impacto} puntos.`
  };
}
