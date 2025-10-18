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
#T6A Texan II Enhanced Study Tool
A comprehensive, multi-modal study application for T-6A Texan II pilot training. Features multiple question types, adaptive learning, performance tracking, and study modes optimized for efficient learning and checkride preparation.

###![Version](https://img.shields.io/badge/version-2.0-blue) ![Next.js](https://img.shields.io/badge/Next.js-15.5-black) ![React](https://img.shields.io/badge/React-19.1-blue)

## 🎯 Core Features

### 📚 Multiple Question Types

1. **Multiple Choice** - 4-option questions with instant feedback
2. **True/False** - Quick recall verification
3. **Reorder Sequence** - Arrange procedural steps in correct order
4. **Match Items** - Connect systems to values, limits to parameters

### 🎓 Study Modes

#### Study Mode
- Shows immediate explanations after each answer
- Perfect for learning new material
- Detailed feedback for incorrect answers
- Progressive mastery

#### Quiz Mode  
- Test yourself without hints
- Reveal answers when ready
- Simulates checkride conditions
- Build confidence under pressure

#### Limitations Mode
- **Focus exclusively on aircraft limits**
- Speeds, temperatures, weights, pressures
- G-limits, fuel limits, wind limits
- Critical for checkride preparation

#### Weak Topics Mode (Adaptive Learning)
- **Automatically identifies topics below 70% accuracy**
- Prioritizes areas needing improvement
- Smart algorithm tracks performance by category
- Efficient study time allocation

#### Flagged Questions
- Mark questions for later review
- Build custom review sets
- Track challenging procedures
- Personal study queue

#### Custom Mode
- Select specific topics (Propulsion, OBOGS, Emergency, etc.)
- Choose question types to practice
- Create tailored study sessions
- Mix and match for variety

### 📊 Performance Tracking

#### Overall Statistics
- Total questions attempted
- Correct/incorrect breakdown
- Current streak tracking
- Best streak achievement
- Real-time accuracy percentage

#### Category Performance
- Performance breakdown by topic
- Visual accuracy indicators
- Weak topic highlighting
- Progress over time

#### Question Type Analytics
- Performance by question format
- Identify preferred learning styles
- Balance practice across types

### 🧠 Adaptive Learning System

The app automatically:
- **Tracks accuracy per category** (Propulsion, Emergency, Airspeed, etc.)
- **Identifies weak topics** (below 70% accuracy)
- **Surfaces struggling areas** for focused review
- **Adapts question pools** based on performance
- **Optimizes study efficiency**

### 🌓 Dark/Light Mode
- Easy-on-the-eyes dark mode (default)
- Clean light mode option
- One-click toggle
- Persistent preference

### 💾 Progress Persistence
- All data saved to browser localStorage
- Resume sessions anytime
- Never lose your progress
- Cross-session tracking

### 📱 Mobile Optimized
- Touch-friendly interface
- Responsive design
- PWA support for offline use
- Install on mobile devices

## 📖 Content Coverage

### Aircraft Systems
- **Propulsion**: Engine limits, PMU, torque, ITT, N1/Np
- **Electrical**: Battery, generator, minimum voltage
- **Hydraulics**: System operation, pressure
- **Fuel**: Recovery fuel, minimum fuel, emergency fuel
- **OBOGS**: Oxygen generation, BOS, emergency procedures
- **ECS**: Cabin pressurization, temperature control

### Limitations (Critical for Checkride)
- **Airspeed Limits**: Gear/flaps, max speed, configuration limits
- **G Limits**: Symmetric/asymmetric, clean/configured
- **Wind Limits**: Crosswind (dry/wet/icy), tailwind, formation
- **Runway**: Minimum width, LDA requirements
- **Engine**: Torque, ITT, oil pressure/temp, fuel flow
- **Fuel**: Minimum recovery, emergency, aerobatic requirements
- **Spins**: Altitude restrictions, prohibited configurations
- **Temperature**: Ground operations, ITT limits

### Procedures
- **Boldface Emergency**: Engine fire, OBOGS failure, engine shutdown, departure from controlled flight
- **Normal Procedures**: Engine start, taxi, takeoff, landing sequences
- **Abnormal Procedures**: System malfunctions, contingencies

