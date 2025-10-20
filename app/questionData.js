// T-6A Texan II Comprehensive Question Database

export const questionDatabase = {
  // MULTIPLE CHOICE QUESTIONS
  multipleChoice: [
    // Aircraft Systems
    {
      id: "mc-1",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "medium",
      question: "What is the maximum torque limit for takeoff in the T-6A?",
      options: ["90%", "95%", "100%", "105%"],
      correctAnswer: 2,
      explanation:
        "Maximum takeoff torque is 100%. This limit protects the engine and propeller from excessive stress during the high-power phase of flight. While transient torque spikes of 101-107% are allowed for only 5 seconds (such as during rapid power changes), sustained operation at 100% is the maximum for takeoff to ensure engine longevity and safety.",
      limitation: true,
    },
    {
      id: "mc-2",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "high",
      question: "What is the maximum ITT during engine start?",
      options: ["750°C", "820°C", "871°C", "1000°C"],
      correctAnswer: 3,
      explanation:
        "Maximum ITT during start is 871-1000°C for 5 seconds. Normal max ITT for takeoff is 820°C.",
      limitation: true,
    },
    {
      id: "mc-3",
      category: "Airspeed",
      topic: "Limitations",
      difficulty: "critical",
      question: "What is the maximum airspeed with gear or flaps extended?",
      options: ["120 KIAS", "150 KIAS", "180 KIAS", "200 KIAS"],
      correctAnswer: 1,
      explanation:
        "Maximum speed with landing gear and/or flaps extended is 150 KIAS (VLE/VFE). This limitation exists because the gear and flaps create significant aerodynamic drag and structural loading at higher speeds. Exceeding this speed could cause structural damage to the gear doors, flap actuators, or the extended surfaces themselves. Always ensure airspeed is below 150 KIAS before extending gear or flaps.",
      limitation: true,
    },
    {
      id: "mc-4",
      category: "G Limits",
      topic: "Limitations",
      difficulty: "high",
      question: "What are the symmetric G limits with a clean configuration?",
      options: ["-2.0 to +5.0", "-3.5 to +7.0", "-4.0 to +8.0", "0 to +6.0"],
      correctAnswer: 1,
      explanation:
        "Clean configuration symmetric G limits are -3.5 to +7.0 Gs. These limits protect the airframe from structural damage during maneuvering. The positive G limit (+7.0) is higher because the aircraft structure is designed to withstand greater upward forces (pulling back on the stick). The negative G limit (-3.5) is lower because pushing forward creates unusual structural loads. Remember: with stores or flaps extended, these limits are reduced to protect the additional equipment.",
      limitation: true,
    },
    {
      id: "mc-5",
      category: "Fuel",
      topic: "Limitations",
      difficulty: "high",
      question: "What is the minimum recovery fuel?",
      options: ["100 pounds", "150 pounds", "200 pounds", "250 pounds"],
      correctAnswer: 2,
      explanation:
        "Normal recovery fuel is 200 pounds. This provides adequate fuel for the traffic pattern, approach, and a go-around if needed. The fuel hierarchy is: Normal Recovery = 200 lbs, Minimum Fuel = 150 lbs dual (200 lbs solo), Emergency Fuel = 100 lbs. Declaring minimum fuel alerts ATC to prioritize your landing, while emergency fuel requires immediate landing at the nearest suitable field. Always plan to land with at least normal recovery fuel for safety margins.",
      limitation: true,
    },
    {
      id: "mc-6",
      category: "Electrical",
      topic: "Systems",
      difficulty: "medium",
      question: "What is the minimum battery voltage for engine start?",
      options: ["20.0V", "22.5V", "23.5V", "24.5V"],
      correctAnswer: 2,
      explanation: "Minimum battery voltage is 23.5V for engine start.",
      limitation: true,
    },
    {
      id: "mc-7",
      category: "OBOGS",
      topic: "Systems",
      difficulty: "critical",
      question:
        "What immediate action do you take for OBOGS failure or physiological symptoms?",
      options: [
        "Continue mission and monitor",
        "Turn OBOGS off, activate BOS, descend below 10,000 ft",
        "Pull circuit breaker immediately",
        "Switch to backup oxygen bottle",
      ],
      correctAnswer: 1,
      explanation:
        "BOLDFACE: OBOGS SUPPLY LEVER - OFF (BOTH), BOS PUSH MAN - PRESS ON, GREEN RING - PULL (AS REQUIRED), DESCENT BELOW 10,000 FEET MSL - INITIATE. This is critical because hypoxia (oxygen deprivation) impairs judgment and can lead to unconsciousness within seconds at altitude. The BOS (Backup Oxygen System) provides emergency oxygen while you descend to a safe altitude where supplemental oxygen is not required. Never delay this procedure if you experience symptoms like dizziness, euphoria, tingling, or visual disturbances.",
      limitation: false,
    },
    {
      id: "mc-8",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "medium",
      question: "What is the normal Np idle range?",
      options: ["40-45%", "46-50%", "55-60%", "60-61%"],
      correctAnswer: 1,
      explanation: "Np idle range is 46-50%. N1 idle range is 60-61%.",
      limitation: true,
    },
    {
      id: "mc-9",
      category: "Runway",
      topic: "Limitations",
      difficulty: "medium",
      question: "What is the minimum runway width for T-6A operations?",
      options: ["50 feet", "60 feet", "75 feet", "100 feet"],
      correctAnswer: 2,
      explanation: "Minimum runway width is 75 feet.",
      limitation: true,
    },
    {
      id: "mc-10",
      category: "Wind Limits",
      topic: "Limitations",
      difficulty: "high",
      question: "What is the maximum crosswind for dry runway operations?",
      options: ["15 knots", "20 knots", "25 knots", "30 knots"],
      correctAnswer: 2,
      explanation:
        "Maximum crosswind on dry runway is 25 knots. As runway conditions degrade, the crosswind limit decreases significantly: Wet runway = 10 knots, Icy runway = 5 knots. This is because reduced friction makes it harder to maintain directional control during takeoff and landing. The weathervaning tendency (nose wanting to turn into the wind) becomes increasingly difficult to counteract with rudder as the runway becomes slicker. Always check runway conditions and current winds before flight.",
      limitation: true,
    },

    {
      id: "mc-12",
      category: "Spins",
      topic: "Limitations",
      difficulty: "critical",
      question: "What is the minimum altitude for intentional spin entry?",
      options: [
        "10,000 ft MSL",
        "12,000 ft MSL",
        "13,500 ft MSL",
        "15,000 ft MSL",
      ],
      correctAnswer: 2,
      explanation:
        "Minimum altitude for intentional spin entry is 13,500 feet MSL.",
      limitation: true,
    },

    {
      id: "mc-21",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "high",
      question: "What is the maximum starter limit time?",
      options: ["10 seconds", "20 seconds", "30 seconds", "60 seconds"],
      correctAnswer: 1,
      explanation:
        "Maximum torque starter limit is 20 seconds. Exceeding this can overheat and damage the starter motor. After each start/motoring attempt, wait 30 seconds before the next attempt, then 2 minutes, then 5 minutes, then 30 minutes. These cooling periods prevent starter burnout.",
      limitation: true,
    },
    {
      id: "mc-22",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "critical",
      question: "What torque percentage indicates a system malfunction?",
      options: ["Above 100%", "Above 105%", "Above 107%", "Above 110%"],
      correctAnswer: 2,
      explanation:
        "Torque above 107% is indicative of a system malfunction. While transient torque from 101-107% is allowed for 5 seconds, anything above 107% suggests PMU failure or other critical issues. This requires immediate attention and likely engine shutdown.",
      limitation: true,
    },
    {
      id: "mc-23",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "high",
      question:
        "What is the maximum ITT where you should NOT attempt a restart?",
      options: ["750°C", "820°C", "870°C", "871°C"],
      correctAnswer: 3,
      explanation:
        "Do not attempt restart if ITT exceeds 871°C. This temperature indicates severe engine damage from a hot start. Attempting to restart could cause catastrophic turbine failure. At 871-1000°C, you have only 5 seconds before permanent damage occurs.",
      limitation: true,
    },
    {
      id: "mc-24",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "medium",
      question: "What is the transient ITT limit and duration?",
      options: [
        "821-870°C for 10 seconds",
        "821-870°C for 20 seconds",
        "871-1000°C for 5 seconds",
        "750-820°C for 30 seconds",
      ],
      correctAnswer: 1,
      explanation:
        "Transient ITT limit is 821-870°C for 20 seconds. This allows brief temperature excursions during rapid power changes or hot day operations. Continuous operation at these temperatures will damage turbine blades.",
      limitation: true,
    },
    {
      id: "mc-25",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "high",
      question: "What is the minimum N1 for ground pressurization?",
      options: ["60%", "61%", "67%", "70%"],
      correctAnswer: 2,
      explanation:
        "Minimum N1 for ground pressurization is 67%. Below this, the ECS (Environmental Control System) cannot provide adequate cabin pressurization or cooling. In flight, minimum N1 for pressurization is also 67%. This is a gas generator speed requirement for the bleed air system to function properly.",
      limitation: true,
    },
    {
      id: "mc-26",
      category: "Propulsion",
      topic: "Systems",
      difficulty: "medium",
      question: "What is the normal cabin pressurization above 18,000 ft MSL?",
      options: [
        "3.0 ± 0.2 PSI",
        "3.6 ± 0.2 PSI",
        "4.0 ± 0.2 PSI",
        "5.0 ± 0.2 PSI",
      ],
      correctAnswer: 1,
      explanation:
        "Normal cabin pressurization above 18,000 ft MSL is 3.6 ± 0.2 PSI. This maintains cabin altitude around 8,000-10,000 feet for crew comfort and reduces hypoxia risk. The overpressurization safety valve opens at 4.0 PSI to prevent structural damage.",
      limitation: true,
    },
    {
      id: "mc-27",
      category: "Fuel",
      topic: "Limitations",
      difficulty: "medium",
      question: "What is the minimum fuel per side for aerobatics?",
      options: ["100 pounds", "150 pounds", "200 pounds", "250 pounds"],
      correctAnswer: 1,
      explanation:
        "Minimum fuel for aerobatics is 150 pounds per side (300 pounds total). This ensures adequate fuel pressure during negative G maneuvers and prevents fuel starvation. Unporting (fuel pump losing suction) during aerobatics with low fuel can cause engine failure.",
      limitation: true,
    },
    {
      id: "mc-28",
      category: "Runway",
      topic: "Limitations",
      difficulty: "medium",
      question: "What is the minimum Landing Distance Available (LDA)?",
      options: ["3,000 feet", "3,500 feet", "4,000 feet", "5,000 feet"],
      correctAnswer: 2,
      explanation:
        "Minimum LDA is 4,000 feet, OR heavy weight flaps up landing ground roll plus 500 feet, whichever is greater. This ensures adequate stopping distance for all weight configurations and provides safety margin for approach errors or go-arounds.",
      limitation: true,
    },
    {
      id: "mc-29",
      category: "Wind Limits",
      topic: "Limitations",
      difficulty: "medium",
      question: "What is the maximum crosswind for formation takeoff/landing?",
      options: ["10 knots", "15 knots", "20 knots", "25 knots"],
      correctAnswer: 1,
      explanation:
        "Maximum crosswind for formation takeoff/landing is 15 knots. Formation operations require tighter limits because you must maintain position while compensating for crosswind. The standard crosswind limit (25 knots dry) is reduced to 15 knots for formation work.",
      limitation: true,
    },
    {
      id: "mc-30",
      category: "Wind Limits",
      topic: "Limitations",
      difficulty: "medium",
      question: "What is the maximum tailwind component for takeoff?",
      options: ["5 knots", "10 knots", "15 knots", "20 knots"],
      correctAnswer: 1,
      explanation:
        "Maximum tailwind for takeoff is 10 knots. Tailwinds increase takeoff distance and reduce climb performance. While landing with a tailwind is sometimes necessary, takeoff should be delayed or use another runway if tailwind exceeds 10 knots.",
      limitation: true,
    },
    {
      id: "mc-31",
      category: "Canopy",
      topic: "Limitations",
      difficulty: "medium",
      question: "What is the maximum wind with canopy open on the ground?",
      options: ["20 knots", "30 knots", "40 knots", "50 knots"],
      correctAnswer: 2,
      explanation:
        "Maximum wind with canopy open is 40 knots. Higher winds can cause canopy damage, slam the canopy closed causing injury, or blow loose items around the cockpit. Always secure the canopy in high winds.",
      limitation: true,
    },
    {
      id: "mc-32",
      category: "Spins",
      topic: "Limitations",
      difficulty: "critical",
      question: "What is the maximum altitude for intentional spins?",
      options: [
        "18,000 feet PA",
        "20,000 feet PA",
        "22,000 feet PA",
        "25,000 feet PA",
      ],
      correctAnswer: 2,
      explanation:
        "Spins above 22,000 feet pressure altitude are prohibited. At higher altitudes, reduced air density makes spin recovery more difficult and unpredictable. Additionally, OBOGS performance degrades and hypoxia risk increases during the high workload of spin recovery.",
      limitation: true,
    },
    {
      id: "mc-33",
      category: "Spins",
      topic: "Limitations",
      difficulty: "critical",
      question: "What is the minimum altitude for intentional spins?",
      options: [
        "5,000 feet PA",
        "8,000 feet PA",
        "10,000 feet PA",
        "13,500 feet PA",
      ],
      correctAnswer: 2,
      explanation:
        "Spins below 10,000 feet pressure altitude are prohibited. This ensures adequate altitude for spin recovery (which can take 3,000-5,000 feet) plus margin for errors or delayed recognition. Combined with the entry altitude of 13,500 feet MSL, this provides safety buffer.",
      limitation: true,
    },
    {
      id: "mc-34",
      category: "Spins",
      topic: "Limitations",
      difficulty: "critical",
      question:
        "What is the minimum cloud clearance for intentional spin entry?",
      options: ["1,000 feet", "3,000 feet", "5,000 feet", "7,000 feet"],
      correctAnswer: 3,
      explanation:
        "Minimum cloud clearance for spins is 7,000 feet above clouds. This massive buffer ensures you remain VMC during the entire spin and recovery. Flying into clouds during a spin makes recovery nearly impossible due to spatial disorientation.",
      limitation: true,
    },
    {
      id: "mc-35",
      category: "Ice",
      topic: "Limitations",
      difficulty: "high",
      question: "What is the maximum icing band (thickness of icing layer)?",
      options: ["1,000 feet", "3,000 feet", "5,000 feet", "10,000 feet"],
      correctAnswer: 2,
      explanation:
        "Maximum icing band is 5,000 feet and must be light rime only. Even though the T-6A is not certified for flight into known icing, this parameter defines inadvertent icing encounter limits. If you encounter icing thicker than 5,000 feet or any clear ice, immediately execute emergency descent/climb to exit icing conditions.",
      limitation: true,
    },
    {
      id: "mc-36",
      category: "Temperature",
      topic: "Limitations",
      difficulty: "medium",
      question:
        "What is the minimum ambient temperature for ground operations?",
      options: ["-40°C", "-30°C", "-23°C", "-10°C"],
      correctAnswer: 2,
      explanation:
        "Ground operation is limited to -23°C to +43°C ambient temperature. Below -23°C, hydraulic fluid becomes too viscous, battery performance degrades critically, and other systems may freeze or malfunction. Above +43°C (remember max takeoff is +51°C), ground operations risk overheating.",
      limitation: true,
    },
    {
      id: "mc-37",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "high",
      question: "What is the maximum oil pressure limit?",
      options: ["120 PSI", "150 PSI", "180 PSI", "200 PSI"],
      correctAnswer: 3,
      explanation:
        "Maximum oil pressure is 200 PSI. Excessive oil pressure indicates blockage in the oil system or relief valve failure. This can cause seal failure and oil leaks. Normal takeoff/max oil pressure is 90-120 PSI.",
      limitation: true,
    },
    {
      id: "mc-38",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "high",
      question: "What is the minimum oil temperature?",
      options: ["-50°C", "-40°C", "-30°C", "-20°C"],
      correctAnswer: 1,
      explanation:
        "Minimum oil temperature is -40°C. Below this temperature, oil viscosity is too high for proper lubrication, risking engine damage on start. In extreme cold, external engine preheat may be required before starting.",
      limitation: true,
    },
    {
      id: "mc-39",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "medium",
      question: "What is the transient oil temperature limit and duration?",
      options: [
        "106-110°C for 5 minutes",
        "106-110°C for 10 minutes",
        "105-110°C for 20 minutes",
        "110-120°C for 5 minutes",
      ],
      correctAnswer: 1,
      explanation:
        "Transient oil temperature limit is 106-110°C for 10 minutes. Normal max is 10-105°C. Brief temperature excursions above 105°C are acceptable during climbs on hot days, but sustained high oil temperature indicates cooling system problems.",
      limitation: true,
    },
    {
      id: "mc-40",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "high",
      question: "What is the maximum fuel flow for all phases of flight?",
      options: ["699 PPH", "750 PPH", "799 PPH", "850 PPH"],
      correctAnswer: 2,
      explanation:
        "Maximum fuel flow is 799 PPH (pounds per hour) for all phases of flight. Fuel flow above this indicates a fuel control unit malfunction and risks engine overspeed or overtemp. Normal max power fuel flow is significantly less than this limit.",
      limitation: true,
    },
    {
      id: "mc-41",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "high",
      question: "What is the aerobatics/spins oil pressure range at idle?",
      options: [
        "10-20 PSI",
        "15-40 PSI for 5 seconds",
        "40-60 PSI",
        "60-90 PSI",
      ],
      correctAnswer: 1,
      explanation:
        "Aerobatics/spins idle oil pressure is 15-40 PSI for 5 seconds. During negative G or unusual attitudes, oil unporting can temporarily drop pressure. This 5-second allowance prevents nuisance warnings during aerobatics while still protecting the engine.",
      limitation: true,
    },
    {
      id: "mc-42",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "medium",
      question: "What is the normal aerobatics/spins oil pressure range?",
      options: ["40-80 PSI", "40-130 PSI", "90-120 PSI", "90-150 PSI"],
      correctAnswer: 1,
      explanation:
        "Aerobatics/spins oil pressure is 40-130 PSI (wider than normal 90-120 PSI). During aerobatic maneuvers, oil sloshes around causing pressure fluctuations. The wider range accounts for these variations while maintaining adequate lubrication.",
      limitation: true,
    },
    {
      id: "mc-43",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "medium",
      question: "What is the maximum ITT at idle?",
      options: ["700°C", "750°C", "820°C", "870°C"],
      correctAnswer: 1,
      explanation:
        "Maximum ITT at idle is 750°C. This is the normal maximum temperature when the engine is at idle power. Higher temperatures at idle indicate a malfunctioning fuel control unit or other engine problems.",
      limitation: true,
    },
    {
      id: "mc-44",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "high",
      question: "What is the maximum ITT for takeoff and maximum continuous?",
      options: ["750°C", "820°C", "870°C", "1000°C"],
      correctAnswer: 1,
      explanation:
        "Maximum ITT for takeoff/max continuous is 820°C. This is the highest sustained temperature allowed during high-power operations. Transient excursions to 821-870°C are permitted for 20 seconds, but continuous operation at 820°C is the limit to prevent turbine blade damage.",
      limitation: true,
    },
    {
      id: "mc-45",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "medium",
      question: "What is the N1 idle range?",
      options: ["46-50%", "55-59%", "60-61%", "62-67%"],
      correctAnswer: 2,
      explanation:
        "N1 idle range is 60-61%. N1 is the gas generator turbine speed. This is slightly higher than Np (propeller speed) idle range of 46-50%. N1 at 67% minimum is required for ground pressurization.",
      limitation: true,
    },
    {
      id: "mc-46",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "medium",
      question: "What is the Np for takeoff and maximum continuous?",
      options: ["95%", "98%", "100%", "102%"],
      correctAnswer: 2,
      explanation:
        "Np (propeller speed) for takeoff/max continuous is 100%. This represents maximum propeller RPM. The propeller governor maintains this speed during high-power operations to optimize thrust and efficiency.",
      limitation: true,
    },
    {
      id: "mc-47",
      category: "Systems",
      topic: "Pressurization",
      difficulty: "medium",
      question:
        "At what differential pressure does the overpressurization valve open?",
      options: ["3.0 PSI", "3.6 PSI", "4.0 PSI", "5.0 PSI"],
      correctAnswer: 2,
      explanation:
        "The overpressurization safety valve opens at 4.0 PSI differential pressure. This prevents excessive cabin pressurization that could damage the airframe structure. Normal pressurization above 18,000 ft MSL is 3.6 ± 0.2 PSI.",
      limitation: true,
    },
    {
      id: "mc-48",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "medium",
      question:
        "What is the maximum oil temperature for takeoff/max continuous?",
      options: ["10-95°C", "10-105°C", "10-110°C", "10-120°C"],
      correctAnswer: 1,
      explanation:
        "Maximum oil temperature for takeoff/max continuous is 10-105°C. Transient temperatures of 106-110°C are allowed for 10 minutes during climbs on hot days. The minimum of 10°C ensures oil viscosity is adequate for proper lubrication.",
      limitation: true,
    },
    {
      id: "mc-49",
      category: "Wind Limits",
      topic: "Limitations",
      difficulty: "medium",
      question: "What is the maximum crosswind for touch-and-go operations?",
      options: ["15 knots", "20 knots", "25 knots", "30 knots"],
      correctAnswer: 1,
      explanation:
        "Maximum crosswind for touch-and-go is 20 knots. This is more restrictive than the normal dry runway crosswind limit of 25 knots because touch-and-go operations involve dynamic weight changes and require extra directional control margin during the transition from landing to takeoff configuration.",
      limitation: true,
    },
    {
      id: "mc-50",
      category: "Wind Limits",
      topic: "Limitations",
      difficulty: "high",
      question: "What is the maximum crosswind on a wet runway?",
      options: ["5 knots", "10 knots", "15 knots", "20 knots"],
      correctAnswer: 1,
      explanation:
        "Maximum crosswind on wet runway is 10 knots. Reduced traction on wet surfaces makes directional control more difficult, requiring a significantly lower crosswind limit than the 25 knots allowed on dry runways.",
      limitation: true,
    },
    {
      id: "mc-51",
      category: "Wind Limits",
      topic: "Limitations",
      difficulty: "high",
      question: "What is the maximum crosswind on an icy runway?",
      options: ["0 knots", "5 knots", "10 knots", "15 knots"],
      correctAnswer: 1,
      explanation:
        "Maximum crosswind on icy runway is 5 knots. Ice provides minimal traction, making directional control extremely difficult. This is the most restrictive crosswind limit, reduced from 25 knots (dry) and 10 knots (wet) due to near-zero friction on ice.",
      limitation: true,
    },
    {
      id: "mc-52",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "high",
      question: "What is the transient torque limit and duration?",
      options: [
        "101-105% for 5 seconds",
        "101-107% for 5 seconds",
        "101-110% for 10 seconds",
        "101-107% for 10 seconds",
      ],
      correctAnswer: 1,
      explanation:
        "Transient torque limit is 101-107% for 5 seconds. This allows brief torque spikes during rapid power changes while protecting the engine and propeller from sustained overstress. Torque above 107% indicates a system malfunction. Normal maximum is 100%.",
      limitation: true,
    },
    // SCENARIO-BASED QUESTIONS
    {
      id: "mc-53",
      category: "Scenario",
      topic: "Fuel Management",
      difficulty: "high",
      question:
        "You're at 12,000 ft MSL with 180 pounds total fuel (90 pounds per side). Can you perform aerobatics?",
      options: [
        "Yes, total fuel is adequate",
        "No, need minimum 150 pounds per side (300 total)",
        "Yes, as long as you stay above 10,000 ft",
        "No, need minimum 200 pounds per side (400 total)",
      ],
      correctAnswer: 1,
      explanation:
        "NO - You need minimum 150 pounds per side for aerobatics. You only have 90 pounds per side. This ensures adequate fuel pressure during negative G maneuvers and prevents fuel starvation. Even though your total fuel (180 lbs) seems adequate, the per-side requirement is what matters to prevent unporting during aerobatic maneuvers.",
      limitation: true,
    },
    {
      id: "mc-54",
      category: "Scenario",
      topic: "Wind Limits",
      difficulty: "medium",
      question:
        "Tower reports winds 270 at 22 knots, runway 36. The runway is dry. Can you land?",
      options: [
        "No, exceeds 20 knot crosswind limit",
        "Yes, within 25 knot dry runway limit",
        "No, exceeds 15 knot crosswind limit",
        "Yes, but only if you declare minimum fuel",
      ],
      correctAnswer: 1,
      explanation:
        "YES - Crosswind component is 22 knots (270° wind on runway 36 = 90° crosswind angle, so full 22 knots is crosswind). Maximum crosswind on dry runway is 25 knots, so 22 knots is within limits. If the runway were wet (10 knot limit) or icy (5 knot limit), you could not land.",
      limitation: true,
    },
    {
      id: "mc-55",
      category: "Scenario",
      topic: "Spins",
      difficulty: "critical",
      question:
        "You enter a spin at 14,500 ft MSL (pressure altitude 14,000 ft). What is the LATEST altitude you must complete spin recovery?",
      options: ["13,500 ft PA", "10,000 ft PA", "8,000 ft PA", "5,000 ft PA"],
      correctAnswer: 1,
      explanation:
        "10,000 ft PA - Spins below 10,000 feet pressure altitude are PROHIBITED. You must complete recovery by 10,000 ft PA. Entry altitude is minimum 13,500 ft MSL, and spins must be completed (recovered) above 10,000 ft PA to provide adequate altitude margin for recovery plus safety buffer.",
      limitation: true,
    },
    {
      id: "mc-56",
      category: "Scenario",
      topic: "Engine Start",
      difficulty: "medium",
      question:
        "You've just completed your 3rd unsuccessful engine start attempt. How long must you wait before the 4th attempt?",
      options: ["30 seconds", "2 minutes", "5 minutes", "30 minutes"],
      correctAnswer: 2,
      explanation:
        "5 minutes - After the 3rd start/motoring attempt, you must wait 5 minutes. The progression is: 1st attempt → wait 30 sec, 2nd attempt → wait 2 min, 3rd attempt → wait 5 min, 4th attempt → wait 30 min. These cooling periods prevent starter motor burnout.",
      limitation: true,
    },
    {
      id: "mc-57",
      category: "Scenario",
      topic: "G Limits",
      difficulty: "high",
      question:
        "You're performing aerobatics in clean configuration and pull +8 Gs momentarily. What have you done?",
      options: [
        "Within limits - transient Gs allowed",
        "Exceeded limit - max is +7.0 Gs clean symmetric",
        "Within limits - max is +8.0 Gs clean",
        "Exceeded limit - max is +5.0 Gs for aerobatics",
      ],
      correctAnswer: 1,
      explanation:
        "EXCEEDED LIMITS - Maximum symmetric G limit in clean configuration is +7.0 Gs. You exceeded this by pulling +8 Gs, which risks structural damage to the airframe. There is no 'transient' allowance for G limits like there is for ITT or torque. The aircraft requires structural inspection after exceeding G limits.",
      limitation: true,
    },
    {
      id: "mc-58",
      category: "Scenario",
      topic: "Airspeed",
      difficulty: "high",
      question:
        "You're at 320 KIAS in level flight. What limitation have you violated?",
      options: [
        "None - within limits",
        "Exceeded VNE of 316 KIAS",
        "Exceeded max cruise speed",
        "Only violated if above 0.67 Mach",
      ],
      correctAnswer: 1,
      explanation:
        "EXCEEDED VNE - Maximum operating speed is 316 KIAS OR 0.67 Mach, whichever is lower. At 320 KIAS, you've exceeded the 316 KIAS limit by 4 knots, risking structural damage. VNE (Never Exceed) means exactly that - never exceed under any circumstances.",
      limitation: true,
    },
    {
      id: "mc-59",
      category: "Scenario",
      topic: "Fuel Management",
      difficulty: "high",
      question:
        "You have 220 pounds total fuel (120 left / 100 right). Can you perform a loop?",
      options: [
        "Yes, total fuel is above 200 pounds",
        "No, fuel imbalance exceeds 50 pounds",
        "Yes, as long as you're above minimum fuel",
        "No, need minimum 300 pounds for aerobatics",
      ],
      correctAnswer: 1,
      explanation:
        "NO - Fuel imbalance is 20 pounds (120 - 100), but wait... actually you CAN perform the loop. Aerobatic maneuvers with greater than 50 pounds fuel imbalance are prohibited. You have only 20 pounds imbalance, which is within the 50 pound limit. However, you don't meet the 150 pounds per side requirement (you only have 100 on the right side), so you actually CANNOT perform aerobatics. The correct answer is NO, but for the per-side fuel requirement, not imbalance.",
      limitation: true,
    },
    {
      id: "mc-60",
      category: "Scenario",
      topic: "Temperature",
      difficulty: "medium",
      question: "Ground temperature is -25°C. Can you start the engine?",
      options: [
        "Yes, within temperature limits",
        "No, below -23°C ground operation limit",
        "Yes, but only with external preheat",
        "No, below -40°C minimum oil temperature",
      ],
      correctAnswer: 1,
      explanation:
        "NO - Ground operation is limited to -23°C to +43°C ambient temperature. At -25°C, you're 2°C below the minimum limit. Hydraulic fluid becomes too viscous, battery performance degrades, and other systems may malfunction. You would need external heating or wait for warmer temperatures.",
      limitation: true,
    },
    {
      id: "mc-61",
      category: "Scenario",
      topic: "OBOGS",
      difficulty: "critical",
      question:
        "At 22,000 ft MSL, you experience dizziness and tingling. What is the FIRST BOLDFACE step?",
      options: [
        "Descend below 10,000 ft MSL",
        "OBOGS SUPPLY LEVER - OFF (BOTH)",
        "BOS PUSH MAN - PRESS ON",
        "Declare emergency with ATC",
      ],
      correctAnswer: 1,
      explanation:
        "OBOGS SUPPLY LEVER - OFF (BOTH) - This is the first step in the OBOGS Failure/Physiological Symptoms BOLDFACE procedure. You're experiencing hypoxia symptoms. The sequence is: 1) OBOGS SUPPLY LEVER - OFF (BOTH), 2) BOS PUSH MAN - PRESS ON, 3) GREEN RING - PULL (AS REQUIRED), 4) DESCENT BELOW 10,000 FEET MSL - INITIATE, 5) ALTITUDE - CHECK. Every second counts with hypoxia.",
      limitation: false,
    },
    {
      id: "mc-62",
      category: "Scenario",
      topic: "Engine Emergency",
      difficulty: "critical",
      question:
        "Engine fails at 500 ft AGL after takeoff. You have 3,000 ft of runway remaining straight ahead. What is the FIRST BOLDFACE action?",
      options: [
        "PCL - MID RANGE (attempt airstart)",
        "PCL - IDLE",
        "EJECT",
        "Turn back to runway",
      ],
      correctAnswer: 1,
      explanation:
        "PCL - IDLE - The BOLDFACE procedure for 'Engine Failure Immediately After Takeoff (Sufficient Runway Remaining Straight Ahead)' is: 1) PCL - IDLE, 2) BRAKES - AS REQUIRED. You have adequate runway ahead to land straight ahead, so land immediately. Do NOT attempt to restart or turn back. Focus on getting the aircraft safely on the ground.",
      limitation: false,
    },
    {
      id: "mc-63",
      category: "Scenario",
      topic: "Wind Limits",
      difficulty: "medium",
      question:
        "You're planning touch-and-goes. Winds are 090 at 23 knots, runway 36. Can you continue?",
      options: [
        "Yes, within 25 knot limit",
        "No, touch-and-go limit is 20 knots crosswind",
        "Yes, within 23 knot limit",
        "No, need maximum 15 knots for touch-and-go",
      ],
      correctAnswer: 1,
      explanation:
        "NO - Maximum crosswind for touch-and-go is 20 knots. With 090° wind at 23 knots on runway 36 (360°), the crosswind component is 23 knots (90° angle = full crosswind). This exceeds the 20 knot touch-and-go limit. You could do full-stop landings (25 knot limit), but not touch-and-goes.",
      limitation: true,
    },
    {
      id: "mc-64",
      category: "Scenario",
      topic: "Emergency",
      difficulty: "critical",
      question:
        "During engine start, ITT spikes to 950°C and continues climbing. What do you do?",
      options: [
        "Continue start - within 5 second limit",
        "PCL - OFF, FIREWALL SHUTOFF HANDLE - PULL",
        "Monitor - maximum is 1000°C",
        "Abort start and wait 30 seconds",
      ],
      correctAnswer: 1,
      explanation:
        "PCL - OFF, FIREWALL SHUTOFF HANDLE - PULL - This is a hot start emergency. ITT at 950°C exceeds normal limits and is climbing toward the 1000°C maximum. The BOLDFACE procedure for Emergency Engine Shutdown on the Ground is: 1) PCL - OFF, 2) FIREWALL SHUTOFF HANDLE - PULL. Do NOT wait - immediate action prevents catastrophic turbine damage. ITT above 871°C means do not attempt restart.",
      limitation: false,
    },
    {
      id: "mc-65",
      category: "Scenario",
      topic: "Crosswind",
      difficulty: "high",
      question:
        "Runway 18 has standing water. Winds 090 at 12 knots. Can you land?",
      options: [
        "No, exceeds 10 knot wet runway limit",
        "Yes, within 15 knot wet runway limit",
        "Yes, within 25 knot limit",
        "No, standing water prohibits landing",
      ],
      correctAnswer: 0,
      explanation:
        "NO - Wet runway maximum crosswind is 10 knots. Winds from 090° on runway 18 (180°) create a 90° crosswind angle, so the full 12 knots is crosswind component. This exceeds the 10 knot wet runway limit. If the runway were dry, you'd be within the 25 knot limit, but standing water makes it wet.",
      limitation: true,
    },
  ],

  // TRUE/FALSE QUESTIONS
  trueFalse: [
    {
      id: "tf-1",
      category: "Prohibited",
      topic: "Maneuvers",
      difficulty: "critical",
      question: "Inverted spins are prohibited in the T-6A.",
      correctAnswer: true,
      explanation:
        "TRUE. Inverted spins and inverted stalls are prohibited maneuvers.",
      limitation: true,
    },
    {
      id: "tf-2",
      category: "Fuel",
      topic: "Limitations",
      difficulty: "high",
      question:
        "Aerobatics are permitted with greater than 50 pounds fuel imbalance.",
      correctAnswer: false,
      explanation:
        "FALSE. Aerobatic maneuvers, spins, or stalls with greater than 50 pounds fuel imbalance are prohibited.",
      limitation: true,
    },

    {
      id: "tf-5",
      category: "Spins",
      topic: "Limitations",
      difficulty: "critical",
      question:
        "Spins are permitted between 10,000 and 22,000 feet pressure altitude.",
      correctAnswer: true,
      explanation:
        "TRUE. Spins below 10,000 ft PA or above 22,000 ft PA are prohibited.",
      limitation: true,
    },
    {
      id: "tf-6",
      category: "Airspeed",
      topic: "Limitations",
      difficulty: "high",
      question:
        "Full rudder deflection above 150 KIAS will exceed rudder control system limits.",
      correctAnswer: true,
      explanation:
        "TRUE. Full rudder deflection above 150 KIAS will exceed the limits of the rudder control system.",
      limitation: true,
    },

    {
      id: "tf-8",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "high",
      question:
        "Stabilized ground operations between 62% and 80% Np should be avoided.",
      correctAnswer: true,
      explanation:
        "TRUE. Avoid stabilized ground operations from 62 to 80% Np due to resonance concerns.",
      limitation: true,
    },

    {
      id: "tf-15",
      category: "Ice",
      topic: "Limitations",
      difficulty: "critical",
      question: "Flight into known icing conditions is prohibited in the T-6A.",
      correctAnswer: true,
      explanation:
        "TRUE. The T-6A is NOT certified for flight in known icing conditions. The aircraft has NO anti-ice or de-ice systems except for pitot heat. Ice accumulation on wings, tail, or engine inlet severely degrades performance, increases stall speed, and can cause loss of control. If you encounter icing, immediately exit icing conditions by changing altitude, route, or landing. Even light icing can be catastrophic. Check weather thoroughly and maintain VFR cloud clearances to avoid inadvertent IMC/icing encounters.",
      limitation: true,
    },
    {
      id: "tf-16",
      category: "Prohibited",
      topic: "Maneuvers",
      difficulty: "critical",
      question: "Inverted stalls are prohibited in the T-6A.",
      correctAnswer: true,
      explanation:
        "TRUE. Inverted stalls are a prohibited maneuver. The T-6A is not designed for inverted stalls and recovery can be unpredictable or impossible. This is listed as prohibited maneuver #1 in the official limitations.",
      limitation: true,
    },
    {
      id: "tf-17",
      category: "Prohibited",
      topic: "Maneuvers",
      difficulty: "critical",
      question: "Aggravated spins past 2 turns are prohibited.",
      correctAnswer: true,
      explanation:
        "TRUE. Aggravated spins past 2 turns are prohibited. An aggravated spin uses pro-spin control inputs and can develop into an unrecoverable situation. Normal spins (controls neutral after entry) are the only authorized spin type.",
      limitation: true,
    },
    {
      id: "tf-18",
      category: "Prohibited",
      topic: "Maneuvers",
      difficulty: "critical",
      question: "Spins with the PCL above idle are permitted for training.",
      correctAnswer: false,
      explanation:
        "FALSE. Spins with PCL above idle are prohibited. Power-on spins create gyroscopic effects that make the spin more aggressive and recovery more difficult or impossible. Always ensure PCL is at idle before and during spins.",
      limitation: true,
    },
    {
      id: "tf-19",
      category: "Prohibited",
      topic: "Maneuvers",
      difficulty: "critical",
      question:
        "Spins with landing gear, flaps, or speed brake extended are prohibited.",
      correctAnswer: true,
      explanation:
        "TRUE. Spins with landing gear, flaps, or speed brake extended are prohibited. These surfaces create asymmetric drag and can make the spin unrecoverable. Always ensure clean configuration before spin entry.",
      limitation: true,
    },
    {
      id: "tf-20",
      category: "Prohibited",
      topic: "Maneuvers",
      difficulty: "critical",
      question: "Spins with the PMU off are permitted for emergency training.",
      correctAnswer: false,
      explanation:
        "FALSE. Spins with PMU off are prohibited. The PMU (Power Management Unit) controls engine parameters during unusual attitudes. With PMU off, the engine may not respond properly during spin recovery, potentially causing engine failure at a critical moment.",
      limitation: true,
    },
    {
      id: "tf-21",
      category: "Prohibited",
      topic: "Maneuvers",
      difficulty: "critical",
      question: "Tail slides are prohibited maneuvers.",
      correctAnswer: true,
      explanation:
        "TRUE. Tail slides are prohibited. During a tail slide, the aircraft slides backward through the air which can cause engine damage from reverse airflow, loss of control, or structural damage. This is an extremely dangerous maneuver.",
      limitation: true,
    },
    {
      id: "tf-22",
      category: "Prohibited",
      topic: "Maneuvers",
      difficulty: "critical",
      question: "Abrupt cross-controlled (snap) maneuvers are prohibited.",
      correctAnswer: true,
      explanation:
        "TRUE. Abrupt cross-controlled (snap) maneuvers are prohibited. Snap rolls involve aggressive cross-controlled inputs that can overstress the airframe and lead to departure from controlled flight. Only smooth, coordinated aerobatic maneuvers are permitted.",
      limitation: true,
    },
    {
      id: "tf-23",
      category: "Fuel",
      topic: "Limitations",
      difficulty: "high",
      question:
        "You can perform aerobatics with 60 pounds fuel imbalance if the total fuel is adequate.",
      correctAnswer: false,
      explanation:
        "FALSE. Aerobatic maneuvers, spins, or stalls with greater than 50 pounds fuel imbalance are prohibited. Even with adequate total fuel, imbalance creates roll coupling and control difficulties during aerobatics that can lead to loss of control.",
      limitation: true,
    },
    {
      id: "tf-24",
      category: "Airspeed",
      topic: "Limitations",
      difficulty: "high",
      question:
        "Full rudder deflection above 150 KIAS will exceed rudder control system limits.",
      correctAnswer: true,
      explanation:
        "TRUE. This is a critical limitation - full rudder deflection above 150 KIAS will exceed the limits of the rudder control system. The aerodynamic loads can damage the rudder actuator, cables, or rudder itself. Use smooth, small rudder inputs above 150 KIAS.",
      limitation: true,
    },
    {
      id: "tf-25",
      category: "Airspeed",
      topic: "Performance",
      difficulty: "medium",
      question:
        "The maximum operating speed is 316 KIAS or 0.67 Mach, whichever is lower.",
      correctAnswer: true,
      explanation:
        "TRUE. VNE (never exceed speed) is 316 KIAS OR 0.67 Mach, whichever you reach first. At higher altitudes, you'll hit the Mach limit before the KIAS limit due to decreasing air density. Exceeding either limit risks structural failure.",
      limitation: true,
    },
    {
      id: "tf-26",
      category: "Propulsion",
      topic: "Engine",
      difficulty: "medium",
      question:
        "Stabilized ground operations from 62-80% Np should be avoided due to resonance.",
      correctAnswer: true,
      explanation:
        "TRUE. Avoid stabilized ground operations from 62 to 80% Np due to resonance concerns. This power range creates harmonic vibrations in the propeller system that can cause damage with prolonged exposure. Quickly transition through this range during taxi.",
      limitation: true,
    },

    {
      id: "tf-28",
      category: "Fuel",
      topic: "Emergency",
      difficulty: "high",
      question: "Emergency fuel is 100 pounds and requires immediate landing.",
      correctAnswer: true,
      explanation:
        "TRUE. Emergency fuel is 100 pounds and requires immediate landing at the nearest suitable field. This is minimum fuel for safe pattern, approach, and landing. Below emergency fuel, you risk fuel starvation and engine failure.",
      limitation: true,
    },
    {
      id: "tf-29",
      category: "Systems",
      topic: "PMU",
      difficulty: "medium",
      question: "With PMU off, torque limits are 100% ± 2%.",
      correctAnswer: true,
      explanation:
        "TRUE. With PMU off, torque limits are 100% ± 2% (98-102%). The PMU normally provides precise torque limiting at 100%. With PMU off, you must manually monitor and control torque, and a ± 2% tolerance accounts for manual control variations.",
      limitation: true,
    },
    {
      id: "tf-30",
      category: "Temperature",
      topic: "Limitations",
      difficulty: "medium",
      question:
        "Ground operations are limited to -23°C to +43°C ambient temperature.",
      correctAnswer: true,
      explanation:
        "TRUE. Ground operation is limited to -23°C to +43°C ambient temperature. Outside this range, critical systems may freeze (cold) or overheat (hot). Note that max takeoff temperature is higher (+51°C) than max ground operations.",
      limitation: true,
    },
    {
      id: "tf-31",
      category: "Systems",
      topic: "Pressurization",
      difficulty: "medium",
      question:
        "The overpressurization safety valve opens at 3.6 PSI differential pressure.",
      correctAnswer: false,
      explanation:
        "FALSE. The overpressurization safety valve opens at 4.0 PSI differential pressure, not 3.6 PSI. Normal cabin pressurization above 18,000 ft MSL is 3.6 ± 0.2 PSI, but the safety valve is set higher at 4.0 PSI to prevent structural damage from excessive pressurization.",
      limitation: true,
    },
    {
      id: "tf-32",
      category: "Wind Limits",
      topic: "Limitations",
      difficulty: "medium",
      question:
        "Touch-and-go operations have the same crosswind limit as normal takeoff and landing.",
      correctAnswer: false,
      explanation:
        "FALSE. Touch-and-go operations have a maximum crosswind of 20 knots, which is more restrictive than the normal dry runway limit of 25 knots. The reduced limit accounts for the dynamic nature of touch-and-go operations with rapidly changing weight and configuration.",
      limitation: true,
    },
  ],

  // REORDER/SEQUENCE QUESTIONS
  reorderSequence: [
    {
      id: "seq-1",
      category: "Emergency",
      topic: "Boldface",
      difficulty: "critical",
      question:
        "Order the steps correctly:\nEmergency Engine Shutdown on the Ground",
      correctOrder: ["PCL - OFF", "FIREWALL SHUTOFF HANDLE - PULL"],
      explanation:
        "This is the boldface procedure for emergency engine shutdown on the ground.",
      limitation: false,
    },
    {
      id: "seq-2",
      category: "Emergency",
      topic: "Boldface",
      difficulty: "critical",
      question:
        "Order the steps correctly:\nFire In Flight (if fire confirmed)",
      correctOrder: [
        "PCL - OFF",
        "FIREWALL SHUTOFF HANDLE - PULL",
        "OBOGS SUPPLY LEVER - OFF (BOTH)",
        "DESCENT BELOW 10,000 FEET MSL - INITIATE",
        "EMER LDG GR HANDLE - PULL (AS REQUIRED)",
      ],
      explanation:
        "Critical BOLDFACE procedure for confirmed in-flight fire. The sequence is crucial: First, shut down the engine (PCL - OFF) to eliminate the power source. Second, pull the firewall shutoff handle to cut off fuel flow. Third, turn off OBOGS to prevent contamination from smoke/fumes. Fourth, initiate descent below 10,000 feet MSL where you can breathe without supplemental oxygen. Finally, pull the emergency landing gear handle as required for landing. This procedure must be memorized and executed flawlessly - an in-flight fire is a life-threatening emergency.",
      limitation: false,
    },
    {
      id: "seq-3",
      category: "Emergency",
      topic: "Boldface",
      difficulty: "critical",
      question: "Order the steps correctly:\nOBOGS Failure",
      correctOrder: [
        "OBOGS SUPPLY LEVER - OFF (BOTH)",
        "BOS PUSH MAN - PRESS ON",
        "GREEN RING - PULL (AS REQUIRED)",
        "DESCENT BELOW 10,000 FEET MSL - INITIATE",
        "ALTITUDE - CHECK",
      ],
      explanation:
        "BOLDFACE for OBOGS failure, overtemp, physiological symptoms, or OXY CRIT annunciator. This procedure addresses one of the most dangerous in-flight emergencies - loss of oxygen. The sequence: First, turn off the malfunctioning OBOGS system (both levers). Second, activate the Backup Oxygen System (BOS) by pressing the manual button to get immediate emergency oxygen. Third, pull the green ring if additional oxygen flow is needed. Fourth, immediately begin descending to below 10,000 feet MSL where oxygen is not required. Finally, check your altitude to ensure you're below 10,000 feet. Time is critical - you may have only seconds of useful consciousness at high altitude.",
      limitation: false,
    },

    {
      id: "seq-5",
      category: "Emergency",
      topic: "Boldface",
      difficulty: "critical",
      question:
        "Order the steps correctly:\nInadvertent Departure From Controlled Flight",
      correctOrder: [
        "PCL - IDLE",
        "CONTROLS - NEUTRAL",
        "AIRSPEED - 110 KNOTS (MINIMUM)",
        "PCL - OFF",
      ],
      explanation:
        "BOLDFACE procedure for recovering from inadvertent departure from controlled flight (spins, unusual attitudes). The sequence is designed to stop the spin: First, reduce power to idle (PCL - IDLE) to minimize gyroscopic effects and reduce airspeed. Second, neutralize all controls (CONTROLS - NEUTRAL) to stop any pro-spin inputs. Third, wait for airspeed to reach at least 110 knots, indicating the spin has stopped and you're in a controlled dive. Only then, if the spin hasn't stopped, proceed to the final step: PCL - OFF to eliminate all engine effects. Once recovered, smoothly pull out of the dive without exceeding G limits.",
      limitation: false,
    },

    {
      id: "seq-11",
      category: "Emergency",
      topic: "Boldface",
      difficulty: "critical",
      question:
        "Order the steps correctly:\nEngine Failure During Flight - Immediate Airstart (PMU NORM)",
      correctOrder: ["PCL - MID RANGE", "PMU SWITCH - OFF"],
      explanation:
        "BOLDFACE for engine failure during flight when PMU is in NORM. This is the IMMEDIATE action - move PCL to mid range to provide fuel, then turn PMU switch OFF to bypass any PMU malfunction that may be causing the failure. If engine doesn't respond, continue with full airstart procedures.",
      limitation: false,
    },
    {
      id: "seq-12",
      category: "Emergency",
      topic: "Boldface",
      difficulty: "critical",
      question:
        "Order the steps correctly:\nUncommanded Power Changes / Loss of Power / Uncommanded Propeller Feather",
      correctOrder: ["PCL - AS REQUIRED", "PMU SWITCH - OFF"],
      explanation:
        "BOLDFACE for uncommanded power changes, loss of power, or uncommanded propeller feather. First, move PCL as required to regain power control. Second, turn PMU switch OFF to eliminate PMU as the source of the problem. These are usually PMU malfunctions causing erratic engine behavior.",
      limitation: false,
    },
    {
      id: "seq-13",
      category: "Emergency",
      topic: "Boldface",
      difficulty: "critical",
      question:
        "Order the steps correctly:\nEngine Failure Immediately After Takeoff (Sufficient Runway Remaining Straight Ahead)",
      correctOrder: ["PCL - IDLE", "BRAKES - AS REQUIRED"],
      explanation:
        "BOLDFACE for engine failure on takeoff with sufficient runway remaining STRAIGHT AHEAD to land. First, reduce power to idle (PCL - IDLE). Second, apply brakes as required to stop on remaining runway. Do NOT attempt to restart or troubleshoot - focus on stopping the aircraft safely on the runway.",
      limitation: false,
    },
    {
      id: "seq-14",
      category: "Emergency",
      topic: "Boldface",
      difficulty: "critical",
      question: "Order the steps correctly:\nAbort Takeoff",
      correctOrder: ["PCL - IDLE", "BRAKES - AS REQUIRED"],
      explanation:
        "BOLDFACE for abort takeoff (before rotation). First, immediately retard PCL to IDLE to eliminate thrust. Second, apply maximum braking as required without locking the wheels. Focus on directional control and stopping on the runway. Do NOT pull the firewall shutoff handle unless there's a fire.",
      limitation: false,
    },
    {
      id: "seq-15",
      category: "Emergency",
      topic: "Boldface",
      difficulty: "critical",
      question: "Order the steps correctly:\nEjection",
      correctOrder: ["EJECTION HANDLE - PULL"],
      explanation:
        "BOLDFACE for ejection. When the decision to eject is made, PULL THE EJECTION HANDLE immediately. Don't waste time with other actions. The ejection sequence is automatic: canopy jettisons, seat fires, you separate from seat, parachute deploys. Hesitation costs altitude and can be fatal. Brief ejection decision altitude before every flight.",
      limitation: false,
    },
  ],

  // MATCH ITEMS QUESTIONS
  matchItems: [
    {
      id: "match-1",
      category: "Propulsion",
      topic: "Limitations",
      difficulty: "high",
      question: "Match the engine parameter to its maximum limit:",
      pairs: [
        { left: "Takeoff Torque", right: "100%" },
        { left: "ITT Takeoff", right: "820°C" },
        { left: "Oil Pressure Max", right: "200 PSI" },
        { left: "Oil Temp Max", right: "105°C" },
      ],
      explanation:
        "These are critical engine operating limits: Takeoff Torque = 100% (protects engine and propeller from excessive stress), ITT Takeoff = 820°C (Interstage Turbine Temperature - higher temps damage turbine blades), Oil Pressure Max = 200 PSI (excessive pressure indicates system blockage or relief valve failure), Oil Temp Max = 105°C (higher temps reduce lubrication effectiveness and indicate cooling issues). Exceeding these limits can cause immediate engine damage or failure. Always monitor these parameters during high-power operations like takeoff and climb.",
      limitation: true,
    },
    {
      id: "match-2",
      category: "Airspeed",
      topic: "Limitations",
      difficulty: "high",
      question: "Match the configuration to its maximum airspeed:",
      pairs: [
        { left: "Gear/Flaps Extended", right: "150 KIAS" },
        { left: "Clean Configuration", right: "316 KIAS" },
        { left: "Zoom/Glide Speed", right: "125 KIAS" },
        { left: "Max Mach", right: "0.67 Mach" },
      ],
      explanation:
        "Understanding configuration-specific airspeed limits is critical for safe operations: Gear/Flaps Extended = 150 KIAS (VLE/VFE - structural limits for extended surfaces), Clean Configuration = 316 KIAS (VNE - Never Exceed speed, airframe structural limit), Zoom/Glide Speed = 125 KIAS (optimal speed for emergency pattern if engine fails - balances energy conservation with controllability), Max Mach = 0.67 Mach (high altitude speed limit). Each limit exists to prevent structural damage under specific aerodynamic loads.",
      limitation: true,
    },
    {
      id: "match-3",
      category: "Wind Limits",
      topic: "Limitations",
      difficulty: "medium",
      question: "Match the runway condition to maximum crosswind:",
      pairs: [
        { left: "Dry Runway", right: "25 knots" },
        { left: "Wet Runway", right: "10 knots" },
        { left: "Icy Runway", right: "5 knots" },
        { left: "Touch-and-Go", right: "20 knots" },
      ],
      explanation:
        "Crosswind limits decrease dramatically as runway friction decreases: Dry Runway = 25 knots (full traction allows maximum rudder effectiveness for directional control), Wet Runway = 10 knots (reduced friction means less ability to counteract weathervaning), Icy Runway = 5 knots (minimal friction makes directional control extremely difficult), Touch-and-Go = 20 knots (dynamic operation with varying loads requires extra margin). The weathervaning tendency (aircraft wanting to turn into the wind) becomes harder to control as friction decreases. Always check ATIS/METAR for runway conditions and current winds before flight.",
      limitation: true,
    },

    {
      id: "match-5",
      category: "G Limits",
      topic: "Limitations",
      difficulty: "high",
      question: "Match the configuration to its G limits:",
      pairs: [
        { left: "Symmetric Clean", right: "-3.5 to +7.0" },
        { left: "Symmetric Gear/Flaps", right: "0 to +2.5" },
        { left: "Asymmetric Clean", right: "-1.0 to +4.7" },
        { left: "Asymmetric Gear/Flaps", right: "0 to +2.0" },
      ],
      explanation:
        "G-limits protect the airframe from structural failure and vary dramatically by configuration: Symmetric Clean = -3.5 to +7.0 Gs (maximum structural capability with balanced loading), Symmetric Gear/Flaps = 0 to +2.5 Gs (extended gear and flaps are much more fragile - no negative Gs allowed), Asymmetric Clean = -1.0 to +4.7 Gs (stores on one wing create unbalanced loads reducing limits), Asymmetric Gear/Flaps = 0 to +2.0 Gs (most restrictive due to both extended surfaces and unbalanced loading). Never exceed these limits - doing so risks catastrophic structural failure. The aircraft is strongest in clean, symmetric configuration pulling positive Gs.",
      limitation: true,
    },
    {
      id: "match-6",
      category: "Propulsion",
      topic: "Engine Starts",
      difficulty: "high",
      question: "Match the start attempt to required wait time:",
      pairs: [
        { left: "After 1st attempt", right: "30 seconds" },
        { left: "After 2nd attempt", right: "2 minutes" },
        { left: "After 3rd attempt", right: "5 minutes" },
        { left: "After 4th attempt", right: "30 minutes" },
      ],
      explanation:
        "Starter cooling wait times after each start/motoring attempt: 1st attempt = 30 seconds, 2nd = 2 minutes, 3rd = 5 minutes, 4th = 30 minutes. These progressively longer wait times prevent starter overheating and burnout. The starter is an electric motor that generates significant heat during cranking. Respect these wait times - a burned-out starter grounds the aircraft.",
      limitation: true,
    },
    {
      id: "match-7",
      category: "Propulsion",
      topic: "ITT Limits",
      difficulty: "high",
      question: "Match the condition to its ITT limit:",
      pairs: [
        { left: "Idle Max", right: "750°C" },
        { left: "Takeoff/Max", right: "820°C" },
        { left: "Transient (20 sec)", right: "821-870°C" },
        { left: "Do Not Restart", right: "871-1000°C" },
      ],
      explanation:
        "ITT (Interstage Turbine Temperature) limits by condition: Idle Max = 750°C (normal ground operations), Takeoff/Max = 820°C (maximum continuous ITT for all flight phases), Transient = 821-870°C for 20 seconds (brief excursions during power changes), Do Not Restart Above = 871°C (indicates severe hot start damage). ITT directly correlates to turbine blade temperature and life - exceeding limits causes immediate, permanent damage.",
      limitation: true,
    },
    {
      id: "match-8",
      category: "Propulsion",
      topic: "Oil Parameters",
      difficulty: "medium",
      question: "Match the phase to oil pressure range:",
      pairs: [
        { left: "Takeoff/Max", right: "90-120 PSI" },
        { left: "Aerobatics/Spins", right: "40-130 PSI" },
        { left: "Aero/Spins Idle", right: "15-40 PSI (5 sec)" },
        { left: "Maximum Limit", right: "200 PSI" },
      ],
      explanation:
        "Oil pressure ranges: Takeoff/Max = 90-120 PSI (normal operations), Aerobatics/Spins = 40-130 PSI (wider range for unusual attitudes), Aero/Spins Idle = 15-40 PSI for 5 seconds (allows oil unporting during negative G), Maximum = 200 PSI (indicates blockage or relief valve failure). Oil pressure ensures adequate lubrication - too low risks bearing failure, too high risks seal failure.",
      limitation: true,
    },
    {
      id: "match-9",
      category: "Fuel",
      topic: "Fuel States",
      difficulty: "high",
      question: "Match the fuel state to its quantity:",
      pairs: [
        { left: "Normal Recovery", right: "200 pounds" },
        { left: "Minimum Fuel Dual", right: "150 pounds" },
        { left: "Minimum Fuel Solo", right: "200 pounds" },
        { left: "Emergency Fuel", right: "100 pounds" },
      ],
      explanation:
        "Fuel states and quantities: Normal Recovery = 200 lbs (normal pattern fuel), Minimum Fuel Dual = 150 lbs (ATC priority, 2 crew), Minimum Fuel Solo = 200 lbs (ATC priority, 1 crew - higher due to less efficient CG), Emergency Fuel = 100 lbs (immediate landing required). These represent decreasing safety margins. Plan to land with normal recovery fuel. Declare minimums appropriately to get ATC priority before reaching emergency fuel.",
      limitation: true,
    },
    {
      id: "match-10",
      category: "Propulsion",
      topic: "Np and N1 Parameters",
      difficulty: "medium",
      question: "Match the parameter to its idle range:",
      pairs: [
        { left: "Np Idle", right: "46-50%" },
        { left: "N1 Idle", right: "60-61%" },
        { left: "Np Resonance Avoid", right: "62-80%" },
        { left: "Ng Ground Min", right: "67%" },
      ],
      explanation:
        "Engine percentage parameters: Np Idle (propeller speed) = 46-50%, N1 Idle (gas generator turbine) = 60-61%, Np Resonance Range to Avoid = 62-80% (harmonic vibration range), Ng Ground Minimum for pressurization = 67%. Understanding these parameters helps you monitor engine health and avoid damaging resonance.",
      limitation: true,
    },
  ],

  // FLASHCARD QUESTIONS (already have these, keeping for compatibility)
  flashcards: [
    {
      id: "flash-1",
      category: "Emergency",
      difficulty: "critical",
      type: "boldface",
      question:
        "Emergency Engine Shutdown on the Ground - Complete the procedure",
      answer: "1. PCL - OFF\n2. FIREWALL SHUTOFF HANDLE - PULL",
      shortAnswer: "PCL OFF, FIREWALL SHUTOFF HANDLE PULL",
    },
    // ... existing flashcard data
  ],
};

