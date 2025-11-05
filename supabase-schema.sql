-- T-6A Boldface Study App - Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- User Progress Table
-- Stores all user progress data synced from localStorage
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Performance data
  performance JSONB DEFAULT '{}'::jsonb,

  -- Flagged questions
  flagged_questions JSONB DEFAULT '[]'::jsonb,

  -- Spaced Repetition System data
  srs_data JSONB DEFAULT '{}'::jsonb,

  -- Session history
  session_history JSONB DEFAULT '[]'::jsonb,

  -- Mastery tracking
  mastery_data JSONB DEFAULT '{}'::jsonb,

  -- Unknown flashcards
  unknown_flashcards JSONB DEFAULT '[]'::jsonb,

  -- User preferences
  font_size TEXT DEFAULT 'medium',

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure one row per user
  UNIQUE(user_id)
);

-- Enable Row Level Security on user_progress
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_progress
-- Users can only read their own progress
CREATE POLICY "Users can view their own progress"
  ON user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert their own progress"
  ON user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update their own progress"
  ON user_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own progress
CREATE POLICY "Users can delete their own progress"
  ON user_progress
  FOR DELETE
  USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at on user_progress
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_updated_at ON user_progress(updated_at);

-- Sync Log Table (optional - for debugging sync issues)
CREATE TABLE IF NOT EXISTS sync_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'pull', 'push', 'conflict'
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on sync_log
ALTER TABLE sync_log ENABLE ROW LEVEL SECURITY;

-- RLS Policy for sync_log
CREATE POLICY "Users can view their own sync logs"
  ON sync_log
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sync logs"
  ON sync_log
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Index for sync_log
CREATE INDEX IF NOT EXISTS idx_sync_log_user_id ON sync_log(user_id);
CREATE INDEX IF NOT EXISTS idx_sync_log_created_at ON sync_log(created_at);