### Knowledge Areas
- Aerodynamics principles
- Performance calculations
- Instrument operations
- Flight planning

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/ceejwatson/t6a-boldface-study-tool.git
cd t6a-boldface-study-tool

# Install dependencies
npm install

# Run development server
npm run dev

# BuildBuild forfor productionproduction
npmnpm run build
npm startrun build
npm start
```

Open [http://localhost:3000](http://localhost:3000)

###### FirstFirst TimeStudy SetupSession

11. **Start with Study Mode**  Learn with immediate feedback
2. **Try different question types** - All 4 formats are included
3. **Flag challenging questions** - Build  review queue
4. **Check Progress tab**  **StudySeeyourperformancebreakdown
5 **Use fewWeak cards**Topics - Mark them as correct or incorrect
2. **Progress is automatically saved** - Close and reopen the app anytime
3. **Use Smart Review** - After studying, the app will schedule reviews based on your performance
4. **Install as PWA** - On mobile, tap "Add to Home Screen"mode** - offline accessLet the app guide your study

## PWA📱 InstallationPWA Installation

###### iOSiOS (iPhone/iPad)
1(iPhone/iPad)
1. OpenOpeninSafari
2.Tap Share app→ in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"Add to Home Screen
3. Tap "Add"
4. Launch from home screen

###### AndroidAndroid
11. Open the app in Chrome
2. Tap the menu  Open in Chrome
2
3Tapmenu→"Add to Home screen"
3. Tap "Add to Home screen" or "Install app"
4Tap "Install" Tap "Install"

###### DesktopDesktop
1. LookLook for the install icon in the address bar
3for install icon in address bar
2. ClickClick "Install""Install"

## Generating📝 IconsUsageGuide

### StudyMode Workflow
```
1. Select "Study Mode"
2. Answer question
3. Explanation appears immediately
4. Review feedback
5. Click "Next"continue
```

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
### Quiz Mode Workflow
```
1. Select "Quiz Mode"  
2. Answer question
3. Click "Show Answer" when ready
4. Review results
5. Continue to next question
```

### Limitations Mode
```
1. Click "Limitations Only"
2. Focus on critical limits
3. Speeds, temps, weights, pressures
4. Perfect for final review
```

### Adaptive Learning
```
1. Study normally in any mode
2. App tracks performance automatically
3. Weak topics appear after 3+ attempts
4. Click "Weak Topics" to focus review
5. Improve accuracy to remove from weak list
```

### Custom Sessions
```
1. Click "Custom"
2. Select topics (e.g., Propulsion, Emergency)
3. Choose question types
4. Start custom session
5. Tailored practice
```

## 🎯 Question Type Guide

### Multiple Choice
- Read question carefully
- Select one of four options
- Immediate feedback in Study Mode
- Explanation shows correct answer and why

### True/False
- Large touch targets
- Binary decision
- Quick recall testing
- Explanation clarifies correct answer

### Reorder Sequence
- **Critical for procedures**
- Use up/down arrows to reorder steps
- Must get exact sequence correct
- Shows correct order if wrong
- Perfect for boldface practice

### Match Items
- Click item from left column
- Click matching item from right column
- Create all matches
- Partial credit shown
- Reveals correct pairs if wrong

## 📊 Performance Insights

### Overall Stats
- **Total Attempts**: Questions you've answered
- **Correct**: Number of right answers
- **Accuracy %**: Success rate
- **Current Streak**: Consecutive correct answers
- **Best Streak**: Personal record

### Category Breakdown
- See performance by topic
- Orange lightning ⚡ = weak topic (<70%)
- Focus study on weak areas
- Watch accuracy improve

### Adaptive Alerts
- System identifies topics below 70% accuracy
- "Weak Topics" mode appears automatically
- Targeted review maximizes efficiency
- Clear weak topics by improving accuracy

## 💡 Study Tips

### For Checkride Prep
1. **Master Limitations first** - Use Limitations Mode
2. **Boldface is critical** - Practice Reorder Sequence questions
3. **Use Quiz Mode** - Simulate testing conditions
4. **Review weak topics daily** - Follow adaptive recommendations
5. **Flag tricky questions** - Build targeted review sets

### Efficient Learning
1. **Study Mode for new material** - Learn with immediate feedback
2. **Quiz Mode for testing** - Verify retention
3. **Mix question types** - Multiple learning pathways
4. **Short, frequent sessions** - Better than cramming
5. **Track progress** - Celebrate improvements

### Mobile Study
1. **Install as PWA** - Offline access
2. **Quick review sessions** - 5-10 minutes
3. **Touch-optimized** - Smooth interaction
4. **Flag on-the-go** - Review later
5. **Dark mode** - Easier on eyes

## 🔧 Technical Details

### Technology Stack
- **Next.js 15.5** - React framework
- **React 19.1** - UI library
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons
- **localStorage** - Data persistence

### Browser Requirements
- Chrome/Edge (recommended)
- Safari (iOS/macOS)
- Firefox
- JavaScript enabled

### Data Storage
All data stored locally in browser:
- `t6a-performance` - Performance statistics
- `t6a-flagged` - Flagged questions
- No server required
- Privacy-focused

### File Structure
```
app/
├── page.js                 # Main enhanced study app
├── questionData.js         # Question database
├── components/
│   ├── MultipleChoice.js   # Multiple choice component
│   ├── TrueFalse.js        # True/false component
│   ├── ReorderSequence.js  # Sequence reorder component
│   └── MatchItems.js       # Match items component
├── layout.js               # App layout
└── globals.css             # Global styles

