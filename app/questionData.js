// T-6A Texan II Comprehensive Question Database

export const questionDatabase = {
  // MULTIPLE CHOICE QUESTIONS
  multipleChoice: [
    // Aircraft Systems
    {
      id: 'mc-1',
      category: 'Propulsion',
      topic: 'Engine',
      difficulty: 'medium',
      question: 'What is the maximum torque limit for takeoff in the T-6A?',
      options: ['90%', '95%', '100%', '105%'],
      correctAnswer: 2,
      explanation: 'Maximum takeoff torque is 100%. Transient limits of 101-107% are allowed for only 5 seconds.',
      limitation: true
    },
    {
      id: 'mc-2',
      category: 'Propulsion',
      topic: 'Engine',
      difficulty: 'high',
      question: 'What is the maximum ITT during engine start?',
      options: ['750°C', '820°C', '871°C', '1000°C'],
      correctAnswer: 3,
      explanation: 'Maximum ITT during start is 871-1000°C for 5 seconds. Normal max ITT for takeoff is 820°C.',
      limitation: true
    },
    {
      id: 'mc-3',
      category: 'Airspeed',
      topic: 'Limitations',
      difficulty: 'critical',
      question: 'What is the maximum airspeed with gear or flaps extended?',
      options: ['120 KIAS', '150 KIAS', '180 KIAS', '200 KIAS'],
      correctAnswer: 1,
      explanation: 'Maximum speed with landing gear and/or flaps extended is 150 KIAS.',
      limitation: true
    },
    {
      id: 'mc-4',
      category: 'G Limits',
      topic: 'Limitations',
      difficulty: 'high',
      question: 'What are the symmetric G limits with a clean configuration?',
      options: ['-2.0 to +5.0', '-3.5 to +7.0', '-4.0 to +8.0', '0 to +6.0'],
      correctAnswer: 1,
      explanation: 'Clean configuration symmetric G limits are -3.5 to +7.0 Gs.',
      limitation: true
    },
    {
      id: 'mc-5',
      category: 'Fuel',
      topic: 'Limitations',
      difficulty: 'high',
      question: 'What is the minimum recovery fuel?',
      options: ['100 pounds', '150 pounds', '200 pounds', '250 pounds'],
      correctAnswer: 2,
      explanation: 'Normal recovery fuel is 200 pounds. Minimum fuel is 150 pounds (200 solo), emergency fuel is 100 pounds.',
      limitation: true
    },
    {
      id: 'mc-6',
      category: 'Electrical',
      topic: 'Systems',
      difficulty: 'medium',
      question: 'What is the minimum battery voltage for engine start?',
      options: ['20.0V', '22.5V', '23.5V', '24.5V'],
      correctAnswer: 2,
      explanation: 'Minimum battery voltage is 23.5V for engine start.',
      limitation: true
    },
    {
      id: 'mc-7',
      category: 'OBOGS',
      topic: 'Systems',
      difficulty: 'critical',
      question: 'What immediate action do you take for OBOGS failure or physiological symptoms?',
      options: [
        'Continue mission and monitor',
        'Turn OBOGS off, activate BOS, descend below 10,000 ft',
        'Pull circuit breaker immediately',
        'Switch to backup oxygen bottle'
      ],
      correctAnswer: 1,
      explanation: 'OBOGS SUPPLY LEVER - OFF (BOTH), BOS PUSH MAN - PRESS ON, GREEN RING - PULL (AS REQUIRED), DESCENT BELOW 10,000 FEET MSL - INITIATE',
      limitation: false
    },
    {
      id: 'mc-8',
      category: 'Propulsion',
      topic: 'Engine',
      difficulty: 'medium',
      question: 'What is the normal Np idle range?',
      options: ['40-45%', '46-50%', '55-60%', '60-61%'],
      correctAnswer: 1,
      explanation: 'Np idle range is 46-50%. N1 idle range is 60-61%.',
      limitation: true
    },
    {
      id: 'mc-9',
      category: 'Runway',
      topic: 'Limitations',
      difficulty: 'medium',
      question: 'What is the minimum runway width for T-6A operations?',
      options: ['50 feet', '60 feet', '75 feet', '100 feet'],
      correctAnswer: 2,
      explanation: 'Minimum runway width is 75 feet.',
      limitation: true
    },
    {
      id: 'mc-10',
      category: 'Wind Limits',
      topic: 'Limitations',
      difficulty: 'high',
      question: 'What is the maximum crosswind for dry runway operations?',
      options: ['15 knots', '20 knots', '25 knots', '30 knots'],
      correctAnswer: 2,
      explanation: 'Maximum crosswind on dry runway is 25 knots. Wet: 10 knots, Icy: 5 knots.',
      limitation: true
    },
    {
      id: 'mc-11',
      category: 'Hydraulics',
      topic: 'Systems',
      difficulty: 'medium',
      question: 'How is the T-6A hydraulic system powered?',
      options: [
        'Engine-driven pump only',
        'Electric pump only',
        'Engine-driven pump with electric backup',
        'Dual electric pumps'
      ],
      correctAnswer: 0,
      explanation: 'The T-6A has a single engine-driven hydraulic pump. There is no backup hydraulic pump.',
      limitation: false
    },
    {
      id: 'mc-12',
      category: 'Spins',
      topic: 'Limitations',
      difficulty: 'critical',
      question: 'What is the minimum altitude for intentional spin entry?',
      options: ['10,000 ft MSL', '12,000 ft MSL', '13,500 ft MSL', '15,000 ft MSL'],
      correctAnswer: 2,
      explanation: 'Minimum altitude for intentional spin entry is 13,500 feet MSL.',
      limitation: true
    },
  ],

  // TRUE/FALSE QUESTIONS
  trueFalse: [
    {
      id: 'tf-1',
      category: 'Prohibited',
      topic: 'Maneuvers',
      difficulty: 'critical',
      question: 'Inverted spins are prohibited in the T-6A.',
      correctAnswer: true,
      explanation: 'TRUE. Inverted spins and inverted stalls are prohibited maneuvers.',
      limitation: true
    },
    {
      id: 'tf-2',
      category: 'Fuel',
      topic: 'Limitations',
      difficulty: 'high',
      question: 'Aerobatics are permitted with greater than 50 pounds fuel imbalance.',
      correctAnswer: false,
      explanation: 'FALSE. Aerobatic maneuvers, spins, or stalls with greater than 50 pounds fuel imbalance are prohibited.',
      limitation: true
    },
    {
      id: 'tf-3',
      category: 'Propulsion',
      topic: 'Engine',
      difficulty: 'medium',
      question: 'The PMU automatically limits torque to 100% during normal operations.',
      correctAnswer: true,
      explanation: 'TRUE. The Power Management Unit (PMU) provides automatic torque limiting to 100%.',
      limitation: false
    },
    {
      id: 'tf-4',
      category: 'Electrical',
      topic: 'Systems',
      difficulty: 'medium',
      question: 'The T-6A has a dual generator system for redundancy.',
      correctAnswer: false,
      explanation: 'FALSE. The T-6A has a single engine-driven generator. The battery provides backup electrical power.',
      limitation: false
    },
    {
      id: 'tf-5',
      category: 'Spins',
      topic: 'Limitations',
      difficulty: 'critical',
      question: 'Spins are permitted between 10,000 and 22,000 feet pressure altitude.',
      correctAnswer: true,
      explanation: 'TRUE. Spins below 10,000 ft PA or above 22,000 ft PA are prohibited.',
      limitation: true
    },
    {
      id: 'tf-6',
      category: 'Airspeed',
      topic: 'Limitations',
      difficulty: 'high',
      question: 'Full rudder deflection above 150 KIAS will exceed rudder control system limits.',
      correctAnswer: true,
      explanation: 'TRUE. Full rudder deflection above 150 KIAS will exceed the limits of the rudder control system.',
      limitation: true
    },
    {
      id: 'tf-7',
      category: 'OBOGS',
      topic: 'Systems',
      difficulty: 'medium',
      question: 'The OBOGS system provides unlimited oxygen supply as long as the engine is running.',
      correctAnswer: true,
      explanation: 'TRUE. OBOGS generates oxygen from engine bleed air, providing continuous oxygen as long as the engine operates.',
      limitation: false
    },
    {
      id: 'tf-8',
      category: 'Propulsion',
      topic: 'Engine',
      difficulty: 'high',
      question: 'Stabilized ground operations between 62% and 80% Np should be avoided.',
      correctAnswer: true,
      explanation: 'TRUE. Avoid stabilized ground operations from 62 to 80% Np due to resonance concerns.',
      limitation: true
    },
  ],

  // REORDER/SEQUENCE QUESTIONS
  reorderSequence: [
    {
      id: 'seq-1',
      category: 'Emergency',
      topic: 'Boldface',
      difficulty: 'critical',
      question: 'Emergency Engine Shutdown on the Ground - Order the steps correctly:',
      correctOrder: [
        'PCL - OFF',
        'FIREWALL SHUTOFF HANDLE - PULL'
      ],
      explanation: 'This is the boldface procedure for emergency engine shutdown on the ground.',
      limitation: false
    },
    {
      id: 'seq-2',
      category: 'Emergency',
      topic: 'Boldface',
      difficulty: 'critical',
      question: 'Fire In Flight (if fire confirmed) - Order the steps correctly:',
      correctOrder: [
        'PCL - OFF',
        'FIREWALL SHUTOFF HANDLE - PULL',
        'OBOGS SUPPLY LEVER - OFF (BOTH)',
        'DESCENT BELOW 10,000 FEET MSL - INITIATE',
        'EMER LDG GR HANDLE - PULL (AS REQUIRED)'
      ],
      explanation: 'Critical boldface procedure for confirmed in-flight fire.',
      limitation: false
    },
    {
      id: 'seq-3',
      category: 'Emergency',
      topic: 'Boldface',
      difficulty: 'critical',
      question: 'OBOGS Failure - Order the steps correctly:',
      correctOrder: [
        'OBOGS SUPPLY LEVER - OFF (BOTH)',
        'BOS PUSH MAN - PRESS ON',
        'GREEN RING - PULL (AS REQUIRED)',
        'DESCENT BELOW 10,000 FEET MSL - INITIATE',
        'ALTITUDE - CHECK'
      ],
      explanation: 'Boldface for OBOGS failure, overtemp, physiological symptoms, or OXY CRIT annunciator.',
      limitation: false
    },
    {
      id: 'seq-4',
      category: 'Normal',
      topic: 'Procedures',
      difficulty: 'medium',
      question: 'Engine Start Sequence - Order the steps correctly:',
      correctOrder: [
        'Parking brake - SET',
        'PCL - OFF',
        'Battery switch - ON',
        'Inverter - ON',
        'Fuel boost pump - CHECK ON',
        'PCL - IDLE',
        'Monitor engine instruments'
      ],
      explanation: 'Normal engine start procedure sequence.',
      limitation: false
    },
    {
      id: 'seq-5',
      category: 'Emergency',
      topic: 'Boldface',
      difficulty: 'critical',
      question: 'Inadvertent Departure From Controlled Flight - Order the steps correctly:',
      correctOrder: [
        'PCL - IDLE',
        'CONTROLS - NEUTRAL',
        'AIRSPEED - 110 KNOTS (MINIMUM)',
        'PCL - OFF'
      ],
      explanation: 'Boldface procedure for recovering from inadvertent departure from controlled flight.',
      limitation: false
    },
  ],

  // MATCH ITEMS QUESTIONS
  matchItems: [
    {
      id: 'match-1',
      category: 'Propulsion',
      topic: 'Limitations',
      difficulty: 'high',
      question: 'Match the engine parameter to its maximum limit:',
      pairs: [
        { left: 'Takeoff Torque', right: '100%' },
        { left: 'ITT Takeoff', right: '820°C' },
        { left: 'Oil Pressure Max', right: '200 PSI' },
        { left: 'Oil Temp Max', right: '105°C' }
      ],
      explanation: 'Key engine operating limits that must be memorized.',
      limitation: true
    },
    {
      id: 'match-2',
      category: 'Airspeed',
      topic: 'Limitations',
      difficulty: 'high',
      question: 'Match the configuration to its maximum airspeed:',
      pairs: [
        { left: 'Gear/Flaps Extended', right: '150 KIAS' },
        { left: 'Clean Configuration', right: '316 KIAS' },
        { left: 'Full Rudder Deflection', right: '150 KIAS' },
        { left: 'Zoom/Glide Speed', right: '125 KIAS' }
      ],
      explanation: 'Critical airspeed limitations for various configurations.',
      limitation: true
    },
    {
      id: 'match-3',
      category: 'Wind Limits',
      topic: 'Limitations',
      difficulty: 'medium',
      question: 'Match the runway condition to maximum crosswind:',
      pairs: [
        { left: 'Dry Runway', right: '25 knots' },
        { left: 'Wet Runway', right: '10 knots' },
        { left: 'Icy Runway', right: '5 knots' },
        { left: 'Touch-and-Go', right: '20 knots' }
      ],
      explanation: 'Crosswind limitations vary based on runway conditions and operation type.',
      limitation: true
    },
    {
      id: 'match-4',
      category: 'Systems',
      topic: 'Aircraft Systems',
      difficulty: 'medium',
      question: 'Match the system to its primary function:',
      pairs: [
        { left: 'PMU', right: 'Power Management' },
        { left: 'OBOGS', right: 'Oxygen Generation' },
        { left: 'ECS', right: 'Cabin Pressurization' },
        { left: 'PCL', right: 'Power Control' }
      ],
      explanation: 'Understanding primary system functions is essential for operations.',
      limitation: false
    },
    {
      id: 'match-5',
      category: 'G Limits',
      topic: 'Limitations',
      difficulty: 'high',
      question: 'Match the configuration to its G limits:',
      pairs: [
        { left: 'Symmetric Clean', right: '-3.5 to +7.0' },
        { left: 'Symmetric Gear/Flaps', right: '0 to +2.5' },
        { left: 'Asymmetric Clean', right: '-1.0 to +4.7' },
        { left: 'Asymmetric Gear/Flaps', right: '0 to +2.0' }
      ],
      explanation: 'G limits vary significantly based on configuration and loading.',
      limitation: true
    },
  ],

  // FLASHCARD QUESTIONS (already have these, keeping for compatibility)
  flashcards: [
    {
      id: 'flash-1',
      category: 'Emergency',
      difficulty: 'critical',
      type: 'boldface',
      question: 'Emergency Engine Shutdown on the Ground - Complete the procedure',
      answer: '1. PCL - OFF\n2. FIREWALL SHUTOFF HANDLE - PULL',
      shortAnswer: 'PCL OFF, FIREWALL SHUTOFF HANDLE PULL'
    },
    // ... existing flashcard data
  ]
};

