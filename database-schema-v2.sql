-- Updated Database Schema with image support and homepage content
-- Run this in your Supabase SQL Editor

-- Add image column to programs table
ALTER TABLE programs ADD COLUMN IF NOT EXISTS image VARCHAR(500);

-- Create homepage_content table
CREATE TABLE IF NOT EXISTS homepage_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section VARCHAR(50) NOT NULL UNIQUE,
  title VARCHAR(255),
  subtitle VARCHAR(255),
  description TEXT,
  image VARCHAR(500),
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default homepage content
INSERT INTO homepage_content (section, title, subtitle, description, image) VALUES
('hero', 'Welcome to Peace Chapel Church', 'A Place of Faith, Hope, and Love', 'Join our loving community as we worship together, grow in faith, and serve our neighbors with the love of Christ.', 'https://i.pinimg.com/736x/25/02/2c/25022c631f497a11c407e6d24791ace5.jpg'),
('welcome', 'Our Community Welcomes You', '', 'At Peace Chapel Church, we believe that everyone has a place in God''s family. Whether you''re seeking spiritual growth, community connection, or simply a place to belong, we invite you to join us on this journey of faith.', 'https://i.pinimg.com/736x/03/51/8b/03518bb1836774755dbacba3ba218e0a.jpg')
ON CONFLICT (section) DO NOTHING;

-- Enable RLS for homepage_content
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;

-- Create policies for homepage_content
CREATE POLICY "Allow all operations on homepage_content" ON homepage_content FOR ALL USING (true) WITH CHECK (true);