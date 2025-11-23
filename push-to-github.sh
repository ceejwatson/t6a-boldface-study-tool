#!/bin/bash

# Aerospace Physiology Push Script
# Run this after installing Xcode command line tools with: xcode-select --install

echo "🚀 Pushing Aerospace Physiology changes to GitHub..."
echo ""

cd /Users/cjwatson/Desktop/t6a-boldface

# Configure git to use the token for this push
export GIT_ASKPASS_TOKEN="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"

echo "📝 Adding new files..."
git add app/aerospacePhysiologyData.js
git add AEROSPACE_PHYSIOLOGY_GUIDE.md
git add QUICK_START_AEROSPACE_PHYSIOLOGY.md
git add IMPLEMENTATION_SUMMARY.txt

echo "📝 Adding modified files..."
git add app/page.js

echo "💾 Committing changes..."
git commit -m "Add Aerospace Physiology quiz mode with 30+ questions

Features:
- Created aerospacePhysiologyData.js with 30+ sample questions across 12 topics
- Questions mapped to learning objective types (Identify, Describe, List, etc.)
- Added topic categories: Atmosphere, Hypoxia, Vision, Spatial Disorientation, G-Forces, etc.
- All 4 question types supported: Multiple Choice, True/False, Reorder Sequence, Match Items
- Integrated with existing progress tracking and spaced repetition system
- Added cyan navigation button and topic selection interface on home page
- Included comprehensive documentation with templates for adding more questions
- Ready for expansion with content from T6_AP_SG_Mar21.pdf (166 pages)

Files created:
- app/aerospacePhysiologyData.js (22KB, 30+ questions)
- AEROSPACE_PHYSIOLOGY_GUIDE.md (detailed implementation guide)
- QUICK_START_AEROSPACE_PHYSIOLOGY.md (quick reference)
- IMPLEMENTATION_SUMMARY.txt (overview)

Files modified:
- app/page.js (added imports, navigation, topic interface)"

echo "🔄 Checking remote configuration..."
git remote -v

echo ""
echo "🚀 Pushing to GitHub..."

# Try to push with token
git push

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Your Aerospace Physiology mode is now on GitHub!"
    echo "View at: https://github.com/ceejwatson/t6a-boldface-study-tool"
else
    echo "❌ Push failed. You may need to authenticate."
    echo ""
    echo "If prompted for credentials:"
    echo "  Username: ceejwatson"
    echo "  Password: Use the GitHub token provided"
    echo ""
    echo "Or try: git push origin main"
fi

echo ""
echo "📊 Current status:"
git status
