import { createClient } from "@/lib/supabase/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { sender, content, user_id } = await req.json();
    
    // Validate required fields
    if (!sender || !content) {
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios: sender o content" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("conversaciones")
      .insert([
        { 
          sender, 
          content, 
          user_id: user_id || "00000000-0000-0000-0000-000000000001" 
        }
      ])
      .select();

    if (error) {
      console.error("Error al guardar en Supabase:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error en API save/route:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