// Topic categories for filtering
export const topicCategories = {
  systems: ['Propulsion', 'Electrical', 'Hydraulics', 'Fuel', 'OBOGS', 'ECS'],
  limitations: ['Airspeed', 'G Limits', 'Wind Limits', 'Runway', 'Spins', 'Temperature'],
  procedures: ['Emergency', 'Normal', 'Boldface'],
  knowledge: ['Aerodynamics', 'Performance', 'Instruments', 'Avionics']
};

// Get all questions of a specific type
export function getQuestionsByType(type) {
  return questionDatabase[type] || [];
}

// Get questions filtered by category
export function getQuestionsByCategory(type, category) {
  const questions = questionDatabase[type] || [];
  return questions.filter(q => q.category === category);
}

// Get only limitation questions
export function getLimitationQuestions() {
  const allQuestions = [];
  Object.keys(questionDatabase).forEach(type => {
    const questions = questionDatabase[type].filter(q => q.limitation === true);
    allQuestions.push(...questions.map(q => ({ ...q, questionType: type })));
  });
  return allQuestions;
}

// Get questions by difficulty
export function getQuestionsByDifficulty(difficulty) {
  const allQuestions = [];
  Object.keys(questionDatabase).forEach(type => {
    const questions = questionDatabase[type].filter(q => q.difficulty === difficulty);
    allQuestions.push(...questions.map(q => ({ ...q, questionType: type })));
  });
  return allQuestions;
}
