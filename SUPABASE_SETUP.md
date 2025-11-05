# Supabase Authentication & Sync Setup Guide

## Overview

Your T-6A Boldface Study App now has authentication and cloud sync powered by Supabase! This allows users to:
- Create accounts with email/password
- Sync their progress across multiple devices
- Automatically backup their study data
- Access their progress from anywhere

---

## Setup Instructions

### Step 1: Run Database Schema in Supabase

1. Go to your Supabase project dashboard: https://qtwxnmhkcscmeoediyjt.supabase.co
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-schema.sql` from your project root
5. Paste it into the SQL editor
6. Click **Run** to execute the schema

This will create:
- `user_progress` table - stores all user progress data
- `sync_log` table - tracks sync operations (optional, for debugging)
- Row Level Security (RLS) policies - ensures users can only access their own data
- Automatic triggers for updating timestamps

### Step 2: Configure Email Authentication (Optional)

By default, Supabase requires email verification. To configure:

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. **Email Auth** section:
   - Enable "Confirm email" if you want email verification (recommended for production)
   - Disable "Confirm email" for testing (users can login immediately)
3. **Email Templates**: Customize signup confirmation and password reset emails
4. **Site URL**: Set to your production URL (or `http://localhost:3000` for dev)

### Step 3: Test the App

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. You should see the login/signup screen

4. Create a new account:
   - Enter an email and password (min 6 characters)
   - If email confirmation is enabled, check your email
   - If disabled, you'll be logged in immediately

5. Your progress will now automatically sync!

---

## Features Implemented

### 1. Authentication
- ✅ Email/password signup and login
- ✅ Session persistence (stays logged in across browser sessions)
- ✅ Secure logout
- ✅ Beautiful, responsive UI

### 2. Progress Syncing
- ✅ Automatic sync on login
- ✅ Auto-sync every 2 minutes
- ✅ Sync when tab becomes visible (switching back to the app)
- ✅ Manual sync button in user profile
- ✅ Intelligent merge strategy (keeps highest progress from all devices)

### 3. Data Synced
All your study data is synced:
- Performance statistics (by category, question type, overall)
- Flagged questions for review
- Spaced Repetition System (SRS) data
- Session history
- Question mastery tracking
- Unknown flashcards list
- User preferences (font size)

### 4. User Interface
- ✅ User profile widget at top of app
- ✅ Sync status indicators
- ✅ Manual sync button
- ✅ Logout button
- ✅ Visual feedback for all actions

---

## How Syncing Works

### Initial Sync (On Login)
1. User logs in
2. App loads local progress from localStorage
3. App fetches remote progress from Supabase
4. Data is intelligently merged (highest counts win)
5. Merged data saved to both local and remote

### Ongoing Sync
- **Auto-sync every 2 minutes**: Keeps data fresh
- **Sync on tab visibility**: When you switch back to the app
- **Manual sync**: Click the refresh icon in user profile

### Merge Strategy
When merging local and remote data:
- **Performance stats**: Takes maximum values (most progress)
- **Flagged questions**: Union of both sets
- **SRS data**: Keeps most recent per question
- **Session history**: Combines and keeps last 100 sessions
- **Mastery data**: Maximum counts per question
- **Unknown flashcards**: Union of both sets

This ensures you never lose progress, even if studying on multiple devices simultaneously!

---

## Security

### Row Level Security (RLS)
All database tables have RLS enabled. Users can only:
- View their own progress
- Update their own progress
- Delete their own progress

This is enforced at the database level, so it's impossible for users to access other users' data.

### Authentication
- Passwords are hashed using bcrypt
- Session tokens are JWT-based and automatically expire
- Anon key is safe for client-side use (limited permissions)

---

## Testing Checklist

Use this checklist to test the implementation:

- [ ] Can create a new account
- [ ] Can login with existing account
- [ ] Can see user profile at top of app
- [ ] Can see sync status indicator
- [ ] Can manually trigger sync (refresh button)
- [ ] Can logout successfully
- [ ] Progress persists after logout and login
- [ ] Progress syncs across different browsers/devices
- [ ] Study progress is maintained (stats, SRS, etc.)
- [ ] Flagged questions sync correctly
- [ ] Session history syncs correctly

---

## Troubleshooting

### "User already registered" error
- The email is already in use
- Try logging in instead of signing up
- Or use a different email

### Sync fails
- Check browser console for errors
- Verify internet connection
- Check Supabase dashboard for API status
- Ensure RLS policies are enabled (run schema again if needed)

### "Invalid API key" error
- Double-check the Supabase URL and anon key in `app/lib/supabase.js`
- Make sure they match your Supabase project

### Email confirmation not received
- Check spam folder
- In Supabase dashboard, disable "Confirm email" for testing
- Check Email Templates are properly configured

### Data not syncing
1. Open browser DevTools → Console
2. Look for sync-related messages
3. Check Network tab for API calls to Supabase
4. Verify user is logged in (should see user profile)
5. Try manual sync button

---

## Database Schema Overview

### user_progress table
```
id              UUID (Primary Key)
user_id         UUID (Foreign Key → auth.users)
performance     JSONB (Performance statistics)
flagged_questions    JSONB (Array of flagged question IDs)
srs_data        JSONB (Spaced repetition data)
session_history JSONB (Array of study sessions)
mastery_data    JSONB (Question mastery tracking)
unknown_flashcards   JSONB (Array of unknown flashcard IDs)
font_size       TEXT (User preference)
created_at      TIMESTAMP
updated_at      TIMESTAMP (Auto-updated)
```

### sync_log table (optional)
```
id          UUID (Primary Key)
user_id     UUID (Foreign Key → auth.users)
action      TEXT (pull/push/conflict)
details     JSONB (Debug info)
created_at  TIMESTAMP
```

---

## Optional Enhancements

Want to take it further? Here are some ideas:

### 1. Social Authentication
Add Google, GitHub, or other OAuth providers:
```javascript
// In Auth.js
const handleGoogleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
}
```

### 2. Password Reset
Add "Forgot Password" functionality:
```javascript
const handlePasswordReset = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
}
```

### 3. Sync Conflict Resolution UI
Show users when conflicts are detected and let them choose which data to keep.

### 4. Offline Mode Indicator
Show a banner when user is offline with pending syncs.

### 5. Export/Import Data
Allow users to export their progress as JSON or import from a backup.

---

## File Structure

New files added:
```
app/
├── lib/
│   ├── supabase.js          # Supabase client configuration
│   └── syncService.js       # Sync utilities and merge logic
├── components/
│   ├── Auth.js              # Login/signup UI
│   ├── AuthWrapper.js       # Auth state management wrapper
│   └── UserProfile.js       # User profile widget
└── layout.js                # Updated to include AuthWrapper

supabase-schema.sql          # Database schema to run in Supabase
SUPABASE_SETUP.md           # This file
```

---

## Support

If you run into issues:
1. Check browser console for errors
2. Verify Supabase dashboard shows your project is running
3. Ensure database schema was executed successfully
4. Check that RLS policies are enabled

---

## Next Steps

1. Run the database schema in Supabase ✅
2. Test account creation and login
3. Test syncing across different browsers
4. Configure email templates (optional)
5. Deploy to production with Firebase Hosting
6. Update your app's authentication settings for production URL

Enjoy your cloud-synced study app! 🚀
