-- Script para poblar la base de datos de Lukas con datos de prueba (Contexto)
-- Instrucciones: Copia y pega este script en el SQL Editor de Supabase y ejecútalo.

DO $$
DECLARE
  new_user_id UUID := '00000000-0000-0000-0000-000000000001';
BEGIN
  -- 1. Insertar un usuario de prueba en auth.users
  INSERT INTO auth.users (id, instance_id, role, aud, email, encrypted_password, email_confirmed_at, created_at, updated_at)
  VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'usuario.prueba@lukas.app',
    '$2a$10$7/O8x2UoA.1mF7Q.7kX9a.2Z.n3n2i6N.jK6F.6pX1L.1uR6H6m6G', -- Hash ficticio
    now(),
    now(),
    now()
  ) ON CONFLICT (id) DO NOTHING;

  -- Asegurar que el perfil se cree (por si el trigger no se dispara al hacer esto via script)
  INSERT INTO public.profiles (id, full_name, email, rol, pais, moneda_base, ingreso_mensual_est, meta_ahorro_mensual, finscore_actual, racha_actual_dias)
  VALUES (
    new_user_id,
    'Usuario de Prueba',
    'usuario.prueba@lukas.app',
    'free',
    'CO',
    'COP',
    3500000.00,
    500000.00,
    650,
    5
  ) ON CONFLICT (id) DO UPDATE SET 
      full_name = EXCLUDED.full_name,
      ingreso_mensual_est = EXCLUDED.ingreso_mensual_est;

  -- 2. Insertar transacciones de prueba
  INSERT INTO public.transactions (user_id, tipo, monto, categoria, subcategoria, comercio, descripcion, metodo_entrada, confianza_ia, confirmada_por_usuario, es_gasto_hormiga, fecha_transaccion)
  VALUES 
    (new_user_id, 'ingreso', 3500000, 'ingreso_trabajo', 'salario', 'Empresa SA', 'Pago quincena', 'manual', 1.0, true, false, CURRENT_DATE - 10),
    (new_user_id, 'gasto', 1200000, 'vivienda', 'arriendo', 'Inmobiliaria', 'Pago arriendo apartamento', 'texto', 0.95, true, false, CURRENT_DATE - 9),
    (new_user_id, 'gasto', 150000, 'servicios', 'energia', 'EPM', 'Factura de luz y agua', 'ocr_imagen', 0.88, true, false, CURRENT_DATE - 8),
    (new_user_id, 'gasto', 450000, 'alimentacion', 'mercado', 'Éxito', 'Mercado quincenal', 'audio', 0.92, true, false, CURRENT_DATE - 7),
    (new_user_id, 'gasto', 15000, 'alimentacion', 'snacks', 'Tienda', 'Papas y gaseosa', 'texto', 0.99, true, true, CURRENT_DATE - 6),
    (new_user_id, 'gasto', 250000, 'entretenimiento', 'salida', 'Cine Colombia', 'Cine y cena', 'texto', 0.90, true, false, CURRENT_DATE - 2),
    (new_user_id, 'gasto', 12000, 'transporte', 'bus', 'SITP', 'Pasajes semana', 'manual', 1.0, true, true, CURRENT_DATE - 1)
  ON CONFLICT DO NOTHING;

  -- 3. Insertar metas (goals)
  INSERT INTO public.metas (user_id, nombre, tipo, monto_objetivo, monto_actual, fecha_objetivo, estado, emoji, bonus_finscore, ahorro_mensual_requerido)
  VALUES 
    (new_user_id, 'Viaje a San Andrés', 'ahorro', 2500000, 500000, CURRENT_DATE + 180, 'activa', '🌴', 100, 333333.33),
    (new_user_id, 'Fondo de Emergencia', 'fondo_emergencia', 5000000, 1500000, NULL, 'activa', '🛡️', 50, 200000.00)
  ON CONFLICT DO NOTHING;

  -- 4. Insertar presupuestos
  INSERT INTO public.presupuestos (user_id, anio, mes, categoria, limite_cop, gastado_cop, alerta_80pct_enviada, sobrepasado)
  VALUES
    (new_user_id, CAST(EXTRACT(YEAR FROM CURRENT_DATE) as smallint), CAST(EXTRACT(MONTH FROM CURRENT_DATE) as smallint), 'alimentacion', 800000, 465000, false, false),
    (new_user_id, CAST(EXTRACT(YEAR FROM CURRENT_DATE) as smallint), CAST(EXTRACT(MONTH FROM CURRENT_DATE) as smallint), 'entretenimiento', 300000, 250000, true, false)
  ON CONFLICT DO NOTHING;

  -- 5. Insertar historial de FinScore
  INSERT INTO public.finscore_history (user_id, fecha, score, delta, racha_dia, total_gastos_dia, total_ingresos_dia, gastos_hormiga_dia, detalle_cambio)
  VALUES
    (new_user_id, CURRENT_DATE - 2, 630, 10, 3, 250000, 0, 0, '{"+10": "racha completada"}'),
    (new_user_id, CURRENT_DATE - 1, 645, 15, 4, 12000, 0, 1, '{"-5": "gasto hormiga", "+20": "racha mantenida"}'),
    (new_user_id, CURRENT_DATE, 650, 5, 5, 0, 0, 0, '{"+5": "racha"}')
  ON CONFLICT DO NOTHING;
END $$;
