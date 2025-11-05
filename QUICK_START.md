# Quick Start Guide - Supabase Setup

## Setup Steps (5 minutes)

### 1. Run Database Schema

1. Go to: https://supabase.com/dashboard/project/qtwxnmhkcscmeoediyjt
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Open the file `supabase-schema.sql` in your project
5. Copy ALL the contents
6. Paste into the Supabase SQL editor
7. Click **RUN** (or press Cmd/Ctrl + Enter)
8. You should see: "Success. No rows returned"

### 2. Configure Email Settings (Optional but Recommended)

For testing, disable email confirmation:

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Click on **Email** provider
3. Scroll down to **Confirm email**
4. **Toggle OFF** "Confirm email"
5. Click **Save**

This lets users sign up and login immediately without email verification.

### 3. Start the App

```bash
npm run dev
```

Open http://localhost:3000

### 4. Test It Out

1. You'll see the login/signup screen
2. Create a new account with any email (e.g., test@example.com) and password
3. You'll be logged in and see your user profile at the top
4. Study some questions and check your progress
5. Click the refresh icon to manually sync
6. Try logging out and back in - your progress should persist!

### 5. Test Multi-Device Sync

1. Open the app in a different browser (or incognito mode)
2. Login with the same credentials
3. Your progress should sync automatically!
4. Study in one browser, refresh in the other - progress syncs

---

## What's Been Added

### Authentication
- ✅ Beautiful login/signup screen
- ✅ Email/password authentication
- ✅ Secure session management
- ✅ Auto-login on return visits

### Cloud Sync
- ✅ All progress synced to Supabase
- ✅ Auto-sync every 2 minutes
- ✅ Sync when switching back to tab
- ✅ Manual sync button
- ✅ Intelligent merge (keeps best progress)

### UI Updates
- ✅ User profile widget at top
- ✅ Sync status indicators
- ✅ Dark theme matching your app
- ✅ Logout functionality

---

## Files Created/Modified

**New Files:**
- `app/lib/supabase.js` - Supabase client
- `app/lib/syncService.js` - Sync logic
- `app/components/Auth.js` - Login/signup UI
- `app/components/AuthWrapper.js` - Auth state management
- `app/components/UserProfile.js` - User widget
- `supabase-schema.sql` - Database schema
- `SUPABASE_SETUP.md` - Full documentation
- `QUICK_START.md` - This file

**Modified Files:**
- `app/layout.js` - Added AuthWrapper
- `package.json` - Added @supabase/supabase-js

---

## Troubleshooting

**"Invalid login credentials"**
- Make sure you created an account first
- Check your email/password

**Sync not working**
- Check browser console for errors
- Make sure you ran the SQL schema
- Verify internet connection

**Can't create account**
- Make sure email confirmation is disabled (see step 2 above)
- Or check your email for confirmation link

**Build errors**
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

---

## Next Steps

After testing locally:

1. **Deploy to Production**
   - Update Supabase Site URL to your production domain
   - Enable email confirmation for production
   - Deploy with: `npm run build && firebase deploy`

2. **Customize Email Templates**
   - In Supabase dashboard: Authentication → Email Templates
   - Customize signup confirmation, password reset, etc.

3. **Add Social Login (Optional)**
   - Enable Google, GitHub, etc. in Supabase dashboard
   - Update Auth.js component with OAuth buttons

---

## Support

Everything should work! If you have issues:
1. Check that the SQL schema ran successfully
2. Verify your Supabase project is active
3. Check browser console for error messages

Read the full guide in `SUPABASE_SETUP.md` for more details.

---

**You're all set! 🚀**

Your app now has:
- User accounts
- Cloud sync across devices
- Automatic backups
- Progress saved forever
