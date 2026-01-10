-- Add 'details' column to extra_service_options table
-- This allows storing category-specific option data (e.g. difficulty for tours, menu items for chefs)

ALTER TABLE extra_service_options 
ADD COLUMN IF NOT EXISTS details JSONB DEFAULT '{}'::jsonb;

COMMENT ON COLUMN extra_service_options.details IS 'Stores dynamic fields for options based on service category';
