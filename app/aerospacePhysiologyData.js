// T-6A Aerospace Physiology Study Guide Questions
// Based on Student-Provided SOBs - 50 Multiple Choice Questions
// 100% SOB Coverage - All 47 SOBs Covered

export const aerospacePhysiologyTopics = {
  introduction_atmosphere: "AP 101 - Introduction and Atmosphere",
  respiration_circulation: "AP 102 - Respiration and Circulation",
  altitude_threats: "AP 103 - Altitude Threats",
  cabin_pressurization: "AP 104 - Cabin Pressurization",
  vision: "AP 105 - Vision",
  night_vision: "AP 106 - Night Vision",
  situational_awareness: "AP 107 - Situational Awareness",
  spatial_disorientation: "AP 108 - Spatial Disorientation",
  barany_chair: "AP 109 - Barany Chair",
  noise_vibration: "AP 110 - Noise and Vibration",
  acceleration: "AP 111 - Acceleration",
  performance_threats: "AP 112 - Performance Threat Management",
  oxygen_equipment: "AP 113 - Oxygen Equipment",
};

export const aerospacePhysiologyQuestions = {
  multipleChoice: [
    // AP 101 - Introduction and Atmosphere (6 questions)
    {
      id: "ap-mc-001",
      category: "AP 101 - Introduction and Atmosphere",
      topic: "Human Factors",
      difficulty: "medium",
      question: "What is the primary goal of Human Factors in aviation?",
      options: [
        "To optimize the relationship between people and their activities in the flying environment",
        "To maximize aircraft performance through advanced engineering and design improvements",
        "To reduce maintenance costs by implementing standardized procedures across all platforms",
        "To eliminate all risks associated with human error through automation and redundancy",
      ],
      correctAnswer: 0,
      explanation:
        "Human Factors is defined as optimizing the relationship between people and their activities. The SHELL model (Software, Hardware, Environment, Liveware, Liveware) is used to identify HF challenges in USAF aviation. Human factors has accounted for the majority of aviation accidents.",
      limitation: false,
    },
    {
      id: "ap-mc-002",
      category: "AP 101 - Introduction and Atmosphere",
      topic: "Atmospheric Composition",
      difficulty: "easy",
      question:
        "What is the correct composition of gases in Earth's atmosphere?",
      options: [
        "78% Nitrogen, 21% Oxygen, 1% Other gases including carbon dioxide and argon",
        "68% Nitrogen, 31% Oxygen, 1% Other gases including hydrogen and helium",
        "88% Nitrogen, 11% Oxygen, 1% Other gases including methane and neon",
        "58% Nitrogen, 41% Oxygen, 1% Other gases including water vapor and ozone",
      ],
      correctAnswer: 0,
      explanation:
        "Earth's atmosphere consists of 78% Nitrogen, 21% Oxygen, and 1% Other gases. While the percentage of oxygen remains constant at altitude, the partial pressure of oxygen decreases, which is why supplemental oxygen is required above 10,000 feet.",
      limitation: false,
    },
    {
      id: "ap-mc-003",
      category: "AP 101 - Introduction and Atmosphere",
      topic: "Standard Atmosphere",
      difficulty: "medium",
      question: "What defines the U.S. Standard Atmosphere at sea level?",
      options: [
        "+15°C temperature and 760 mmHg pressure (equivalent to 29.92 inches of mercury)",
        "+20°C temperature and 750 mmHg pressure (equivalent to 29.53 inches of mercury)",
        "+10°C temperature and 770 mmHg pressure (equivalent to 30.31 inches of mercury)",
        "+25°C temperature and 740 mmHg pressure (equivalent to 29.13 inches of mercury)",
      ],
      correctAnswer: 0,
      explanation:
        "The U.S. Standard Atmosphere is defined as +15°C and 760 mmHg (29.92 inHg) at sea level. The standard temperature lapse rate is -2°C per 1,000 feet, meaning temperature decreases as altitude increases.",
      limitation: false,
    },
    {
      id: "ap-mc-004",
      category: "AP 101 - Introduction and Atmosphere",
      topic: "Physiological Zones",
      difficulty: "medium",
      question:
        "Which altitude ranges correctly define the three physiological divisions of the atmosphere?",
      options: [
        "Physiological Zone (sea level to 10,000 ft), Physiological Deficient Zone (10,000-50,000 ft), Space Equivalent Zone (above 50,000 ft)",
        "Physiological Zone (sea level to 18,000 ft), Physiological Deficient Zone (18,000-40,000 ft), Space Equivalent Zone (above 40,000 ft)",
        "Physiological Zone (sea level to 8,000 ft), Physiological Deficient Zone (8,000-45,000 ft), Space Equivalent Zone (above 45,000 ft)",
        "Physiological Zone (sea level to 12,000 ft), Physiological Deficient Zone (12,000-55,000 ft), Space Equivalent Zone (above 55,000 ft)",
      ],
      correctAnswer: 0,
      explanation:
        "The Physiological Zone extends from sea level to 10,000 feet where humans can function normally. The Physiological Deficient Zone (10,000-50,000 ft) requires supplemental oxygen. The Space Equivalent Zone (above 50,000 ft) requires pressurization and full pressure suits.",
      limitation: false,
    },
    {
      id: "ap-mc-005",
      category: "AP 101 - Introduction and Atmosphere",
      topic: "Partial Pressure",
      difficulty: "easy",
      question: "What is the correct notation for partial pressure of oxygen?",
      options: [
        "PO₂ representing the portion of total pressure contributed by oxygen molecules",
        "PPO₂ representing the percentage of oxygen present in atmospheric mixture",
        "O₂P representing the oxygenation potential of the surrounding environment",
        "psi O₂ representing the pounds per square inch of oxygen concentration",
      ],
      correctAnswer: 0,
      explanation:
        "Partial pressure notation uses 'P' followed by the chemical symbol. PO₂ for oxygen, PCO₂ for carbon dioxide, PN₂ for nitrogen. Dalton's Law states that total atmospheric pressure equals the sum of all partial pressures.",
      limitation: false,
    },
    {
      id: "ap-mc-006",
      category: "AP 101 - Introduction and Atmosphere",
      topic: "Gas Laws",
      difficulty: "hard",
      question:
        "A pilot opens a carbonated drink at altitude and notices bubbles forming rapidly. Which gas law best explains this phenomenon?",
      options: [
        "Henry's Law - the amount of gas dissolved in liquid varies directly with partial pressure",
        "Boyle's Law - gas volume changes inversely with surrounding atmospheric pressure",
        "Dalton's Law - total pressure equals the sum of all partial pressures present",
        "Ideal Gas Law - describes gas behavior using temperature, pressure, and volume relationships",
      ],
      correctAnswer: 0,
      explanation:
        "Henry's Law states that the amount of gas in solution varies directly with partial pressure. As altitude increases and pressure decreases, dissolved CO₂ comes out of solution. This same principle explains decompression sickness when nitrogen comes out of body fluids.",
      limitation: false,
    },

    // AP 102 - Respiration and Circulation (4 questions)
    {
      id: "ap-mc-007",
      category: "AP 102 - Respiration and Circulation",
      topic: "Respiratory System",
      difficulty: "medium",
      question:
        "All of the following are functions of the respiratory system EXCEPT:",
      options: [
        "Production of red blood cells and antibodies for immune system defense mechanisms",
        "Intake, filtering and conditioning of air by warming and humidifying for lung protection",
        "Gas exchange between oxygen and carbon dioxide through alveolar-capillary interface",
        "Maintaining acid-base balance of blood pH through regulation of carbon dioxide levels",
      ],
      correctAnswer: 0,
      explanation:
        "The respiratory system functions include: intake/filtering/conditioning of air, gas exchange, temperature regulation, metabolic function, and maintaining acid-base balance (pH) of blood. Red blood cell production occurs in bone marrow, not the respiratory system.",
      limitation: false,
    },
    {
      id: "ap-mc-008",
      category: "AP 102 - Respiration and Circulation",
      topic: "Phases of Respiration",
      difficulty: "hard",
      question:
        "What are the five phases of respiration in correct sequential order?",
      options: [
        "Ventilation → Diffusion (1) → Transportation → Diffusion (2) → Utilization of oxygen",
        "Inhalation → Oxygenation → Circulation → Cellular Exchange → Energy Production",
        "Breathing → Gas Transfer → Blood Transport → Tissue Delivery → Metabolic Conversion",
        "Inspiration → Alveolar Exchange → Hemoglobin Binding → Capillary Release → ATP Synthesis",
      ],
      correctAnswer: 0,
      explanation:
        "The five phases are: (1) Ventilation - inhalation/exhalation, (2) Diffusion - O₂/CO₂ through alveolar membrane into blood, (3) Transportation - blood carries O₂ to tissues, (4) Diffusion - O₂ moves to cells, (5) Utilization - cells use O₂ for energy production.",
      limitation: false,
    },
    {
      id: "ap-mc-009",
      category: "AP 102 - Respiration and Circulation",
      topic: "Circulatory System",
      difficulty: "medium",
      question:
        "What is the primary function of red blood cells in oxygen delivery?",
      options: [
        "Transport oxygen bound to hemoglobin and remove carbon dioxide waste from tissues",
        "Generate antibodies and fight infections throughout the cardiovascular system",
        "Regulate body temperature through vasodilation and vasoconstriction mechanisms",
        "Produce clotting factors and prevent hemorrhage in damaged blood vessels",
      ],
      correctAnswer: 0,
      explanation:
        "Red blood cells contain hemoglobin which binds to oxygen for transport to tissues and carries CO₂ away. The circulatory system transports nutrients and oxygen while removing waste products. The heart has 4 chambers functioning as two pumps.",
      limitation: false,
    },
    {
      id: "ap-mc-010",
      category: "AP 102 - Respiration and Circulation",
      topic: "Oxygen Delivery Factors",
      difficulty: "hard",
      question:
        "Which aviation-related factors can adversely affect oxygen delivery to tissues?",
      options: [
        "Altitude exposure, G-forces, and toxic gases or substances that impair delivery",
        "Cabin temperature, humidity levels, and barometric pressure changes only",
        "Aircraft vibration, noise levels, and electromagnetic interference exclusively",
        "Mission duration, workload stress, and communication requirements primarily",
      ],
      correctAnswer: 0,
      explanation:
        "Three main aviation factors affect oxygen delivery: (1) Altitude - reduces PO₂ causing hypoxic hypoxia, (2) G-forces - cause blood pooling leading to stagnant hypoxia, (3) Toxic gases/substances - cause hypemic or histotoxic hypoxia reducing oxygen carrying capacity or cellular usage.",
      limitation: false,
    },

    // AP 103 - Altitude Threats (12 questions)
    {
      id: "ap-mc-011",
      category: "AP 103 - Altitude Threats",
      topic: "Hypoxia Definition",
      difficulty: "easy",
      question: "What is the correct definition of hypoxia?",
      options: [
        "Oxygen deficiency sufficient to cause impairment of body function and performance",
        "Complete absence of oxygen molecules in blood circulation and tissue cells",
        "Reduced atmospheric pressure exposure occurring at altitudes above 10,000 feet",
        "Carbon dioxide accumulation in bloodstream causing acidosis and organ damage",
      ],
      correctAnswer: 0,
      explanation:
        "Hypoxia is defined as oxygen deficiency sufficient to cause impairment of function. The danger is that onset may not be recognized by the individual experiencing it, making it extremely dangerous in flight operations.",
      limitation: false,
    },
    {
      id: "ap-mc-012",
      category: "AP 103 - Altitude Threats",
      topic: "Types of Hypoxia",
      difficulty: "hard",
      question:
        "A pilot who smokes cigarettes before flight experiences oxygen equipment failure at altitude. What type(s) of hypoxia is the pilot experiencing?",
      options: [
        "Both hypoxic hypoxia from equipment failure and hypemic hypoxia from carbon monoxide",
        "Hypoxic hypoxia from reduced atmospheric oxygen pressure at altitude exclusively",
        "Hypemic hypoxia from cigarette smoke reducing oxygen carrying capacity only",
        "Histotoxic hypoxia from toxins preventing cellular utilization of oxygen molecules",
      ],
      correctAnswer: 0,
      explanation:
        "The pilot has two types: Hypoxic hypoxia (equipment failure reducing PO₂) and Hypemic hypoxia (smoking increases CO which has 200-250x greater affinity for hemoglobin than oxygen, reducing oxygen-carrying capacity). These effects are cumulative.",
      limitation: false,
    },
    {
      id: "ap-mc-013",
      category: "AP 103 - Altitude Threats",
      topic: "Hypoxia Symptoms",
      difficulty: "medium",
      question:
        "Which symptoms are specifically associated with hypoxic hypoxia exposure?",
      options: [
        "Dizziness, hot/cold flashes, tingling, tunnel vision, and euphoria or dysphoria",
        "Headache, fatigue, weakness, rapid breathing, and blue coloration of skin",
        "Grey-out, blackout, cold clammy skin, numbness, and complete loss of vision",
        "Impaired coordination, confusion, slurred speech, and drowsiness or lethargy",
      ],
      correctAnswer: 0,
      explanation:
        "Hypoxic hypoxia symptoms include dizziness, hot/cold flashes, tingling, tunnel vision, visual impairment, and euphoria/dysphoria. Different types of hypoxia have distinct symptoms: hypemic (headache, blue color), stagnant (grey-out/blackout), histotoxic (impaired coordination, confusion).",
      limitation: false,
    },
    {
      id: "ap-mc-014",
      category: "AP 103 - Altitude Threats",
      topic: "Hypoxia Prevention",
      difficulty: "medium",
      question: "Which methods are effective for preventing hypoxic hypoxia?",
      options: [
        "Cabin pressurization, preflight oxygen equipment checks, PRICE check, and proper oxygen use",
        "Anti-G straining maneuver, proper hydration, physical fitness, and nutritional supplements",
        "Controlled breathing rate, mental preparation, workload management, and stress reduction",
        "Thermal regulation, proper rest, medication avoidance, and communication procedures",
      ],
      correctAnswer: 0,
      explanation:
        "Hypoxic hypoxia prevention includes: cabin pressurization (keeps cabin altitude low), preflight oxygen equipment inspection, PRICE check (Pressure, Regulator, Indicator, Connections, Emergency), and proper use of oxygen equipment throughout flight.",
      limitation: false,
    },
    {
      id: "ap-mc-015",
      category: "AP 103 - Altitude Threats",
      topic: "Hypoxia Treatment",
      difficulty: "critical",
      question:
        "What are the correct procedures to treat hypoxia in the T-6 aircraft?",
      options: [
        "Pull green ring, OBOGS supply lever OFF (both), BOS push button, descend below 10,000 ft",
        "Check oxygen connections, increase breathing rate, communicate with instructor, level flight",
        "Emergency descent profile, declare emergency, maximum airspeed, land immediately at nearest field",
        "Reduce workload, transfer controls, oxygen regulator to 100%, initiate controlled descent",
      ],
      correctAnswer: 0,
      explanation:
        "BOLDFACE: (1) GREEN RING - PULL (AS REQUIRED), (2) OBOGS SUPPLY LEVER - OFF (BOTH), (3) BOS PUSH MAN - PRESS ON, (4) DESCENT BELOW 10,000 FEET MSL - INITIATE. Maximum oxygen under pressure is critical given short Time of Useful Consciousness at altitude.",
      limitation: false,
    },
    {
      id: "ap-mc-016",
      category: "AP 103 - Altitude Threats",
      topic: "Hypocapnia",
      difficulty: "medium",
      question: "What is the primary cause of hypocapnia in flight operations?",
      options: [
        "Abnormally increased rate and depth of breathing causing large loss of carbon dioxide",
        "Inadequate oxygen supply from equipment malfunction reducing blood oxygen saturation",
        "Exposure to toxic fumes in cockpit environment impairing respiratory function",
        "Excessive G-forces causing blood pooling and reduced circulation to brain tissue",
      ],
      correctAnswer: 0,
      explanation:
        "Hypocapnia is a condition where rate and depth of breathing is abnormally increased, causing large loss of CO₂. Emotional causes include fear, anxiety, stress, and tension. Symptoms include increased breathing rate, muscle tightness, paleness, cold clammy skin, and muscle spasms.",
      limitation: false,
    },
    {
      id: "ap-mc-017",
      category: "AP 103 - Altitude Threats",
      topic: "Physiological Symptoms Treatment",
      difficulty: "critical",
      question:
        "Why are all physiological symptoms (hypoxia, hypocapnia, etc.) treated the same way?",
      options: [
        "Symptoms may be confused or occur simultaneously, making distinction impractical during emergency",
        "Because all physiological conditions share identical underlying root causes and mechanisms",
        "To minimize time delay when executing emergency aircraft checklist procedures rapidly",
        "Because hypoxia is the only condition that actually poses danger to aircrew safety",
      ],
      correctAnswer: 0,
      explanation:
        "All physiological symptoms are treated the same because hypoxia, hypocapnia, toxic exposure, hypoglycemia, and dehydration have very similar symptoms that may be confused or occur simultaneously. Time should not be wasted trying to distinguish causes - treat all with immediate oxygen.",
      limitation: false,
    },
    {
      id: "ap-mc-018",
      category: "AP 103 - Altitude Threats",
      topic: "Trapped Gas",
      difficulty: "medium",
      question:
        "According to Boyle's Law, when do trapped gases in body cavities cause the most problems?",
      options: [
        "During descent when pressure differential prevents equalization of middle ear and sinuses",
        "During cruise flight at constant altitude with stable pressure throughout the body",
        "During ascent phase as expanding gas cannot escape body cavities properly",
        "Only during rapid decompression events occurring at high altitude above 25,000 feet",
      ],
      correctAnswer: 0,
      explanation:
        "While gas expands during ascent, trapped gas problems occur more often during descent. The Eustachian tube acts like a one-way valve - gas vents easily during ascent, but ambient pressure forces the eardrum inward during descent requiring active equalization (Valsalva maneuver).",
      limitation: false,
    },
    {
      id: "ap-mc-019",
      category: "AP 103 - Altitude Threats",
      topic: "Trapped Gas Prevention",
      difficulty: "easy",
      question:
        "What is the most effective method to equalize pressure in the middle ear during descent?",
      options: [
        "Valsalva maneuver - close mouth, pinch nose, exhale forcefully to open Eustachian tube",
        "Swallowing or yawning repeatedly during descent to open Eustachian tubes naturally",
        "Moving head from side to side during pressure changes to shift fluid in inner ear",
        "Waiting until you feel ear pain before attempting any equalization methods or techniques",
      ],
      correctAnswer: 0,
      explanation:
        "The Valsalva maneuver is most effective: close mouth, pinch nose closed, forcefully exhale. This forces air through the Eustachian tube equalizing pressure. Use frequently during descent without waiting for discomfort. If pressure differential exceeds 80 mmHg, ear block can occur.",
      limitation: false,
    },
    {
      id: "ap-mc-020",
      category: "AP 103 - Altitude Threats",
      topic: "Decompression Sickness",
      difficulty: "high",
      question: "What is the primary cause of decompression sickness (DCS)?",
      options: [
        "Nitrogen gas evolution from body tissues and fluids forming bubbles at reduced pressure",
        "Rapid pressure changes causing mechanical lung tissue damage and alveolar rupture",
        "Excessive oxygen saturation causing free radical damage in body tissues at altitude",
        "Carbon dioxide accumulation in bloodstream causing acidosis and tissue hypoxia symptoms",
      ],
      correctAnswer: 0,
      explanation:
        "DCS is caused by nitrogen gas coming out of solution (Henry's Law) and forming bubbles in blood, body fluids, and tissues as atmospheric pressure decreases. Can occur in joints (bends), CNS, lungs (chokes), or skin (creeps). Threshold altitude is 21,200 feet without pre-oxygenation.",
      limitation: false,
    },
    {
      id: "ap-mc-021",
      category: "AP 103 - Altitude Threats",
      topic: "DCS Types",
      difficulty: "high",
      question:
        "A crewmember at altitude experiences deep sharp pain under the sternum, dry cough, and difficulty breathing. What type of DCS is this?",
      options: [
        "The Chokes - pulmonary symptoms affecting lung tissue requiring immediate descent",
        "The Bends - joint and muscle pain typically occurring in knees and shoulders",
        "The Creeps - skin symptoms including tingling, numbness, and pins-and-needles sensation",
        "CNS Manifestations - neurological symptoms causing severe headaches and visual disturbances",
      ],
      correctAnswer: 0,
      explanation:
        "The Chokes is a rare but dangerous DCS type affecting lungs with symptoms of deep sharp pain centrally located under sternum, dry nonproductive cough, difficulty with inspiration, and sense of suffocation. Immediate descent necessary; symptoms similar to heart attack.",
      limitation: false,
    },
    {
      id: "ap-mc-022",
      category: "AP 103 - Altitude Threats",
      topic: "DCS Prevention",
      difficulty: "medium",
      question:
        "Why should crewmembers avoid strenuous exercise for 12 hours after high altitude exposure?",
      options: [
        "To avoid dislodging nitrogen bubbles that could migrate to critical organs and brain",
        "To prevent accumulated muscle fatigue and lactic acid buildup from altitude exposure",
        "To allow cardiovascular system adequate time to restore normal blood oxygen saturation",
        "To prevent exercise-induced dehydration which compounds existing fluid loss from altitude",
      ],
      correctAnswer: 0,
      explanation:
        "Physical activity can dislodge nitrogen bubbles from joints, increasing risk they'll travel to dangerous locations (brain/lungs). If asymptomatic bubbles in lungs pass to arteries as cardiac output increases, serious DCS symptoms may arise. No strenuous exercise for 12 hours post-exposure.",
      limitation: false,
    },

    // AP 104 - Cabin Pressurization (3 questions)
    {
      id: "ap-mc-023",
      category: "AP 104 - Cabin Pressurization",
      topic: "Pressurization Systems",
      difficulty: "medium",
      question:
        "What is the primary advantage of cabin pressurization systems in aircraft?",
      options: [
        "Minimizing hazards of DCS, hypoxia, and fatigue by maintaining effective cabin altitude",
        "Increased fuel efficiency at high altitude through optimized engine performance",
        "Allowing flight above weather systems to avoid turbulence and icing conditions",
        "Reducing engine wear during high altitude operations through better air density",
      ],
      correctAnswer: 0,
      explanation:
        "Cabin pressurization provides the most effective protection from high altitude environments by minimizing hazards of decompression sickness, hypoxia, and fatigue. Systems maintain increased cabin pressure by pumping pressurized conditioned air from jet engine compressor.",
      limitation: false,
    },
    {
      id: "ap-mc-024",
      category: "AP 104 - Cabin Pressurization",
      topic: "Pressurization Types",
      difficulty: "hard",
      question:
        "What is the difference between Isobaric and Isobaric Differential pressurization?",
      options: [
        "Isobaric (heavies/commercial) maintains constant cabin altitude; Isobaric Differential (fighters/trainers like T-6) maintains pressure differential from ambient",
        "Isobaric (fighters) varies cabin pressure with altitude; Isobaric Differential (heavies) keeps constant sea level pressure",
        "Isobaric (trainers) regulates oxygen concentration; Isobaric Differential (commercial) controls temperature and humidity",
        "Isobaric (commercial) uses manual pressure control; Isobaric Differential (fighters) uses automatic pressure regulation",
      ],
      correctAnswer: 0,
      explanation:
        "Isobaric systems (used in heavies/commercial aircraft) maintain a constant cabin altitude of 8,000 feet regardless of outside altitude. Isobaric Differential systems (used in fighters and trainers like the T-6) maintain a specific pressure differential from outside ambient pressure using a control valve regulator. The T-6 maintains 3.6 ± 0.2 psi differential.",
      limitation: false,
    },
    {
      id: "ap-mc-025",
      category: "AP 104 - Cabin Pressurization",
      topic: "Rapid Decompression",
      difficulty: "critical",
      question:
        "Which physical indications confirm that rapid decompression has occurred?",
      options: [
        "Explosive noise, fogging of cabin air, decreased temperature, wind blast with flying debris",
        "Gradual pressure change, slow temperature drop, condensation on windows, mild discomfort",
        "Silent pressure loss, increased cabin temperature, clear visibility, no physical sensation",
        "Loud alarm, red warning lights, stable temperature, minimal air movement in cockpit",
      ],
      correctAnswer: 0,
      explanation:
        "Rapid decompression (0.5-15 seconds) physical indications: explosive noise, fogging, decreased temp/pressure, wind blast/debris. Physiological indications: ear pressure, gas expansion, individual hypoxia symptoms. Procedures: 100% oxygen, pressure breathing, controlled descent.",
      limitation: false,
    },

    // AP 105 - Vision (6 questions)
    {
      id: "ap-mc-026",
      category: "AP 105 - Vision",
      topic: "Eye Anatomy",
      difficulty: "medium",
      question: "What is the function of the fovea in the human eye?",
      options: [
        "Provides best color vision and maximum visual acuity but creates blind spot at night",
        "Detects peripheral motion and movement in low light conditions during nighttime",
        "Creates anatomical blind spot where optic nerve connects to retina with no receptors",
        "Filters incoming light wavelengths to protect retina from ultraviolet radiation damage",
      ],
      correctAnswer: 0,
      explanation:
        "The fovea is part of the retina with highest density of cones, providing best color vision and max visual acuity during daytime. However, it has few rods making it a blind spot at night. Rods provide peripheral vision and night vision; cones provide color vision and detail.",
      limitation: false,
    },
    {
      id: "ap-mc-027",
      category: "AP 105 - Vision",
      topic: "Visual Fields",
      difficulty: "medium",
      question:
        "What are the characteristics of focal (central) vision during flight?",
      options: [
        "Uses cones for depth perception and 20/20 acuity in central 2-3 degrees of visual field",
        "Uses rods for subconscious processing of information and balance cues in surroundings",
        "Provides wide-angle awareness of movement and threats in peripheral visual zones",
        "Detects low-light objects and motion through scotopic vision in dark adaptation",
      ],
      correctAnswer: 0,
      explanation:
        "Focal (central) vision uses cones, provides depth perception and 20/20 acuity in narrow central field. Peripheral (ambient) vision uses rods, has poor visual acuity but processes information subconsciously for balance and orientation. Both have limitations based on contrast, shape, movement, and environmental conditions.",
      limitation: false,
    },
    {
      id: "ap-mc-028",
      category: "AP 105 - Vision",
      topic: "Scanning Technique",
      difficulty: "critical",
      question:
        "What is the correct scanning technique to avoid midair collisions during daytime?",
      options: [
        "Systematically scan sky in sectors, pausing to focus on each 10-15 degree segment for 1-2 seconds",
        "Continuously sweep eyes across entire sky in one smooth motion without stopping or pausing",
        "Focus directly ahead and use peripheral vision exclusively to detect other aircraft movement",
        "Look only where you expect other aircraft to be located based on traffic pattern procedures",
      ],
      correctAnswer: 0,
      explanation:
        "Proper daytime scanning (Z pattern) involves systematically scanning in sectors, focusing on each 10-15 degree segment for 1-2 seconds before moving to next. This allows focal vision (fovea) time to detect objects. Nighttime uses diamond pattern. Smooth sweeping doesn't allow focus time.",
      limitation: false,
    },
    {
      id: "ap-mc-029",
      category: "AP 105 - Vision",
      topic: "Visual Illusions",
      difficulty: "medium",
      question: "What is empty-field myopia and why is it dangerous in flight?",
      options: [
        "Eyes automatically focus at 10-30 feet when no visual cues present, making distant objects blurry",
        "Permanent retinal damage to vision from prolonged high altitude UV exposure",
        "Complete loss of color discrimination and visual acuity at high altitude environments",
        "Temporary visual impairment and blindness from extended viewing of clouds or haze",
      ],
      correctAnswer: 0,
      explanation:
        "Empty-field myopia occurs when viewing featureless field (clear sky/haze) - eyes automatically relax and focus at 10-30 feet, making distant objects blurry even though within visual range. Dangerous because you may not detect other aircraft even when looking in their direction.",
      limitation: false,
    },
    {
      id: "ap-mc-030",
      category: "AP 105 - Vision",
      topic: "Visual Illusions",
      difficulty: "medium",
      question:
        "Which methods can prevent the autokinesis illusion from occurring?",
      options: [
        "Avoid staring at single light for more than few seconds and use off-center viewing",
        "Increase cockpit lighting intensity to maximum brightness during all night operations",
        "Focus continuously on one reference point to maintain accurate perception of motion",
        "Close one eye alternately every 30 seconds to prevent visual system fatigue",
      ],
      correctAnswer: 0,
      explanation:
        "Autokinesis is the apparent movement of a stationary light when stared at in darkness. Prevent by avoiding staring at a single light for more than a few seconds, using off-center viewing, or using reference points to maintain accurate perception of motion.",
      limitation: false,
    },
    {
      id: "ap-mc-031",
      category: "AP 105 - Vision",
      topic: "Laser Exposure",
      difficulty: "critical",
      question:
        "What are the correct procedures to take upon exposure to lasers during flight?",
      options: [
        "Immediately avert eyes, maintain aircraft control, avoid looking directly at beam, use instruments",
        "Stare directly at source to identify location, slow aircraft, descend to lower altitude immediately",
        "Close eyes completely, transfer controls to other pilot, declare emergency on guard frequency",
        "Turn off all cockpit lights, use night vision goggles, climb to higher altitude above threat",
      ],
      correctAnswer: 0,
      explanation:
        "Upon laser exposure: immediately avert eyes, maintain aircraft control, avoid looking directly at beam, use instruments to continue flight safely. Report using LASER acronym: Location, Appearance, Scanning/Tracking, Effects, Regularity. Hazards include flash blindness, glare, retinal burns.",
      limitation: false,
    },

    // AP 106 - Night Vision (2 questions)
    {
      id: "ap-mc-032",
      category: "AP 106 - Night Vision",
      topic: "Dark Adaptation",
      difficulty: "medium",
      question: "How does dark adaptation influence night vision capabilities?",
      options: [
        "Increases eye sensitivity to low light, improving ability to detect objects and hazards at night",
        "Decreases color perception permanently, limiting ability to distinguish cockpit instruments",
        "Causes temporary blindness lasting 30-45 minutes requiring immediate landing procedures",
        "Reduces peripheral vision significantly while maintaining central focal vision acuity",
      ],
      correctAnswer: 0,
      explanation:
        "Dark adaptation allows eyes to increase sensitivity to low light, improving ability to detect objects and hazards at night. Takes up to 30 minutes for full adaptation. Use red cockpit lighting, maintain dark adaptation, employ off-center viewing, scan systematically, rely on instruments.",
      limitation: false,
    },
    {
      id: "ap-mc-033",
      category: "AP 106 - Night Vision",
      topic: "Flash Blindness",
      difficulty: "high",
      question:
        "How does flash blindness produce debilitating effects on dark adaptation?",
      options: [
        "Temporarily overwhelms retina with bright light, destroying night vision for seconds to minutes",
        "Causes permanent damage to rod cells, requiring several weeks for complete recovery",
        "Creates psychological fear response, reducing pilot's willingness to scan outside cockpit",
        "Stimulates excessive tear production, blurring vision and requiring immediate wiping",
      ],
      correctAnswer: 0,
      explanation:
        "Flash blindness temporarily overwhelms retina with bright light, destroying night vision and delaying dark adaptation for several seconds to minutes. Effects include reduced visual acuity, loss/shift of color perception, and degradation of both central (focal) and peripheral vision in low light.",
      limitation: false,
    },

    // AP 107 - Situational Awareness (4 questions)
    {
      id: "ap-mc-034",
      category: "AP 107 - Situational Awareness",
      topic: "Information Processing",
      difficulty: "easy",
      question: "What are the two primary types of information processing?",
      options: [
        "Conscious processing requiring active attention and subconscious automatic processing",
        "Visual processing through eyes and auditory processing through hearing systems",
        "Short-term memory storage and long-term memory retrieval mechanisms",
        "Analytical logical reasoning and emotional intuitive decision-making processes",
      ],
      correctAnswer: 0,
      explanation:
        "The two primary types of information processing are conscious (requiring active attention and focus) and subconscious (automatic processing without active thought). Understanding these helps manage attention and maintain situational awareness during complex flight operations.",
      limitation: false,
    },
    {
      id: "ap-mc-035",
      category: "AP 107 - Situational Awareness",
      topic: "SA Levels",
      difficulty: "medium",
      question:
        "What are the three levels of Situational Awareness in correct order?",
      options: [
        "Perception of elements, Comprehension of current situation, Projection of future status",
        "Detection of threats, Analysis of options, Execution of response actions",
        "Observation of environment, Orientation to conditions, Decision on course of action",
        "Recognition of cues, Interpretation of meaning, Implementation of corrective measures",
      ],
      correctAnswer: 0,
      explanation:
        "The three levels of SA are: (1) Perception - detecting elements in environment, (2) Comprehension - understanding what those elements mean, (3) Projection - predicting what will happen next. Effective decision-making depends on all three levels functioning properly.",
      limitation: false,
    },
    {
      id: "ap-mc-036",
      category: "AP 107 - Situational Awareness",
      topic: "Loss of SA",
      difficulty: "high",
      question:
        "Which cues indicate that a pilot may be experiencing loss of situational awareness?",
      options: [
        "Confusion, missed or delayed responses, tunnel vision, task saturation, unexpected deviations",
        "Increased confidence, smooth control inputs, early radio calls, precise navigation",
        "Clear communication, proper checklist usage, timely decision-making, relaxed demeanor",
        "Anticipation of threats, effective scanning, proper prioritization, maintained airspeed",
      ],
      correctAnswer: 0,
      explanation:
        "Loss of SA cues include: confusion, missed/delayed responses, tunnel vision, task saturation, unexpected flight path deviations, inconsistent instrument readings. Recover by reducing workload, reestablishing scan, prioritizing tasks, communicating with crew, using checklists/automation.",
      limitation: false,
    },
    {
      id: "ap-mc-037",
      category: "AP 107 - Situational Awareness",
      topic: "SA Improvement",
      difficulty: "medium",
      question:
        "Which methods are effective for improving situational awareness?",
      options: [
        "Systematic scanning, task prioritization, workload management, effective communication",
        "Increasing flight hours only, avoiding challenging weather, flying familiar routes exclusively",
        "Relying entirely on automation, minimizing crew interaction, reducing checklist usage",
        "Focusing on single task completion, ignoring distractions, maintaining rigid procedures",
      ],
      correctAnswer: 0,
      explanation:
        "Improve SA through: systematic scanning, task prioritization, workload management, effective communication, anticipating threats, using automation wisely, maintaining alertness/focus. Predominant causes of LSA include distraction, fixation, high workload, fatigue, complacency, poor communication.",
      limitation: false,
    },

    // AP 108 - Spatial Disorientation (5 questions)
    {
      id: "ap-mc-038",
      category: "AP 108 - Spatial Disorientation",
      topic: "SD Definition",
      difficulty: "medium",
      question:
        "What defines spatial disorientation and which type is most dangerous?",
      options: [
        "Inability to accurately orient with horizon; Type I (Unrecognized) is most dangerous",
        "Loss of visual references in instrument conditions; Type II (Recognized) most deadly",
        "Vestibular system confusion in flight; Type III (Incapacitating) causes most accidents",
        "Somatosensory mismatch during maneuvers; all types equally dangerous to flight safety",
      ],
      correctAnswer: 0,
      explanation:
        "Spatial disorientation is the inability to accurately orient yourself with respect to the horizon. Type I (Unrecognized) is most dangerous - pilot relies on vestibular/somatosensory instead of instruments. Type II (Recognized) allows cross-check. Type III (Incapacitating) prevents recovery even if recognized.",
      limitation: false,
    },
    {
      id: "ap-mc-039",
      category: "AP 108 - Spatial Disorientation",
      topic: "Sensory Systems",
      difficulty: "hard",
      question:
        "Which sensory system provides the strongest and most reliable orientation information?",
      options: [
        "Visual system through eyes provides most reliable cues when available in flight",
        "Vestibular system through semicircular canals gives most accurate orientation data",
        "Somatosensory system through pressure receptors provides best spatial awareness",
        "Auditory system through hearing offers most consistent orientation information",
      ],
      correctAnswer: 0,
      explanation:
        "The visual system is strongest and usually most reliable. The vestibular system (semicircular canals and otolith organs) is reliable on ground but fooled in air. Somatosensory system (tactile pressure receptors in skin/muscles/tendons/joints) is useless without correct visual cues.",
      limitation: false,
    },
    {
      id: "ap-mc-040",
      category: "AP 108 - Spatial Disorientation",
      topic: "Vestibular Illusions",
      difficulty: "high",
      question:
        "What causes The Graveyard Spiral spatial disorientation illusion?",
      options: [
        "Constant rate spin in poor visibility causes adaptation, pilot thinks spin has stopped",
        "Rapid head movement during turn stimulates multiple semicircular canals causing tumbling",
        "Gradual unnoticed bank during straight flight makes pilot feel incorrectly tilted",
        "Linear acceleration during takeoff creates false sensation of excessive nose-up pitch",
      ],
      correctAnswer: 0,
      explanation:
        "Graveyard Spiral: in poor visibility/instrument conditions during constant rate spin, semicircular canals adapt and pilot thinks they're not spinning anymore. Somatogyral illusions include The Leans (most common, incorrect bank feeling) and Coriolis Illusion (tumbling from moving head during turn).",
      limitation: false,
    },
    {
      id: "ap-mc-041",
      category: "AP 108 - Spatial Disorientation",
      topic: "SD Prevention",
      difficulty: "medium",
      question: "Which methods are used to prevent spatial disorientation?",
      options: [
        "Understand limitations, remedy correctable factors, use capabilities properly, stay alert",
        "Increase flight hours, avoid weather, fly VFR only, maintain sea level altitudes",
        "Rely on feel, trust instincts, use somatosensory cues, ignore instruments when uncomfortable",
        "Avoid head movements completely, close eyes during turns, reduce workload to zero",
      ],
      correctAnswer: 0,
      explanation:
        "Prevent SD by: understanding limitations, remedying correctable factors, using capabilities properly, recognizing high risk situations, staying alert. To overcome: transition to instruments, believe instruments, back up pilot flying, minimize head movements, fly straight/level, be prepared to transfer control.",
      limitation: false,
    },
    {
      id: "ap-mc-042",
      category: "AP 108 - Spatial Disorientation",
      topic: "Motion Sickness",
      difficulty: "medium",
      question: "What is the most widely accepted cause of motion sickness?",
      options: [
        "Conflict between visual and vestibular systems or between vestibular components",
        "Excessive G-forces causing blood pooling in lower extremities reducing brain perfusion",
        "Toxic fumes in cockpit triggering nausea response through chemoreceptors",
        "Dehydration combined with low blood sugar causing metabolic imbalance",
      ],
      correctAnswer: 0,
      explanation:
        "Motion sickness is caused by conflict between visual and vestibular system or between different components of vestibular system. Prevent/overcome by: using outside references, staying hydrated, eating properly, eliminating self-imposed threats, using cool air, breathing through nose.",
      limitation: false,
    },

    // AP 109 - Barany Chair (1 question)
    {
      id: "ap-mc-043",
      category: "AP 109 - Barany Chair",
      topic: "Illusion Recognition",
      difficulty: "easy",
      question:
        "What is the primary purpose of the Barany Chair training exercise?",
      options: [
        "Gain practical understanding of visual and vestibular limitations and susceptibility to illusions",
        "Test pilot's tolerance to high G-forces during simulated air combat maneuvering",
        "Measure cardiovascular response to rapid acceleration and deceleration forces",
        "Evaluate pilot's ability to recover from hypoxia symptoms at simulated altitude",
      ],
      correctAnswer: 0,
      explanation:
        "Barany Chair training provides practical understanding and recognition of visual and vestibular limitations and susceptibility to error. Trainees experience illusions including Graveyard Spin/Spiral, Nystagmus, and Coriolis while observing how others respond to understand effects of SD.",
      limitation: false,
    },

    // AP 110 - Noise and Vibration (3 questions)
    {
      id: "ap-mc-044",
      category: "AP 110 - Noise and Vibration",
      topic: "Noise Characteristics",
      difficulty: "medium",
      question:
        "Which characteristics of noise affect hearing capability in aviation?",
      options: [
        "Frequency in Hz (pitch), Intensity in dB (loudness), and Duration of exposure time",
        "Color of sound waves, Direction of propagation, and Speed of transmission only",
        "Amplitude modulation, Phase relationships, and Harmonic content exclusively",
        "Source location, Echo patterns, and Reverberation characteristics primarily",
      ],
      correctAnswer: 0,
      explanation:
        "Noise characteristics affecting hearing: Frequency (Hz - higher frequency = higher pitch), Intensity (dB - higher amplitude = louder sound), Duration (time of exposure). Noise is defined as unwanted sound. Can cause conductive or sensorineural hearing loss.",
      limitation: false,
    },
    {
      id: "ap-mc-045",
      category: "AP 110 - Noise and Vibration",
      topic: "Hearing Protection",
      difficulty: "medium",
      question:
        "Which protective measures minimize hazardous noise exposure in aircraft?",
      options: [
        "Earplugs, ear defenders, headsets, flight helmets, reducing exposure time, combination devices",
        "Increased cockpit ventilation, lowered seat position, tinted visor, anti-glare coating",
        "Higher cabin pressurization, warmer temperatures, filtered air supply, humidity control",
        "Padded flight suit, thermal underwear, anti-G trousers, pressure vest, insulated boots",
      ],
      correctAnswer: 0,
      explanation:
        "Minimize hazardous noise with: earplugs, ear defenders, headsets, flight helmets, reduced exposure time, creating space from noise source. Combination of protective devices is best. Nonauditory effects include speech unintelligibility, misinterpretation, increased stress/fatigue, irritability.",
      limitation: false,
    },
    {
      id: "ap-mc-046",
      category: "AP 110 - Noise and Vibration",
      topic: "Vibration Effects",
      difficulty: "medium",
      question:
        "What are the potential effects of prolonged exposure to aircraft vibration?",
      options: [
        "Increased reaction time, visual impairment, and fatigue reducing flight performance",
        "Improved muscle tone, enhanced alertness, and better coordination during operations",
        "No measurable effects on human performance or physiological systems whatsoever",
        "Permanent hearing loss, retinal detachment, and irreversible nerve damage occurring",
      ],
      correctAnswer: 0,
      explanation:
        "Vibration (rapid back and forth motion) effects include: increased reaction time, visual impairment, fatigue. Characterized by frequency, intensity, duration. Passed through body acoustically or by direct mechanical linkage. Symptoms: loss of appetite, complacency, sweating, nausea, headache, vomiting.",
      limitation: false,
    },

    // AP 111 - Acceleration (7 questions)
    {
      id: "ap-mc-047",
      category: "AP 111 - Acceleration",
      topic: "G-Force Types",
      difficulty: "easy",
      question: "What are the three types of G-force and their directions?",
      options: [
        "Transverse (Gx front-back), Negative (Gy side-side), Positive (Gz head-feet)",
        "Linear (forward-backward), Radial (side-side), Angular (rotational acceleration)",
        "Longitudinal (nose-tail), Lateral (wingtip-wingtip), Vertical (up-down only)",
        "Forward (thrust), Reverse (drag), Perpendicular (lift forces exclusively)",
      ],
      correctAnswer: 0,
      explanation:
        "Three G-force types: Transverse (Gx, front-to-back), Negative (Gy, side-to-side), Positive (Gz, up-and-down/head-to-feet). Positive Gz causes blood pooling in lower body leading to gray-out, tunnel vision, blackout, and G-LOC. Most dangerous for pilots.",
      limitation: false,
    },
    {
      id: "ap-mc-048",
      category: "AP 111 - Acceleration",
      topic: "G-Force Symptoms",
      difficulty: "medium",
      question:
        "What physical symptoms are associated with positive G-forces (Gz)?",
      options: [
        "Gray-out, tunnel vision, loss of peripheral vision, blackout, potential G-LOC as blood drains",
        "Red-out, headache, facial swelling, congestion in head and eyes, nausea from blood rushing",
        "Blood pooling in chest, difficulty breathing, mild gray-out, pressure on internal organs",
        "Increased heart rate, profuse sweating, tremors, hyperventilation, anxiety, mental confusion",
      ],
      correctAnswer: 0,
      explanation:
        "Positive Gz symptoms: gray-out, tunnel vision, loss of peripheral vision, blackout, potential G-LOC as blood drains from brain to lower body. Negative Gz causes red-out, headache, facial swelling. Transverse Gz causes blood pooling in chest/abdomen, difficulty breathing.",
      limitation: false,
    },
    {
      id: "ap-mc-049",
      category: "AP 111 - Acceleration",
      topic: "G-LOC",
      difficulty: "high",
      question:
        "What is the difference between blackout and G-induced loss of consciousness?",
      options: [
        "Blackout is vision loss while maintaining consciousness; G-LOC is complete unconsciousness",
        "Blackout occurs at lower G-forces; G-LOC only happens above 9 Gs",
        "Blackout affects peripheral vision only; G-LOC affects entire visual field",
        "Blackout is temporary and reversible; G-LOC causes permanent brain damage",
      ],
      correctAnswer: 0,
      explanation:
        "Blackout is loss of vision due to reduced blood flow to eyes while consciousness maintained. G-LOC is complete loss of consciousness from insufficient brain blood flow during high positive Gs. G-LOC has absolute incapacitation (unconscious 9-21 sec avg 15) and relative incapacitation (mental confusion, disorientation).",
      limitation: false,
    },
    {
      id: "ap-mc-050",
      category: "AP 111 - Acceleration",
      topic: "G-Tolerance",
      difficulty: "medium",
      question:
        "Which factors determine the effects of G-forces on a crewmember's body?",
      options: [
        "Magnitude of force, Duration of exposure, Rate of application, Direction, Previous exposure",
        "Aircraft weight, Altitude above ground, Outside air temperature, Fuel load remaining",
        "Pilot age, Years of experience, Number of flight hours, Type of aircraft flown",
        "Weather conditions, Time of day, Mission complexity, Communication requirements",
      ],
      correctAnswer: 0,
      explanation:
        "Physical factors: magnitude of G-force, duration of exposure, rate of application (G onset), direction of force, previous G exposure. Physiological factors: mobility, cardiovascular reflex, visual system, vestibular system. These combine to determine individual tolerance and symptoms.",
      limitation: false,
    },
    {
      id: "ap-mc-051",
      category: "AP 111 - Acceleration",
      topic: "G-Suit",
      difficulty: "medium",
      question:
        "What is the function of an Anti-G suit and its protection level?",
      options: [
        "Inflates around legs and abdomen to prevent blood pooling, extending tolerance by 1-1.5 Gs",
        "Provides full body pressure increasing G-tolerance by 5-6 Gs under all conditions",
        "Delivers supplemental oxygen directly to bloodstream increasing tolerance by 3-4 Gs",
        "Compresses chest cavity maintaining heart rate and adding 2-3 Gs protection level",
      ],
      correctAnswer: 0,
      explanation:
        "G-suit inflates around legs and abdomen to prevent blood pooling in lower body, helping maintain cerebral blood flow and extending positive G tolerance by 1-1.5 Gs. Must be combined with Anti-G Straining Maneuver (AGSM) for maximum protection.",
      limitation: false,
    },
    {
      id: "ap-mc-052",
      category: "AP 111 - Acceleration",
      topic: "AGSM",
      difficulty: "high",
      question:
        "What elements are involved in correctly performing the Anti-G Straining Maneuver?",
      options: [
        "Strong continuous muscle strain (legs, glutes, abdomen) with timed forceful exhalation",
        "Rapid shallow breathing combined with complete body relaxation and slow movements",
        "Holding breath for extended periods while maintaining loose muscle tone throughout",
        "Deep inhalation followed by gentle exhalation with minimal muscle tension applied",
      ],
      correctAnswer: 0,
      explanation:
        "AGSM involves coordinated sequence of strong continuous muscle strain (legs, glutes, abdomen) combined with timed forceful exhalation against closed glottis to maintain blood pressure and cerebral perfusion. Common errors: insufficient tension, improper timing, shallow/rapid breaths, incomplete glottis closure.",
      limitation: false,
    },
    {
      id: "ap-mc-053",
      category: "AP 111 - Acceleration",
      topic: "Self-Imposed Stressors",
      difficulty: "medium",
      question:
        "How do self-imposed stressors affect G-force tolerance in flight?",
      options: [
        "Reduce cardiovascular efficiency and muscular performance, thereby lowering G tolerance",
        "Improve physical conditioning and increase tolerance to positive G-forces significantly",
        "Have no measurable effect on G-tolerance as physical fitness is only factor",
        "Enhance mental focus allowing better AGSM performance under high G conditions",
      ],
      correctAnswer: 0,
      explanation:
        "Self-imposed stressors (fatigue, dehydration, anxiety, heavy meals, illness, lack of sleep) reduce cardiovascular efficiency and muscular performance, lowering G-force tolerance. Increase tolerance through: physical fitness, lower body muscle strength, hydration, avoiding fatigue, proper nutrition.",
      limitation: false,
    },

    // AP 112 - Performance Threat Management (10 questions)
    {
      id: "ap-mc-054",
      category: "AP 112 - Performance Threat Management",
      topic: "OTC Medications",
      difficulty: "medium",
      question:
        "What are the potential performance effects of over-the-counter medications?",
      options: [
        "Impair alertness, reaction time, judgment, coordination, or cardiovascular performance",
        "Enhance focus, increase energy levels, improve decision-making during complex operations",
        "No effects on flight performance as OTC medications are FDA approved for safety",
        "Only cause problems when combined with prescription drugs, otherwise completely safe",
      ],
      correctAnswer: 0,
      explanation:
        "OTC medications and nutritional supplements (decongestants, antihistamines, vasoconstrictors, pain killers, diet pills) can impair alertness, reaction time, judgment, coordination, or cardiovascular performance, potentially reducing flight safety and tolerance to physiological stressors like G-forces.",
      limitation: false,
    },
    {
      id: "ap-mc-055",
      category: "AP 112 - Performance Threat Management",
      topic: "Alcohol",
      difficulty: "critical",
      question:
        "What are the immediate and residual effects of alcohol on aircrew performance?",
      options: [
        "Impairs judgment, coordination, reaction time, decision-making, and exacerbates fatigue and dehydration",
        "Enhances confidence, improves visual acuity, reduces stress, and increases situational awareness",
        "Only affects performance during consumption period with no residual effects after metabolizing",
        "Minimal impact on trained pilots who can compensate for effects through increased focus",
      ],
      correctAnswer: 0,
      explanation:
        "Alcohol impairs judgment, coordination, reaction time, cognitive processing, and decision-making. Exacerbates fatigue and dehydration, degrading flight performance and safety. Air Force policy: 12 hours bottle-to-throttle including after-effects (hangover). Never fly under influence or with residual effects.",
      limitation: false,
    },
    {
      id: "ap-mc-056",
      category: "AP 112 - Performance Threat Management",
      topic: "Tobacco",
      difficulty: "medium",
      question:
        "What are the immediate effects of smoking and tobacco use on flight performance?",
      options: [
        "Reduces cardiovascular efficiency, impairs oxygen delivery, contributes to fatigue and decreased G-tolerance",
        "Improves alertness, enhances concentration, reduces stress, and increases cognitive performance",
        "No measurable effects on flight operations as body quickly compensates for exposure",
        "Only affects non-smokers negatively while regular users develop complete tolerance to effects",
      ],
      correctAnswer: 0,
      explanation:
        "Tobacco use reduces cardiovascular and pulmonary efficiency, increases heart rate and blood pressure, impairs oxygen delivery, contributes to fatigue and decreased G-force tolerance. CO from smoking binds to hemoglobin more strongly than oxygen, reducing oxygen delivery causing headache, dizziness, impaired judgment, fatigue.",
      limitation: false,
    },
    {
      id: "ap-mc-057",
      category: "AP 112 - Performance Threat Management",
      topic: "Hypoglycemia",
      difficulty: "high",
      question: "What are the effects of hypoglycemia on aircrew performance?",
      options: [
        "Fatigue, weakness, dizziness, impaired judgment, confusion, blurred vision, tremors, unconsciousness",
        "Increased energy, enhanced alertness, improved reaction time, better decision-making capabilities",
        "Heightened senses, improved visual acuity, faster reflexes, increased G-force tolerance",
        "No significant effects as brain can use alternative fuel sources indefinitely during flight",
      ],
      correctAnswer: 0,
      explanation:
        "Hypoglycemia (low blood sugar) causes fatigue, weakness, dizziness, impaired judgment, confusion, blurred vision, tremors, and severe cases cause loss of consciousness. Prevent by eating regular balanced meals and snacks, maintaining hydration, avoiding skipping meals before/during flight.",
      limitation: false,
    },
    {
      id: "ap-mc-058",
      category: "AP 112 - Performance Threat Management",
      topic: "Dehydration",
      difficulty: "medium",
      question:
        "Which signs and symptoms are associated with dehydration in flight?",
      options: [
        "Thirst, dry mouth, headache, dizziness, fatigue, decreased concentration, dark urine, reduced sweating",
        "Increased urination, excessive sweating, rapid pulse, elevated body temperature, profuse salivation",
        "Enhanced alertness, improved focus, better reaction time, increased physical performance",
        "Chest pain, shortness of breath, irregular heartbeat, numbness in extremities, vision changes",
      ],
      correctAnswer: 0,
      explanation:
        "Dehydration symptoms: thirst, dry mouth, headache, dizziness, fatigue, decreased concentration, dark urine, reduced sweating. Prevent by drinking adequate water before/during flight, avoiding excessive caffeine or alcohol, monitoring urine color. Affects cognitive function and physiological performance.",
      limitation: false,
    },
    {
      id: "ap-mc-059",
      category: "AP 112 - Performance Threat Management",
      topic: "Fatigue",
      difficulty: "high",
      question:
        "What is the difference between acute and chronic fatigue in aircrew?",
      options: [
        "Acute is short-term from extended activity; Chronic is long-term from repeated sleep deprivation",
        "Acute affects mental performance only; Chronic affects physical performance exclusively",
        "Acute occurs only during flight; Chronic only affects ground operations and training",
        "Acute is easily reversed with caffeine; Chronic requires medication for proper treatment",
      ],
      correctAnswer: 0,
      explanation:
        "Acute fatigue is short-term tiredness from extended activity or sleep loss (long missions, extended duty, sleep loss). Chronic fatigue is long-term persistent tiredness from repeated sleep deprivation or sustained stress (repeated long flights, night ops, lifestyle issues, cumulative sleep debt). Both reduce alertness, reaction time, decision-making.",
      limitation: false,
    },
    {
      id: "ap-mc-060",
      category: "AP 112 - Performance Threat Management",
      topic: "Caffeine",
      difficulty: "medium",
      question:
        "What are both the positive and negative effects of caffeine on aircrew?",
      options: [
        "Positive: enhanced vigilance and performance; Negative: jitters, insomnia, increased heart rate, anxiety",
        "Positive: improved G-tolerance and vision; Negative: reduced coordination and slower reactions",
        "Positive: better oxygen utilization; Negative: increased dehydration and hypoxia susceptibility",
        "Positive: enhanced night vision; Negative: impaired color perception and depth perception",
      ],
      correctAnswer: 0,
      explanation:
        "Positive effects: enhanced vigilance, mental performance, physical endurance. Negative effects: jitters, insomnia, increased heart rate, dehydration, anxiety. Hypercaffeination causes nervousness, palpitations, tremors. Withdrawal causes headache, fatigue, irritability. Use moderately, timed for peak alertness, avoid late intake.",
      limitation: false,
    },
    {
      id: "ap-mc-061",
      category: "AP 112 - Performance Threat Management",
      topic: "Thermal Stress",
      difficulty: "medium",
      question:
        "What are the impacts on performance resulting from thermal stress?",
      options: [
        "Reduces cognitive function, reaction time, endurance, coordination, increases fatigue and dehydration risk",
        "Enhances mental clarity, improves physical stamina, increases alertness and decision-making ability",
        "No measurable effects as body maintains perfect temperature regulation in all conditions",
        "Only affects comfort level with no impact on actual flight performance or safety",
      ],
      correctAnswer: 0,
      explanation:
        "Thermal stress reduces cognitive function, reaction time, endurance, coordination, increases fatigue and dehydration risk. Heat causes dehydration, heat exhaustion, impaired decision-making. Cold causes slower reactions, numbness, reduced dexterity, impaired judgment. Counter with hydration, proper clothing, acclimatization, climate control.",
      limitation: false,
    },
    {
      id: "ap-mc-062",
      category: "AP 112 - Performance Threat Management",
      topic: "Stress Management",
      difficulty: "medium",
      question:
        "Which lifestyle changes can decrease the negative effects of stress?",
      options: [
        "Regular exercise, proper sleep, balanced diet, mindfulness, and effective time management",
        "Increased caffeine intake, longer work hours, reduced social interaction, minimal physical activity",
        "Ignoring stressors, avoiding difficult situations, delaying decisions, reducing responsibilities",
        "Relying on medications, eliminating all challenges, avoiding planning, reducing training",
      ],
      correctAnswer: 0,
      explanation:
        "Decrease stress effects through: regular exercise, proper sleep, balanced diet, mindfulness, time management. Stress reduces attention, situational awareness, decision-making, increases risk of error. Common stressors: personal issues, sleep disruption, work pressures, environmental hazards. Manage through planning, relaxation, task prioritization, communication, controlled breathing.",
      limitation: false,
    },
    {
      id: "ap-mc-063",
      category: "AP 112 - Performance Threat Management",
      topic: "Overload",
      difficulty: "medium",
      question:
        "What is overload and how can its effects be reversed in flight?",
      options: [
        "Excessive task or information demand; reversed by prioritization, delegation, breaks, workload management",
        "Physical exhaustion from G-forces; reversed by AGSM, G-suit use, and immediate descent",
        "Oxygen deprivation at altitude; reversed by emergency oxygen, pressure breathing, and descent",
        "Sensory system conflict; reversed by transitioning to instruments and minimizing head movement",
      ],
      correctAnswer: 0,
      explanation:
        "Overload is excessive task or information demand that overwhelms cognitive capacity. Reverse effects through: task prioritization (what's most important), delegation (transfer tasks to others), taking breaks (mental rest), effective workload management (shed non-critical tasks). Stress exacerbates all physiological threats.",
      limitation: false,
    },

    // AP 113 - Oxygen Equipment (6 questions)
    {
      id: "ap-mc-064",
      category: "AP 113 - Oxygen Equipment",
      topic: "Oxygen Storage",
      difficulty: "medium",
      question:
        "All of the following are types of oxygen storage systems EXCEPT:",
      options: [
        "Portable battery-powered oxygen concentrator units for extended duration missions",
        "Low pressure gas stored in yellow cylinders for ground and emergency use",
        "High pressure gas stored in green cylinders for portable and backup systems",
        "Liquid oxygen (LOX) which is empty at 10% and full at 95% due to gas laws",
      ],
      correctAnswer: 0,
      explanation:
        "Five oxygen storage types: (1) Low pressure gas (yellow cylinders), (2) High pressure gas (green cylinders), (3) Liquid oxygen LOX (empty at 10%, full at 95%), (4) Solid state (chemical reaction), (5) OBOGS (On-Board Oxygen Generating System). No battery-powered concentrators are used.",
      limitation: false,
    },
    {
      id: "ap-mc-065",
      category: "AP 113 - Oxygen Equipment",
      topic: "Oxygen Delivery",
      difficulty: "medium",
      question:
        "What are the two types of oxygen delivery systems used in aviation?",
      options: [
        "Continuous Flow system and Pressure Demand system for different altitude requirements",
        "Emergency Backup system and Primary Supply system for redundancy purposes only",
        "Low Altitude system and High Altitude system based on flight profile exclusively",
        "Pilot system and Passenger system with different flow rates and concentration levels",
      ],
      correctAnswer: 0,
      explanation:
        "Two oxygen delivery systems: (1) Continuous Flow - constant oxygen supply regardless of breathing, (2) Pressure Demand - delivers oxygen under positive pressure at higher altitudes. Pressure demand regulator provides adequate oxygen up to 40,000 ft normal ops, 50,000 ft emergency.",
      limitation: false,
    },
    {
      id: "ap-mc-066",
      category: "AP 113 - Oxygen Equipment",
      topic: "T-6 OBOGS",
      difficulty: "high",
      question:
        "Which components are part of the T-6 On-Board Oxygen Generating System?",
      options: [
        "Oxygen Supply Lever, Concentration Lever, Pressure Lever, OBOGS annunciators, Regular BIT button, Flow Indicator",
        "Emergency Oxygen Cylinder, Manual Pull Ring, Backup Tank, Pressure Gauge, Test Switch",
        "Primary Regulator, Secondary Filter, Backup Compressor, Warning Light, Safety Valve",
        "Main Distribution Manifold, Pressure Relief Valve, Flow Meter, Control Panel, Backup Line",
      ],
      correctAnswer: 0,
      explanation:
        "T-6 OBOGS components: Oxygen Supply Lever, Oxygen Concentration Lever, Oxygen Pressure Lever, OBOGS annunciators, Regular BIT button, Oxygen Flow Indicator. OBOGS panel regulator controls oxygen concentration, regulates flow to mask, monitors system pressure/temperature, provides switches for normal/emergency/test modes.",
      limitation: false,
    },
    {
      id: "ap-mc-067",
      category: "AP 113 - Oxygen Equipment",
      topic: "Emergency Oxygen",
      difficulty: "critical",
      question:
        "What are the characteristics of the T-6 emergency oxygen system?",
      options: [
        "High pressure gas providing 100% oxygen for 2-4 minutes, activated by pulling green ring",
        "Low pressure liquid oxygen providing 50% mixture for 10-15 minutes continuous flow",
        "Solid state chemical oxygen providing 75% concentration for 5-7 minutes backup supply",
        "OBOGS backup mode providing 90% oxygen indefinitely through secondary generator",
      ],
      correctAnswer: 0,
      explanation:
        "Emergency oxygen system: High pressure gas, 100% oxygen for first 2-4 minutes, use when normal fails/depleted/contaminated/egress. Cylinder on left side of ejection seat, manual control by pulling green ring. Provides immediate supplemental oxygen independent of main system at higher flow rate.",
      limitation: false,
    },
    {
      id: "ap-mc-068",
      category: "AP 113 - Oxygen Equipment",
      topic: "MBU-20A/P Mask",
      difficulty: "hard",
      question:
        "Which components are part of the MBU-20A/P oxygen mask assembly?",
      options: [
        "3-pin connector, breathing hose, communication cord, microphone, PBG bladder, valves, bayonets",
        "Single connection port, emergency backup line, speaker system, pressure gauge, quick release",
        "Dual hose assembly, radio adapter, built-in oxygen monitor, backup regulator, safety strap",
        "Main supply line, pressure sensor, voice amplifier, secondary filter, emergency shutoff valve",
      ],
      correctAnswer: 0,
      explanation:
        "MBU-20A/P mask components: 3-pin connector, breathing hose, communication cord, microphone assembly, PBG bladder supply hose, exhalation valve, keeper, inhalation valve, faceform, bayonets, hardshell, quick disconnect mini male. Must perform RICE check (Regulator, Indicator, Connections, Emergency) before flight.",
      limitation: false,
    },
    {
      id: "ap-mc-069",
      category: "AP 113 - Oxygen Equipment",
      topic: "RICE Check",
      difficulty: "critical",
      question:
        "What does the acronym RICE stand for in oxygen system preflight checks?",
      options: [
        "Regulator function, Indicator operation, Connections security, Emergency system availability",
        "Ready position, Inspect equipment, Check pressure, Emergency procedures review",
        "Repair defects, Identify problems, Correct malfunctions, Evaluate system performance",
        "Remove mask, Install properly, Connect hoses, Ensure oxygen flow",
      ],
      correctAnswer: 0,
      explanation:
        "RICE Check: (R) Regulator - verify proper function, (I) Indicator - check oxygen flow indicator working, (C) Connections - ensure all connections secure, (E) Emergency - verify emergency oxygen system available and accessible. Critical preflight check to ensure oxygen system functional before flight.",
      limitation: false,
    },
    {
      id: "ap-mc-070",
      category: "AP 113 - Oxygen Equipment",
      topic: "Pressure Breathing",
      difficulty: "high",
      question: "When is pressure breathing used in aviation oxygen systems?",
      options: [
        "During emergency situations at high altitude to force oxygen into lungs under positive pressure",
        "During normal cruise flight to maintain comfortable breathing rate and depth throughout mission",
        "During takeoff and landing to prevent ear blocks and equalize pressure in middle ear",
        "During aerobatic maneuvers to prevent G-LOC by increasing oxygen delivery to brain tissue",
      ],
      correctAnswer: 0,
      explanation:
        "Pressure breathing forces oxygen into lungs under positive pressure during emergencies at high altitude (above 40,000 ft) or rapid decompression. Helps maintain adequate oxygen delivery when normal breathing insufficient. Part of emergency procedures: 100% oxygen, pressure breathing, controlled descent to lower altitude.",
      limitation: false,
    },
  ],
  // No other question types needed per user request
  trueFalse: [],
  reorderSequence: [],
  matchItems: [],
};

export function getAllAerospacePhysiologyQuestions() {
  return aerospacePhysiologyQuestions.multipleChoice.map((q) => ({
    ...q,
    questionType: "multipleChoice",
  }));
}
