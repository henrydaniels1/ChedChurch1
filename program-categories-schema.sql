-- Program Categories table
CREATE TABLE program_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(50) NOT NULL UNIQUE CHECK (key IN ('worship', 'children', 'youth', 'adult', 'special')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(10) NOT NULL,
  image VARCHAR(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE program_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on program_categories" ON program_categories FOR SELECT USING (true);
CREATE POLICY "Allow all operations on program_categories" ON program_categories FOR ALL USING (true) WITH CHECK (true);

-- Seed default data
INSERT INTO program_categories (key, title, description, icon, image) VALUES
  ('worship', 'Worship Services', 'Join us for inspiring worship and fellowship', '🙏', 'https://i.pinimg.com/736x/84/d2/eb/84d2eb7edd25922769ef5cb7095ffd92.jpg'),
  ('children', 'Children''s Ministry', 'Fun and engaging programs for our youngest members', '👶', 'https://i.pinimg.com/736x/a6/e9/6f/a6e96f2f887d21e0e6fa2e1bdfc3c745.jpg'),
  ('youth', 'Youth Ministry', 'Building faith and friendships for teenagers', '🌟', 'https://i.pinimg.com/736x/17/6f/bb/176fbbaad2aa60f2140b0b11b0c1de05.jpg'),
  ('adult', 'Adult Ministry', 'Growing together in faith and community', '📖', 'https://i.pinimg.com/736x/a6/e9/6f/a6e96f2f887d21e0e6fa2e1bdfc3c745.jpg'),
  ('special', 'Special Programs', 'Unique opportunities for service and fellowship', '✨', 'https://i.pinimg.com/736x/76/7d/58/767d5879cc2a5abb470f74496b429248.jpg');
