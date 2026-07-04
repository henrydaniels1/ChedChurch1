-- Migration: Add author and issue columns to archives table
ALTER TABLE archives ADD COLUMN IF NOT EXISTS author VARCHAR(255);
ALTER TABLE archives ADD COLUMN IF NOT EXISTS issue VARCHAR(100);
