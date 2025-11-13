-- Church Website Database Schema
-- Run this in your Supabase SQL Editor

-- Programs table
CREATE TABLE programs (
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

-- Announcements table
CREATE TABLE announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  priority VARCHAR(10) CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leadership table
CREATE TABLE leadership (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  image VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Archives table
CREATE TABLE archives (
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

-- Enable Row Level Security
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE archives ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Allow public read access on announcements" ON announcements FOR SELECT USING (true);
CREATE POLICY "Allow public read access on leadership" ON leadership FOR SELECT USING (true);
CREATE POLICY "Allow public read access on archives" ON archives FOR SELECT USING (true);

-- Create policies for all operations (temporarily allow all for testing)
CREATE POLICY "Allow all operations on programs" ON programs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on announcements" ON announcements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on leadership" ON leadership FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on archives" ON archives FOR ALL USING (true) WITH CHECK (true);