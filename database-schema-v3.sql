-- Hero Slides Management
-- Run this in your Supabase SQL Editor

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

-- Insert default slides
INSERT INTO hero_slides (title, subtitle, description, image, cta_text, cta_link, order_index) VALUES
('Welcome to Our Church Family', 'Experience God''s Love Together', 'Join our vibrant community of believers as we worship, grow, and serve together in the love of Christ.', 'https://i.pinimg.com/736x/ed/f0/c3/edf0c3eee571d18def9ede85eb61077f.jpg', 'Join Us Today', '/about', 1),
('Worship in Spirit and Truth', 'Lifting Our Voices Together', 'Experience powerful worship through music, prayer, and fellowship that touches hearts and transforms lives.', 'https://i.pinimg.com/736x/25/02/2c/25022c631f497a11c407e6d24791ace5.jpg', 'Watch Online', '/livestream', 2),
('Serving Our Community', 'Love in Action', 'Discover how we''re making a difference in our community through compassionate service and outreach programs.', 'https://i.pinimg.com/736x/f9/5a/af/f95aaf9f497a269abaa530aa51266a7f.jpg', 'Get Involved', '/programs', 3),
('Growing in Faith Together', 'Programs for Every Age', 'From children to seniors, we offer programs designed to help you grow deeper in your relationship with God.', 'https://i.pinimg.com/736x/e9/44/27/e944271768dd013deddabfb03b7659e4.jpg', 'View Programs', '/programs', 4),
('New Life in Christ', 'Your Journey Starts Here', 'Take the next step in your faith journey and discover the transforming power of God''s love and grace.', 'https://i.pinimg.com/1200x/e0/46/66/e04666fa569e6bee505e3ee3714a32bd.jpg', 'Learn More', '/about', 5)
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all operations on hero_slides" ON hero_slides FOR ALL USING (true) WITH CHECK (true);