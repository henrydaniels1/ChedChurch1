-- Migration: Add author, issue, and embed columns to archives table
ALTER TABLE archives ADD COLUMN IF NOT EXISTS author VARCHAR(255);
ALTER TABLE archives ADD COLUMN IF NOT EXISTS issue VARCHAR(100);
ALTER TABLE archives ADD COLUMN IF NOT EXISTS embed TEXT;
