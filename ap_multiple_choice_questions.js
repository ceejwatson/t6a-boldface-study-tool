// Aerospace Physiology Multiple Choice Questions
// Generated from AP101-AP113 Samples of Behavior
// Total Questions: 62

const apMultipleChoiceQuestions = [
  // AP101 - Introduction and Atmosphere Questions
  {
    id: "ap-mc-001",
    category: "Introduction and Atmosphere",
    topic: "Gas Laws",
    difficulty: "medium",
    question: "During a rapid decompression at FL350, you notice a sealed water bottle in the cockpit has expanded significantly. Which gas law explains this phenomenon?",
    options: [
      "Boyle's Law - volume of gas is inversely proportional to pressure",
      "Dalton's Law - total pressure equals sum of partial pressures",
      "Henry's Law - gas in solution varies with partial pressure",
      "Ideal Gas Law - relationship between pressure and temperature"
    ],
    correctAnswer: 0,
    explanation: "Boyle's Law states that when temperature remains constant, the volume of a gas is inversely proportional to the pressure surrounding it. As cabin pressure decreases during decompression, the air inside the sealed bottle expands. This same principle explains trapped gas disorders in body cavities like the middle ear, sinuses, and GI tract.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recall the physiological effects of each gas law"
  },

  {
    id: "ap-mc-002",
    category: "Introduction and Atmosphere",
    topic: "Atmospheric Pressure",
    difficulty: "medium",
    question: "At 18,000 feet MSL, atmospheric pressure is approximately what percentage of sea level pressure?",
    options: [
      "75%",
      "50%",
      "33%",
      "25%"
    ],
    correctAnswer: 1,
    explanation: "At 18,000 feet MSL, atmospheric pressure is 379.4 mmHg, which is approximately half (50%) of the sea level pressure of 760 mmHg. This illustrates that the greatest pressure change occurs at lower atmospheric levels between sea level and 18,000 feet. This is why supplemental oxygen is required above 10,000 feet cabin altitude.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify which gasses are present in the atmosphere and their associated percentage of the total composition"
  },

  {
    id: "ap-mc-003",
    category: "Introduction and Atmosphere",
    topic: "Partial Pressure",
    difficulty: "medium",
    question: "What is the correct notation for the partial pressure of oxygen in the lungs?",
    options: [
      "PPO₂",
      "PO₂",
      "psi O₂",
      "O₂P"
    ],
    correctAnswer: 1,
    explanation: "The correct notation for partial pressure of oxygen is PO₂. Similarly, PCO₂ represents partial pressure of carbon dioxide and PN₂ represents partial pressure of nitrogen. Dalton's Law of Partial Pressure explains how the total atmospheric pressure equals the sum of all these partial pressures.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Recall partial pressure and identify its notation"
  },

  {
    id: "ap-mc-004",
    category: "Introduction and Atmosphere",
    topic: "Temperature Lapse Rate",
    difficulty: "medium",
    question: "If the temperature at sea level is 30°C, what would the approximate temperature be at 20,000 feet MSL using the standard temperature lapse rate?",
    options: [
      "0°C",
      "-10°C",
      "-20°C",
      "-30°C"
    ],
    correctAnswer: 1,
    explanation: "The standard temperature lapse rate is approximately 2°C per 1,000 feet. At 20,000 feet, the temperature change would be 40°C (20 × 2°C). Starting at 30°C and decreasing by 40°C gives us -10°C. This lapse rate applies up to approximately 35,000 feet.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recognize the definition of the standard temperature lapse rate"
  },

  {
    id: "ap-mc-005",
    category: "Introduction and Atmosphere",
    topic: "Physiological Zones",
    difficulty: "high",
    question: "At what altitude does the physiological deficient zone begin, requiring supplemental oxygen for normal function?",
    options: [
      "5,000 feet",
      "10,000 feet",
      "18,000 feet",
      "25,000 feet"
    ],
    correctAnswer: 1,
    explanation: "The physiological deficient zone begins at approximately 10,000 feet MSL. Below this altitude is the physiological zone where the human body is naturally adapted. Above 10,000 feet, the reduced atmospheric pressure means inadequate oxygen partial pressure to sustain normal physiologic functions, requiring supplemental oxygen use.",
    limitation: false,
    objectiveType: "list",
    learningObjective: "List the physiological divisions of the atmosphere"
  },

  // AP102 - Respiration and Circulation Questions
  {
    id: "ap-mc-006",
    category: "Respiration and Circulation",
    topic: "Phases of Respiration",
    difficulty: "medium",
    question: "What are the five distinct phases of respiration in the correct order?",
    options: [
      "Ventilation, Diffusion, Transportation, Diffusion, Utilization",
      "Inhalation, Exhalation, Transportation, Absorption, Metabolism",
      "Breathing, Gas Exchange, Circulation, Tissue Exchange, Energy Production",
      "Inspiration, Expiration, Oxygenation, Delivery, Consumption"
    ],
    correctAnswer: 0,
    explanation: "The five phases of respiration are: (1) Ventilation - inhalation and exhalation of gas, (2) Diffusion - oxygen and CO₂ pass through alveolar membrane into red blood cells, (3) Transportation - oxygen carried by blood to cells, (4) Diffusion - movement of gases between blood and cells, and (5) Utilization - oxygen used to produce energy. Note that diffusion occurs twice in the process.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recall the phases of respiration"
  },

  {
    id: "ap-mc-007",
    category: "Respiration and Circulation",
    topic: "Respiratory Control",
    difficulty: "high",
    question: "What is the most important factor in the control of ventilation under normal conditions?",
    options: [
      "Arterial partial pressure of oxygen (PaO₂)",
      "Arterial partial pressure of carbon dioxide (PaCO₂)",
      "Blood pH level",
      "Heart rate"
    ],
    correctAnswer: 1,
    explanation: "The arterial partial pressure of carbon dioxide (PaCO₂) is the most important factor in controlling ventilation under normal conditions. The sensitivity is remarkable - PaCO₂ is normally held within 3 mmHg of 45 mmHg during daily activities. Hyperventilation can reduce PaCO₂ and eliminate the breathing urge temporarily.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the important factors in normal respiration"
  },

  {
    id: "ap-mc-008",
    category: "Respiration and Circulation",
    topic: "Respiratory System",
    difficulty: "medium",
    question: "Where does gas exchange between the respiratory and circulatory systems occur?",
    options: [
      "In the trachea",
      "In the bronchi",
      "At the alveolar-capillary interface",
      "In the bronchioles"
    ],
    correctAnswer: 2,
    explanation: "Gas exchange between the respiratory and circulatory systems occurs at the alveolar-capillary interface. The alveoli are tiny air sacs with walls that have an excellent blood supply from capillaries. Oxygen and carbon dioxide move between air and blood by simple diffusion according to the Law of Gaseous Diffusion.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify structures that are important to respiration"
  },

  {
    id: "ap-mc-009",
    category: "Respiration and Circulation",
    topic: "Circulatory System",
    difficulty: "medium",
    question: "What is the primary function of red blood cells in oxygen delivery?",
    options: [
      "Fight infections in the bloodstream",
      "Transport oxygen via hemoglobin molecules",
      "Regulate blood pressure",
      "Produce carbon dioxide"
    ],
    correctAnswer: 1,
    explanation: "The primary function of red blood cells (RBCs) is to transport oxygen and CO₂. Each RBC contains up to 300 million hemoglobin molecules, giving them substantial oxygen-carrying capacity. Although hemoglobin can carry CO₂, its main function is oxygen transport.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recall functions of the structures of the circulatory system"
  },

  {
    id: "ap-mc-010",
    category: "Respiration and Circulation",
    topic: "Oxygen Delivery",
    difficulty: "high",
    question: "Which aviation-related factors can affect oxygen delivery to tissues? (Select the most complete answer)",
    options: [
      "Altitude only",
      "Altitude and G-forces only",
      "Altitude, G-forces, and toxic gases/substances",
      "G-forces and cabin temperature only"
    ],
    correctAnswer: 2,
    explanation: "Three main aviation-related factors affect oxygen delivery: (1) Altitude - increases hypoxic hypoxia by reducing PO₂, (2) G-forces - cause blood pooling leading to stagnant hypoxia, and (3) Toxic gases/substances - cause hypemic hypoxia (reduced oxygen carrying capacity) or histotoxic hypoxia (inability to use oxygen). These effects are cumulative.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify factors affecting oxygen delivery to the tissues"
  },

  // AP103 - Altitude Threats Questions
  {
    id: "ap-mc-011",
    category: "Altitude Threats",
    topic: "Hypoxia Definition",
    difficulty: "medium",
    question: "What is the definition of hypoxia?",
    options: [
      "Complete absence of oxygen in the body",
      "Oxygen deficiency sufficient to cause impairment of function",
      "Reduced atmospheric pressure at altitude",
      "Excessive carbon dioxide in the bloodstream"
    ],
    correctAnswer: 1,
    explanation: "Hypoxia is defined as an oxygen (O₂) deficiency sufficient to cause impairment of function. It's not the complete absence of oxygen, but rather an insufficient amount to maintain normal performance. The insidious onset is hypoxia's most dangerous characteristic - symptoms don't normally cause discomfort and may even feel pleasant.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recall the definition of hypoxia"
  },

  {
    id: "ap-mc-012",
    category: "Altitude Threats",
    topic: "Types of Hypoxia",
    difficulty: "high",
    question: "A pilot smokes cigarettes before flight and then experiences oxygen equipment failure at altitude. What types of hypoxia is the pilot experiencing?",
    options: [
      "Hypoxic hypoxia only",
      "Hypemic hypoxia only",
      "Both hypoxic and hypemic hypoxia",
      "Histotoxic hypoxia only"
    ],
    correctAnswer: 2,
    explanation: "The pilot experiences both hypoxic hypoxia (from oxygen equipment failure reducing PO₂ in the lungs) and hypemic hypoxia (from smoking, which increases carbon monoxide in the bloodstream). CO has an affinity for hemoglobin 200-250 times greater than oxygen, reducing oxygen-carrying capacity. Smoking prior to flight raises physiological altitude and increases susceptibility to hypoxic hypoxia.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Recall the types of hypoxia and associated causes"
  },

  {
    id: "ap-mc-013",
    category: "Altitude Threats",
    topic: "Hypoxic Hypoxia Recognition",
    difficulty: "critical",
    question: "Which of the following are common symptoms (not signs) of hypoxic hypoxia that you would personally experience?",
    options: [
      "Cyanosis, muscle incoordination, unconsciousness",
      "Air hunger, headache, lightheadedness, tingling in extremities",
      "Euphoria, belligerence, impaired judgment",
      "Increased respiration, mental confusion, dysphoria"
    ],
    correctAnswer: 1,
    explanation: "Symptoms are warning signals you personally feel or sense: air hunger, headache, lightheadedness, tingling in extremities, dizziness, fatigue, hot/cold flashes, apprehension, and nausea. Signs are observable by others: cyanosis, degraded reaction time, euphoria, belligerence, impaired judgment, increased respiration, muscle incoordination, and unconsciousness. Recognizing your own symptoms is critical for self-rescue.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the signs and symptoms of hypoxic hypoxia onset"
  },

  {
    id: "ap-mc-014",
    category: "Altitude Threats",
    topic: "Time of Useful Consciousness",
    difficulty: "critical",
    question: "At FL350, a rapid decompression occurs. What is your approximate Time of Useful Consciousness (TUC)?",
    options: [
      "5-10 seconds",
      "15-30 seconds",
      "30-60 seconds",
      "1-2 minutes"
    ],
    correctAnswer: 1,
    explanation: "At FL350, mean TUC is approximately 30-60 seconds for a resting individual. However, a rapid decompression can reduce TUC up to 50%, resulting in only 15-30 seconds of useful consciousness. TUC is the time from oxygen supply interruption to when useful function is lost - you can no longer take proper corrective action, though you're still conscious. This emphasizes the criticality of immediate action.",
    limitation: false,
    objectiveType: "recognize",
    learningObjective: "Recognize the importance of immediately correcting for hypoxic hypoxia after a rapid decompression"
  },

  {
    id: "ap-mc-015",
    category: "Altitude Threats",
    topic: "Hypoxia Treatment",
    difficulty: "critical",
    question: "What is the first priority when treating for physiological symptoms in the T-6?",
    options: [
      "Descend below 10,000 feet MSL immediately",
      "Communicate with your instructor/flight lead",
      "Pull the green ring and gangload the regulator to maximum oxygen under pressure",
      "Check all oxygen connections for security"
    ],
    correctAnswer: 2,
    explanation: "The first priority is obtaining oxygen by gangloading the regulator - placing all three switches in the full-up position (On, 100%/Max oxygen, Emergency pressure). This should be accomplished with a single sweep of the hand for speed. In the T-6, this is done by pulling the green ring. Getting oxygen immediately is critical given the short TUC at altitude.",
    limitation: false,
    objectiveType: "memorize",
    learningObjective: "Memorize the procedures to treat hypoxic hypoxia"
  },

  {
    id: "ap-mc-016",
    category: "Altitude Threats",
    topic: "Hypocapnia",
    difficulty: "high",
    question: "What is hypocapnia and what causes it?",
    options: [
      "Excessive carbon dioxide from inadequate breathing - caused by shallow breathing",
      "Oxygen deficiency in the bloodstream - caused by altitude exposure",
      "Reduced carbon dioxide from excessive breathing - caused by hyperventilation",
      "Nitrogen bubble formation in tissues - caused by decompression"
    ],
    correctAnswer: 2,
    explanation: "Hypocapnia is a state of reduced carbon dioxide (CO₂) in the blood caused by hyperventilation (abnormally increased rate and depth of breathing). This excessive loss of CO₂ causes vasoconstriction of blood vessels leading to the brain, reducing circulation and causing stagnant hypoxia in brain tissues. It can be prevented by controlling rate and depth of breathing.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recall the definition and causes of hypocapnia"
  },

  {
    id: "ap-mc-017",
    category: "Altitude Threats",
    topic: "Physiological Symptoms Treatment",
    difficulty: "critical",
    question: "Why are all physiological symptoms (hypoxia, hypocapnia, etc.) treated the same way in flight?",
    options: [
      "Because they all have identical causes",
      "To save time in the aircraft checklist",
      "Because symptoms may be confused or occur simultaneously, and time should not be wasted attempting to distinguish causes",
      "Because only hypoxia is actually dangerous"
    ],
    correctAnswer: 2,
    explanation: "All physiological symptoms are treated the same because hypoxia, hypocapnia, toxic exposure, hypoglycemia, and dehydration have very similar symptoms that may be confused or occur simultaneously. In an emergency environment, time should not be wasted attempting to distinguish causes. Following BOLDFACE procedures provides oxygen and restores normal breathing, treating all conditions simultaneously without delay. The most dangerous is hypoxia.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recall the similarities of treatment for hypocapnia, hypoxia, and other physiological symptoms"
  },

  {
    id: "ap-mc-018",
    category: "Altitude Threats",
    topic: "Trapped Gas Disorders",
    difficulty: "medium",
    question: "According to Boyle's Law, when does trapped gas in body cavities cause the most problems?",
    options: [
      "During cruise at constant altitude",
      "During ascent, as expanding gas cannot escape",
      "During descent, when pressure differential prevents equalization",
      "Only during rapid decompressions"
    ],
    correctAnswer: 2,
    explanation: "While gas expands during ascent, trapped gas problems occur more often during descent when the pressure differential prevents equalization. For example, the Eustachian tube acts like a one-way flapper valve - gas vents easily during ascent, but ambient pressure forces the eardrum inward during descent and you must assist equalization. If pressure differential exceeds 80 mmHg, an ear block can occur.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the areas of the body most likely to be affected by trapped gases and when it is most likely to occur"
  },

  {
    id: "ap-mc-019",
    category: "Altitude Threats",
    topic: "Ear Block Prevention",
    difficulty: "medium",
    question: "What is the most effective method to equalize pressure in the middle ear during descent?",
    options: [
      "Swallowing or yawning",
      "Moving head from side to side",
      "The Valsalva maneuver - closing mouth, pinching nose, and forcefully exhaling",
      "Waiting until you feel pain before attempting equalization"
    ],
    correctAnswer: 2,
    explanation: "The Valsalva maneuver is the most effective method - close the mouth tight, pinch the nose closed, and forcefully exhale. This forces air through the Eustachian tube and equalizes pressure. Crewmembers should use the Valsalva frequently during descent without waiting for discomfort. If pressure differential exceeds 80 mmHg, it may become impossible to open the Eustachian tube, causing an ear block.",
    limitation: false,
    objectiveType: "memorize",
    learningObjective: "Memorize how to treat and prevent trapped gas disorders"
  },

  {
    id: "ap-mc-020",
    category: "Altitude Threats",
    topic: "Decompression Sickness",
    difficulty: "high",
    question: "What is the primary cause of decompression sickness (DCS)?",
    options: [
      "Rapid pressure changes damaging the lungs",
      "Evolution of nitrogen bubbles from tissues and fluids due to reduced atmospheric pressure",
      "Excessive oxygen saturation at high altitude",
      "Carbon dioxide buildup in the bloodstream"
    ],
    correctAnswer: 1,
    explanation: "DCS is caused by evolution of nitrogen gas from tissues and fluids of the body (nitrogen bubble formation). According to Henry's Law, when atmospheric pressure decreases, dissolved gases can come out of solution forming bubbles in blood, body fluids, and tissues. This can occur in joints (bends), CNS, lungs (chokes), or skin (creeps).",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the common types and causes of decompression sickness"
  },

  {
    id: "ap-mc-021",
    category: "Altitude Threats",
    topic: "Decompression Sickness Types",
    difficulty: "critical",
    question: "A crewmember at altitude experiences deep, sharp pain under the sternum, dry cough, and difficulty with inspiration. What type of DCS is this?",
    options: [
      "The Bends - joint pain",
      "The Chokes - pulmonary symptoms",
      "CNS manifestations - neurological symptoms",
      "The Creeps - skin symptoms"
    ],
    correctAnswer: 1,
    explanation: "These are symptoms of 'The Chokes' - a rare but potentially dangerous type of DCS affecting the lungs. Symptoms include deep sharp pain centrally located under the sternum, dry nonproductive cough, difficulty with inspiration, and sense of suffocation. Immediate descent is necessary and post-flight shock is possible. These symptoms are similar to a heart attack and may be misdiagnosed.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the symptoms associated with each type of decompression sickness"
  },

  {
    id: "ap-mc-022",
    category: "Altitude Threats",
    topic: "DCS Prevention",
    difficulty: "high",
    question: "What is the threshold altitude where decompression sickness incidence abruptly increases without pre-oxygenation?",
    options: [
      "10,000 feet MSL",
      "18,000 feet MSL",
      "21,200 feet MSL",
      "25,000 feet MSL"
    ],
    correctAnswer: 2,
    explanation: "Studies show an abrupt increase in altitude DCS (without pre-oxygenation) at about 21,200 feet MSL. While no precise boundary exists, this is considered the threshold. Cabin pressurization protects against DCS by keeping cabin altitude below 25,000 feet. Factors affecting DCS include altitude, rate of ascent, physical activity, age, body composition, dehydration, and repeated exposures.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the impact various factors have on DCS incidence and severity"
  },

  {
    id: "ap-mc-023",
    category: "Altitude Threats",
    topic: "DCS and Exercise",
    difficulty: "high",
    question: "Why should crewmembers avoid strenuous exercise for 12 hours after high altitude exposure?",
    options: [
      "To prevent muscle fatigue",
      "To avoid dislodging nitrogen bubbles that could travel to dangerous locations in the body",
      "To allow the body to restore normal oxygen levels",
      "To prevent dehydration"
    ],
    correctAnswer: 1,
    explanation: "Physical activity can dislodge nitrogen bubbles from joints, increasing risk that bubbles will travel to potentially dangerous locations (like the brain or lungs). If asymptomatic bubbles caught in the lungs pass through to arteries as cardiac output increases, very serious DCS symptoms may arise. Postflight exercise may also mask or be confused with DCS pain. Therefore, no strenuous exercise for 12 hours after exposure.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Identify the impact various factors have on DCS incidence and severity"
  },

  // AP104 - Cabin Pressurization Questions
  {
    id: "ap-mc-024",
    category: "Cabin Pressurization",
    topic: "Pressurization Systems",
    difficulty: "medium",
    question: "What is the primary advantage of cabin pressurization systems in aircraft?",
    options: [
      "Increased fuel efficiency at altitude",
      "Minimizing hazards of DCS, hypoxia, and fatigue by maintaining effective cabin altitude",
      "Allowing flight above weather",
      "Reducing engine wear"
    ],
    correctAnswer: 1,
    explanation: "Cabin pressurization provides the most effective method of protection from hostile high altitude environments by minimizing the hazards of decompression sickness, hypoxia, and fatigue. Pressurization systems maintain increased pressure in the cabin by pumping pressurized, conditioned air from the jet engine compressor, keeping the cabin altitude low even when flying at high altitude.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recall the advantages and disadvantages of pressurization systems"
  },

  {
    id: "ap-mc-025",
    category: "Cabin Pressurization",
    topic: "Rapid Decompression",
    difficulty: "critical",
    question: "What are the physical indications that you would experience during a rapid decompression?",
    options: [
      "Sudden fog in the cabin, loud noise, flying debris, and rapid temperature increase",
      "Gradual pressure decrease, slow temperature drop, and mild discomfort",
      "Loud noise, sudden fog/mist, flying debris, rapid temperature decrease, and possible pain in ears/sinuses",
      "Only a warning light on the instrument panel"
    ],
    correctAnswer: 2,
    explanation: "During rapid decompression, you would experience: loud noise (explosive or rush of air), sudden fog/mist in cabin (from condensation of water vapor), flying debris, rapid temperature decrease (air expanding and cooling), and possible pain in ears/sinuses from pressure differential. Immediate recognition and response is critical given the reduced TUC that occurs with rapid decompression.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the physical indications of rapid decompression"
  },

  {
    id: "ap-mc-026",
    category: "Cabin Pressurization",
    topic: "Types of Decompression",
    difficulty: "medium",
    question: "What distinguishes a rapid decompression from a slow decompression?",
    options: [
      "Rapid occurs above 25,000 feet; slow occurs below 25,000 feet",
      "Rapid occurs so fast the lungs decompress before exhaling; slow allows lungs to decompress during normal breathing",
      "Rapid always causes immediate unconsciousness; slow does not",
      "There is no practical difference between the two"
    ],
    correctAnswer: 1,
    explanation: "A rapid decompression occurs so quickly that the lungs decompress faster than air can be exhaled - this can reduce TUC by up to 50%. In a slow/gradual decompression, the cabin altitude gradually increases and the lungs can decompress during normal breathing. Slow decompressions are insidious because hypoxia has slow onset and symptoms may be well developed before recognition.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recall the types of decompression and characteristics of each"
  },

  // AP105 - Vision Questions
  {
    id: "ap-mc-027",
    category: "Vision",
    topic: "Eye Anatomy",
    difficulty: "medium",
    question: "Which part of the eye is responsible for acute, detailed vision in daylight conditions?",
    options: [
      "The rods in the peripheral retina",
      "The fovea containing cone cells",
      "The optic nerve",
      "The cornea"
    ],
    correctAnswer: 1,
    explanation: "The fovea, located in the center of the macula, contains the highest concentration of cone cells and provides acute, detailed color vision in daylight conditions (photopic vision). This is your focal vision. The peripheral retina contains primarily rod cells for peripheral and night vision (scotopic vision). Understanding this is critical for proper scanning techniques.",
    limitation: false,
    objectiveType: "memorize",
    learningObjective: "Memorize the function of each part of the eye discussed"
  },

  {
    id: "ap-mc-028",
    category: "Vision",
    topic: "Physiological Blind Spot",
    difficulty: "medium",
    question: "What causes the physiological blind spot in each eye?",
    options: [
      "The lens blocking light",
      "The optic nerve leaving the eye with no photoreceptors at that point",
      "Damage to the retina from UV exposure",
      "The fovea having no peripheral vision capability"
    ],
    correctAnswer: 1,
    explanation: "The physiological blind spot exists where the optic nerve exits the back of the eye. At this point, there are no photoreceptors (rods or cones) to detect light. Normally, you don't notice this because your brain fills in the gap and your other eye covers the area. However, this emphasizes the importance of proper scanning to avoid missing aircraft in this blind zone.",
    limitation: false,
    objectiveType: "recognize",
    learningObjective: "Recognize the physiological blind zones associated with parts of the eye"
  },

  {
    id: "ap-mc-029",
    category: "Vision",
    topic: "Scanning Technique",
    difficulty: "critical",
    question: "What is the correct scanning technique to avoid midair collisions?",
    options: [
      "Continuously sweep your eyes across the entire sky in one smooth motion",
      "Focus directly ahead and use peripheral vision for other aircraft",
      "Systematically scan the sky in sectors, pausing to focus on each 10-15 degree segment for 1-2 seconds",
      "Look only where you expect other aircraft to be"
    ],
    correctAnswer: 2,
    explanation: "Proper scanning involves systematically scanning the sky in sectors, focusing on each 10-15 degree segment for 1-2 seconds before moving to the next. This allows your focal vision (fovea) time to detect objects. Smooth continuous sweeping doesn't allow time for the eyes to focus. Empty-field myopia and other factors make it critical to use proper scanning technique with short eye movements and pauses.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the correct scanning technique used to avoid midair collisions"
  },

  {
    id: "ap-mc-030",
    category: "Vision",
    topic: "Empty-Field Myopia",
    difficulty: "medium",
    question: "What is empty-field myopia and why is it dangerous?",
    options: [
      "Permanent damage to vision from high altitude exposure",
      "The eyes automatically focusing at a distance of 10-30 feet when there are no visual cues, making distant objects blurry",
      "Complete loss of color vision at altitude",
      "Temporary blindness from looking at clouds"
    ],
    correctAnswer: 1,
    explanation: "Empty-field myopia occurs when viewing a featureless field (like clear sky or haze). The eyes automatically relax and focus at approximately 10-30 feet, making distant objects (like other aircraft) appear blurry even though they're within visual range. This is dangerous because you may not detect other aircraft even when looking in their direction. Proper scanning helps overcome this.",
    limitation: false,
    objectiveType: "recognize",
    learningObjective: "Recognize how visual contrast, target shape, target movement, environmental conditions, and empty-field myopia limit the ability to perceive objects in the visual field"
  },

  {
    id: "ap-mc-031",
    category: "Vision",
    topic: "Laser Exposure",
    difficulty: "high",
    question: "What is the correct immediate action upon laser exposure during flight?",
    options: [
      "Close your eyes until the exposure stops",
      "Look directly at the laser to identify its source",
      "Look away from the beam, shield eyes, place aircraft in a safe attitude using instruments if necessary",
      "Continue flying normally and report after landing"
    ],
    correctAnswer: 2,
    explanation: "Upon laser exposure: look away from the beam, shield your eyes if possible, and place the aircraft in a safe attitude using instruments if necessary. Do not rub your eyes. Notify ATC and other crewmembers. Laser exposure can cause flash blindness, afterimages, glare, and potential retinal damage. After landing, report the exposure and undergo medical evaluation.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the correct procedures to take upon exposure to lasers in-flight"
  },

  // AP106/107 - Night Vision and Situational Awareness Questions
  {
    id: "ap-mc-032",
    category: "Night Vision",
    topic: "Dark Adaptation",
    difficulty: "medium",
    question: "How long does it take to achieve full dark adaptation, and how easily is it lost?",
    options: [
      "5-10 minutes to adapt; lost in seconds with bright light exposure",
      "30 minutes to adapt; lost in 1-2 minutes with bright light",
      "30-45 minutes to adapt; lost in seconds with bright light exposure",
      "1-2 hours to adapt; permanent once achieved"
    ],
    correctAnswer: 2,
    explanation: "Full dark adaptation takes 30-45 minutes and can be lost in seconds with exposure to bright white light. This is because the rhodopsin (visual purple) in rod cells that enables night vision is bleached by bright light. Cone adaptation occurs in 5-10 minutes, but full rod adaptation requires much longer. This is why cockpit lighting should be kept dim and red where possible.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify dark adaptation's influence on night vision"
  },

  {
    id: "ap-mc-033",
    category: "Night Vision",
    topic: "Autokinesis",
    difficulty: "medium",
    question: "What is autokinesis and how can you prevent this illusion?",
    options: [
      "A spinning sensation; prevented by using instruments",
      "The illusion that a stationary light is moving; prevented by shifting gaze to other objects and using peripheral vision",
      "False horizon from ground lights; prevented by referencing instruments",
      "Temporary blindness; prevented by avoiding bright lights"
    ],
    correctAnswer: 1,
    explanation: "Autokinesis is the illusion that a stationary point of light (like a star or distant aircraft light) appears to move when stared at for several seconds in darkness. It's caused by small eye movements and lack of reference points. Prevent it by not staring at a single point, shifting gaze to include other objects, using peripheral vision, and referencing other lights or the horizon.",
    limitation: false,
    objectiveType: "demonstrate",
    learningObjective: "Demonstrate methods used to prevent the autokinesis illusion"
  },

  {
    id: "ap-mc-034",
    category: "Situational Awareness",
    topic: "SA Definition",
    difficulty: "medium",
    question: "According to the Air Force definition, what is Situational Awareness in flying?",
    options: [
      "The ability to fly using instruments only",
      "Knowing the location of other aircraft",
      "Pilot comprehension of the relationship of the aircraft's position, velocity, and attitude relative to mission goals and threats",
      "Awareness of fuel and weather conditions"
    ],
    correctAnswer: 2,
    explanation: "Per AFI 11-290, Situational Awareness in flying refers to pilot comprehension of the relationship of the aircraft's position, velocity, and attitude relative to mission goals and threats. It includes perception of environmental elements, comprehension of their meaning, and projection of their future status. Loss of SA is a primary or contributing factor in most human performance-related mishaps.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recall SA theory and its implications on operations"
  },

  {
    id: "ap-mc-035",
    category: "Situational Awareness",
    topic: "Levels of SA",
    difficulty: "medium",
    question: "What are the three levels of Situational Awareness according to Endsley's model?",
    options: [
      "Awareness, Understanding, Action",
      "Perception, Comprehension, Projection",
      "See, Think, Do",
      "Detection, Recognition, Response"
    ],
    correctAnswer: 1,
    explanation: "Endsley's SA model has three levels: Level 1 - Perception of elements in the environment; Level 2 - Comprehension of their meaning and significance; Level 3 - Projection of their future status. Understanding these levels helps identify where SA breakdown occurs and how to improve SA during flight operations.",
    limitation: false,
    objectiveType: "outline",
    learningObjective: "Outline the levels and components of SA"
  },

  {
    id: "ap-mc-036",
    category: "Situational Awareness",
    topic: "Loss of SA",
    difficulty: "high",
    question: "What is the predominant cause of loss of situational awareness (LSA)?",
    options: [
      "Equipment malfunction",
      "Poor weather conditions",
      "Attention management failures - task fixation, distraction, channelized attention",
      "Lack of flight experience"
    ],
    correctAnswer: 2,
    explanation: "Attention management failures are the predominant cause of LSA, including: task fixation (concentrating on one task while excluding others), distraction (attention diverted to unimportant tasks), and channelized attention (focusing too narrowly). Other causes include high workload, ambiguity, misplaced salience, and complexity. Understanding these helps prevent LSA.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the predominant causes of the loss of situational awareness (LSA)"
  },

  // AP108 - Spatial Disorientation Questions
  {
    id: "ap-mc-037",
    category: "Spatial Disorientation",
    topic: "SD Definition",
    difficulty: "medium",
    question: "Which sensory system provides the strongest and usually most reliable orientation information?",
    options: [
      "Vestibular system (inner ear)",
      "Visual system",
      "Somatosensory system (pressure receptors)",
      "Auditory system"
    ],
    correctAnswer: 1,
    explanation: "The visual system provides the strongest and usually most reliable orientation information, accounting for 80% or more of orientation input. However, visual illusions can occur. The vestibular system (inner ear) provides motion and position sense but can be fooled. The somatosensory system is unreliable in flight due to lack of pressure cues. This is why we 'believe the instruments' when sensory systems conflict.",
    limitation: false,
    objectiveType: "select",
    learningObjective: "Select the sensory system providing the strongest, and usually the most reliable, orientation information"
  },

  {
    id: "ap-mc-038",
    category: "Spatial Disorientation",
    topic: "Vestibular System",
    difficulty: "medium",
    question: "What are the two subsystems of the vestibular system and what does each detect?",
    options: [
      "Rods and cones; light and color",
      "Semicircular canals detect angular acceleration; otolith organs detect linear acceleration and gravity",
      "Inner ear and outer ear; sound and pressure",
      "Superior and inferior; up and down motion"
    ],
    correctAnswer: 1,
    explanation: "The vestibular system has two subsystems: (1) Semicircular canals (three fluid-filled canals oriented in three planes) detect angular acceleration/rotation, and (2) Otolith organs (utricle and saccule) detect linear acceleration and gravity. These systems can be fooled during flight, causing spatial disorientation illusions.",
    limitation: false,
    objectiveType: "define",
    learningObjective: "Define the relationship of the vestibular system and the two subsystems: semicircular canals and the otolith organs"
  },

  {
    id: "ap-mc-039",
    category: "Spatial Disorientation",
    topic: "Graveyard Spiral",
    difficulty: "critical",
    question: "What causes the Graveyard Spiral illusion and why is it dangerous?",
    options: [
      "Banking too steeply at low altitude",
      "A prolonged constant-rate turn where the semicircular canals stop sensing rotation, making the pilot feel level; correcting to actual level feels like turning the opposite direction, leading pilot to re-enter the spiral",
      "Flying upside down without realizing it",
      "Excessive G-forces during aerobatics"
    ],
    correctAnswer: 1,
    explanation: "The Graveyard Spiral is a somatogyral illusion. During a prolonged constant-rate turn (20+ seconds), semicircular canal fluid matches the rotation rate and stops moving, making you feel level. Rolling to actual wings-level creates the sensation of turning the opposite direction. The pilot may re-enter the turn to eliminate the sensation, tightening the spiral. This is one of the most deadly SD illusions. Believe your instruments!",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the cause of each somatogyral illusion"
  },

  {
    id: "ap-mc-040",
    category: "Spatial Disorientation",
    topic: "Coriolis Illusion",
    difficulty: "high",
    question: "What causes the Coriolis illusion?",
    options: [
      "Flying in clouds for extended periods",
      "Making a head movement in a different plane while in a prolonged turn, stimulating multiple semicircular canals simultaneously",
      "Rapid altitude changes",
      "Flying at high G-forces"
    ],
    correctAnswer: 1,
    explanation: "The Coriolis illusion occurs when you make a head movement in a different plane (such as looking down at a chart or over your shoulder) while in a prolonged turn. This cross-couples stimulation to semicircular canals that were previously inactive, creating an overwhelming tumbling sensation. It can be extremely disorienting. Prevent by avoiding unnecessary head movements during turns, especially in IMC.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the cause of each somatogyral illusion"
  },

  {
    id: "ap-mc-041",
    category: "Spatial Disorientation",
    topic: "SD Prevention",
    difficulty: "critical",
    question: "What are the most effective methods to prevent spatial disorientation? (Select the most complete answer)",
    options: [
      "Fly only in good weather",
      "Trust your instruments, maintain proficiency, avoid unnecessary head movements, understand SD illusions, and use proper visual scanning",
      "Fly slower to have more time to react",
      "Rely on your vestibular system as it never fails"
    ],
    correctAnswer: 1,
    explanation: "SD prevention methods include: (1) Trust and believe your instruments, (2) Maintain instrument flying proficiency, (3) Avoid unnecessary head movements during turns especially in IMC, (4) Understand SD illusions and recognize when susceptible, (5) Maintain proper visual scanning, (6) Ensure adequate rest and avoid self-imposed stresses, (7) Know and practice recovery procedures. Never trust your senses over instruments when they conflict.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recall 5 methods used to prevent spatial disorientation"
  },

  {
    id: "ap-mc-042",
    category: "Spatial Disorientation",
    topic: "SD Recovery",
    difficulty: "critical",
    question: "If you experience spatial disorientation, what should you do?",
    options: [
      "Trust your body sensations to regain orientation",
      "Transfer aircraft control to another crewmember if possible; refer to instruments; avoid head movements; delay tasks; establish straight and level flight",
      "Close your eyes until the sensation passes",
      "Make aggressive control inputs to establish level flight quickly"
    ],
    correctAnswer: 1,
    explanation: "SD recovery procedures: (1) Recognize the SD, (2) Transfer aircraft control to another crewmember if possible, (3) Refer to and believe your instruments, (4) Avoid unnecessary head movements, (5) Delay complex tasks, (6) Establish straight and level flight, (7) Verbalize readings with other crew. Do not trust your body sensations. The key is recognizing SD early and immediately transitioning to instruments.",
    limitation: false,
    objectiveType: "list",
    learningObjective: "List 7 procedures used to overcome spatial disorientation"
  },

  {
    id: "ap-mc-043",
    category: "Spatial Disorientation",
    topic: "Motion Sickness",
    difficulty: "medium",
    question: "What is the most widely accepted theory for the cause of motion sickness?",
    options: [
      "Inner ear infection",
      "Sensory conflict theory - mismatch between visual, vestibular, and somatosensory inputs",
      "Low blood sugar",
      "Dehydration"
    ],
    correctAnswer: 1,
    explanation: "The sensory conflict theory is most widely accepted - motion sickness occurs when there's a mismatch between what the visual system sees, what the vestibular system senses, and what the somatosensory system feels. Prevention/treatment includes: focusing on horizon/external references, avoiding unnecessary head movements, adequate ventilation, avoiding heavy meals before flight, and gradual exposure to increase tolerance.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the most widely accepted theory of the cause for motion sickness"
  },

  // AP110 - Noise and Vibration Questions
  {
    id: "ap-mc-044",
    category: "Noise and Vibration",
    topic: "Noise Definition",
    difficulty: "medium",
    question: "What three characteristics of noise affect hearing and potential damage?",
    options: [
      "Frequency, intensity, and duration",
      "Pitch, volume, and source",
      "Loudness, distance, and time",
      "Decibels, hertz, and wavelength"
    ],
    correctAnswer: 0,
    explanation: "The three characteristics affecting hearing are: (1) Frequency - measured in Hertz (Hz), the human ear detects 20-20,000 Hz, (2) Intensity - measured in decibels (dB), sound pressure level, and (3) Duration - length of exposure time. All three factors determine the potential for hearing damage. High intensity noise above 85 dB for extended duration causes permanent hearing loss.",
    limitation: false,
    objectiveType: "list",
    learningObjective: "List the characteristics of noises that affect hearing"
  },

  {
    id: "ap-mc-045",
    category: "Noise and Vibration",
    topic: "Hearing Loss",
    difficulty: "high",
    question: "What are the two types of hearing loss associated with high intensity noise exposure?",
    options: [
      "Complete and partial",
      "Temporary Threshold Shift (TTS) and Permanent Threshold Shift (PTS)",
      "Conductive and neural",
      "Acute and chronic"
    ],
    correctAnswer: 1,
    explanation: "The two types are: (1) Temporary Threshold Shift (TTS) - temporary reduction in hearing sensitivity that recovers with rest (usually 16 hours), and (2) Permanent Threshold Shift (PTS) - permanent hearing damage from prolonged exposure or extremely intense noise. Repeated TTS exposures can lead to cumulative PTS. Proper hearing protection prevents both types.",
    limitation: false,
    objectiveType: "list",
    learningObjective: "List types of hearing loss associated with high intensity noise"
  },

  {
    id: "ap-mc-046",
    category: "Noise and Vibration",
    topic: "Hearing Protection",
    difficulty: "medium",
    question: "What devices help minimize hazardous noise exposure in aviation?",
    options: [
      "Earplugs and earmuffs only",
      "Helmets with communication systems, properly fitted earplugs, active noise reduction headsets",
      "Cotton balls in ears",
      "No protection needed with modern aircraft"
    ],
    correctAnswer: 1,
    explanation: "Protective devices include: helmets with integrated communication systems, properly fitted earplugs (foam or custom molded), active noise reduction (ANR) headsets, and proper maintenance of communication equipment. Double hearing protection (earplugs under helmet) may be used for extreme noise. Proper fit and consistent use are critical for effectiveness.",
    limitation: false,
    objectiveType: "list",
    learningObjective: "List devices that help minimize hazardous noise"
  },

  {
    id: "ap-mc-047",
    category: "Noise and Vibration",
    topic: "Vibration Effects",
    difficulty: "medium",
    question: "What are common symptoms of prolonged vibration exposure in aircraft?",
    options: [
      "Improved alertness and performance",
      "Visual impairment, fatigue, decreased performance, motion sickness, muscle tension, and decreased dexterity",
      "Enhanced reaction time",
      "No significant effects"
    ],
    correctAnswer: 1,
    explanation: "Vibration symptoms include: blurred vision/visual impairment (especially 4-10 Hz affecting eyeball resonance), fatigue, decreased performance, motion sickness, muscle tension, decreased manual dexterity, and discomfort. Whole-body vibration is transmitted through the seat and affects different body systems at different frequencies. Low frequency vibration (1-20 Hz) is most problematic in aviation.",
    limitation: false,
    objectiveType: "describe",
    learningObjective: "Describe symptoms of vibration exposure"
  },

  // AP111 - Acceleration Questions
  {
    id: "ap-mc-048",
    category: "Acceleration",
    topic: "Types of G-Force",
    difficulty: "medium",
    question: "What are the three types of G-force and their effects on the body?",
    options: [
      "High, medium, and low G",
      "Positive Gz (head-to-foot), Negative Gz (foot-to-head), and Lateral Gx (chest-to-back or back-to-chest)",
      "Vertical, horizontal, and diagonal",
      "Sustained, rapid, and periodic"
    ],
    correctAnswer: 1,
    explanation: "The three types are: (1) Positive Gz - head-to-foot direction (blood pools in lower extremities), causes grayout/blackout/G-LOC, (2) Negative Gz - foot-to-head direction (blood pools in head), causes redout, and (3) Lateral Gx - chest-to-back (eyeballs-in) or back-to-chest (eyeballs-out) direction. Positive Gz is most common in tactical aviation and most dangerous due to reduced cerebral blood flow.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the three types of G force"
  },

  {
    id: "ap-mc-049",
    category: "Acceleration",
    topic: "G-LOC",
    difficulty: "critical",
    question: "What is G-induced Loss of Consciousness (G-LOC) and what are its phases?",
    options: [
      "A temporary state of confusion during high G maneuvers",
      "Complete loss of consciousness from excessive positive Gz with phases: period of relative incapacitation (unconscious), period of absolute incapacitation (convulsions/muscle jerks), recovery period (confusion)",
      "Permanent brain damage from G exposure",
      "Loss of vision but not consciousness"
    ],
    correctAnswer: 1,
    explanation: "G-LOC is complete loss of consciousness from inadequate cerebral blood flow during high positive Gz. Phases: (1) Period of relative incapacitation (4-15 seconds unconscious), (2) Period of absolute incapacitation (convulsive movements/muscle jerks), (3) Recovery period (confusion, disorientation lasting 2-15 seconds). Total incapacitation time can be 15-30 seconds. With recovery period disorientation, total time to regain aircraft control may exceed 30 seconds - often fatal.",
    limitation: false,
    objectiveType: "describe",
    learningObjective: "Describe the symptoms of each of the phases of incapacitation"
  },

  {
    id: "ap-mc-050",
    category: "Acceleration",
    topic: "G-Tolerance Factors",
    difficulty: "high",
    question: "What factors determine the effects of G-forces on a crewmember's body?",
    options: [
      "Only the magnitude of G-force",
      "Magnitude, duration, onset rate, body position, and individual tolerance",
      "Only aircraft type and altitude",
      "Weight and height of the pilot"
    ],
    correctAnswer: 1,
    explanation: "Five factors determine G-force effects: (1) Magnitude - level of G-force applied, (2) Duration - how long G is sustained, (3) Onset rate - how rapidly G increases (rapid onset reduces tolerance), (4) Body position - reclined seats increase tolerance by reducing blood pooling distance, and (5) Individual tolerance - varies by fitness, fatigue, hydration, and other factors. Understanding these helps predict and prevent G-related problems.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recall the five factors determining the effects of G force on a crewmember's body"
  },

  {
    id: "ap-mc-051",
    category: "Acceleration",
    topic: "AGSM",
    difficulty: "critical",
    question: "What are the key elements of correctly performing the Anti-G Straining Maneuver (AGSM)?",
    options: [
      "Hold your breath and tense all muscles",
      "Breathe normally and relax",
      "Tense muscles of legs, abdomen, and arms while performing a 3-second strain cycle: forcefully exhale against closed glottis for 3 seconds (straining), rapid breath exchange, repeat",
      "Hyperventilate before the G onset"
    ],
    correctAnswer: 2,
    explanation: "Correct AGSM: (1) Tense muscles of legs, abdomen, and arms (buttocks, thighs, calves, abs), (2) Begin 3-second strain cycle - close glottis and forcefully exhale against it for ~3 seconds (while keeping muscles tensed), (3) Quick breath exchange (open glottis briefly, inhale/exhale rapidly), (4) Immediately resume strain. Continue cycling throughout G exposure. Common errors: holding breath too long, inadequate muscle tension, improper timing.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the elements involved in correctly performing the AGSM"
  },

  {
    id: "ap-mc-052",
    category: "Acceleration",
    topic: "G-Suit",
    difficulty: "medium",
    question: "What level of protection does a properly fitted and functioning G-suit provide?",
    options: [
      "Complete protection from all G-forces",
      "Approximately 1-1.5 G of protection by applying pressure to lower extremities and abdomen",
      "Protection only during low G maneuvers",
      "No significant protection; psychological benefit only"
    ],
    correctAnswer: 1,
    explanation: "A properly fitted and functioning G-suit provides approximately 1 to 1.5 G of additional protection. It works by inflating bladders that apply external pressure to the legs and lower abdomen, reducing blood pooling in lower extremities during positive Gz. However, the G-suit alone is NOT sufficient - the AGSM must still be performed. The combination of G-suit and AGSM provides maximum protection.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recall G-suit function and level of protection provided"
  },

  // AP112 - Performance Threats Management Questions
  {
    id: "ap-mc-053",
    category: "Performance Threats Management",
    topic: "Alcohol Effects",
    difficulty: "critical",
    question: "What is the Air Force policy concerning alcohol consumption by crewmembers before flight?",
    options: [
      "No alcohol 8 hours before flight",
      "No alcohol 12 hours before flight or within the minimum crew rest period, whichever is longer",
      "Moderate alcohol consumption permitted if not intoxicated",
      "No alcohol 24 hours before flight"
    ],
    correctAnswer: 1,
    explanation: "Per AFMAN 11-202 Volume 3, crewmembers are prohibited from consuming alcohol within 12 hours of flight or within the minimum crew rest period, whichever is longer. Alcohol has both immediate effects (impaired judgment, coordination, vision) and residual effects (hangover, fatigue, dehydration) that degrade performance. Even small amounts can impair night vision and increase susceptibility to hypoxia and DCS.",
    limitation: false,
    objectiveType: "memorize",
    learningObjective: "Memorize Air Force policy concerning alcohol consumption by crewmembers"
  },

  {
    id: "ap-mc-054",
    category: "Performance Threats Management",
    topic: "Hypoglycemia",
    difficulty: "high",
    question: "What are the effects of hypoglycemia (low blood sugar) on aircrew performance?",
    options: [
      "Improved alertness and energy",
      "Symptoms similar to hypoxia: weakness, trembling, confusion, sweating, headache, impaired judgment, and possible unconsciousness",
      "No significant effects",
      "Only affects diabetic pilots"
    ],
    correctAnswer: 1,
    explanation: "Hypoglycemia causes symptoms very similar to hypoxia: weakness, trembling, confusion, nervousness, sweating, headache, blurred vision, impaired judgment, and can progress to unconsciousness. It results from skipping meals, excessive exercise, or eating high-sugar foods that cause insulin spike. Prevention: eat balanced meals with complex carbohydrates before flight, avoid high-sugar foods/drinks, carry snacks for long flights.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the effects of hypoglycemia"
  },

  {
    id: "ap-mc-055",
    category: "Performance Threats Management",
    topic: "Dehydration",
    difficulty: "high",
    question: "What are signs and symptoms of dehydration and why is it particularly dangerous in aviation?",
    options: [
      "Only excessive thirst; not dangerous",
      "Symptoms include fatigue, headache, dizziness, decreased performance, dark urine; dangerous because it increases susceptibility to hypoxia, DCS, and G-LOC",
      "Skin rash only",
      "Dehydration only occurs in hot weather"
    ],
    correctAnswer: 1,
    explanation: "Dehydration symptoms: fatigue, headache, dizziness, decreased cognitive performance, dry mouth, dark urine, decreased urine output. In aviation, dehydration is especially dangerous because it: increases blood viscosity (raising DCS risk), decreases G-tolerance, increases hypoxia susceptibility, and impairs cognitive function. Prevention: drink water before/during flight, avoid caffeine/alcohol excess, monitor urine color (should be light yellow).",
    limitation: false,
    objectiveType: "recognize",
    learningObjective: "Recognize the signs and symptoms associated with dehydration"
  },

  {
    id: "ap-mc-056",
    category: "Performance Threats Management",
    topic: "Fatigue",
    difficulty: "high",
    question: "What is the difference between acute and chronic fatigue?",
    options: [
      "No practical difference",
      "Acute fatigue results from a single period of inadequate rest and is relieved by proper sleep; chronic fatigue accumulates over time from repeated inadequate rest and requires extended recovery",
      "Acute is physical; chronic is mental",
      "Acute is dangerous; chronic is not"
    ],
    correctAnswer: 1,
    explanation: "Acute fatigue results from a single period of inadequate rest or sustained activity and can be relieved by one period of proper sleep (8+ hours). Chronic fatigue accumulates over time from repeated inadequate rest, sustained operations, or continuous stress. It requires extended recovery (multiple days/weeks). Both impair judgment, reaction time, and decision-making. Chronic fatigue is insidious and may not be recognized by the affected individual.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recall definition of both chronic and acute fatigue"
  },

  {
    id: "ap-mc-057",
    category: "Performance Threats Management",
    topic: "Caffeine",
    difficulty: "medium",
    question: "What are the potential negative effects of excessive caffeine consumption for aircrew?",
    options: [
      "No negative effects; caffeine only helps performance",
      "Fine motor tremors, increased anxiety, sleep disruption, tolerance requiring increased doses, withdrawal symptoms, and potential cardiac effects",
      "Only stomach upset",
      "Addiction only; no performance effects"
    ],
    correctAnswer: 1,
    explanation: "While moderate caffeine can improve alertness, excessive use causes: fine motor tremors (affecting precision tasks), increased anxiety/jitteriness, sleep disruption (when used late in day), rapid tolerance development (requiring escalating doses), withdrawal symptoms (headache, fatigue when stopped), increased heart rate, and potential dehydration. Strategic use: moderate doses (100-200mg) timed properly, avoid late in day, maintain hydration.",
    limitation: false,
    objectiveType: "recognize",
    learningObjective: "Recognize hypercaffeination effects, post-usage and withdrawal threats"
  },

  {
    id: "ap-mc-058",
    category: "Performance Threats Management",
    topic: "Thermal Stress",
    difficulty: "medium",
    question: "How does thermal stress (heat/cold) affect aircrew performance and other physiological threats?",
    options: [
      "No significant impact on performance",
      "Heat/cold stress impairs cognitive function, increases fatigue, decreases G-tolerance, and exacerbates hypoxia, dehydration, and DCS susceptibility",
      "Only causes physical discomfort",
      "Improves alertness through stress response"
    ],
    correctAnswer: 1,
    explanation: "Thermal stress impacts: cognitive function decline, increased fatigue, decreased G-tolerance, impaired decision-making, and distraction. Heat stress causes sweating/dehydration (increasing DCS risk), increased cardiac workload, and heat exhaustion/stroke risk. Cold stress causes shivering, decreased dexterity, and vasoconstriction. Both exacerbate other physiological threats. Countermeasures: proper clothing layers, hydration, cockpit temperature management.",
    limitation: false,
    objectiveType: "identify",
    learningObjective: "Identify the exacerbating effects thermal stress causes on the other physiological threats"
  },

  {
    id: "ap-mc-059",
    category: "Performance Threats Management",
    topic: "Smoking Effects",
    difficulty: "high",
    question: "What physiological effects does smoking/tobacco use have on aircrew?",
    options: [
      "No significant effects on flight performance",
      "Carbon monoxide binds to hemoglobin (causing hypemic hypoxia), increases physiological altitude ~5,000 ft, decreases night vision, and impairs healing",
      "Only long-term health effects; no immediate impact",
      "Improved stress management"
    ],
    correctAnswer: 1,
    explanation: "Smoking causes: (1) Carbon monoxide (CO) has 200-250x greater affinity for hemoglobin than oxygen, causing hypemic hypoxia, (2) Increases physiological altitude by ~5,000 feet (making you more susceptible to altitude hypoxia), (3) Decreases night vision adaptation, (4) Increases respiratory infections, (5) Impairs wound healing. Effects last several hours after smoking. Smokeless tobacco also contains CO and nicotine affecting performance.",
    limitation: false,
    objectiveType: "recall",
    learningObjective: "Recall the immediate and residual effects of smoking and smokeless tobacco"
  },

  // AP113 - Oxygen Equipment Questions
  {
    id: "ap-mc-060",
    category: "Oxygen Equipment",
    topic: "Oxygen Systems",
    difficulty: "medium",
    question: "What are the two types of oxygen delivery systems used in aircraft?",
    options: [
      "High pressure and low pressure",
      "Continuous flow and diluter demand (pressure demand)",
      "Emergency and normal",
      "Gaseous and liquid"
    ],
    correctAnswer: 1,
    explanation: "The two oxygen delivery systems are: (1) Continuous flow - oxygen flows continuously at a constant rate (used in some older aircraft and emergency systems), wasteful but simple, and (2) Diluter demand/Pressure demand - delivers oxygen only on inhalation, mixes with air at lower altitudes, provides pressure breathing at high altitudes. Most modern military aircraft use pressure demand regulators for efficiency.",
    limitation: false,
    objectiveType: "describe",
    learningObjective: "Describe the characteristics of the two types of oxygen delivery systems"
  },

  {
    id: "ap-mc-061",
    category: "Oxygen Equipment",
    topic: "OBOGS",
    difficulty: "medium",
    question: "What is the primary advantage of the On-Board Oxygen Generating System (OBOGS) compared to stored oxygen systems?",
    options: [
      "OBOGS is cheaper to maintain",
      "OBOGS eliminates need to refill/replace oxygen supplies between flights by extracting oxygen from engine bleed air",
      "OBOGS provides higher oxygen concentration",
      "OBOGS is lighter weight"
    ],
    correctAnswer: 1,
    explanation: "OBOGS extracts oxygen from engine bleed air using molecular sieve technology, eliminating the need for ground servicing of oxygen between flights. This provides unlimited oxygen supply (as long as engines run) and increased operational flexibility. The T-6 uses OBOGS. However, emergency oxygen systems (green ring) are still required as backup. OBOGS requires monitoring for contamination and proper function.",
    limitation: false,
    objectiveType: "describe",
    learningObjective: "Describe the functions of the OBOGS panel regulator"
  },

  {
    id: "ap-mc-062",
    category: "Oxygen Equipment",
    topic: "RICE Check",
    difficulty: "critical",
    question: "What does the acronym RICE stand for in oxygen system checks?",
    options: [
      "Regulator, Indicator, Connections, Emergency",
      "Ready, Inspect, Check, Evaluate",
      "Refill, Install, Connect, Enable",
      "Respiration, Inhalation, Circulation, Exhalation"
    ],
    correctAnswer: 0,
    explanation: "RICE check: (R) Regulator - check function, switches, proper settings; (I) Indicator - verify oxygen flow indicator functions on inhalation; (C) Connections - check mask-to-regulator connection security, hose condition; (E) Emergency - verify emergency oxygen system accessible and functional. This systematic check ensures oxygen equipment is fully functional before flight. Oxygen equipment preflight is crewmember responsibility and critical for safety.",
    limitation: false,
    objectiveType: "describe",
    learningObjective: "Describe the procedures necessary to perform a Regulator-Indicator-Connections-Emergency (RICE) check"
  }
];

// Export for use in applications
if (typeof module !== 'undefined' && module.exports) {
  module.exports = apMultipleChoiceQuestions;
}

// Summary Statistics
console.log(`Total Questions Generated: ${apMultipleChoiceQuestions.length}`);
console.log(`\nBreakdown by Lesson:`);
const lessonCounts = {};
apMultipleChoiceQuestions.forEach(q => {
  lessonCounts[q.category] = (lessonCounts[q.category] || 0) + 1;
});
Object.entries(lessonCounts).forEach(([lesson, count]) => {
  console.log(`  ${lesson}: ${count} questions`);
});

console.log(`\nBreakdown by Difficulty:`);
const difficultyCounts = {};
apMultipleChoiceQuestions.forEach(q => {
  difficultyCounts[q.difficulty] = (difficultyCounts[q.difficulty] || 0) + 1;
});
Object.entries(difficultyCounts).forEach(([difficulty, count]) => {
  console.log(`  ${difficulty}: ${count} questions`);
});
