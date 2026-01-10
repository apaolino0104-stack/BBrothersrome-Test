-- ==============================================================================
-- SCRIPT DI CONFIGURAZIONE SUPABASE STORAGE
-- ==============================================================================
-- Istruzioni:
-- 1. Vai nella Dashboard di Supabase del tuo progetto.
-- 2. Clicca su "SQL Editor" nella barra laterale sinistra.
-- 3. Clicca su "New Query".
-- 4. Incolla tutto il codice qui sotto e clicca su "Run" (in basso a destra).
-- ==============================================================================

-- 1. Crea il bucket 'service-images' (se non esiste già) e rendilo PUBBLICO
INSERT INTO storage.buckets (id, name, public)
VALUES ('service-images', 'service-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Abilita la sicurezza a livello di riga (RLS) se non è già attiva
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Chiunque può VEDERE le immagini (necessario renderle pubbliche sul sito)
-- Nota: Usiamo DROP POLICY IF EXISTS per evitare errori se esegui lo script più volte.
DROP POLICY IF EXISTS "Public View Images" ON storage.objects;
CREATE POLICY "Public View Images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'service-images' );

-- 4. Policy: Solo gli utenti loggati (Fornitori) possono CARICARE immagini
DROP POLICY IF EXISTS "Auth Users Upload Images" ON storage.objects;
CREATE POLICY "Auth Users Upload Images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'service-images' AND auth.role() = 'authenticated' );

-- 5. Policy: Gli utenti possono MODIFICARE solo le proprie immagini
DROP POLICY IF EXISTS "Users Update Own Images" ON storage.objects;
CREATE POLICY "Users Update Own Images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'service-images' AND auth.uid() = owner );

-- 6. Policy: Gli utenti possono CANCELLARE solo le proprie immagini
DROP POLICY IF EXISTS "Users Delete Own Images" ON storage.objects;
CREATE POLICY "Users Delete Own Images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'service-images' AND auth.uid() = owner );

-- ==============================================================================
-- FINE SCRIPT
-- ==============================================================================
