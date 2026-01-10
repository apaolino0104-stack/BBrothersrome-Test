-- Add 'details' column to extra_services table to store dynamic provider data
ALTER TABLE extra_services 
ADD COLUMN IF NOT EXISTS details JSONB DEFAULT '{}'::jsonb;

-- Comment on column
COMMENT ON COLUMN extra_services.details IS 'Stores dynamic fields for different service types (e.g. chef style, guide inclusions)';
