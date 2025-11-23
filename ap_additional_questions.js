// Additional Aerospace Physiology Questions for T-6A Training
// Created to achieve 100% Sample of Behavior Coverage
// Questions ap-mc-063 through ap-mc-117 (55 questions)

const additionalAPQuestions = [
  // ========================================
  // AP101 - Introduction and Atmosphere (4 questions)
  // ========================================

  {
    id: "ap-mc-063",
    category: "Introduction and Atmosphere",
    topic: "Human Factors Definition",
    difficulty: "medium",
    question: "What is the definition of Human Factors according to the Civil Aviation Authority?",
    options: [
      "Human Factors is concerned to optimize the relationship between people and their activities, by the systematic application of human sciences, integrated within the framework of systems engineering",
      "Human Factors is the study of how humans interact with machines in aviation",
      "Human Factors is the medical field that deals with pilot health and fitness",
      "Human Factors is the analysis of cockpit ergonomics and equipment design"
    ],
    correctAnswer: 0,
    explanation: "The Civil Aviation Authority defines Human Factors as concerned to optimize the relationship between people and their activities, by the systematic application of human sciences, integrated within the framework of systems engineering. Human factors in aviation has its roots in the earliest days of aviation and accounts for 60-80% of aircraft accidents.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Know basic information about the science of HF and its role in aviation"
  },

  {
    id: "ap-mc-064",
    category: "Introduction and Atmosphere",
    topic: "Atmospheric Functions",
    difficulty: "medium",
    question: "Which of the following is NOT a primary function of Earth's atmosphere?",
    options: [
      "Provides oxygen essential for life",
      "Absorbs harmful electromagnetic radiation",
      "Creates artificial gravity for aircraft",
      "Contains precipitation to maintain temperature and climate"
    ],
    correctAnswer: 2,
    explanation: "The atmosphere provides oxygen essential for life, absorbs harmful electromagnetic radiation, shields from solar wind and space debris, and contains precipitation to maintain temperature and climate. It does not create artificial gravity - aircraft are bound to Earth by natural gravity.",
    limitation: false,
    objectiveType: "recognize",
    learningObjective: "Know the characteristics of the earth's atmosphere"
  },

  {
    id: "ap-mc-065",
    category: "Introduction and Atmosphere",
    topic: "Pressure Measurement Units",
    difficulty: "medium",
    question: "Atmospheric pressure can be measured in all of the following units EXCEPT:",
    options: [
      "Pounds per square inch (psi)",
      "Millimeters of mercury (mmHg)",
      "Inches of mercury (inHg)",
      "Celsius per thousand feet (°C/1000')"
    ],
    correctAnswer: 3,
    explanation: "Atmospheric pressure is measured in psi, mmHg, or inHg. Celsius per thousand feet is a unit for temperature lapse rate, not pressure. Atmospheric pressure readings vary daily depending on changing surface temperatures, humidity, and high/low pressure weather fronts.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Know the characteristics of the earth's atmosphere"
  },

  {
    id: "ap-mc-066",
    category: "Introduction and Atmosphere",
    topic: "U.S. Standard Atmosphere",
    difficulty: "medium",
    question: "What are the standard pressure and temperature values at sea level for the U.S. Standard Atmosphere?",
    options: [
      "+15°C and 760 mmHg (29.92 inHg)",
      "0°C and 760 mmHg (29.92 inHg)",
      "+15°C and 380 mmHg (14.96 inHg)",
      "+20°C and 760 mmHg (29.92 inHg)"
    ],
    correctAnswer: 0,
    explanation: "The U.S. Standard Atmosphere was computed by taking average pressure and temperature readings for a year at mid-latitude locations. At sea level, these were determined to be +15°C and 760 mmHg (29.92 inHg) pressure. Pressure altimeters sense atmospheric pressure and convert it to feet above mean sea level based on these standards.",
    limitation: false,
    objectiveType: "recognize",
    learningObjective: "Know the characteristics of the earth's atmosphere"
  },

  // ========================================
  // AP102 - Respiration and Circulation (2 questions)
  // ========================================

  {
    id: "ap-mc-067",
    category: "Respiration and Circulation",
    topic: "Respiratory System Structures",
    difficulty: "medium",
    question: "What is the primary function of the alveoli in the respiratory system?",
    options: [
      "To filter and warm inspired air before it reaches the lungs",
      "To allow oxygen to move from air to blood and carbon dioxide from blood to air",
      "To produce mucus that traps foreign particles",
      "To regulate the rate and depth of breathing"
    ],
    correctAnswer: 1,
    explanation: "Alveoli are tiny air sacs in the lungs at the end of the bronchioles. Their walls have an excellent blood supply provided by capillaries. Gas exchange between the respiratory and circulatory systems occurs at the alveolar-capillary interface. Oxygen and carbon dioxide move between air and blood by simple diffusion from an area of high to low partial pressure.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Know the structures and functions of the respiratory system"
  },

  {
    id: "ap-mc-068",
    category: "Respiration and Circulation",
    topic: "Circulatory System Structures",
    difficulty: "medium",
    question: "The heart functions as how many pumps, and what are their purposes?",
    options: [
      "One pump to circulate blood throughout the entire body",
      "Two pumps in series - one for pulmonary circulation and one for systemic circulation",
      "Three pumps - one for the brain, one for the lungs, and one for the body",
      "Four pumps corresponding to the four chambers of the heart"
    ],
    correctAnswer: 1,
    explanation: "The heart consists of four chambers but functions as two pumps in series - one to propel blood through the lungs for gas exchange (pulmonary circulation) and one to drive blood to all other tissues of the body (systemic circulation). Unidirectional flow is achieved by an arrangement of flap-like valves.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Know the structures and functions of the circulatory system"
  },

  // ========================================
  // AP103 - Altitude Threats (10 questions)
  // ========================================

  {
    id: "ap-mc-069",
    category: "Altitude Threats",
    topic: "Hypoxia Onset Characteristics",
    difficulty: "critical",
    question: "What is the most dangerous characteristic of hypoxia onset?",
    options: [
      "It causes immediate and severe pain",
      "It has an insidious onset without causing discomfort",
      "It always leads to immediate unconsciousness",
      "It creates a distinctive metallic taste in the mouth"
    ],
    correctAnswer: 1,
    explanation: "Hypoxia's most dangerous characteristic is its insidious onset. Hypoxia symptoms do not normally cause discomfort and many individuals perceive their symptoms as quite pleasant. During a slow decompression, hypoxia has a slow onset and symptoms may be well developed before recognition. In some cases, individuals may become impaired to the point of no longer being able to recover on their own.",
    limitation: false,
    objectiveType: "recognize",
    learningObjective: "Know the characteristics of hypoxia"
  },

  {
    id: "ap-mc-070",
    category: "Altitude Threats",
    topic: "Factors Influencing Hypoxia",
    difficulty: "high",
    question: "Which of the following factors does NOT directly influence the development of hypoxic hypoxia?",
    options: [
      "Altitude of the cabin and time spent at altitude",
      "Rate of pressure change and individual physiology",
      "Physical activity level during flight",
      "The color of the aircraft exterior"
    ],
    correctAnswer: 3,
    explanation: "Factors influencing hypoxic hypoxia include: cabin altitude, time at altitude, rate of pressure change, individual tolerance (metabolic rate and acclimatization), physical activity (metabolic oxygen requirements increase several times during exercise), and lifestyle factors (tobacco use, poor sleep, alcohol, improper diet). Aircraft exterior color has no physiological effect on hypoxia development.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know the characteristics of hypoxia"
  },

  {
    id: "ap-mc-071",
    category: "Altitude Threats",
    topic: "Hypocapnia Signs and Symptoms",
    difficulty: "critical",
    question: "Which signs and symptoms are most often observed in hypocapnia?",
    options: [
      "Decreased rate of breathing, muscle relaxation, flushed skin, warmth",
      "Increased rate of breathing, muscle tightness/twitching, paleness, cold clammy skin",
      "Normal breathing, sharp chest pain, blue lips, confusion",
      "Slow shallow breathing, euphoria, pink skin, drowsiness"
    ],
    correctAnswer: 1,
    explanation: "Signs most often observed in hypocapnia are increased rate of breathing, muscle tightness and twitching, paleness, cold clammy skin, muscle spasms, rigidity and unconsciousness. Symptoms most often noted are dizziness, faintness, slight nausea, numbness, tingling or coolness and muscle tremors. The most effective prevention is to control rate and depth of breathing.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Know the characteristics of hypocapnia"
  },

  {
    id: "ap-mc-072",
    category: "Altitude Threats",
    topic: "Hypocapnia Treatment",
    difficulty: "critical",
    question: "What is the correct T-6 treatment procedure sequence for suspected hypocapnia?",
    options: [
      "Land immediately, then check oxygen connections",
      "Green Ring - Pull, Descend below 10,000 feet MSL, OBOGS OFF, normalize breathing rate",
      "Hyperventilate to increase oxygen, then descend",
      "Remove oxygen mask immediately, then breathe cabin air"
    ],
    correctAnswer: 1,
    explanation: "Since physiological symptoms (hypocapnia, hypoxia) may be confused or occur simultaneously, ALL physiological symptoms are treated the same. T-6 procedures: 1) Green Ring - Pull, 2) Descent below 10,000 feet MSL, 3) OBOGS SUPPLY LEVER - OFF, 4) Check emergency O2 hose, 5) Rate and depth of breathing - Normalize. This treats all physiological symptoms simultaneously without delay.",
    limitation: false,
    objectiveType: "memorize",
    learningObjective: "Know the characteristics of hypocapnia"
  },

  {
    id: "ap-mc-073",
    category: "Altitude Threats",
    topic: "Trapped Gas Cause",
    difficulty: "high",
    question: "What is the basic cause of all trapped gas disorders?",
    options: [
      "Boyle's Law - gas volume changes inversely with ambient pressure when temperature is constant",
      "Dalton's Law - partial pressures of gases change with altitude",
      "Henry's Law - gases come out of solution when pressure decreases",
      "The Ideal Gas Law - pressure increases with temperature"
    ],
    correctAnswer: 0,
    explanation: "Boyle's Law is the basic cause of trapped gas disorders. It states that volume of a gas is inversely proportional to ambient pressure when temperature remains constant. Changes in ambient pressure during flight result in gas expansion during ascent and contraction during descent. When expanding gas cannot escape or pressure cannot be relieved, the gas is 'trapped' causing pain and discomfort.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know the characteristics of trapped gas disorders"
  },

  {
    id: "ap-mc-074",
    category: "Altitude Threats",
    topic: "Trapped Gas Types",
    difficulty: "high",
    question: "Which of the following are the four main types of trapped gas disorders?",
    options: [
      "Hypoxia, hypocapnia, decompression sickness, nitrogen narcosis",
      "Middle ear block, sinus block, gastrointestinal pain, tooth pain (barodontalgia)",
      "Heart block, lung block, skin block, joint block",
      "Arterial gas, venous gas, tissue gas, cellular gas"
    ],
    correctAnswer: 1,
    explanation: "The four main trapped gas disorders are: 1) Middle ear block (barotitis media) affecting the middle ear cavity, 2) Sinus block affecting frontal and maxillary sinuses, 3) Gastrointestinal tract pain from gas expansion, and 4) Tooth pain (barodontalgia) from gas bubbles in fractures or under fillings. All result from Boyle's Law when gas cannot equalize with ambient pressure.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know the characteristics of trapped gas disorders"
  },

  {
    id: "ap-mc-075",
    category: "Altitude Threats",
    topic: "Trapped Gas Symptoms",
    difficulty: "high",
    question: "A pilot experiences severe pain in the upper teeth during descent. What is the most likely cause?",
    options: [
      "Hypoxic hypoxia affecting the jaw muscles",
      "Sinus block affecting the maxillary sinuses, which are located near the upper teeth",
      "Decompression sickness in the jaw joint",
      "Stagnant hypoxia in the dental nerves"
    ],
    correctAnswer: 1,
    explanation: "Blockage of ducts leading to the maxillary sinuses (located in the bones of the cheeks beneath the eyes) may be mistaken for upper tooth pain because of their proximity to the upper teeth. All of the upper teeth will be affected as opposed to one isolated tooth. This should be treated like any other sinus block using the Valsalva maneuver.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Know the characteristics of trapped gas disorders"
  },

  {
    id: "ap-mc-076",
    category: "Altitude Threats",
    topic: "DCS Corrective Actions",
    difficulty: "critical",
    question: "What are the immediate corrective actions for suspected decompression sickness?",
    options: [
      "Continue the mission at altitude while breathing 100% oxygen",
      "Immediate descent is necessary; descend below altitude of occurrence and land as soon as possible",
      "Perform vigorous exercise to increase circulation",
      "Ascend to a higher altitude to reduce nitrogen bubble size"
    ],
    correctAnswer: 1,
    explanation: "For any type of DCS, immediate descent is mandatory. Descent below the altitude of occurrence will usually decrease or resolve symptoms. Continued descent is required even if pain completely resolves on initial descent. Increasing the total barometric pressure on the body is the only effective means of eliminating DCS. Breathing 100% oxygen at altitude will not normally resolve the pain.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Know the characteristics of decompression sickness"
  },

  {
    id: "ap-mc-077",
    category: "Altitude Threats",
    topic: "SCUBA and Flying Risks",
    difficulty: "high",
    question: "Why is SCUBA diving before flying considered dangerous?",
    options: [
      "It causes immediate hypoxia symptoms",
      "Residual nitrogen in tissues from diving can evolve into bubbles when exposed to reduced pressure at altitude",
      "It reduces oxygen carrying capacity of red blood cells",
      "The physical exertion causes delayed fatigue during flight"
    ],
    correctAnswer: 1,
    explanation: "SCUBA diving before flying is dangerous because nitrogen absorbed into body tissues during the dive can come out of solution as bubbles when exposed to reduced atmospheric pressure at altitude. This can cause decompression sickness. According to DCS risk factors, repeated exposures occurring in rapid succession increase DCS incidence because some bubbles may remain from the previous exposure.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Know the characteristics of decompression sickness"
  },

  {
    id: "ap-mc-078",
    category: "Altitude Threats",
    topic: "DCS Treatment Methods",
    difficulty: "high",
    question: "What methods are used to treat decompression sickness after landing?",
    options: [
      "Hyperbaric chamber recompression therapy, breathing 100% oxygen, medical evaluation",
      "Ice packs, elevation, and aspirin",
      "Vigorous exercise and hydration only",
      "No treatment needed - symptoms always resolve on their own"
    ],
    correctAnswer: 0,
    explanation: "DCS treatment includes: immediate descent to increase barometric pressure, breathing 100% oxygen, landing as soon as possible, and post-flight hyperbaric chamber recompression therapy. The affected individual must be referred to a flight surgeon for medical evaluation. Delayed DCS may occur within 24 hours, so medical follow-up is essential. Increasing total barometric pressure is the only effective cure.",
    limitation: false,
    objectiveType: "list",
    learningObjective: "Know the characteristics of decompression sickness"
  },

  // ========================================
  // AP104 - Cabin Pressurization (2 questions)
  // ========================================

  {
    id: "ap-mc-079",
    category: "Cabin Pressurization",
    topic: "Pressurization Systems",
    difficulty: "medium",
    question: "Which type of pressurization system is commonly used in modern military aircraft?",
    options: [
      "Chemical oxygen generation only",
      "Bleed air from engine compressor sections",
      "Electric compressor-driven systems",
      "Liquid oxygen vaporization systems"
    ],
    correctAnswer: 1,
    explanation: "Modern military aircraft commonly use bleed air from engine compressor sections for cabin pressurization. This system takes compressed air from the engine, cools it, and regulates it to maintain desired cabin altitude. This protects against hypoxia and DCS by keeping the body below 25,000 feet cabin altitude under normal operations.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know how aircraft pressurization affects aircrew members"
  },

  {
    id: "ap-mc-080",
    category: "Cabin Pressurization",
    topic: "Rapid Decompression Procedures",
    difficulty: "critical",
    question: "What are the immediate procedures for dealing with rapid decompression in the T-6?",
    options: [
      "Maintain altitude and troubleshoot the pressurization system",
      "Green Ring - Pull, initiate descent below 10,000 feet MSL, follow BOLDFACE procedures",
      "Remove oxygen mask to conserve oxygen supply",
      "Continue the mission using emergency oxygen only"
    ],
    correctAnswer: 1,
    explanation: "Immediate procedures for rapid decompression include: 1) Green Ring - Pull (obtain 100% oxygen under pressure), 2) Descent below 10,000 feet MSL - INITIATE, 3) OBOGS SUPPLY LEVER - OFF, 4) Emergency O2 hose - Check, 5) Rate and depth of breathing - Normalize. Rapid decompression can reduce TUC up to 50%, making immediate action critical.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know how aircraft pressurization affects aircrew members"
  },

  // ========================================
  // AP105 - Vision (9 questions)
  // ========================================

  {
    id: "ap-mc-081",
    category: "Vision",
    topic: "Eye Anatomy",
    difficulty: "medium",
    question: "Which part of the eye contains the photoreceptors (rods and cones) responsible for vision?",
    options: [
      "The cornea",
      "The lens",
      "The retina",
      "The iris"
    ],
    correctAnswer: 2,
    explanation: "The retina is the innermost layer of the eye that contains photoreceptors - rods and cones. Cones are densest in the center (fovea) and provide color vision and high acuity. Rods are densest at the periphery and allow vision in dim light. The retina converts light into neural signals sent to the brain via the optic nerve.",
    limitation: false,
    objectiveType: "recognize",
    learningObjective: "Know the anatomy and function of the eyes"
  },

  {
    id: "ap-mc-082",
    category: "Vision",
    topic: "Focal vs Peripheral Vision",
    difficulty: "medium",
    question: "What are the primary characteristics that distinguish focal vision from peripheral vision?",
    options: [
      "Focal vision uses the central 3° for high acuity and detail; peripheral vision uses the outer field for motion detection",
      "Focal vision sees only in black and white; peripheral vision sees in full color",
      "Focal vision works only at night; peripheral vision works only during day",
      "Focal vision uses rods; peripheral vision uses cones"
    ],
    correctAnswer: 0,
    explanation: "Focal vision uses the central 3° of the visual field for high acuity and detail work, relying primarily on cones in the fovea. Peripheral vision uses the remaining visual field (up to 150° total) and is better for detecting motion and objects in dim light, relying more on rods. Focal vision provides best acuity and reaction time during daylight (photopic vision).",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know the characteristics of visual field"
  },

  {
    id: "ap-mc-083",
    category: "Vision",
    topic: "Vision Limitations",
    difficulty: "medium",
    question: "What is a key limitation of focal vision that affects aircraft operations?",
    options: [
      "It provides excellent peripheral motion detection",
      "It has a very narrow field of view (only 3°) requiring head movement to scan effectively",
      "It works better at night than during the day",
      "It can see through clouds and fog"
    ],
    correctAnswer: 1,
    explanation: "Focal vision's key limitation is its very narrow field of view - only the central 3° provides high acuity. This requires constant head and eye movement to scan the environment effectively. Peripheral vision limitations include reduced acuity and detail, but better motion detection. Both systems have blind spots approximately 30° right of center due to the optic nerve.",
    limitation: true,
    objectiveType: "identify",
    learningObjective: "Know the characteristics of visual field"
  },

  {
    id: "ap-mc-084",
    category: "Vision",
    topic: "Scanning and Collision Avoidance",
    difficulty: "high",
    question: "How do perception/reaction time and visual acquisition affect midair collision avoidance?",
    options: [
      "They have no effect - radar prevents all midair collisions",
      "Perception-reaction time delays (several seconds) combined with limited visual acquisition range means objects may not be detected until very close",
      "Faster aircraft always see slower aircraft first",
      "Visual acquisition is only important at night"
    ],
    correctAnswer: 1,
    explanation: "Perception-reaction time is the delay between seeing an object and reacting to it. Combined with visual acquisition limitations (ability to detect and identify objects), this can mean an aircraft is not detected until dangerously close. Factors affecting this include visual contrast, target shape, target movement, environmental conditions, and empty-field myopia. Proper scanning technique is essential for midair collision avoidance.",
    limitation: true,
    objectiveType: "identify",
    learningObjective: "Know the limitations and visual illusions associated with daytime flight"
  },

  {
    id: "ap-mc-085",
    category: "Vision",
    topic: "Daytime Visual Illusions",
    difficulty: "high",
    question: "Which of the following is a common daytime visual illusion encountered in aviation?",
    options: [
      "Autokinesis - a stationary light appearing to move",
      "Runway width illusion - a wider runway appears closer, a narrower runway appears farther",
      "The leans - false sensation of bank angle",
      "Graveyard spiral sensation"
    ],
    correctAnswer: 1,
    explanation: "Runway width illusion is a daytime visual illusion where a wider-than-normal runway appears closer (leading to high approach) and a narrower runway appears farther away (leading to low approach). Other daytime illusions include sloping terrain illusions, black hole approach, and false horizon illusions. Autokinesis is a night vision phenomenon. The leans and graveyard spiral are spatial disorientation illusions.",
    limitation: true,
    objectiveType: "recall",
    learningObjective: "Know the limitations and visual illusions associated with daytime flight"
  },

  {
    id: "ap-mc-086",
    category: "Vision",
    topic: "Visual Illusion Factors",
    difficulty: "high",
    question: "Which factors contribute to daytime visual illusions in flight?",
    options: [
      "Only weather conditions like fog and haze",
      "Visual contrast, target shape, target movement, environmental conditions, and empty-field myopia",
      "Only the pilot's physical fitness level",
      "Only occurs when flying over water"
    ],
    correctAnswer: 1,
    explanation: "Factors involved in daytime visual illusions include: visual contrast (object vs background), target shape and size, target movement (or lack thereof), environmental conditions (weather, lighting, terrain), and empty-field myopia (eyes relaxing to intermediate focus when no objects to focus on). These factors can limit the ability to perceive objects correctly in the visual field.",
    limitation: true,
    objectiveType: "recall",
    learningObjective: "Know the limitations and visual illusions associated with daytime flight"
  },

  {
    id: "ap-mc-087",
    category: "Vision",
    topic: "Maximizing Visual Acuity",
    difficulty: "medium",
    question: "Which techniques can maximize visual acuity during flight operations?",
    options: [
      "Stare continuously at one point without moving eyes",
      "Use proper scanning technique, ensure adequate oxygen, maintain physical fitness, protect eyes from bright light",
      "Never use sunglasses to improve light sensitivity",
      "Focus only on instruments and ignore outside visual references"
    ],
    correctAnswer: 1,
    explanation: "Techniques to maximize visual acuity include: using proper scanning technique (series of short eye movements), ensuring adequate oxygen supply, maintaining physical fitness, protecting eyes from excessive bright light exposure, allowing proper dark adaptation time, avoiding self-imposed stressors (fatigue, hypoglycemia, dehydration), and proper use of corrective lenses if needed.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Select measures you can take to ensure maximum visual acuity in both day and night flying conditions"
  },

  {
    id: "ap-mc-088",
    category: "Vision",
    topic: "Preventing Visual Illusions",
    difficulty: "medium",
    question: "What methods can help prevent visual illusions during flight?",
    options: [
      "Rely solely on outside visual references and ignore instruments",
      "Trust instrument indications, use proper scanning, be aware of illusion-prone conditions, cross-check instruments with visual cues",
      "Close your eyes during approaches to avoid confusion",
      "Only fly during perfect weather conditions"
    ],
    correctAnswer: 1,
    explanation: "Methods to prevent visual illusions include: trust instrument indications when conflicts arise, use proper scanning technique, be aware of conditions prone to illusions (night, weather, unfamiliar terrain), cross-check instruments with visual cues, maintain proper altitude awareness, use all available navigation aids, and be especially cautious during approaches to unfamiliar runways or in marginal weather.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Select measures you can take to ensure maximum visual acuity in both day and night flying conditions"
  },

  {
    id: "ap-mc-089",
    category: "Vision",
    topic: "Laser Hazards",
    difficulty: "medium",
    question: "What are the primary hazards associated with laser exposures during flight?",
    options: [
      "Permanent blindness occurs with all laser exposures",
      "Temporary flash blindness, afterimages, glare, and potential retinal damage from direct beam exposure",
      "Lasers have no effect on aircrew vision",
      "Lasers only affect instruments, not human vision"
    ],
    correctAnswer: 1,
    explanation: "Laser exposure hazards include: temporary flash blindness, afterimages that can persist for minutes, glare that impairs vision, distraction during critical phases of flight, and potential permanent retinal damage from direct beam exposure to high-powered lasers. Even indirect exposure can cause temporary visual impairment that compromises flight safety.",
    limitation: true,
    objectiveType: "recall",
    learningObjective: "Know the characteristics of lasers and associated actions upon exposure"
  },

  // ========================================
  // AP106 - Night Vision (3 questions)
  // ========================================

  {
    id: "ap-mc-090",
    category: "Night Vision",
    topic: "Flash Blindness Effects",
    difficulty: "high",
    question: "How does flash blindness produce debilitating effects on dark adaptation?",
    options: [
      "It has no effect on dark adaptation",
      "It temporarily bleaches rhodopsin in the rods, destroying night vision adaptation and requiring 30+ minutes to recover",
      "It only affects cone cells, not rod cells",
      "It improves night vision by stimulating the retina"
    ],
    correctAnswer: 1,
    explanation: "Flash blindness occurs when intense light temporarily bleaches the rhodopsin (visual purple) in rod cells, which are responsible for night vision. This destroys the dark adaptation that took 30+ minutes to develop. Recovery can take another 30 minutes or more depending on the intensity and duration of light exposure. Even brief exposure to bright light can significantly compromise night vision capability.",
    limitation: true,
    objectiveType: "identify",
    learningObjective: "Know night vision characteristics and limitations"
  },

  {
    id: "ap-mc-091",
    category: "Night Vision",
    topic: "Night Vision Degradation",
    difficulty: "medium",
    question: "What visual capabilities are reduced during night vision operations?",
    options: [
      "Only color perception is affected",
      "Visual acuity is reduced, color perception is lost/shifted, and both focal and peripheral vision are degraded",
      "Night vision is actually better than day vision",
      "Only peripheral vision is affected"
    ],
    correctAnswer: 1,
    explanation: "Night vision limitations include: reduced visual acuity (ability to see detail), loss and shift of color perception (scotopic vision uses rods which don't detect color), degradation of focal vision (cones don't work well in low light), and while peripheral vision is relatively better preserved, it still has reduced acuity. The Purkinje shift occurs where blue/green objects appear brighter and yellows appear duller.",
    limitation: true,
    objectiveType: "identify",
    learningObjective: "Know night vision characteristics and limitations"
  },

  {
    id: "ap-mc-092",
    category: "Night Vision",
    topic: "Improving Night Vision",
    difficulty: "medium",
    question: "Which methods can improve unaided night vision during flight?",
    options: [
      "Stare directly at objects to see them better",
      "Allow 30 minutes for dark adaptation, use off-center viewing, avoid bright lights, maintain oxygen/physical fitness",
      "Use maximum cockpit lighting to see better",
      "Dark adaptation is not necessary for flying"
    ],
    correctAnswer: 1,
    explanation: "Methods to improve unaided night vision include: allow at least 30 minutes for dark adaptation before flight, use off-center (peripheral) viewing technique since rods are more prevalent away from the fovea, avoid exposure to bright lights that can destroy adaptation, maintain adequate oxygen levels (hypoxia degrades night vision), ensure physical fitness, avoid self-imposed stressors, and use proper cockpit lighting (red light preferred).",
    limitation: false,
    objectiveType: "apply",
    learningObjective: "Know night vision characteristics and limitations"
  },

  // ========================================
  // AP107 - Situational Awareness (6 questions)
  // ========================================

  {
    id: "ap-mc-093",
    category: "Situational Awareness",
    topic: "Information Processing Types",
    difficulty: "medium",
    question: "What are the two primary types of information processing used in situational awareness?",
    options: [
      "Fast and slow processing",
      "Conscious (controlled) and subconscious (automatic) processing",
      "Visual and auditory processing",
      "Primary and secondary processing"
    ],
    correctAnswer: 1,
    explanation: "The two primary types of information processing are conscious (controlled) and subconscious (automatic) processing. Conscious processing requires focused attention and mental effort, used for new or complex tasks. Subconscious processing is automatic, requires little attention, and is used for well-learned tasks. Effective SA requires appropriate use of both processing types.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know the fundamentals of AMT and SA"
  },

  {
    id: "ap-mc-094",
    category: "Situational Awareness",
    topic: "Attention Management Limitations",
    difficulty: "high",
    question: "Which attention management limitation has the greatest impact on situational awareness?",
    options: [
      "Unlimited attention capacity allows perfect awareness always",
      "Channelized attention - focusing on one thing while missing other important cues",
      "Attention management has no effect on SA",
      "Too much attention to all details simultaneously"
    ],
    correctAnswer: 1,
    explanation: "Predominant attention management limitations include: channelized attention (fixation on one task while ignoring others), task saturation (too many tasks for available attention), distraction (attention diverted to non-critical items), and limited working memory capacity. Channelized attention is particularly dangerous as it causes tunnel vision where other critical cues are missed, leading to loss of SA.",
    limitation: true,
    objectiveType: "identify",
    learningObjective: "Comprehend the causes of a loss of situational awareness"
  },

  {
    id: "ap-mc-095",
    category: "Situational Awareness",
    topic: "Improving SA and Attention Management",
    difficulty: "medium",
    question: "Which methods are most effective for improving SA and attention management?",
    options: [
      "Focus on only one task at a time and ignore everything else",
      "Maintain cross-check scan, prioritize tasks, use checklists, verbalize intentions, avoid task fixation",
      "Never use checklists as they distract from flying",
      "Rely entirely on autopilot systems"
    ],
    correctAnswer: 1,
    explanation: "Methods to improve SA and attention management include: maintain effective cross-check scan pattern, prioritize tasks appropriately, use checklists to reduce workload, verbalize intentions and actions, avoid task fixation/channelized attention, maintain aircraft control as first priority, use all available resources (wingman, controllers), and manage workload to prevent task saturation.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know the characteristics of SA by identifying how to recognize, prevent, and treat a loss of situational awareness"
  },

  {
    id: "ap-mc-096",
    category: "Situational Awareness",
    topic: "Recognizing Loss of SA",
    difficulty: "high",
    question: "What are key cues for recognizing a loss of situational awareness?",
    options: [
      "Everything is going perfectly according to plan",
      "Confusion, ambiguity, fixation, inability to predict what happens next, gut feeling something is wrong",
      "LSA has no warning signs",
      "Only occurs when instruments fail"
    ],
    correctAnswer: 1,
    explanation: "Cues for recognizing LSA include: confusion about aircraft position or status, ambiguity in information, fixation on one problem or task, inability to predict what will happen next, departure from procedures, gut feeling that something is wrong, surprise at aircraft state or situation, and falling behind the aircraft. Recognition is critical because LSA is either primary or contributing factor in most human performance related mishaps.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know the characteristics of SA by identifying how to recognize, prevent, and treat a loss of situational awareness"
  },

  {
    id: "ap-mc-097",
    category: "Situational Awareness",
    topic: "Recovering from LSA",
    difficulty: "high",
    question: "What are effective mechanisms to recover from loss of situational awareness?",
    options: [
      "Continue current course of action and hope for the best",
      "Immediate actions: maintain aircraft control, increase altitude/reduce speed if able, verbalize situation, use all resources, review basics",
      "Immediately eject from the aircraft",
      "Turn off all systems and troubleshoot"
    ],
    correctAnswer: 1,
    explanation: "Mechanisms to recover from LSA include: maintain aircraft control first (aviate, navigate, communicate), increase altitude and/or reduce speed if possible to gain time, verbalize the situation to clarify thinking, use all available resources (crew, wingman, controller), return to basic procedures and checklists, cross-check instruments, and force yourself to step back and assess the big picture before taking action.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know the characteristics of SA by identifying how to recognize, prevent, and treat a loss of situational awareness"
  },

  {
    id: "ap-mc-098",
    category: "Situational Awareness",
    topic: "Attention Management and Mishaps",
    difficulty: "medium",
    question: "How do attention management failures contribute to aviation mishaps?",
    options: [
      "They don't - attention management is unrelated to mishaps",
      "Channelized attention and task fixation cause crews to miss critical cues, leading to controlled flight into terrain, midair collisions, and system failures",
      "Only affects student pilots, not experienced aircrew",
      "Only occurs in single-seat aircraft"
    ],
    correctAnswer: 1,
    explanation: "Attention management failures are either causal or contributory in most human performance related mishaps. Examples include: channelized attention on one malfunction while aircraft departs controlled flight, fixation on landing gear issue while missing altitude deviation (controlled flight into terrain), task saturation during complex emergencies, and distraction during critical phases of flight. Loss of SA and poor attention management are primary concerns in aviation safety.",
    limitation: false,
    objectiveType: "give examples",
    learningObjective: "Comprehend the causes of a loss of situational awareness"
  },

  // ========================================
  // AP108 - Spatial Disorientation (7 questions)
  // ========================================

  {
    id: "ap-mc-099",
    category: "Spatial Disorientation",
    topic: "Types of SD",
    difficulty: "high",
    question: "What are the three main types of spatial disorientation and their impacts?",
    options: [
      "Type I (unrecognized), Type II (recognized), Type III (incapacitating) - all can lead to loss of aircraft control",
      "Mild, moderate, and severe - only severe causes problems",
      "Visual, vestibular, and somatosensory - all are harmless",
      "Day, night, and instrument - only night causes issues"
    ],
    correctAnswer: 0,
    explanation: "The three types of SD are: Type I (unrecognized) - most dangerous as the pilot is unaware, Type II (recognized) - pilot recognizes conflict but may struggle to overcome sensations, and Type III (incapacitating) - overwhelming sensations that incapacitate the pilot. All types can lead to loss of aircraft control and are contributing factors in many mishaps. SD is always a threat when visual references are degraded.",
    limitation: true,
    objectiveType: "know",
    learningObjective: "Know the threats and impacts of spatial disorientation"
  },

  {
    id: "ap-mc-100",
    category: "Spatial Disorientation",
    topic: "Four Sensory Systems",
    difficulty: "medium",
    question: "What are the four sensory systems used in spatial orientation?",
    options: [
      "Visual, vestibular, somatosensory, and auditory",
      "Sight, smell, taste, and touch",
      "Eyes, ears, nose, and skin",
      "Instruments, outside visual, radar, and radio"
    ],
    correctAnswer: 0,
    explanation: "The four sensory systems used in orientation are: 1) Visual (most reliable, provides most information), 2) Vestibular (inner ear, senses rotation and linear acceleration), 3) Somatosensory (seat-of-pants, pressure and position sensors), and 4) Auditory (hearing, provides limited but sometimes useful information). In flight, these systems can provide conflicting information leading to spatial disorientation.",
    limitation: false,
    objectiveType: "list",
    learningObjective: "Know the threats and impacts of spatial disorientation"
  },

  {
    id: "ap-mc-101",
    category: "Spatial Disorientation",
    topic: "Vestibular System Description",
    difficulty: "medium",
    question: "What structures comprise the vestibular system and what is their function?",
    options: [
      "Only the semicircular canals that detect rotation",
      "The semicircular canals (detect angular acceleration) and otolith organs (detect linear acceleration)",
      "The retina and optic nerve",
      "The cochlea and auditory nerve"
    ],
    correctAnswer: 1,
    explanation: "The vestibular system in the inner ear consists of two subsystems: 1) Semicircular canals (three perpendicular canals filled with endolymph fluid) that detect angular acceleration/rotation in pitch, roll, and yaw, and 2) Otolith organs (utricle and saccule containing calcium carbonate crystals) that detect linear acceleration and head tilt. Both can be fooled in flight, leading to vestibular-induced spatial disorientation illusions.",
    limitation: false,
    objectiveType: "describe",
    learningObjective: "Know characteristics of the orientation sensory systems"
  },

  {
    id: "ap-mc-102",
    category: "Spatial Disorientation",
    topic: "Somatosensory Unreliability",
    difficulty: "medium",
    question: "Why is the somatosensory system unreliable for orientation during flight?",
    options: [
      "It provides completely accurate information in flight",
      "In flight, G-forces and acceleration create pressure sensations unrelated to actual orientation, and 'seat-of-pants' feel cannot distinguish gravity from G-forces",
      "It only works on the ground, not in aircraft",
      "It is the most reliable system in flight"
    ],
    correctAnswer: 1,
    explanation: "The somatosensory system (pressure/position sensors in skin, muscles, joints) is unreliable in flight because: G-forces create pressure sensations that can be mistaken for orientation cues, the system cannot distinguish between gravity and aircraft-generated G-forces, and pressure distributions during maneuvers don't correspond to actual aircraft attitude. The somatosensory system gives 'seat-of-pants' feel which can be completely wrong during flight.",
    limitation: true,
    objectiveType: "determine",
    learningObjective: "Know characteristics of the orientation sensory systems"
  },

  {
    id: "ap-mc-103",
    category: "Spatial Disorientation",
    topic: "Environmental Factors",
    difficulty: "medium",
    question: "Which environmental factors increase the risk of spatial disorientation?",
    options: [
      "Only darkness affects SD risk",
      "Degraded visual references (weather, night, lack of horizon), featureless terrain, false visual cues, reflections, and unusual lighting",
      "Environmental factors have no effect on SD",
      "Only affects helicopters, not fixed-wing aircraft"
    ],
    correctAnswer: 1,
    explanation: "Environmental factors affecting SD include: degraded visual references from weather (clouds, fog, rain, snow, haze), night operations, lack of visible horizon, featureless terrain (water, desert, snow), false visual cues (sloping terrain, city lights mistaken for horizon), reflections in the canopy, and unusual lighting conditions. These factors reduce or eliminate reliable visual input, forcing reliance on unreliable vestibular and somatosensory systems.",
    limitation: true,
    objectiveType: "list",
    learningObjective: "Know the physiological and environmental factors of spatial disorientation"
  },

  {
    id: "ap-mc-104",
    category: "Spatial Disorientation",
    topic: "Physiological Factors",
    difficulty: "medium",
    question: "What physiological factors increase susceptibility to spatial disorientation?",
    options: [
      "Perfect health eliminates all SD risk",
      "Hypoxia, fatigue, dehydration, illness, stress, inexperience, and self-imposed stressors all increase SD susceptibility",
      "Only inner ear infections cause SD",
      "Physiological factors are irrelevant to SD"
    ],
    correctAnswer: 1,
    explanation: "Physiological factors affecting SD include: hypoxia (reduces cognitive function and sensory processing), fatigue (degrades information processing), dehydration (affects inner ear fluid), illness (especially ear/sinus infections), stress and anxiety (can override instrument trust), inexperience with instrument flight, medication effects, and self-imposed stressors (alcohol, poor sleep, nutrition). These factors impair the ability to recognize and overcome SD.",
    limitation: true,
    objectiveType: "recall",
    learningObjective: "Know the physiological and environmental factors of spatial disorientation"
  },

  {
    id: "ap-mc-105",
    category: "Spatial Disorientation",
    topic: "Motion Sickness Treatment",
    difficulty: "medium",
    question: "What techniques help prevent and/or treat motion sickness in flight?",
    options: [
      "Motion sickness cannot be prevented or treated",
      "Avoid unnecessary head movements, focus on distant point/horizon, maintain aircraft control, use ventilation, progressive exposure builds tolerance",
      "Rapid head movements help overcome motion sickness",
      "Only medication works - no behavioral techniques help"
    ],
    correctAnswer: 1,
    explanation: "Techniques to prevent/treat motion sickness include: avoid unnecessary head movements (especially during maneuvers), focus on a distant point or horizon when possible, maintain aircraft control smoothly, use cockpit ventilation, practice progressive exposure to build tolerance, avoid flight when ill or fatigued, and medication (prescribed by flight surgeon) can help prevent onset. The widely accepted cause is sensory conflict between visual and vestibular systems.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know the causes of and techniques to prevent/overcome motion sickness in flight"
  },

  // ========================================
  // AP110 - Noise and Vibration (5 questions)
  // ========================================

  {
    id: "ap-mc-106",
    category: "Noise and Vibration",
    topic: "Noise Definition",
    difficulty: "medium",
    question: "How is hazardous noise defined in the context of aviation physiology?",
    options: [
      "Any sound louder than normal conversation",
      "Unwanted sound that has the potential to cause hearing damage or interfere with communication and performance",
      "Only sounds above 200 decibels",
      "Noise that causes immediate pain"
    ],
    correctAnswer: 1,
    explanation: "Noise is defined as unwanted sound. Hazardous noise is sound that has the potential to cause temporary or permanent hearing damage, interfere with communication, or degrade performance. In aviation, noise comes from engines, airflow, systems, and weapons. The characteristics that affect hearing are frequency (pitch), intensity (loudness measured in decibels), and duration of exposure.",
    limitation: false,
    objectiveType: "define",
    learningObjective: "Know the characteristics of noise"
  },

  {
    id: "ap-mc-107",
    category: "Noise and Vibration",
    topic: "Frequency, Intensity, Duration",
    difficulty: "medium",
    question: "What are the units of measure for frequency, intensity, and duration of noise?",
    options: [
      "Frequency: Hertz (Hz), Intensity: Decibels (dB), Duration: Time (seconds/minutes/hours)",
      "All measured in decibels only",
      "All measured in Hertz only",
      "Frequency: dB, Intensity: Hz, Duration: wavelengths"
    ],
    correctAnswer: 0,
    explanation: "The three characteristics and their units are: Frequency (pitch) measured in Hertz (Hz) - cycles per second, Intensity (loudness) measured in Decibels (dB) - logarithmic scale of sound pressure level, and Duration measured in time units (seconds, minutes, hours) of exposure. All three factors determine the hazard level to hearing. High frequency (2000-6000 Hz), high intensity (>85 dB), and long duration combinations are most damaging.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Know the characteristics of noise"
  },

  {
    id: "ap-mc-108",
    category: "Noise and Vibration",
    topic: "Nonauditory Effects",
    difficulty: "medium",
    question: "What are the potential nonauditory effects of noise on crewmember in-flight performance?",
    options: [
      "Noise only affects hearing, nothing else",
      "Increased stress, fatigue, degraded communication, reduced concentration, headaches, and decreased cognitive performance",
      "Noise improves performance by keeping crew alert",
      "Only causes problems on the ground, not in flight"
    ],
    correctAnswer: 1,
    explanation: "Nonauditory effects of noise on crewmembers include: increased stress and anxiety levels, accelerated fatigue, degraded communication effectiveness, reduced concentration and attention, headaches and general discomfort, decreased cognitive performance, interference with warning signals, and potential contribution to spatial disorientation. These effects can compromise flight safety even before hearing damage occurs.",
    limitation: true,
    objectiveType: "identify",
    learningObjective: "Know the effects of hazardous noise on hearing capability"
  },

  {
    id: "ap-mc-109",
    category: "Noise and Vibration",
    topic: "Noise Protection Techniques",
    difficulty: "medium",
    question: "What techniques help minimize hazardous noise exposure beyond wearing hearing protection devices?",
    options: [
      "No techniques exist - only earplugs help",
      "Limit exposure duration, increase distance from noise source, use aircraft systems to reduce noise, conduct hearing tests regularly",
      "Expose yourself more to build tolerance",
      "Techniques are unnecessary if under 200 dB"
    ],
    correctAnswer: 1,
    explanation: "Techniques for minimizing noise exposure include: limit duration of exposure when possible, maximize distance from noise sources, use aircraft noise reduction systems effectively, ensure proper helmet/mask fit to reduce ambient noise, conduct regular hearing tests to detect early changes, avoid additional noise exposure off-duty, and never insert objects in ears that could cause damage. Combined with proper hearing protection devices, these techniques protect long-term hearing health.",
    limitation: false,
    objectiveType: "describe",
    learningObjective: "Know the protective measures used to minimize hazardous noise exposure"
  },

  {
    id: "ap-mc-110",
    category: "Noise and Vibration",
    topic: "Vibration Definition and Effects",
    difficulty: "medium",
    question: "What is vibration and how is it transmitted through the body?",
    options: [
      "Vibration only affects the hands and has no other effects",
      "Vibration is oscillating mechanical energy transmitted through body structures via contact points (seat, controls, floor) affecting tissues and organs",
      "Vibration is the same as noise",
      "Vibration only occurs in helicopters"
    ],
    correctAnswer: 1,
    explanation: "Vibration is defined as oscillating or cyclic mechanical energy. Vibration energy is passed through the body via contact points such as the seat, control stick, rudder pedals, and floor. It is transmitted through body structures and can affect various tissues and organs. Different frequencies affect different body systems - resonant frequencies can cause particular problems with vision, breathing, and organ function.",
    limitation: false,
    objectiveType: "recall and identify",
    learningObjective: "Know the potential effects of prolonged exposure to aircraft vibration"
  },

  // ========================================
  // AP111 - Acceleration (9 questions)
  // ========================================

  {
    id: "ap-mc-111",
    category: "Acceleration",
    topic: "Three Types of Acceleration",
    difficulty: "medium",
    question: "What are the three types of acceleration that affect the human body?",
    options: [
      "Fast, medium, and slow acceleration",
      "Linear (straight line), radial (centrifugal), and angular (rotational) acceleration",
      "Positive, negative, and neutral acceleration",
      "Forward, backward, and sideways acceleration"
    ],
    correctAnswer: 1,
    explanation: "The three types of acceleration are: 1) Linear acceleration - change in velocity in a straight line (takeoff, landing, thrust changes), 2) Radial/centrifugal acceleration - change in direction while maintaining speed (turns, creating outward force), and 3) Angular/rotational acceleration - change in rate of rotation (affects the vestibular system, causes somatogyral illusions). All three can occur in combination during flight maneuvers.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know the characteristics of acceleration and G forces"
  },

  {
    id: "ap-mc-112",
    category: "Acceleration",
    topic: "G-Force Symptoms",
    difficulty: "high",
    question: "What are the physical symptoms associated with exposure to positive Gz (head-to-foot) forces?",
    options: [
      "Symptoms include improved vision and enhanced performance",
      "Symptoms include grayout, tunnel vision, blackout, and potential G-LOC as blood pools in lower body",
      "No symptoms occur below +15 Gz",
      "Only causes muscle soreness after flight"
    ],
    correctAnswer: 1,
    explanation: "Physical symptoms of positive Gz exposure progress through stages: increased heaviness/body weight, grayout (loss of color vision, PO = peripheral light loss), tunnel vision (further peripheral vision loss), blackout (complete vision loss while remaining conscious), and G-LOC (G-induced loss of consciousness). Symptoms result from blood pooling in lower extremities, reducing cerebral blood flow and causing progressive hypoxia to the eyes and brain.",
    limitation: true,
    objectiveType: "identify",
    learningObjective: "Know the characteristics of acceleration and G forces"
  },

  {
    id: "ap-mc-113",
    category: "Acceleration",
    topic: "Four Physiological Effects of G",
    difficulty: "high",
    question: "What are the four principle physiological effects of exposure to G forces?",
    options: [
      "Happiness, sadness, anger, and fear",
      "Cardiovascular (blood pooling), pulmonary (breathing difficulty), musculoskeletal (increased weight), and visual (reduced blood flow to eyes)",
      "Only affects the heart",
      "Hunger, thirst, fatigue, and cold"
    ],
    correctAnswer: 1,
    explanation: "The four principle physiological effects of G forces are: 1) Cardiovascular - blood pooling and reduced cardiac output, 2) Pulmonary - difficulty breathing and reduced lung expansion under high G, 3) Musculoskeletal - body weight increase making movement difficult, and 4) Visual - reduced blood flow to eyes causing progressive vision loss. Associated symptoms range from mild discomfort to incapacitation depending on G magnitude and duration.",
    limitation: true,
    objectiveType: "identify",
    learningObjective: "Know the characteristics of the factors that determine the effects of G forces on a crewmember's body"
  },

  {
    id: "ap-mc-114",
    category: "Acceleration",
    topic: "Blackout vs G-LOC",
    difficulty: "critical",
    question: "What causes blackout and how is it different from G-induced loss of consciousness (G-LOC)?",
    options: [
      "They are the same thing with different names",
      "Blackout is complete vision loss while remaining conscious due to retinal hypoxia; G-LOC is unconsciousness from cerebral hypoxia requiring higher G or longer duration",
      "Blackout is permanent; G-LOC is temporary",
      "Blackout only occurs in negative G; G-LOC only in positive G"
    ],
    correctAnswer: 1,
    explanation: "Blackout is complete loss of vision while remaining conscious, caused by insufficient blood flow to the retina (retinal hypoxia) but adequate flow to maintain consciousness. G-LOC (G-induced loss of consciousness) occurs at higher G levels or longer duration when cerebral blood flow becomes inadequate, causing unconsciousness from brain hypoxia. Blackout can occur at +4-5G; G-LOC typically requires +5-6G or more. G-LOC includes absolute incapacitation period and relative incapacitation during recovery.",
    limitation: true,
    objectiveType: "recognize",
    learningObjective: "Know the characteristics of the factors that determine the effects of G forces on a crewmember's body"
  },

  {
    id: "ap-mc-115",
    category: "Acceleration",
    topic: "Relative Incapacitation Impact",
    difficulty: "critical",
    question: "How does relative incapacitation impact the total time required to regain control of the aircraft after G-LOC?",
    options: [
      "Relative incapacitation has no impact on recovery time",
      "Relative incapacitation adds 10-15 seconds of confusion and disorientation after regaining consciousness, significantly increasing total recovery time",
      "Recovery is instant once consciousness returns",
      "Relative incapacitation only affects physical movement, not mental function"
    ],
    correctAnswer: 1,
    explanation: "After G-LOC, recovery occurs in phases: 1) Absolute incapacitation (unconscious, 12-24 seconds), 2) Relative incapacitation (conscious but confused, disoriented, 2-15 seconds), and 3) Full recovery. During relative incapacitation, the pilot may make incorrect control inputs or be unable to process the situation. Total incapacitation time (absolute + relative) can exceed 30 seconds - often insufficient time to recover aircraft from unusual attitudes, making G-LOC extremely dangerous.",
    limitation: true,
    objectiveType: "explain",
    learningObjective: "Know the characteristics of G-LOC"
  },

  {
    id: "ap-mc-116",
    category: "Acceleration",
    topic: "Methods to Increase G Tolerance",
    difficulty: "high",
    question: "What methods can increase a crewmember's tolerance to positive G-forces?",
    options: [
      "Only G-suits help; nothing else works",
      "Proper AGSM technique, G-suit wear, physical fitness, hydration, avoid fatigue and self-imposed stressors, experience/training",
      "Holding your breath during high G",
      "Relaxing all muscles during G onset"
    ],
    correctAnswer: 1,
    explanation: "Methods to increase G tolerance include: proper Anti-G Straining Maneuver (AGSM) technique, wearing properly fitted G-suit (+1 to 1.5G protection), maintaining cardiovascular fitness, proper hydration (dehydration reduces tolerance), adequate rest (fatigue decreases tolerance), avoiding self-imposed stressors (alcohol, poor nutrition), gradual G onset when possible, experience and training to improve AGSM technique, and proper body position in seat.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know the methods used to help prevent G-LOC"
  },

  {
    id: "ap-mc-117",
    category: "Acceleration",
    topic: "AGSM Errors",
    difficulty: "critical",
    question: "What are common errors when performing the Anti-G Straining Maneuver (AGSM)?",
    options: [
      "There are no common errors - everyone does it perfectly",
      "Holding breath too long causing hypocapnia, inadequate muscle tensing, improper breathing cycle (not exhaling forcefully), skipping the straining maneuver",
      "Tensing muscles too much",
      "Breathing too rapidly"
    ],
    correctAnswer: 1,
    explanation: "Common AGSM errors include: holding breath too long (>3 seconds) causing hypocapnia and reduced cerebral blood flow, inadequate muscle tensing in legs/abdomen/buttocks, improper breathing cycle (not forcefully exhaling against glottis pressure), skipping the straining maneuver during high workload, relaxing muscles too soon, and not anticipating G onset. These errors reduce AGSM effectiveness and increase risk of G-LOC.",
    limitation: true,
    objectiveType: "recall",
    learningObjective: "Know the common errors in performing the AGSM"
  },

  {
    id: "ap-mc-118",
    category: "Acceleration",
    topic: "Mission Characteristics Causing AGSM Errors",
    difficulty: "high",
    question: "Which mission characteristics are most likely to cause AGSM errors?",
    options: [
      "Only occurs during training flights",
      "High workload situations (BFM, close formation), task saturation, surprise G onset, fatigue, and repeated high-G exposures",
      "AGSM errors never occur in actual flight",
      "Only happens to inexperienced pilots"
    ],
    correctAnswer: 1,
    explanation: "Mission characteristics likely to cause AGSM errors include: high workload situations like Basic Fighter Maneuvers (BFM) and close formation, task saturation during complex scenarios, surprise or rapid G onset without time to prepare, fatigue from long missions, repeated high-G exposures causing muscle fatigue, channelized attention on tactical situation, and transition to new aircraft with different G characteristics. These factors cause crews to delay, skip, or improperly perform the AGSM.",
    limitation: true,
    objectiveType: "identify",
    learningObjective: "Know the common errors in performing the AGSM"
  },

  {
    id: "ap-mc-119",
    category: "Acceleration",
    topic: "Self-Imposed Stressors and G Tolerance",
    difficulty: "medium",
    question: "How do self-imposed stressors affect G-force tolerance?",
    options: [
      "Self-imposed stressors have no effect on G tolerance",
      "Dehydration, fatigue, poor nutrition, alcohol, and illness all significantly decrease G tolerance and increase risk of G-LOC",
      "Self-imposed stressors actually improve G tolerance",
      "Only medication affects G tolerance"
    ],
    correctAnswer: 1,
    explanation: "Self-imposed stressors significantly decrease G tolerance. Dehydration reduces blood volume and cardiovascular function. Fatigue impairs the ability to perform proper AGSM. Poor nutrition (especially hypoglycemia) reduces physical performance. Alcohol causes dehydration and impairs judgment. Illness, medications, and lack of sleep all degrade physiological reserves. Avoiding these stressors through proper rest, hydration, nutrition, and fitness is essential for maintaining maximum G tolerance.",
    limitation: true,
    objectiveType: "recognize",
    learningObjective: "Know the characteristics of the methods used to increase a crewmember's tolerance to positive G-forces"
  },

  // ========================================
  // AP112 - Performance Threats Management (11 questions)
  // ========================================

  {
    id: "ap-mc-120",
    category: "Performance Threats Management",
    topic: "OTC Medications Types",
    difficulty: "medium",
    question: "Which types of over-the-counter (OTC) medications pose the greatest risk to aircrew performance?",
    options: [
      "OTC medications are all completely safe for flight",
      "Antihistamines (cause drowsiness), decongestants (affect blood pressure/heart rate), pain relievers, and sleep aids",
      "Only prescription medications pose risks",
      "Vitamins are the most dangerous OTC products"
    ],
    correctAnswer: 1,
    explanation: "OTC medications that pose risks include: antihistamines (cause drowsiness, impair performance), decongestants (affect blood pressure and heart rate), pain relievers (some cause drowsiness), sleep aids (long-lasting sedation), stimulants (affect judgment), and anti-diarrheal medications. Nutritional supplements may also contain banned or performance-impairing substances. Air Force policy requires flight surgeon approval before using any medication.",
    limitation: true,
    objectiveType: "identify",
    learningObjective: "Know the aircrew performance effects of over-the-counter medications and nutritional supplements"
  },

  {
    id: "ap-mc-121",
    category: "Performance Threats Management",
    topic: "OTC Medication Effects",
    difficulty: "medium",
    question: "What are the potential performance effects of nutritional supplements and OTC medications?",
    options: [
      "All supplements and OTC meds improve performance",
      "Drowsiness, impaired judgment, altered heart rate/blood pressure, dizziness, delayed reaction time, and unpredictable interactions",
      "No effects on performance whatsoever",
      "Only affect ground-based activities, not flying"
    ],
    correctAnswer: 1,
    explanation: "Potential performance effects include: drowsiness and sedation (reduced alertness), impaired judgment and decision-making, altered heart rate and blood pressure (affecting G tolerance), dizziness and disorientation, delayed reaction time, visual disturbances, unpredictable drug interactions, and masking of underlying medical conditions. Effects can persist longer than expected, especially at altitude where metabolism may be altered.",
    limitation: true,
    objectiveType: "recognize",
    learningObjective: "Know the aircrew performance effects of over-the-counter medications and nutritional supplements"
  },

  {
    id: "ap-mc-122",
    category: "Performance Threats Management",
    topic: "Immediate Effects of Alcohol",
    difficulty: "high",
    question: "What are both the immediate and residual effects of alcohol on the body?",
    options: [
      "Alcohol has no effects after 8 hours",
      "Immediate: impaired judgment, coordination, vision; Residual: dehydration, fatigue, hypoglycemia, reduced hypoxia tolerance for 24+ hours",
      "Only causes headaches",
      "Effects disappear completely after sleep"
    ],
    correctAnswer: 1,
    explanation: "Immediate alcohol effects include: impaired judgment and decision-making, reduced coordination and reaction time, visual disturbances, decreased night vision. Residual effects (hangover) include: dehydration, fatigue, hypoglycemia, headache, and significantly reduced tolerance to hypoxia and G-forces for 24+ hours after consumption. Even small amounts can impair performance. USAF policy restricts alcohol 12 hours before flight (AFI 11-202V3).",
    limitation: true,
    objectiveType: "identify",
    learningObjective: "Know the aircrew performance effects of alcohol use"
  },

  {
    id: "ap-mc-123",
    category: "Performance Threats Management",
    topic: "Hypoglycemia Prevention",
    difficulty: "medium",
    question: "What are effective methods to prevent hypoglycemia during flight operations?",
    options: [
      "Skip breakfast to avoid feeling full",
      "Eat regular balanced meals, avoid simple sugars, consume complex carbohydrates, maintain hydration, carry appropriate snacks",
      "Only eat candy bars for quick energy",
      "Fasting improves performance"
    ],
    correctAnswer: 1,
    explanation: "Hypoglycemia prevention methods include: eat regular balanced meals (don't skip breakfast), avoid simple sugars that cause rapid insulin response, consume complex carbohydrates for sustained energy release, maintain proper hydration, carry appropriate nutritious snacks for long flights, avoid excessive caffeine, and eat appropriate pre-flight meals with protein and complex carbs. Proper nutrition maintains blood sugar levels and prevents performance degradation.",
    limitation: false,
    objectiveType: "memorize",
    learningObjective: "Know the aircrew performance effects of both poor and proper diet and nutrition"
  },

  {
    id: "ap-mc-124",
    category: "Performance Threats Management",
    topic: "Dehydration Prevention",
    difficulty: "medium",
    question: "What methods effectively prevent dehydration during flight operations?",
    options: [
      "Only drink when extremely thirsty",
      "Pre-hydrate before flight, drink water regularly during flight, avoid excessive caffeine/alcohol, monitor urine color, continue hydration post-flight",
      "Coffee and energy drinks provide adequate hydration",
      "Dehydration prevention is unnecessary in aircraft"
    ],
    correctAnswer: 1,
    explanation: "Dehydration prevention methods include: pre-hydrate well before flight (water, not caffeine), drink water regularly during flight (don't wait for thirst), avoid excessive caffeine and alcohol (both are diuretics), monitor hydration status (urine color - pale yellow is good), continue hydration post-flight, and avoid self-induced dehydration. Low humidity in aircraft accelerates fluid loss. Dehydration increases DCS risk, reduces G tolerance, and impairs cognitive performance.",
    limitation: false,
    objectiveType: "memorize",
    learningObjective: "Know the aircrew performance effects of both poor and proper diet and nutrition"
  },

  {
    id: "ap-mc-125",
    category: "Performance Threats Management",
    topic: "Fatigue Causes",
    difficulty: "medium",
    question: "What scenarios cause acute and chronic fatigue in aircrew?",
    options: [
      "Fatigue never occurs in healthy aircrew",
      "Acute: single long mission, disrupted sleep, time zone changes; Chronic: sustained operations, inadequate recovery time, cumulative sleep debt",
      "Only physical exertion causes fatigue",
      "Fatigue only affects students, not experienced aircrew"
    ],
    correctAnswer: 1,
    explanation: "Acute fatigue causes: single long duration mission, disrupted circadian rhythm (night flying, time zone changes), sudden schedule changes, high workload, environmental stress. Chronic fatigue causes: sustained operations over days/weeks, inadequate recovery time between missions, cumulative sleep debt, repeated circadian disruption, continuous high operational tempo. Both types significantly degrade performance, decision-making, and increase error rates.",
    limitation: true,
    objectiveType: "identify",
    learningObjective: "Know the aircrew performance effects of both acute and chronic fatigue"
  },

  {
    id: "ap-mc-126",
    category: "Performance Threats Management",
    topic: "Fatigue Countermeasures",
    difficulty: "medium",
    question: "What are effective fatigue countermeasures for aircrew?",
    options: [
      "Push through fatigue - rest is for the weak",
      "Adequate sleep (7-9 hours), strategic napping, circadian rhythm management, proper nutrition/hydration, physical fitness, recognize fatigue signs",
      "Energy drinks solve all fatigue issues",
      "Medication is the only effective countermeasure"
    ],
    correctAnswer: 1,
    explanation: "Fatigue countermeasures include: obtain adequate sleep (7-9 hours per night), strategic napping (short naps before missions), manage circadian rhythm (consistent sleep schedule when possible), proper nutrition and hydration, maintain physical fitness, recognize early fatigue signs and take action, avoid self-imposed stressors, use crew rest periods effectively, and communicate fatigue concerns. Caffeine can provide temporary alertness but is not a substitute for sleep.",
    limitation: false,
    objectiveType: "memorize",
    learningObjective: "Know the aircrew performance effects of both acute and chronic fatigue"
  },

  {
    id: "ap-mc-127",
    category: "Performance Threats Management",
    topic: "GO/NO-GO Pills",
    difficulty: "medium",
    question: "What are the advantages and disadvantages of GO/NO-GO Pill usage?",
    options: [
      "They have only advantages and should always be used",
      "Advantages: temporary alertness/sleep aid; Disadvantages: side effects, false sense of readiness, potential dependence, not substitute for proper rest",
      "They are completely banned and never used",
      "They eliminate all need for sleep permanently"
    ],
    correctAnswer: 1,
    explanation: "GO Pills (stimulants like dexamphetamine) advantages: increase alertness during critical missions, extend performance capability temporarily. Disadvantages: side effects (jitters, impaired judgment), false sense of readiness, not a substitute for proper rest, rebound fatigue, potential for dependence. NO-GO Pills (sleep aids) advantages: help sleep in difficult conditions. Disadvantages: residual effects, disrupted sleep architecture. Both require flight surgeon approval and careful use only when operationally necessary.",
    limitation: true,
    objectiveType: "identify",
    learningObjective: "Know the aircrew performance effects of both acute and chronic fatigue"
  },

  {
    id: "ap-mc-128",
    category: "Performance Threats Management",
    topic: "Strategic Caffeine Use",
    difficulty: "medium",
    question: "What constitutes strategic caffeine consumption tactics for optimal performance?",
    options: [
      "Consume maximum caffeine at all times",
      "Moderate doses (100-200mg) timed before performance need, avoid tolerance buildup, maintain hydration, avoid late-day use affecting sleep",
      "Never use caffeine under any circumstances",
      "Only consume caffeine immediately before takeoff"
    ],
    correctAnswer: 1,
    explanation: "Strategic caffeine use includes: consume moderate doses (100-200mg, equivalent to 1-2 cups coffee), time consumption 30-60 minutes before peak performance need, avoid continuous high doses that build tolerance, maintain proper hydration (caffeine is a mild diuretic), avoid late-day consumption that disrupts night sleep, recognize individual sensitivity variations, don't rely on caffeine to replace proper rest, and understand withdrawal effects (headache, fatigue) if abruptly stopped.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Know the aircrew performance effects of caffeine usage"
  },

  {
    id: "ap-mc-129",
    category: "Performance Threats Management",
    topic: "Thermal Stress Countermeasures",
    difficulty: "medium",
    question: "What countermeasures help manage thermal stress during flight operations?",
    options: [
      "Ignore temperature discomfort - it builds character",
      "Proper hydration, appropriate clothing layers, use aircraft environmental controls, limit exposure duration, acclimatization, monitor for heat/cold injury signs",
      "Thermal stress cannot be managed",
      "Only occurs in extreme climates"
    ],
    correctAnswer: 1,
    explanation: "Thermal stress countermeasures include: maintain proper hydration (critical for heat stress), wear appropriate clothing layers (can add/remove), effectively use aircraft environmental control systems, limit exposure duration when possible, allow acclimatization time to new climates, monitor for heat exhaustion/heat stroke or cold injury signs, ensure adequate nutrition, recognize that thermal stress exacerbates other physiological threats (dehydration, fatigue, hypoxia), and communicate comfort issues to crew.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Know the aircrew performance effects of thermal stress"
  },

  {
    id: "ap-mc-130",
    category: "Performance Threats Management",
    topic: "Stress Management Methods",
    difficulty: "medium",
    question: "What stress countermeasures and stress management methods are effective for aircrew?",
    options: [
      "Stress is unavoidable and cannot be managed",
      "Physical fitness, adequate sleep, time management, social support, mental preparation, recognize stress signs, professional help when needed",
      "Ignore stress and it will disappear",
      "Only medication can manage stress"
    ],
    correctAnswer: 1,
    explanation: "Stress management methods include: maintain physical fitness (reduces stress response), ensure adequate sleep and rest, effective time management to reduce overload, maintain social support networks, mental preparation and visualization, recognize early stress signs (irritability, difficulty concentrating), compartmentalize stressors when possible, seek professional help when needed (chaplain, mental health), avoid additional self-imposed stressors, and use proper workload management techniques. Chronic unmanaged stress significantly degrades performance and increases mishap risk.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Know the aircrew performance effects of stress"
  },

  // ========================================
  // AP113 - Oxygen Equipment (4 questions)
  // ========================================

  {
    id: "ap-mc-131",
    category: "Oxygen Equipment",
    topic: "Oxygen Storage Systems",
    difficulty: "medium",
    question: "What are the five types of oxygen storage systems and their key characteristics?",
    options: [
      "There is only one type of oxygen system",
      "Gaseous (high pressure cylinders), Liquid (LOX - cold, requires insulation), Chemical (oxygen candles), OBOGS (On-Board Oxygen Generating System), and Molecular sieve",
      "All systems are identical in function",
      "Only OBOGS exists in modern aircraft"
    ],
    correctAnswer: 1,
    explanation: "Five oxygen storage types: 1) Gaseous - high pressure (1800-2200 psi) cylinders, green color-coded, 2) Liquid Oxygen (LOX) - cryogenic, very cold (-297°F), requires special insulation/handling, 3) Chemical - oxygen candles/generators produce O2 via chemical reaction (emergency backup), 4) OBOGS - generates oxygen from bleed air on-demand, 5) Molecular sieve - concentrates oxygen from ambient air. Each has advantages/disadvantages regarding capacity, weight, complexity, and maintenance requirements.",
    limitation: false,
    objectiveType: "describe",
    learningObjective: "Know oxygen storage and delivery systems"
  },

  {
    id: "ap-mc-132",
    category: "Oxygen Equipment",
    topic: "Pressure Demand Regulator Ceilings",
    difficulty: "medium",
    question: "What are the operational and emergency ceilings of a pressure demand regulator?",
    options: [
      "Operational: 50,000 feet, Emergency: unlimited",
      "Operational ceiling: approximately 40,000 feet (100% O2), Emergency ceiling: approximately 50,000 feet (pressure breathing)",
      "Both ceilings are the same at 35,000 feet",
      "No ceiling limitations exist"
    ],
    correctAnswer: 1,
    explanation: "Pressure demand regulators have two ceilings: Operational ceiling is approximately 40,000 feet where breathing 100% oxygen maintains adequate alveolar PO2 equivalent to sea level. Above 40,000 feet, positive pressure breathing is required. Emergency ceiling is approximately 50,000 feet where even with pressure breathing, adequate oxygenation becomes difficult to maintain. Above 50,000 feet, pressure suits are required to prevent hypoxia and ebullism.",
    limitation: false,
    objectiveType: "describe",
    learningObjective: "Know oxygen storage and delivery systems"
  },

  {
    id: "ap-mc-133",
    category: "Oxygen Equipment",
    topic: "OBOGS Components",
    difficulty: "medium",
    question: "What are the key components of the T-6 OBOGS panel regulator?",
    options: [
      "Only an on/off switch exists",
      "OBOGS supply lever, diluter lever (100% or NORMAL), emergency lever, flow indicator (blinker), and pressure gauge",
      "OBOGS has no user-serviceable components",
      "Just a breathing hose connection"
    ],
    correctAnswer: 1,
    explanation: "Key OBOGS panel regulator components include: OBOGS supply lever (ON/OFF controls oxygen flow), diluter lever (100% oxygen or NORMAL - altitude-compensated mix), emergency lever (provides emergency pressure breathing), flow indicator/blinker (shows oxygen flow with each breath), test mask button, and pressure gauge showing system pressure. Understanding these components is essential for proper operation and emergency procedures.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know the functions and components of the T-6 On-Board Oxygen Generating System (OBOGS)"
  },

  {
    id: "ap-mc-134",
    category: "Oxygen Equipment",
    topic: "Emergency Oxygen Components",
    difficulty: "medium",
    question: "What are the component parts of emergency oxygen systems in the T-6?",
    options: [
      "No emergency oxygen system exists",
      "Green ring pull handle, emergency oxygen cylinder, pressure hose connection to mask, independent from OBOGS",
      "Same as primary system - no separate components",
      "Only available in front cockpit"
    ],
    correctAnswer: 1,
    explanation: "Emergency oxygen system components include: green ring pull handle (activates emergency oxygen), emergency oxygen cylinder (separate from OBOGS, provides 100% O2), pressure hose connecting cylinder to mask, one-time use activation mechanism, sufficient oxygen for descent and landing, independent of aircraft electrical and bleed air systems. Both cockpits have emergency oxygen. Essential backup when OBOGS fails or is contaminated.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Know the components of MBU-20A/P oxygen masks, the emergency oxygen system, and how to perform an operational check of the oxygen system"
  },

  {
    id: "ap-mc-135",
    category: "Oxygen Equipment",
    topic: "Mask and Helmet Care",
    difficulty: "medium",
    question: "What procedures ensure proper care of the oxygen mask and helmet?",
    options: [
      "No special care required - equipment is indestructible",
      "Clean mask regularly, inspect for damage, ensure proper fit, store properly, check valves and seals, never use petroleum-based products, report defects immediately",
      "Only clean once per year",
      "Mask care is life support's responsibility only"
    ],
    correctAnswer: 1,
    explanation: "Proper mask and helmet care includes: clean mask after each use with approved cleaning solution (never petroleum-based products - O2 fire hazard), inspect for cracks/tears/deterioration, ensure proper fit and seal, store in clean dry location away from sunlight, check valves and seals for proper function, verify bayonet fitting security, check communication equipment, report any defects to life support immediately, and conduct proper preflight inspection. Proper care ensures equipment functions correctly in emergencies.",
    limitation: false,
    objectiveType: "describe",
    learningObjective: "Know the components of MBU-20A/P oxygen masks, the emergency oxygen system, and how to perform an operational check of the oxygen system"
  }
];

export default additionalAPQuestions;
