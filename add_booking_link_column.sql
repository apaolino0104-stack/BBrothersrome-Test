-- Add booking_link column for custom booking URLs
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS booking_link TEXT;

COMMENT ON COLUMN properties.booking_link IS 'Custom booking URL for Guest House or Room';
