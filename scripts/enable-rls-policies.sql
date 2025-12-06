-- Enable RLS and create policies for public read access
-- Run this in your Supabase SQL Editor

-- Programs table
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON programs;
CREATE POLICY "Allow public read access" ON programs FOR SELECT USING (true);

-- Announcements table
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON announcements;
CREATE POLICY "Allow public read access" ON announcements FOR SELECT USING (true);

-- Homepage content table
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON homepage_content;
CREATE POLICY "Allow public read access" ON homepage_content FOR SELECT USING (true);

-- Archives table
ALTER TABLE archives ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON archives;
CREATE POLICY "Allow public read access" ON archives FOR SELECT USING (true);

-- Leadership table
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON leadership;
CREATE POLICY "Allow public read access" ON leadership FOR SELECT USING (true);

-- Hero slides table
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON hero_slides;
CREATE POLICY "Allow public read access" ON hero_slides FOR SELECT USING (true);

-- Livestream settings table
ALTER TABLE livestream_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON livestream_settings;
CREATE POLICY "Allow public read access" ON livestream_settings FOR SELECT USING (true);

-- Livestream schedule table
ALTER TABLE livestream_schedule ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON livestream_schedule;
CREATE POLICY "Allow public read access" ON livestream_schedule FOR SELECT USING (true);

-- Livestream features table
ALTER TABLE livestream_features ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON livestream_features;
CREATE POLICY "Allow public read access" ON livestream_features FOR SELECT USING (true);
