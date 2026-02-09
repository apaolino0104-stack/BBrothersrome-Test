-- Add columns for Guest House and Room management
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS property_type TEXT DEFAULT 'apartment',
ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES properties(id);

-- Optional: Add comment to explain values
COMMENT ON COLUMN properties.property_type IS 'Value can be: apartment, guest_house, room';
COMMENT ON COLUMN properties.parent_id IS 'If property_type is room, this points to the guest_house id';