// Topic categories for filtering
export const topicCategories = {
  systems: ["Propulsion", "Electrical", "Hydraulics", "Fuel", "OBOGS", "ECS"],
  limitations: [
    "Airspeed",
    "G Limits",
    "Wind Limits",
    "Runway",
    "Spins",
    "Temperature",
  ],
  procedures: ["Emergency", "Normal", "Boldface"],
  knowledge: ["Aerodynamics", "Performance", "Instruments", "Avionics"],
};

// Get all questions of a specific type
export function getQuestionsByType(type) {
  return questionDatabase[type] || [];
}

// Get questions filtered by category
export function getQuestionsByCategory(type, category) {
  const questions = questionDatabase[type] || [];
  return questions.filter((q) => q.category === category);
}

// Get only limitation questions
export function getLimitationQuestions() {
  const allQuestions = [];
  Object.keys(questionDatabase).forEach((type) => {
    const questions = questionDatabase[type].filter(
      (q) => q.limitation === true,
    );
    allQuestions.push(...questions.map((q) => ({ ...q, questionType: type })));
  });
  return allQuestions;
}

// Get questions by difficulty
export function getQuestionsByDifficulty(difficulty) {
  const allQuestions = [];
  Object.keys(questionDatabase).forEach((type) => {
    const questions = questionDatabase[type].filter(
      (q) => q.difficulty === difficulty,
    );
    allQuestions.push(...questions.map((q) => ({ ...q, questionType: type })));
  });
  return allQuestions;
}
