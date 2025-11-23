// T-6A Aerospace Physiology Study Guide Questions
// Based on T6_AP_SG_Mar21.pdf
// Questions derived from learning objectives and sample behaviors

// Question types are determined by the first word of the objective:
// - "Identify" -> Multiple Choice or Matching
// - "Describe" -> Active Recall / Essay
// - "Explain" -> Active Recall / Essay
// - "List" -> Reorder Sequence or Active Recall
// - "Define" -> Multiple Choice or Active Recall
// - "Recognize" -> Multiple Choice or True/False
// - "Demonstrate" -> Scenario-based Multiple Choice
// - "Apply" -> Scenario-based Multiple Choice

export const aerospacePhysiologyTopics = {
  atmosphere: "Atmosphere",
  respiration: "Respiration and Hypoxia",
  altitude: "Altitude Physiology",
  trapped_gas: "Trapped Gas",
  decompression: "Decompression Sickness",
  thermal_stress: "Thermal Stress",
  vision: "Vision and Visual Illusions",
  spatial_disorientation: "Spatial Disorientation",
  acceleration: "Acceleration and G-Forces",
  fatigue: "Fatigue and Stress",
  oxygen_equipment: "Oxygen Equipment",
  pressure_breathing: "Pressure Breathing"
};

export const aerospacePhysiologyQuestions = {
  // MULTIPLE CHOICE QUESTIONS
  multipleChoice: [
    // ATMOSPHERE
    {
      id: "ap-mc-1",
      category: "Atmosphere",
      topic: "Atmospheric Composition",
      difficulty: "medium",
      question: "What percentage of the atmosphere is oxygen at sea level?",
      options: ["16%", "21%", "25%", "78%"],
      correctAnswer: 1,
      explanation: "Oxygen makes up approximately 21% of the atmosphere at sea level. Nitrogen comprises 78%, and other gases make up the remaining 1%. This percentage remains constant with altitude, but the partial pressure of oxygen decreases as you climb, which is why supplemental oxygen is required at higher altitudes.",
      limitation: false,
      objectiveType: "identify", // The learning objective starts with "Identify"
      learningObjective: "Identify the composition of the atmosphere"
    },
    {
      id: "ap-mc-2",
      category: "Atmosphere",
      topic: "Atmospheric Pressure",
      difficulty: "high",
      question: "At what altitude does atmospheric pressure drop to approximately 50% of sea level pressure?",
      options: ["10,000 feet", "18,000 feet", "25,000 feet", "35,000 feet"],
      correctAnswer: 1,
      explanation: "At 18,000 feet MSL, atmospheric pressure is approximately 50% of sea level pressure (7.4 psi vs 14.7 psi). This is significant because it means half the oxygen molecules are available, requiring supplemental oxygen for normal physiological function. This is why 18,000 feet is a critical altitude in aviation physiology.",
      limitation: true,
      objectiveType: "identify",
      learningObjective: "Identify pressure changes with altitude"
    },

    // RESPIRATION AND HYPOXIA
    {
      id: "ap-mc-3",
      category: "Respiration",
      topic: "Hypoxia Types",
      difficulty: "critical",
      question: "Which type of hypoxia is most common in aviation and is caused by insufficient oxygen in the air?",
      options: ["Hypemic hypoxia", "Histotoxic hypoxia", "Hypoxic hypoxia", "Stagnant hypoxia"],
      correctAnswer: 2,
      explanation: "Hypoxic hypoxia (altitude hypoxia) is the most common type in aviation. It occurs when there is insufficient oxygen in the air being breathed, typically at high altitudes. Other types include: Hypemic (blood can't carry oxygen, e.g., CO poisoning), Histotoxic (cells can't use oxygen, e.g., alcohol/drugs), and Stagnant (poor circulation). Recognition of symptoms is critical for flight safety.",
      limitation: false,
      objectiveType: "identify",
      learningObjective: "Identify the four types of hypoxia"
    },
    {
      id: "ap-mc-4",
      category: "Respiration",
      topic: "Hypoxia Symptoms",
      difficulty: "critical",
      question: "What is the most dangerous aspect of hypoxia for pilots?",
      options: [
        "It causes immediate unconsciousness",
        "It causes severe pain",
        "It impairs judgment before the pilot recognizes symptoms",
        "It only affects vision"
      ],
      correctAnswer: 2,
      explanation: "The most dangerous aspect of hypoxia is that it impairs judgment and decision-making before the pilot recognizes they are affected. This is called 'insidious onset.' Symptoms may include euphoria, decreased performance, impaired judgment, and difficulty concentrating. By the time symptoms are recognized, cognitive ability may already be compromised. This is why recognizing early signs and taking immediate action (100% oxygen, descend) is critical.",
      limitation: false,
      objectiveType: "recognize",
      learningObjective: "Recognize the insidious nature of hypoxia"
    },
    {
      id: "ap-mc-5",
      category: "Respiration",
      topic: "Time of Useful Consciousness",
      difficulty: "high",
      question: "What is the Time of Useful Consciousness (TUC) at 25,000 feet without supplemental oxygen?",
      options: ["30 seconds", "1-2 minutes", "3-5 minutes", "10-15 minutes"],
      correctAnswer: 2,
      explanation: "At 25,000 feet, the TUC is approximately 3-5 minutes. TUC is the time period from the interruption of oxygen supply until the pilot is unable to perform tasks requiring normal cognitive function. This varies by altitude: 18,000 ft = 20-30 min, 25,000 ft = 3-5 min, 30,000 ft = 1-2 min, 40,000 ft = 15-20 sec. Understanding TUC is critical for emergency response to oxygen system failures.",
      limitation: true,
      objectiveType: "identify",
      learningObjective: "Identify Time of Useful Consciousness at various altitudes"
    },

    // TRAPPED GAS
    {
      id: "ap-mc-6",
      category: "Trapped Gas",
      topic: "Boyle's Law",
      difficulty: "medium",
      question: "According to Boyle's Law, when you climb from sea level to 18,000 feet, trapped gas in body cavities will:",
      options: [
        "Decrease to 50% of original volume",
        "Stay the same volume",
        "Expand to approximately double the volume",
        "Expand to four times the volume"
      ],
      correctAnswer: 2,
      explanation: "According to Boyle's Law (P1V1 = P2V2), when pressure decreases, volume increases proportionally. At 18,000 feet where pressure is 50% of sea level, trapped gas will expand to approximately twice its original volume. This expansion can cause pain in sinuses, ears, teeth, and gastrointestinal tract. This is why clearing ears during climb and avoiding carbonated drinks before flight is important.",
      limitation: false,
      objectiveType: "apply",
      learningObjective: "Apply Boyle's Law to aviation scenarios"
    },

    // DECOMPRESSION SICKNESS
    {
      id: "ap-mc-7",
      category: "Decompression",
      topic: "Decompression Sickness",
      difficulty: "high",
      question: "What is the minimum altitude at which decompression sickness (DCS) can occur?",
      options: ["10,000 feet", "18,000 feet", "25,000 feet", "30,000 feet"],
      correctAnswer: 1,
      explanation: "Decompression sickness can occur at altitudes as low as 18,000 feet, but is more common above 25,000 feet. DCS occurs when nitrogen dissolved in body tissues forms bubbles as pressure decreases. Symptoms include joint pain ('the bends'), chest pain ('the chokes'), skin symptoms, and neurological issues. Risk factors include: SCUBA diving within 24 hours of flight, age, obesity, previous injury, and rapid decompression.",
      limitation: true,
      objectiveType: "identify",
      learningObjective: "Identify conditions that lead to decompression sickness"
    },

    // SPATIAL DISORIENTATION
    {
      id: "ap-mc-8",
      category: "Spatial Disorientation",
      topic: "Vestibular System",
      difficulty: "high",
      question: "What is the primary cause of spatial disorientation?",
      options: [
        "Equipment malfunction",
        "Conflicting information between vestibular system and instruments",
        "Lack of pilot experience",
        "Poor visibility only"
      ],
      correctAnswer: 1,
      explanation: "Spatial disorientation occurs when the vestibular system (inner ear) sends false signals about the aircraft's attitude and motion, conflicting with what instruments show. The vestibular system evolved for slow movements on the ground, not for the speeds and accelerations of flight. In IMC or at night, you must trust your instruments. The famous saying: 'Your body lies, your instruments don't.' Types include: the leans, graveyard spiral, Coriolis illusion.",
      limitation: false,
      objectiveType: "explain",
      learningObjective: "Explain the causes of spatial disorientation"
    },

    // ACCELERATION AND G-FORCES
    {
      id: "ap-mc-9",
      category: "Acceleration",
      topic: "G-Induced Loss of Consciousness",
      difficulty: "critical",
      question: "What is G-LOC (G-induced Loss of Consciousness)?",
      options: [
        "Loss of consciousness due to hypoxia",
        "Loss of consciousness due to blood pooling away from the brain during high G forces",
        "Loss of consciousness due to hyperventilation",
        "Loss of consciousness due to carbon monoxide"
      ],
      correctAnswer: 1,
      explanation: "G-LOC occurs when sustained positive G forces cause blood to pool in the lower body, reducing blood flow to the brain and causing loss of consciousness. Onset can be rapid (4-6 seconds at high G). Warning signs include: grayout (loss of peripheral vision), blackout (complete loss of vision, consciousness maintained), then G-LOC (complete loss of consciousness). Prevention: proper AGSM (Anti-G Straining Maneuver), G-suit, physical fitness, and recognizing early symptoms.",
      limitation: false,
      objectiveType: "define",
      learningObjective: "Define G-LOC and its prevention"
    },

    // VISION
    {
      id: "ap-mc-10",
      category: "Vision",
      topic: "Night Vision",
      difficulty: "medium",
      question: "How long does it take for eyes to fully adapt to darkness?",
      options: ["5-10 minutes", "15-20 minutes", "30 minutes", "45 minutes to 1 hour"],
      correctAnswer: 2,
      explanation: "Full dark adaptation takes approximately 30 minutes, though cone adaptation occurs in 5-10 minutes. Rod cells (responsible for night vision) require the full 30 minutes. Bright light exposure can instantly ruin dark adaptation. Tips for maintaining night vision: use red cockpit lighting, avoid bright lights, look slightly off-center of objects at night (rods are more numerous off-center), and allow adequate adaptation time before night flight.",
      limitation: false,
      objectiveType: "identify",
      learningObjective: "Identify factors affecting night vision"
    }
  ],

  // TRUE/FALSE QUESTIONS
  trueFalse: [
    {
      id: "ap-tf-1",
      category: "Respiration",
      topic: "Hyperventilation",
      difficulty: "high",
      question: "Hyperventilation symptoms are similar to hypoxia symptoms and include dizziness, tingling, and visual disturbances.",
      correctAnswer: true,
      explanation: "TRUE. Hyperventilation (excessive breathing rate) causes too much CO2 to be expelled from the blood, leading to symptoms that mimic hypoxia: dizziness, lightheadedness, tingling in extremities, visual disturbances, and anxiety. The key difference: hyperventilation is often associated with rapid breathing and anxiety, while hypoxia is associated with altitude. Treatment for hyperventilation: slow breathing rate, breathe into a bag if available, or talk yourself through calming down.",
      limitation: false,
      objectiveType: "recognize",
      learningObjective: "Recognize symptoms of hyperventilation"
    },
    {
      id: "ap-tf-2",
      category: "Altitude",
      topic: "Oxygen Requirements",
      difficulty: "medium",
      question: "Supplemental oxygen is required by regulation for flights above 12,500 feet MSL for more than 30 minutes.",
      correctAnswer: true,
      explanation: "TRUE. FAR 91.211 requires supplemental oxygen for crew above 12,500 feet MSL up to 14,000 feet MSL after 30 minutes, and continuously above 14,000 feet MSL. Passengers must be provided oxygen above 15,000 feet MSL. However, physiological effects can begin as low as 5,000-8,000 feet, especially at night. Many pilots use supplemental oxygen above 10,000 feet for increased safety and performance.",
      limitation: true,
      objectiveType: "identify",
      learningObjective: "Identify regulatory oxygen requirements"
    },
    {
      id: "ap-tf-3",
      category: "Decompression",
      topic: "SCUBA Diving",
      difficulty: "high",
      question: "You should wait at least 24 hours after SCUBA diving before flying to reduce the risk of decompression sickness.",
      correctAnswer: true,
      explanation: "TRUE. The recommended waiting period is 12 hours for non-decompression dives and 24 hours for decompression dives or multiple dives. SCUBA diving causes nitrogen to dissolve in body tissues. Flying too soon after diving exposes you to lower pressure, which can cause nitrogen bubbles to form (decompression sickness). Symptoms include joint pain, neurological problems, and potentially life-threatening complications. Always wait the recommended time.",
      limitation: true,
      objectiveType: "apply",
      learningObjective: "Apply decompression sickness prevention guidelines"
    },
    {
      id: "ap-tf-4",
      category: "Vision",
      topic: "Empty Field Myopia",
      difficulty: "medium",
      question: "Empty field myopia occurs when there are no visual references, causing the eyes to focus at approximately 10-30 feet.",
      correctAnswer: true,
      explanation: "TRUE. Empty field myopia is a condition where, in the absence of visual references (such as flying in haze, clouds, or at night over water), the eyes naturally relax and focus at a close distance (10-30 feet). This can prevent you from seeing other aircraft or terrain. Prevention: frequently scan the entire visual field, use instruments, and actively focus at different distances to keep your eyes actively accommodating.",
      limitation: false,
      objectiveType: "define",
      learningObjective: "Define empty field myopia"
    },
    {
      id: "ap-tf-5",
      category: "Fatigue",
      topic: "Acute Fatigue",
      difficulty: "medium",
      question: "Acute fatigue is a short-term condition that can be remedied by adequate rest.",
      correctAnswer: true,
      explanation: "TRUE. Acute fatigue results from insufficient sleep, physical exertion, or stress and can be corrected with proper rest. In contrast, chronic fatigue accumulates over time and requires extended rest periods. Symptoms of acute fatigue include: reduced alertness, impaired judgment, slower reaction time, and difficulty concentrating. As pilot-in-command, you must assess your fitness for flight. If fatigued, delay the flight - 'I'm Safe' checklist includes Fatigue.",
      limitation: false,
      objectiveType: "define",
      learningObjective: "Define types of fatigue"
    }
  ],

  // REORDER SEQUENCE QUESTIONS (for procedures/sequences)
  reorderSequence: [
    {
      id: "ap-rs-1",
      category: "Respiration",
      topic: "Hypoxia Response",
      difficulty: "critical",
      question: "Arrange the steps for responding to suspected hypoxia in the correct order:",
      correctSequence: [
        "Recognize symptoms (confusion, euphoria, impaired judgment)",
        "Immediately select 100% oxygen and check flow",
        "Descend to a lower altitude (below 10,000 feet if possible)",
        "Check oxygen equipment for proper operation",
        "Monitor symptoms and seek medical attention if necessary"
      ],
      explanation: "The immediate response to hypoxia is critical: (1) Recognize you have a problem - this is the hardest step due to impaired judgment, (2) Get 100% oxygen immediately, (3) Descend to a safe altitude, (4) Verify equipment is working, (5) Monitor recovery. Time is critical - at high altitudes you may only have seconds to respond. This is why recognizing your personal hypoxia symptoms (from altitude chamber training) is so important.",
      limitation: false,
      objectiveType: "demonstrate",
      learningObjective: "Demonstrate correct response to hypoxia"
    },
    {
      id: "ap-rs-2",
      category: "Vision",
      topic: "Night Vision Adaptation",
      difficulty: "medium",
      question: "Arrange the steps for optimizing night vision adaptation before a night flight:",
      correctSequence: [
        "Avoid bright lights for 30 minutes prior to flight",
        "Use red cockpit lighting during preflight",
        "Allow eyes to fully adapt (30 minutes) in dim environment",
        "Use off-center viewing technique to maximize rod cell usage",
        "Avoid smoking and excessive oxygen use which impair night vision"
      ],
      explanation: "Proper night vision preparation is essential: (1) Avoid bright lights 30 min before flight, (2) Use red lights (least disruptive to dark adaptation), (3) Allow full 30 minutes for adaptation, (4) Use off-center viewing (rods are concentrated off-center), (5) Avoid smoking and hypoxia which reduce night vision capability. Remember: bright light exposure will instantly reset the adaptation process.",
      limitation: false,
      objectiveType: "list",
      learningObjective: "List procedures for night vision adaptation"
    }
  ],

  // MATCH ITEMS QUESTIONS
  matchItems: [
    {
      id: "ap-mi-1",
      category: "Respiration",
      topic: "Hypoxia Types",
      difficulty: "high",
      question: "Match each type of hypoxia with its cause:",
      leftColumn: [
        "Hypoxic Hypoxia",
        "Hypemic Hypoxia",
        "Stagnant Hypoxia",
        "Histotoxic Hypoxia"
      ],
      rightColumn: [
        "Insufficient oxygen in the air (altitude)",
        "Blood cannot carry oxygen (CO poisoning, anemia)",
        "Poor blood circulation (G-forces, cold)",
        "Cells cannot use oxygen (alcohol, drugs, cyanide)"
      ],
      correctMatches: [
        { left: 0, right: 0 },
        { left: 1, right: 1 },
        { left: 2, right: 2 },
        { left: 3, right: 3 }
      ],
      explanation: "Understanding the four types of hypoxia and their causes is critical: HYPOXIC (most common in aviation - altitude), HYPEMIC (blood problem - CO, anemia), STAGNANT (circulation problem - G-forces), HISTOTOXIC (cellular problem - alcohol/drugs). Each type requires different recognition and treatment. All impair oxygen delivery to tissues but through different mechanisms.",
      limitation: false,
      objectiveType: "identify",
      learningObjective: "Identify and match types of hypoxia to their causes"
    },
    {
      id: "ap-mi-2",
      category: "Vision",
      topic: "Visual Illusions",
      difficulty: "high",
      question: "Match each visual illusion with its description:",
      leftColumn: [
        "Autokinesis",
        "False Horizon",
        "Black Hole Approach",
        "Runway Width Illusion"
      ],
      rightColumn: [
        "Stationary light appears to move after prolonged staring",
        "Mistaking cloud formations or terrain for actual horizon",
        "Lack of visual references causes steep approach perception",
        "Wider runway appears closer; narrower appears farther"
      ],
      correctMatches: [
        { left: 0, right: 0 },
        { left: 1, right: 1 },
        { left: 2, right: 2 },
        { left: 3, right: 3 }
      ],
      explanation: "Visual illusions are dangerous, especially at night or in low visibility: AUTOKINESIS - staring at a single light makes it appear to move; FALSE HORIZON - misidentifying the horizon; BLACK HOLE APPROACH - featureless terrain causes tendency to fly lower than normal approach; RUNWAY WIDTH - narrow runways make you think you're higher (leading to low approach), wide runways make you think you're lower (leading to high approach). Prevention: use instruments, VASI/PAPI, and proper scan technique.",
      limitation: false,
      objectiveType: "identify",
      learningObjective: "Identify visual illusions and their characteristics"
    },
    {
      id: "ap-mi-3",
      category: "Altitude",
      topic: "Atmospheric Zones",
      difficulty: "medium",
      question: "Match each atmospheric zone with its altitude range:",
      leftColumn: [
        "Physiological Zone",
        "Deficiency Zone",
        "Space Equivalent Zone"
      ],
      rightColumn: [
        "0 - 10,000 feet (minimal physiological effects)",
        "10,000 - 50,000 feet (supplemental oxygen required)",
        "Above 50,000 feet (pressure suit required)"
      ],
      correctMatches: [
        { left: 0, right: 0 },
        { left: 1, right: 1 },
        { left: 2, right: 2 }
      ],
      explanation: "The atmosphere is divided into physiological zones: PHYSIOLOGICAL ZONE (0-10,000 ft) - normal function with minimal effects; DEFICIENCY ZONE (10,000-50,000 ft) - supplemental oxygen required, pressure breathing above 40,000 ft; SPACE EQUIVALENT ZONE (above 50,000 ft) - pressure suit required, blood boils at body temperature. Understanding these zones helps pilots recognize when additional life support equipment is necessary.",
      limitation: false,
      objectiveType: "identify",
      learningObjective: "Identify atmospheric zones and their characteristics"
    }
  ]
};

// Helper function to get all aerospace physiology questions
export function getAllAerospacePhysiologyQuestions() {
  return [
    ...aerospacePhysiologyQuestions.multipleChoice,
    ...aerospacePhysiologyQuestions.trueFalse,
    ...aerospacePhysiologyQuestions.reorderSequence,
    ...aerospacePhysiologyQuestions.matchItems
  ];
}

// Helper function to filter questions by topic
export function getQuestionsByTopic(topic) {
  const allQuestions = getAllAerospacePhysiologyQuestions();
  return allQuestions.filter(q => q.category === topic);
}

// Helper function to filter questions by objective type
export function getQuestionsByObjectiveType(objectiveType) {
  const allQuestions = getAllAerospacePhysiologyQuestions();
  return allQuestions.filter(q => q.objectiveType === objectiveType);
}

// Helper function to get questions by difficulty
export function getQuestionsByDifficulty(difficulty) {
  const allQuestions = getAllAerospacePhysiologyQuestions();
  return allQuestions.filter(q => q.difficulty === difficulty);
}
