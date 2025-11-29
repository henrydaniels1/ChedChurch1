-- Livestream Settings Table
CREATE TABLE IF NOT EXISTS livestream_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Join Us Online',
  description TEXT NOT NULL DEFAULT 'Can''t make it to church in person? Join us online for live worship services and special events.',
  stream_url TEXT NOT NULL DEFAULT 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  is_live BOOLEAN NOT NULL DEFAULT false,
  hero_image TEXT DEFAULT '/placeholder.svg?height=400&width=1200',
  cta_title TEXT DEFAULT 'Join Us In Person Too!',
  cta_description TEXT DEFAULT 'While we love having you online, we''d also love to meet you in person. Come visit us anytime!',
  next_service JSONB DEFAULT '{"date": "2024-04-07", "time": "10:00 AM", "service": "Sunday Worship Service"}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Livestream Schedule Table
CREATE TABLE IF NOT EXISTS livestream_schedule (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day TEXT NOT NULL,
  time TEXT NOT NULL,
  service TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Livestream Features Table
CREATE TABLE IF NOT EXISTS livestream_features (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Wifi',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Homepage Content Table
CREATE TABLE IF NOT EXISTS homepage_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT UNIQUE NOT NULL,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default data
INSERT INTO livestream_settings (title, description, stream_url, is_live, hero_image, cta_title, cta_description, next_service) 
VALUES ('Join Us Online', 'Can''t make it to church in person? Join us online for live worship services and special events.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', false, '/placeholder.svg?height=400&width=1200', 'Join Us In Person Too!', 'While we love having you online, we''d also love to meet you in person. Come visit us anytime!', '{"date": "2024-04-07", "time": "10:00 AM", "service": "Sunday Worship Service"}')
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

INSERT INTO homepage_content (section, title, subtitle, description, image) VALUES
('hero', 'Welcome to Grace Community Church', 'A Place to Belong', 'Join us as we grow together in faith, hope, and love. Experience the warmth of our community and discover your purpose in God''s plan.', '/placeholder.svg?height=600&width=1200'),
('welcome', 'Welcome Home', '', 'We believe that church is more than a building - it''s a family. Whether you''re new to faith or have been walking with God for years, you''ll find a place to belong here.', '/placeholder.svg?height=400&width=600')
ON CONFLICT (section) DO NOTHING;