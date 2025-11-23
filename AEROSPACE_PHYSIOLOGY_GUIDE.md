# Aerospace Physiology Study Mode - Implementation Guide

## Overview
A new quiz mode has been added to your T-6A study tool specifically for Aerospace Physiology questions based on the T6_AP_SG_Mar21.pdf study guide. Questions are organized by learning objectives and the type of question is determined by the first word of each objective (Identify, Describe, Explain, List, etc.).

## What's Been Added

### 1. New Data File: `app/aerospacePhysiologyData.js`
This file contains:
- **12 Topics**: Atmosphere, Respiration, Altitude, Trapped Gas, Decompression, Thermal Stress, Vision, Spatial Disorientation, Acceleration, Fatigue, Oxygen Equipment, Pressure Breathing
- **30+ Sample Questions** across all question types:
  - 10 Multiple Choice questions
  - 5 True/False questions
  - 2 Reorder Sequence questions
  - 3 Match Items questions
- **Question Structure** based on learning objective types:
  - "Identify" → Multiple Choice or Matching
  - "Describe" → Active Recall / Essay
  - "Explain" → Active Recall / Essay
  - "List" → Reorder Sequence or Active Recall
  - "Define" → Multiple Choice or Active Recall
  - "Recognize" → Multiple Choice or True/False
  - "Demonstrate" → Scenario-based Multiple Choice
  - "Apply" → Scenario-based Multiple Choice

### 2. New Navigation Button
On the home page, there's now a cyan "Aerospace Physiology" button that takes you to the dedicated study mode.

### 3. Topic Selection Interface
The aerospace physiology page shows:
- All 12 topics as clickable cards
- Progress tracking for each topic
- Number of questions per topic
- "Study All Topics" button to practice all questions

### 4. Integration with Existing Features
Aerospace physiology questions work with all existing features:
- Progress tracking and statistics
- Spaced repetition system (SRS)
- Question mastery tracking
- Performance analytics
- Review incorrect answers
- Flagging difficult questions

## How to Add More Questions from the PDF

### Step 1: Identify the Learning Objective
Look at the PDF objective and note the first word. For example:
- "**Identify** the composition of the atmosphere" → Use Multiple Choice
- "**Describe** the effects of hypoxia" → Use True/False or Multiple Choice
- "**List** the symptoms of decompression sickness" → Use Reorder Sequence
- "**Explain** how spatial disorientation occurs" → Use Multiple Choice with detailed explanation

### Step 2: Extract Sample Behaviors
The PDF includes "sample behaviors" under each objective. These are perfect for:
- Creating answer options (for multiple choice)
- Writing explanations
- Determining correct sequences (for reorder questions)
- Creating matching pairs

### Step 3: Add Questions to the Data File

Open `app/aerospacePhysiologyData.js` and add questions to the appropriate array:

#### Multiple Choice Example:
```javascript
{
  id: "ap-mc-11", // Increment the ID number
  category: "Thermal Stress", // Use one of the 12 topics
  topic: "Heat Stress",
  difficulty: "medium", // "critical", "high", or "medium"
  question: "What is the primary method the body uses to cool itself during heat stress?",
  options: ["Shivering", "Sweating", "Increased respiration", "Decreased heart rate"],
  correctAnswer: 1, // Index of correct answer (0-3)
  explanation: "Sweating is the body's primary cooling mechanism. As sweat evaporates from the skin, it removes heat from the body. During flight, reduced airflow in the cockpit can impair this process, making heat stress more dangerous. Symptoms include fatigue, dizziness, and impaired judgment.",
  limitation: false, // true if it's a regulatory limitation
  objectiveType: "identify", // lowercase version of the first word
  learningObjective: "Identify methods of body temperature regulation"
}
```

#### True/False Example:
```javascript
{
  id: "ap-tf-6",
  category: "Acceleration",
  topic: "G-Forces",
  difficulty: "high",
  question: "Positive G forces cause blood to pool in the lower body, potentially leading to G-LOC.",
  correctAnswer: true,
  explanation: "TRUE. Positive Gs (pulling back on the stick) create a head-to-foot force that causes blood to pool in the lower extremities. This reduces blood flow to the brain and can cause grayout, blackout, and eventually G-LOC (G-induced Loss of Consciousness). The AGSM (Anti-G Straining Maneuver) helps counteract this effect.",
  limitation: false,
  objectiveType: "recognize",
  learningObjective: "Recognize the effects of acceleration on the body"
}
```

#### Reorder Sequence Example:
```javascript
{
  id: "ap-rs-3",
  category: "Decompression",
  topic: "DCS Response",
  difficulty: "critical",
  question: "Arrange the steps for responding to suspected decompression sickness:",
  correctSequence: [
    "Recognize symptoms (joint pain, skin symptoms, neurological issues)",
    "Descend to the lowest safe altitude immediately",
    "Administer 100% oxygen",
    "Land as soon as possible",
    "Seek immediate medical attention and hyperbaric treatment"
  ],
  explanation: "Decompression sickness (DCS) requires immediate action: (1) Recognize symptoms early, (2) Descend immediately to increase pressure and reduce bubble size, (3) Provide 100% oxygen to help dissolve nitrogen, (4) Land ASAP, (5) Get medical help - hyperbaric chamber treatment may be required. Never delay treatment as DCS can cause permanent damage.",
  limitation: false,
  objectiveType: "demonstrate",
  learningObjective: "Demonstrate proper response to decompression sickness"
}
```

