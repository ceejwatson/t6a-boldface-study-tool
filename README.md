# T-6A Texan II BoldFace Study Tool

A comprehensive, interactive flashcard application for studying T-6A Texan II emergency procedures, operational limits, and critical boldface items. Built with Next.js and featuring advanced study tools including spaced repetition, progress tracking, and offline support.

## Features

### 🎴 Interactive Flashcards
- **70+ Cards** covering all T-6A emergency procedures and limits
- **Flip Animation** - Click or press Space/F to flip cards
- **Category Organization** - Emergency, Engine Limits, Fuel, Airspeed, G-Limits, and more
- **Difficulty Indicators** - Critical, High, and Medium priority levels
- **Type Badges** - Boldface vs Limit items clearly marked

### 🧠 Smart Study Modes
1. **All Cards** - Study the complete deck
2. **Smart Review** - Spaced repetition algorithm shows cards when you need to review them
3. **Review Missed** - Focus on cards you got wrong
4. **By Category** - Filter by specific topics (Emergency, Engine Limits, etc.)

### 📊 Progress Tracking
- **Real-time Stats** - Track correct/incorrect answers and current streak
- **Best Streak** - Monitor your personal best
- **Missed Cards Tracking** - Automatically tracks cards you need to review
- **Progress Persistence** - All progress saved to browser localStorage
- **Category Breakdown** - See how many cards are in each category

### 🎯 Quiz Mode
- **Type Your Answers** - Test yourself by typing responses
- **Smart Grading** - 70% keyword matching for flexible answers
- **Instant Feedback** - See if you're correct immediately
- **Ctrl+Enter** - Quick submit shortcut

### ⌨️ Keyboard Shortcuts
- **Space** or **F** - Flip card
- **→** or **N** - Next card
- **←** or **P** - Previous card
- **S** - Shuffle to random card
- **C** - Mark correct (when card is flipped)
- **X** - Mark incorrect (when card is flipped)

### 📱 Progressive Web App (PWA)
- **Install on Mobile** - Add to home screen on iOS/Android
- **Offline Support** - Study anywhere, even without internet
- **Service Worker** - Caches content for faster loading
- **Responsive Design** - Works perfectly on phone, tablet, and desktop

### 🔄 Spaced Repetition
- **SM-2 Algorithm** - Scientifically proven memorization technique
- **Adaptive Intervals** - Cards you know well appear less frequently
- **Difficulty Tracking** - Each card has an individual ease factor
- **Optimized Learning** - Review cards at the perfect time for retention

## Getting Started

### Installation

```bash
# Clone or download the repository
cd t6a-boldface

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### First Time Setup

1. **Study a few cards** - Mark them as correct or incorrect
2. **Progress is automatically saved** - Close and reopen the app anytime
3. **Use Smart Review** - After studying, the app will schedule reviews based on your performance
4. **Install as PWA** - On mobile, tap "Add to Home Screen" for offline access

## PWA Installation

### iOS (iPhone/iPad)
1. Open the app in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

### Android
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home screen" or "Install app"
4. Tap "Install"

### Desktop (Chrome/Edge)
1. Open the app
2. Look for the install icon in the address bar
3. Click "Install"

## Generating Icons

The app includes a helper to generate PWA icons:

```bash
# Open the icon generator in your browser
open public/create-icons.html
```

This will generate `icon-192.png` and `icon-512.png` which are required for PWA installation.

## Technology Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with hooks
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React** - Beautiful icon library
- **Service Worker** - Offline support and caching
- **localStorage** - Client-side data persistence

## Data Structure

### Flashcard Format
Each card includes:
- `id` - Unique identifier
- `category` - Topic area
- `difficulty` - critical, high, or medium
- `type` - boldface or limit
- `question` - What you need to know
- `answer` - Full detailed answer
- `shortAnswer` - Condensed version for quiz matching

### Progress Tracking
The app stores three types of data in localStorage:
- `t6a-study-stats` - Overall statistics (correct, incorrect, streaks)
- `t6a-missed-cards` - Array of card IDs that need review
- `t6a-card-stats` - Spaced repetition data for each card (interval, ease factor, next review date)

## Customization

### Adding New Cards
Edit `app/page.js` and add to the `flashcardsData` array:

```javascript
{
  id: 71,
  category: "Your Category",
  difficulty: "high",
  type: "boldface",
  question: "Your question here?",
  answer: "Full detailed answer",
  shortAnswer: "SHORT VERSION"
}
```

### Modifying Spaced Repetition
The SM-2 algorithm parameters can be adjusted in the `calculateNextReview` function in `app/page.js`:
- Initial ease factor: 2.5
- Minimum ease factor: 1.3
- Interval progression: 1 day → 6 days → interval × easeFactor

### Styling
Colors and themes can be modified in the component using Tailwind classes. Main color scheme:
- Primary: Blue (`bg-blue-600`)
- Success: Green (`bg-green-600`)
- Error: Red (`bg-red-600`)
- Warning: Yellow (`bg-yellow-600`)
- Background: Slate (`bg-slate-900`)

## Browser Support

- Chrome/Edge (recommended)
- Safari (iOS/macOS)
- Firefox
- Any modern browser with JavaScript enabled

## Tips for Effective Study

1. **Daily Reviews** - Check "Smart Review" daily to reinforce learning
2. **Use Quiz Mode** - Actively recall answers by typing them
3. **Focus on Missed Cards** - Review mistakes until mastery
4. **Keyboard Shortcuts** - Speed up your study sessions
5. **Category Focus** - Master one category at a time
6. **Track Streaks** - Aim to beat your best streak

## Troubleshooting

**Progress not saving?**
- Make sure cookies/localStorage are enabled in your browser
- Check if you're in private/incognito mode

**PWA not installing?**
- Ensure you're using HTTPS (required for PWA)
- Try clearing browser cache
- Make sure icons are generated (see "Generating Icons" section)

**Keyboard shortcuts not working?**
- Make sure you're not typing in a text field
- Click anywhere on the page to focus it

## License

This is a study tool for educational purposes.

## Contributing

Feel free to add more flashcards, improve the UI, or suggest new features!

---

**Good luck with your T-6A training! 🛩️**
