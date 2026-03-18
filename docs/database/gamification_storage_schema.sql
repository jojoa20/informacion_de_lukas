-- =================================================================================
-- LUKAS AI - CONFIGURACIÓN DE BASE DE DATOS (GAMIFICACIÓN Y STORAGE)
-- =================================================================================

-- 1. EXTENSIONES NECESARIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =================================================================================
-- TABLA: finscore_config
-- Mantiene las reglas y parámetros de cómo se calcula el "FinScore" (el medidor en el Home)
-- =================================================================================
CREATE TABLE public.finscore_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    score_minimo INTEGER NOT NULL DEFAULT 0,            -- Ej: 0
    score_maximo INTEGER NOT NULL DEFAULT 10000,        -- Ej: 10000 (en el mockup vemos 8850)
    peso_ahorro DECIMAL(5,2) NOT NULL DEFAULT 1.5,      -- Multiplicador por cumplir metas de ahorro
    peso_sobregiro DECIMAL(5,2) NOT NULL DEFAULT -2.0,  -- Penalización por superar presupuestos
    peso_consistencia DECIMAL(5,2) NOT NULL DEFAULT 1.0,-- Premio por categorizar gastos seguido
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.finscore_config ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede leer la configuración de FinScore
CREATE POLICY "Permitir lectura publica de finscore_config" 
    ON public.finscore_config FOR SELECT 
    USING (true);


-- =================================================================================
-- TABLA: racha_config
-- Mantiene cómo funcionan las insignias de rachas de ahorro (Ej: "Racha de Ahorro: 14 Días")
-- =================================================================================
CREATE TABLE public.racha_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nivel_nombre VARCHAR(50) NOT NULL,               -- Ej: "Bronce", "Plata", "Oro", "Diamante"
    dias_minimos INTEGER NOT NULL,                   -- Ej: 7 para Bronce, 14 para Plata, 30 para Oro
    multiplicador_finscore DECIMAL(5,2) NOT NULL,    -- Ej: 1.1x boost al FinScore,
    recompensa_extra VARCHAR(100),                   -- Ej: "Unlock: Tema Oscuro Neón"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.racha_config ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede leer la configuración de Rachas
CREATE POLICY "Permitir lectura publica de racha_config" 
    ON public.racha_config FOR SELECT 
    USING (true);


-- =================================================================================
-- CONFIGURACIÓN DE STORAGE (RECIBOS, OCR, AUDIO MÓVIL)
-- Requiere la extensión de Storage instalada (por defecto en Supabase)
-- =================================================================================

-- 1. Crear el Bucket para capturas de pantalla y comprobantes (Nequi, Daviplata, Tickets)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('receipts_ocr', 'receipts_ocr', false)
ON CONFLICT (id) DO NOTHING;

-- 2. Políticas de Seguridad para Subir Recibos (Solo usuarios autenticados)
CREATE POLICY "Usuarios autenticados pueden subir comprobantes"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'receipts_ocr' AND auth.uid() = owner);

-- 3. Políticas de Seguridad para Leer Recibos (Solo los dueños)
CREATE POLICY "Usuarios pueden ver sus propios comprobantes"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'receipts_ocr' AND auth.uid() = owner);


-- 1. Crear el Bucket para notas de Voz (Multimodal AI Input)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('user_voice_notes', 'user_voice_notes', false)
ON CONFLICT (id) DO NOTHING;

-- 2. Políticas de Seguridad para Notas de Voz
CREATE POLICY "Usuarios autenticados pueden subir voice notes"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'user_voice_notes' AND auth.uid() = owner);

CREATE POLICY "Usuarios pueden leer sus voice notes"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'user_voice_notes' AND auth.uid() = owner);

-- FIN DEL ESQUEMA
