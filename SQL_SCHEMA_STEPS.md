# Run SQL Schema - Step by Step

## **IMPORTANT: You must complete this step before the app will work!**

---

## Step 1: Open Supabase SQL Editor

1. Go to: **https://supabase.com/dashboard/project/qtwxnmhkcscmeoediyjt**
2. Login to your Supabase account
3. Look at the left sidebar
4. Click **"SQL Editor"** (it has a `</>` icon)

---

## Step 2: Create New Query

1. In the SQL Editor, click the **"New Query"** button (top right)
2. You'll see an empty SQL editor window

---

## Step 3: Copy SQL Schema

1. Open the file `supabase-schema.sql` in your project folder
2. Select ALL the text (Cmd+A or Ctrl+A)
3. Copy it (Cmd+C or Ctrl+C)

**OR** if you prefer, here's a direct copy:

<details>
<summary>Click to expand SQL schema</summary>

```sql
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
```

</details>

---

## Step 4: Paste and Run

1. Paste the SQL into the editor (Cmd+V or Ctrl+V)
2. Click **"RUN"** button (bottom right)
   - Or press **Cmd+Enter** (Mac) or **Ctrl+Enter** (Windows)
3. Wait a few seconds...

---

## Step 5: Verify Success

You should see:

✅ **"Success. No rows returned"**

This means:
- Tables created successfully
- Security policies enabled
- Triggers set up
- Indexes created

---

## Step 6: Disable Email Confirmation (For Testing)

**IMPORTANT for testing:**

1. In Supabase dashboard, go to **Authentication** (left sidebar)
2. Click **"Providers"**
3. Click on **"Email"**
4. Scroll down to find **"Confirm email"**
5. **Toggle it OFF** (switch should be gray/unchecked)
6. Scroll down and click **"Save"**

This lets you test signup/login immediately without needing to verify email addresses.

**Note:** For production, you'll want to turn this back ON and configure email templates.

---

## Step 7: Test the App

Now you're ready to test!

```bash
npm run dev
```

1. Open http://localhost:3000
2. You should see the login/signup screen
3. Create an account (use any email like test@example.com)
4. You'll be logged in immediately
5. Your progress will sync! 🎉

---

## Troubleshooting

### ❌ Error: "relation already exists"

**Solution:** The tables already exist. This is fine! Your schema is already set up.

### ❌ Error: "permission denied"

**Solution:** Make sure you're logged into the correct Supabase account that owns the project.

### ❌ Error: "syntax error"

**Solution:** Make sure you copied the ENTIRE schema file, including the first and last lines.

### ❌ Can't find SQL Editor

**Solution:** Make sure you're in the correct project. Check the URL contains: `qtwxnmhkcscmeoediyjt`

---

## Verification Checklist

After running the schema:

- [ ] SQL ran without errors
- [ ] "Success. No rows returned" message shown
- [ ] Email confirmation disabled (for testing)
- [ ] App builds successfully (`npm run dev`)
- [ ] Login screen appears at localhost:3000
- [ ] Can create an account
- [ ] Can login
- [ ] Can see user profile at top
- [ ] Progress syncs (check browser console for "Syncing..." messages)

---

## What Was Created

The SQL created:

1. **user_progress table**
   - Stores all user study data
   - One row per user
   - JSONB columns for flexible data

2. **sync_log table** (optional)
   - Tracks sync operations
   - Useful for debugging

3. **Row Level Security (RLS)**
   - Users can only access their own data
   - Enforced at database level

4. **Triggers**
   - Auto-update timestamps
   - Maintain data integrity

5. **Indexes**
   - Fast lookups by user_id
   - Optimized queries

---

## Next Steps

✅ Schema is set up!

Now:
1. Test account creation
2. Test login/logout
3. Test progress syncing
4. Test on multiple devices/browsers

Read `QUICK_START.md` for detailed testing instructions.

---

**You're all set! The hard part is done. Now enjoy your cloud-synced app! 🚀**