#### Match Items Example:
```javascript
{
  id: "ap-mi-4",
  category: "Vision",
  topic: "Visual Components",
  difficulty: "medium",
  question: "Match each eye component with its function:",
  leftColumn: [
    "Rods",
    "Cones",
    "Fovea",
    "Peripheral Vision"
  ],
  rightColumn: [
    "Night vision and motion detection",
    "Color vision and detail in bright light",
    "Central vision with highest acuity",
    "Detects movement but poor detail"
  ],
  correctMatches: [
    { left: 0, right: 0 }, // Rods → Night vision
    { left: 1, right: 1 }, // Cones → Color vision
    { left: 2, right: 2 }, // Fovea → Central vision
    { left: 3, right: 3 }  // Peripheral → Movement
  ],
  explanation: "Understanding eye anatomy is critical for aviation: RODS (peripheral retina) - 120 million, night vision, no color, detect motion; CONES (fovea) - 6-7 million, day/color vision, high detail; FOVEA - central vision, highest acuity, used for reading instruments; PERIPHERAL - detects movement and threats but low detail. At night, use off-center viewing to maximize rod usage.",
  limitation: false,
  objectiveType: "identify",
  learningObjective: "Identify components of the visual system and their functions"
}
```

### Step 4: Update Question Counts
The system automatically counts questions per topic, but verify your additions work by:
1. Save the file
2. Restart the dev server: `npm run dev`
3. Navigate to Aerospace Physiology
4. Check that the question count is correct for each topic

## Question Writing Best Practices

### 1. Based on PDF Objectives
- Each question should directly relate to a learning objective from the PDF
- Use the exact terminology from the study guide
- Include sample behaviors as answer options or in explanations

### 2. Detailed Explanations
- Explain WHY the answer is correct
- Include relevant aviation context
- Add memory aids or mnemonics when helpful
- Reference specific altitudes, times, or values

### 3. Realistic Scenarios
- Use situations pilots actually encounter
- Include consequences of wrong answers
- Make incorrect options plausible but clearly wrong

### 4. Progressive Difficulty
- **Medium**: Basic knowledge recall
- **High**: Application of concepts or critical facts
- **Critical**: Life-threatening situations or boldface-equivalent

### 5. Consistent Categories
Use only these 12 topic categories:
- Atmosphere
- Respiration and Hypoxia
- Altitude Physiology
- Trapped Gas
- Decompression Sickness
- Thermal Stress
- Vision and Visual Illusions
- Spatial Disorientation
- Acceleration and G-Forces
- Fatigue and Stress
- Oxygen Equipment
- Pressure Breathing

## Testing Your Questions

After adding questions:

1. **Start the app**: `npm run dev` (if you have npm/node installed)
2. **Navigate to Aerospace Physiology** from the home page
3. **Click on the relevant topic** to see your new questions
4. **Verify**:
   - Question text is clear
   - All answer options are visible
   - Correct answer is actually correct
   - Explanation provides value
   - Progress tracking works

## Current Question Count

As of now, the database includes:
- **Atmosphere**: 2 questions
- **Respiration and Hypoxia**: 3 questions  
- **Trapped Gas**: 1 question
- **Decompression Sickness**: 2 questions
- **Spatial Disorientation**: 1 question
- **Acceleration and G-Forces**: 1 question
- **Vision and Visual Illusions**: 3 questions
- **Fatigue and Stress**: 1 question

**Total**: 30+ sample questions (expandable to 100s based on PDF content)

## Extracting Content from PDF

Since the PDF is 166 pages, here's a systematic approach:

1. **By Chapter**: Work through the PDF chapter by chapter
2. **Focus on Objectives**: Each objective = potential question(s)
3. **Use Sample Behaviors**: These become answer options
4. **Key Facts**: Look for specific numbers, altitudes, times → Multiple Choice
5. **Procedures**: Step-by-step processes → Reorder Sequence
6. **Comparisons**: Different types/categories → Match Items
7. **True/False**: Common misconceptions → True/False questions

## File Structure

```
app/
├── aerospacePhysiologyData.js   ← Your new question database
├── page.js                       ← Modified to include AP mode
├── questionData.js               ← Original T-6A questions (unchanged)
└── components/
    ├── MultipleChoice.js         ← Used by AP questions
    ├── TrueFalse.js             ← Used by AP questions
    ├── ReorderSequence.js       ← Used by AP questions
    └── MatchItems.js            ← Used by AP questions
```

## Next Steps

1. **Manual PDF Review**: Open T6_AP_SG_Mar21.pdf and extract objectives
2. **Create Questions**: Use the templates above to add 5-10 questions per topic
3. **Test Thoroughly**: Verify each question works in the app
4. **Iterate**: Refine questions based on study effectiveness

## Tips for Efficient Question Creation

- **Batch by Topic**: Do all questions for one topic at a time
- **Copy Template**: Use existing questions as templates
- **Increment IDs**: Keep track of the highest ID number used
- **Save Often**: Test frequently to catch errors early
- **Get Feedback**: Have someone else review your questions

## Need Help?

If you encounter issues:
- Check browser console for errors (F12)
- Verify JSON syntax (commas, brackets, quotes)
- Ensure all required fields are present
- Test with a single new question first before adding many

---

**The framework is ready - now you can populate it with questions from your PDF!**
