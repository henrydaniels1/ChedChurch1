-- Livestream Management Tables
-- Run this in your Supabase SQL Editor

-- Create livestream_settings table
CREATE TABLE IF NOT EXISTS livestream_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL DEFAULT 'Join Us Online',
  description TEXT NOT NULL DEFAULT 'Can''t make it to church in person? Join us online for live worship services and special events.',
  stream_url VARCHAR(500) NOT NULL DEFAULT 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  is_live BOOLEAN DEFAULT false,
  hero_image VARCHAR(500) DEFAULT '/placeholder.svg?height=400&width=1200',
  cta_title VARCHAR(255) DEFAULT 'Join Us In Person Too!',
  cta_description TEXT DEFAULT 'While we love having you online, we''d also love to meet you in person. Come visit us anytime!',
  next_service JSONB DEFAULT '{"date": "2024-04-07", "time": "10:00 AM", "service": "Sunday Worship Service"}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create livestream_schedule table
CREATE TABLE IF NOT EXISTS livestream_schedule (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day VARCHAR(20) NOT NULL,
  time VARCHAR(20) NOT NULL,
  service VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create livestream_features table
CREATE TABLE IF NOT EXISTS livestream_features (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL DEFAULT 'Wifi',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default livestream settings
INSERT INTO livestream_settings (title, description, stream_url, is_live, hero_image, cta_title, cta_description) VALUES
('Join Us Online', 'Can''t make it to church in person? Join us online for live worship services and special events. Our livestream allows you to participate in worship from anywhere in the world.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', false, '/placeholder.svg?height=400&width=1200', 'Join Us In Person Too!', 'While we love having you online, we''d also love to meet you in person. Come visit us anytime!')
ON CONFLICT DO NOTHING;

-- Insert default schedule
INSERT INTO livestream_schedule (day, time, service) VALUES
('Sunday', '10:00 AM', 'Main Worship Service'),
('Sunday', '6:00 PM', 'Evening Service'),
('Wednesday', '7:00 PM', 'Prayer Meeting'),
('Thursday', '7:00 PM', 'Bible Study')
ON CONFLICT DO NOTHING;

-- Insert default features
INSERT INTO livestream_features (title, description, icon) VALUES
('High Quality Stream', 'Crystal clear video and audio quality ensures you don''t miss a moment of worship.', 'Wifi'),
('Interactive Community', 'Connect with other viewers and participate in our online community during services.', 'Users'),
('Never Miss a Service', 'Can''t make it in person? Join us online and be part of our worship community from anywhere.', 'Calendar')
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE livestream_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE livestream_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE livestream_features ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all operations on livestream_settings" ON livestream_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on livestream_schedule" ON livestream_schedule FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on livestream_features" ON livestream_features FOR ALL USING (true) WITH CHECK (true);