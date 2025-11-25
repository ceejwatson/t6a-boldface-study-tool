// T-6A Boldface Emergency Procedures
// Fill-in-the-blank questions based on official boldface procedures

export const boldfaceProcedures = [
  {
    id: "bf-001",
    category: "Emergency Engine Shutdown",
    procedure: "Emergency Engine Shutdown on the Ground",
    steps: [
      { text: "PCL - ", blank: "OFF", type: "text" },
      { text: "FIREWALL SHUTOFF HANDLE - ", blank: "PULL", type: "text" },
    ],
  },
  {
    id: "bf-002",
    category: "Abort",
    procedure: "Abort",
    steps: [
      { text: "PCL - ", blank: "IDLE", type: "text" },
      { text: "BRAKES - ", blank: "AS REQUIRED", type: "text" },
    ],
  },
  {
    id: "bf-003",
    category: "Engine Failure",
    procedure: "Engine Failure Immediately After Takeoff (Sufficient Runway Remaining Straight Ahead)",
    steps: [
      { text: "AIRSPEED - ", blank: "110 KNOTS (MINIMUM)", type: "text" },
      { text: "PCL - ", blank: "AS REQUIRED", type: "text" },
      { text: "EMER LDG GR HANDLE - ", blank: "PULL (AS REQUIRED)", type: "text" },
    ],
  },
  {
    id: "bf-004",
    category: "Engine Failure",
    procedure: "Engine Failure During Flight",
    steps: [
      { text: "ZOOM/GLIDE - ", blank: "125 KNOTS (MINIMUM)", type: "text" },
      { text: "PCL - ", blank: "OFF", type: "text" },
      { text: "INTERCEPT ", blank: "ELP", type: "text" },
    ],
  },
  {
    id: "bf-005",
    category: "Airstart",
    procedure: "Immediate Airstart (PMU NORM)",
    steps: [
      { text: "PCL - ", blank: "OFF", type: "text" },
      { text: "STARTER SWITCH - ", blank: "AUTO/RESET", type: "text" },
      { text: "PCL - ", blank: "IDLE, ABOVE 13% N1", type: "text" },
    ],
  },
  {
    id: "bf-006",
    category: "Power Issues",
    procedure: "Uncommanded Power Changes / Loss of Power / Uncommanded Propeller Feather",
    steps: [
      { text: "PCL - ", blank: "MID RANGE", type: "text" },
      { text: "PMU SWITCH - ", blank: "OFF", type: "text" },
      { text: "PROP SYS CIRCUIT BREAKER (left front console) - ", blank: "PULL, IF Np STABLE BELOW 40%", type: "text" },
    ],
  },
  {
    id: "bf-007",
    category: "Departure",
    procedure: "Inadvertent Departure From Controlled Flight",
    steps: [
      { text: "PCL - ", blank: "IDLE", type: "text" },
      { text: "CONTROLS - ", blank: "NEUTRAL", type: "text" },
      { text: "ALTITUDE - ", blank: "CHECK", type: "text" },
    ],
  },
  {
    id: "bf-008",
    category: "Fire",
    procedure: "Fire In Flight, If Fire is Confirmed:",
    steps: [
      { text: "PCL - ", blank: "OFF", type: "text" },
      { text: "FIREWALL SHUTOFF HANDLE - ", blank: "PULL", type: "text" },
    ],
  },
  {
    id: "bf-009",
    category: "Physiological",
    procedure: "<32>PHYSIOLOGICAL SYMPTOMS",
    steps: [
      { text: "BOS PUSH MAN - ", blank: "PRESS ON", type: "text" },
    ],
  },
  {
    id: "bf-010",
    category: "OBOGS",
    procedure: "<30>OBOGS Failure / Overtemp / Physiological Symptoms/<32>OXY CRIT Annunciator",
    steps: [
      { text: "GREEN RING - ", blank: "PULL (AS REQUIRED)", type: "text" },
      { text: "DESCENT BELOW ", blank: "10,000 FEET MSL", type: "text" },
      { text: " - INITIATE", blank: "", type: "none" },
      { text: "OBOGS SUPPLY LEVER - ", blank: "OFF (BOTH)", type: "text" },
    ],
  },
  {
    id: "bf-011",
    category: "Ejection",
    procedure: "Eject",
    steps: [
      { text: "EJECTION HANDLE - ", blank: "PULL", type: "text" },
    ],
  },
];

export function getAllBoldfaceProcedures() {
  return boldfaceProcedures.map(proc => ({
    ...proc,
    questionType: "fillInBlank"
  }));
}
