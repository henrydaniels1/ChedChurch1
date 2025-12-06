-- Missing Homepage Content Table
-- Run this in your Supabase SQL Editor to add the missing table

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

-- Enable Row Level Security
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
CREATE POLICY "Allow all operations on homepage_content" ON homepage_content FOR ALL USING (true) WITH CHECK (true);

-- Insert default homepage content
INSERT INTO homepage_content (section, title, subtitle, description, image, cta_text, cta_link) VALUES
('hero', 'Welcome to Peace Chapel Church', 'A Place of Faith, Hope, and Love', 'Join our loving community as we worship together, grow in faith, and serve our neighbors with the love of Christ.', 'https://i.pinimg.com/736x/25/02/2c/25022c631f497a11c407e6d24791ace5.jpg', 'Join Us Today', '/about'),
('welcome', 'Our Community Welcomes You', 'Experience God''s Love', 'At Peace Chapel Church, we believe that everyone has a place in God''s family. Come as you are and discover the transforming power of His love.', 'https://i.pinimg.com/736x/03/51/8b/03518bb1836774755dbacba3ba218e0a.jpg', 'Learn More', '/about')
ON CONFLICT (section) DO NOTHING;