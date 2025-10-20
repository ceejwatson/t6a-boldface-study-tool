# Firebase Deployment Guide for T-6A BOLDFACE Study Tool

## Prerequisites

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

## Setup Steps

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "t6a-boldface")
4. Follow the setup wizard

### 2. Initialize Firebase in Your Project

```bash
cd /Users/cjwatson/Desktop/t6a-boldface
firebase init hosting
```

When prompted:
- **Select a Firebase project**: Choose the project you just created
- **What do you want to use as your public directory?**: `out`
- **Configure as a single-page app?**: `Yes`
- **Set up automatic builds with GitHub?**: `No` (for now)
- **Overwrite existing files?**: `No`

### 3. Update Firebase Project ID

Edit `.firebaserc` and replace `your-project-id-here` with your actual Firebase project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

## Deploy to Firebase

### First Time Deployment

```bash
npm run deploy
```

This will:
1. Build the Next.js app for static export
2. Deploy to Firebase Hosting

### Subsequent Deployments

Every time you make changes:

```bash
npm run deploy
```

## Your Live URL

After deployment, Firebase will provide a URL like:
- `https://your-project-id.web.app`
- `https://your-project-id.firebaseapp.com`

## Important Notes

### Data Storage
Currently, all data is stored in browser localStorage:
- Progress tracked per device
- To sync across devices, you'll need to add Firebase Firestore (see below)

### Adding Firestore for Cross-Device Sync (Optional)

If you want to sync your progress across devices:

1. **Enable Firestore** in Firebase Console:
   - Go to Firestore Database
   - Click "Create database"
   - Choose production mode
   - Select a location

2. **Install Firebase SDK**:
   ```bash
   npm install firebase
   ```

3. **Configure Firebase** in your app (I can help with this if needed)

## Custom Domain (Optional)

To use a custom domain:
1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the instructions to verify domain ownership
4. Update DNS records as instructed

## Troubleshooting

### Build Errors
If `npm run deploy` fails:
```bash
# Try building manually first
npm run build
# Check the 'out' directory was created
ls out/
# Then deploy
firebase deploy --only hosting
```

### Cache Issues
If changes aren't showing:
- Clear browser cache
- Use incognito/private browsing
- Wait a few minutes for CDN cache to clear

## Useful Commands

```bash
# View deployment history
firebase hosting:clone

# Deploy preview (test before going live)
firebase hosting:channel:deploy preview

# View logs
firebase hosting:channel:list
```

## Next Steps

1. Update `.firebaserc` with your project ID
2. Run `npm run deploy`
3. Visit your Firebase Hosting URL
4. Share the link with others!

Your T-6A BOLDFACE study tool will be accessible from any device with a browser!