public/
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
└── offline.html            # Offline fallback
```

## 🆕 Version History

### Version 2.0 (Current)
- ✅ Multiple question types (4 formats)
- ✅ Study/Quiz/Limitations/Custom modes
- ✅ Adaptive learning system
- ✅ Performance tracking by category
- ✅ Weak topic identification
- ✅ Flag questions for review
- ✅ Dark/light mode toggle
- ✅ Mobile-optimized touch interface
- ✅ Comprehensive limitations focus

### Version 1.0
- Flashcard system
- Spaced repetition
- Keyboard shortcuts
- PWA support
- Basic progress tracking

## 🎓 Content Details

### Question Database
- **12+ Multiple Choice** questions
- **8+ True/False** questions
- **5+ Reorder Sequence** questions (boldface procedures)
- **5+ Match Items** questions (limits, systems)
- **Expandable** - Easy to add more

### Topics Covered
- ✈️ Propulsion (engine limits, PMU, torque, ITT)
- ⚡ Electrical (battery, generator)
- 💧 Hydraulics (system operation)
- ⛽ Fuel (recovery, minimum, emergency)
- 🫁 OBOGS (oxygen, BOS, emergencies)
- 🌡️ ECS (pressurization, temperature)
- 🚨 Emergency procedures (boldface)
- ⚠️ Prohibited maneuvers
- 🎯 Limitations (all categories)

## 🤝 Contributing

Want to add more questions or improve the app?

1. Fork the repository
2. Add questions to `app/questionData.js`
3. Follow existing format
4. Test thoroughly
5. Submit pull request

### Adding Questions

**Multiple Choice:**
```javascript
{
  id: 'mc-X',
  category: 'Category Name',
  topic: 'Specific Topic',
  difficulty: 'critical', // critical, high, medium
  question: 'Question text?',
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  correctAnswer: 0, // Index of correct option (0-3)
  explanation: 'Explanation of why this is correct',
  limitation: true // true if this is a limitation
}
```

**True/False:**
```javascript
{
  id: 'tf-X',
  category: 'Category Name',
  topic: 'Specific Topic',
  difficulty: 'high',
  question: 'Statement to evaluate',
  correctAnswer: true, // or false
  explanation: 'Explanation',
  limitation: false
}
```

## 📄 License

Educational use for T-6A pilot training.

## 🙋 Support

- **Issues**: https://github.com/ceejwatson/t6a-boldface-study-tool/issues
- **Documentation**: This README
- **Updates**: Check GitHub for latest version

## 🎯 Study Goals

Use this tool to:
- ✅ Master all T-6A limitations
- ✅ Memorize boldface procedures
- ✅ Understand aircraft systems
- ✅ Prepare for checkride
- ✅ Build confidence
- ✅ Track improvement
- ✅ Identify weak areas
- ✅ Efficient studying

---

**Good luck with your T-6A training! 🛩️**

*Study smart, fly safe.*
