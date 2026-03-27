-- Migration for creating the 'conversaciones' table
CREATE TABLE IF NOT EXISTS conversaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  sender TEXT NOT NULL CHECK (sender IN ('user', 'bot')),
  content TEXT NOT NULL,
  user_id UUID DEFAULT '00000000-0000-0000-0000-000000000001'
);

-- Enable RLS
ALTER TABLE conversaciones ENABLE ROW LEVEL SECURITY;

-- Simple policy for the demo (allow all for the dummy user)
CREATE POLICY "Allow all for dummy user" ON conversaciones
  FOR ALL
  USING (true)
  WITH CHECK (true);
