-- Complete Church Website Database Schema
-- Run this in your Supabase SQL Editor

-- Drop existing policies first
DROP POLICY IF EXISTS "Allow public read access on programs" ON programs;
DROP POLICY IF EXISTS "Allow public read access on announcements" ON announcements;
DROP POLICY IF EXISTS "Allow public read access on leadership" ON leadership;
DROP POLICY IF EXISTS "Allow public read access on archives" ON archives;

-- Create main tables
CREATE TABLE IF NOT EXISTS programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  day VARCHAR(50) NOT NULL,
  time VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  category VARCHAR(50) CHECK (category IN ('worship', 'youth', 'children', 'adult', 'special')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  priority VARCHAR(10) CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leadership (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  image VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS archives (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  type VARCHAR(20) CHECK (type IN ('book', 'journal', 'video', 'picture')) NOT NULL,
  url VARCHAR(500),
  thumbnail VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hero_slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  cta_text VARCHAR(100) NOT NULL,
  cta_link VARCHAR(255) NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create homepage_content table
CREATE TABLE IF NOT EXISTS homepage_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section VARCHAR(50) NOT NULL UNIQUE,
  title VARCHAR(255),
  subtitle VARCHAR(255),
  description TEXT,
  image VARCHAR(500),
  cta_text VARCHAR(100),
  cta_link VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create livestream tables
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

CREATE TABLE IF NOT EXISTS livestream_schedule (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day VARCHAR(20) NOT NULL,
  time VARCHAR(20) NOT NULL,
  service VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS livestream_features (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL DEFAULT 'Wifi',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE archives ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE livestream_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE livestream_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE livestream_features ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all operations on programs" ON programs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on announcements" ON announcements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on leadership" ON leadership FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on archives" ON archives FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on hero_slides" ON hero_slides FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on homepage_content" ON homepage_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on livestream_settings" ON livestream_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on livestream_schedule" ON livestream_schedule FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on livestream_features" ON livestream_features FOR ALL USING (true) WITH CHECK (true);

-- Insert default hero slides
INSERT INTO hero_slides (title, subtitle, description, image, cta_text, cta_link, order_index) VALUES
('Welcome to Our Church Family', 'Experience God''s Love Together', 'Join our vibrant community of believers as we worship, grow, and serve together in the love of Christ.', 'https://i.pinimg.com/736x/ed/f0/c3/edf0c3eee571d18def9ede85eb61077f.jpg', 'Join Us Today', '/about', 1),
('Worship in Spirit and Truth', 'Lifting Our Voices Together', 'Experience powerful worship through music, prayer, and fellowship that touches hearts and transforms lives.', 'https://i.pinimg.com/736x/25/02/2c/25022c631f497a11c407e6d24791ace5.jpg', 'Watch Online', '/livestream', 2),
('Serving Our Community', 'Love in Action', 'Discover how we''re making a difference in our community through compassionate service and outreach programs.', 'https://i.pinimg.com/736x/f9/5a/af/f95aaf9f497a269abaa530aa51266a7f.jpg', 'Get Involved', '/programs', 3),
('Growing in Faith Together', 'Programs for Every Age', 'From children to seniors, we offer programs designed to help you grow deeper in your relationship with God.', 'https://i.pinimg.com/736x/e9/44/27/e944271768dd013deddabfb03b7659e4.jpg', 'View Programs', '/programs', 4),
('New Life in Christ', 'Your Journey Starts Here', 'Take the next step in your faith journey and discover the transforming power of God''s love and grace.', 'https://i.pinimg.com/1200x/e0/46/66/e04666fa569e6bee505e3ee3714a32bd.jpg', 'Learn More', '/about', 5)
ON CONFLICT DO NOTHING;

-- Insert default livestream data
INSERT INTO livestream_settings (title, description, stream_url, is_live, hero_image, cta_title, cta_description) VALUES
('Join Us Online', 'Can''t make it to church in person? Join us online for live worship services and special events. Our livestream allows you to participate in worship from anywhere in the world.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', false, '/placeholder.svg?height=400&width=1200', 'Join Us In Person Too!', 'While we love having you online, we''d also love to meet you in person. Come visit us anytime!')
ON CONFLICT DO NOTHING;

INSERT INTO livestream_schedule (day, time, service) VALUES
('Sunday', '10:00 AM', 'Main Worship Service'),
('Sunday', '6:00 PM', 'Evening Service'),
('Wednesday', '7:00 PM', 'Prayer Meeting'),
('Thursday', '7:00 PM', 'Bible Study')
ON CONFLICT DO NOTHING;

INSERT INTO livestream_features (title, description, icon) VALUES
('High Quality Stream', 'Crystal clear video and audio quality ensures you don''t miss a moment of worship.', 'Wifi'),
('Interactive Community', 'Connect with other viewers and participate in our online community during services.', 'Users'),
('Never Miss a Service', 'Can''t make it in person? Join us online and be part of our worship community from anywhere.', 'Calendar')
ON CONFLICT DO NOTHING;

-- Insert default homepage content
INSERT INTO homepage_content (section, title, subtitle, description, image, cta_text, cta_link) VALUES
('hero', 'Welcome to Peace Chapel Church', 'A Place of Faith, Hope, and Love', 'Join our loving community as we worship together, grow in faith, and serve our neighbors with the love of Christ.', 'https://i.pinimg.com/736x/25/02/2c/25022c631f497a11c407e6d24791ace5.jpg', 'Join Us Today', '/about'),
('welcome', 'Our Community Welcomes You', 'Experience God''s Love', 'At Peace Chapel Church, we believe that everyone has a place in God''s family. Come as you are and discover the transforming power of His love.', 'https://i.pinimg.com/736x/03/51/8b/03518bb1836774755dbacba3ba218e0a.jpg', 'Learn More', '/about')
ON CONFLICT (section) DO NOTHING;

-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('church-files', 'church-files', true) ON CONFLICT DO NOTHING;

-- Create storage policies
CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'church-files');
CREATE POLICY "Allow public access" ON storage.objects FOR SELECT USING (bucket_id = 'church-files');