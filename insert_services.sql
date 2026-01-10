-- SCRIPT SQL: Generazione Servizi per Provider
-- Istruzioni: Copia e incolla questo script nell'Editor SQL di Supabase.

DO $$
DECLARE
  v_provider_id uuid;
  v_user_email text := 'danieleata78@gmail.com';
BEGIN

  -- 1. TROVA IL PROVIDER
  -- Cerca nell'email salvata nella tabella providers.
  SELECT id INTO v_provider_id 
  FROM providers 
  WHERE email = v_user_email
  LIMIT 1;

  -- Se l'email non è ancora salvata nel campo 'email' della tabella providers (potrebbe essere solo in auth),
  -- prova a cercare tramite lo User ID se possibile, oppure fallback manuale.
  -- Nota: Questo script assume che l'utente abbia salvato il profilo almeno una volta con l'email corretta.
  
  IF v_provider_id IS NULL THEN
     RAISE EXCEPTION 'Errore: Nessun Provider trovato con email %. Assicurati di aver salvato il profilo nel portale almeno una volta inserendo questa email.', v_user_email;
  END IF;

  RAISE NOTICE 'Trovato Provider ID: %', v_provider_id;

  -- 2. INSERISCI I SERVIZI
  
  -- Service A: Transfer / NCC
  INSERT INTO extra_services (provider_id, title, description, service_type, category, is_active, gallery_urls)
  VALUES (
    v_provider_id, 
    'Transfer aeroportuale di lusso', 
    'Servizio NCC professionale da e per Fiumicino e Ciampino con Mercedes Classe E o Van.', 
    'transfer', 
    'transfer', 
    true, 
    ARRAY['https://placehold.co/800x600/1e293b/FFF?text=Transfer+Luxury']
  );

  -- Service B: Chef a Domicilio
  INSERT INTO extra_services (provider_id, title, description, service_type, category, is_active, gallery_urls)
  VALUES (
    v_provider_id, 
    'Cena Romana Gourmet', 
    'I veri sapori di Roma cucinati direttamente nel tuo alloggio da uno chef professionista.', 
    'chef', 
    'chef', 
    true, 
    ARRAY['https://placehold.co/800x600/b91c1c/FFF?text=Chef+Gourmet']
  );

  -- Service C: Guida Turistica
  INSERT INTO extra_services (provider_id, title, description, service_type, category, is_active, gallery_urls)
  VALUES (
    v_provider_id, 
    'Roma Antica: Colosseo e Fori', 
    'Tour guidato privato alla scoperta dei segreti della Città Eterna.', 
    'guide', 
    'guide', 
    true, 
    ARRAY['https://placehold.co/800x600/d97706/FFF?text=Tour+Colosseo']
  );

  -- Service D: Autista Privato
  INSERT INTO extra_services (provider_id, title, description, service_type, category, is_active, gallery_urls)
  VALUES (
    v_provider_id, 
    'Autista a disposizione (4h)', 
    'Goditi lo shopping o gli appuntamenti di lavoro senza stress con un autista dedicato.', 
    'driver', 
    'driver', 
    true, 
    ARRAY['https://placehold.co/800x600/0f172a/FFF?text=Autista+Privato']
  );

  RAISE NOTICE 'Servizi inseriti con successo!';

END $$;
