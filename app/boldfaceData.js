// T-6A Boldface Emergency Procedures
// Fill-in-the-blank questions based on official boldface procedures
// Each step has: blankItem (the control/item) and blankAction (what to do with it)

export const boldfaceProcedures = [
  {
    id: "bf-001",
    category: "Emergency Engine Shutdown",
    procedure: "Emergency Engine Shutdown on the Ground",
    steps: [
      { blankItem: "PCL", blankAction: "OFF", type: "text" },
      {
        blankItem: "FIREWALL SHUTOFF HANDLE",
        blankAction: "PULL",
        type: "text",
      },
    ],
  },
  {
    id: "bf-002",
    category: "Abort",
    procedure: "Abort",
    steps: [
      { blankItem: "PCL", blankAction: "IDLE", type: "text" },
      { blankItem: "BRAKES", blankAction: "AS REQUIRED", type: "text" },
    ],
  },
  {
    id: "bf-003",
    category: "Engine Failure",
    procedure:
      "Engine Failure Immediately After Takeoff (Sufficient Runway Remaining Straight Ahead)",
    steps: [
      {
        blankItem: "AIRSPEED",
        blankAction: "110 KNOTS (MINIMUM)",
        type: "text",
      },
      { blankItem: "PCL", blankAction: "AS REQUIRED", type: "text" },
      {
        blankItem: "EMER LDG GR HANDLE",
        blankAction: "PULL (AS REQUIRED)",
        type: "text",
      },
    ],
  },
  {
    id: "bf-004",
    category: "Engine Failure",
    procedure: "Engine Failure During Flight",
    steps: [
      {
        blankItem: "ZOOM/GLIDE",
        blankAction: "125 KNOTS (MINIMUM)",
        type: "text",
      },
      { blankItem: "PCL", blankAction: "OFF", type: "text" },
      { blankItem: "INTERCEPT", blankAction: "ELP", type: "text" },
    ],
  },
  {
    id: "bf-005",
    category: "Airstart",
    procedure: "Immediate Airstart (PMU NORM)",
    steps: [
      { blankItem: "PCL", blankAction: "OFF", type: "text" },
      { blankItem: "STARTER SWITCH", blankAction: "AUTO/RESET", type: "text" },
      { blankItem: "PCL", blankAction: "IDLE, ABOVE 13% N1", type: "text" },
    ],
  },
  {
    id: "bf-006",
    category: "Power Issues",
    procedure:
      "Uncommanded Power Changes / Loss of Power / Uncommanded Propeller Feather",
    steps: [
      { blankItem: "PCL", blankAction: "MID RANGE", type: "text" },
      { blankItem: "PMU SWITCH", blankAction: "OFF", type: "text" },
      {
        blankItem: "PROP SYS CIRCUIT BREAKER (left front console)",
        blankAction: "PULL, IF Np STABLE BELOW 40%",
        type: "text",
      },
    ],
  },
  {
    id: "bf-007",
    category: "Departure",
    procedure: "Inadvertent Departure From Controlled Flight",
    steps: [
      { blankItem: "PCL", blankAction: "IDLE", type: "text" },
      { blankItem: "CONTROLS", blankAction: "NEUTRAL", type: "text" },
      { blankItem: "ALTITUDE", blankAction: "CHECK", type: "text" },
    ],
  },
  {
    id: "bf-008",
    category: "Fire",
    procedure: "Fire In Flight, If Fire is Confirmed:",
    steps: [
      { blankItem: "PCL", blankAction: "OFF", type: "text" },
      {
        blankItem: "FIREWALL SHUTOFF HANDLE",
        blankAction: "PULL",
        type: "text",
      },
    ],
  },
  {
    id: "bf-009",
    category: "Physiological",
    procedure: "<32>PHYSIOLOGICAL SYMPTOMS",
    steps: [
      { blankItem: "BOS PUSH MAN", blankAction: "PRESS ON", type: "text" },
    ],
  },
  {
    id: "bf-010",
    category: "OBOGS",
    procedure:
      "<30>OBOGS Failure / Overtemp / Physiological Symptoms/<32>OXY CRIT Annunciator",
    steps: [
      {
        blankItem: "GREEN RING",
        blankAction: "PULL (AS REQUIRED)",
        type: "text",
      },
      {
        blankItem: "DESCENT BELOW",
        blankAction: "10,000 FEET MSL",
        type: "none",
      },
      { text: " - INITIATE", type: "textonly" },
      {
        blankItem: "OBOGS SUPPLY LEVER",
        blankAction: "OFF (BOTH)",
        type: "text",
      },
    ],
  },
  {
    id: "bf-011",
    category: "Ejection",
    procedure: "Eject",
    steps: [
      { blankItem: "EJECTION HANDLE", blankAction: "PULL", type: "text" },
    ],
  },
];

export function getAllBoldfaceProcedures() {
  return boldfaceProcedures.map((proc) => ({
    ...proc,
    questionType: "fillInBlank",
  }));
}
