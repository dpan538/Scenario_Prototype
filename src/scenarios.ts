import type { Scenario } from "./types.js";

export const cueList = [
  "Lighting",
  "Visibility",
  "Distance / convenience",
  "People nearby",
  "CCTV / patrol",
  "Familiarity",
  "Quietness",
  "Visible belongings",
  "Managed environment",
  "I was unsure",
  "Other"
];

export const contextShiftAnswers = [
  "Yes, I might reconsider.",
  "No, I would probably stay with my choice.",
  "I am not sure."
];

export const scenarios: Scenario[] = [
  {
    id: "scenario_01",
    title: "Near Destination vs Managed Parking",
    context:
      "You are parking at night for around 40 minutes.\nBoth options include mixed cues.",
    options: {
      A: {
        title: "Option A",
        cues: ["Closer destination", "More street activity", "Weaker lighting"]
      },
      B: {
        title: "Option B",
        cues: [
          "Brighter car park",
          "CCTV visible",
          "Patrol presence",
          "Farther from destination"
        ]
      }
    },
    followUpQuestion:
      "Would your choice change if you were parking for three hours instead of 40 minutes?",
    feedback: {
      A:
        "You selected Option A.\n\nThis may suggest that proximity and street activity felt important in your judgement.\nAnother participant might focus more on lighting or formal surveillance.\n\nThere is no correct answer in this scenario.",
      B:
        "You selected Option B.\n\nThis may suggest that lighting, CCTV, and patrol presence felt reassuring.\nAnother participant might focus more on distance or street activity.\n\nThere is no correct answer in this scenario."
    }
  },
  {
    id: "scenario_02",
    title: "Quiet Availability vs Crowded Visibility",
    context:
      "You are parking near a public area for around one to two hours.\nBoth options include mixed cues.",
    options: {
      A: {
        title: "Option A",
        cues: ["More parking spaces", "Quiet corner", "Nearby CCTV", "Less activity"]
      },
      B: {
        title: "Option B",
        cues: [
          "More cars nearby",
          "More people nearby",
          "Facing CCTV",
          "Farther from entrance"
        ]
      }
    },
    followUpQuestion:
      "Would your choice change if the area became much quieter after closing time?",
    feedback: {
      A:
        "You selected Option A.\n\nThis may suggest that quietness and available space felt important in your judgement.\nAnother participant might focus more on people, vehicles, or direct visibility.\n\nThere is no correct answer in this scenario.",
      B:
        "You selected Option B.\n\nThis may suggest that people, vehicles, and direct CCTV visibility felt important.\nAnother participant might prefer a quieter area with easier parking.\n\nThere is no correct answer in this scenario."
    }
  },
  {
    id: "scenario_03",
    title: "Security Symbol vs Actual Visibility",
    context:
      "You are parking in a less familiar area.\nBoth options include mixed cues.",
    options: {
      A: {
        title: "Option A",
        cues: [
          "CCTV sign visible",
          "Patrol claim displayed",
          "Partial obstruction",
          "Unclear sightline"
        ]
      },
      B: {
        title: "Option B",
        cues: [
          "No visible security sign",
          "Open sightline",
          "Strong lighting",
          "Clear surroundings"
        ]
      }
    },
    followUpQuestion:
      "Would your choice change if the CCTV sign did not show where the camera actually points?",
    feedback: {
      A:
        "You selected Option A.\n\nThis may suggest that security signs and patrol claims felt reassuring.\nAnother participant might focus more on actual sightlines and lighting.\n\nThere is no correct answer in this scenario.",
      B:
        "You selected Option B.\n\nThis may suggest that open sightlines and lighting felt more important than security signs.\nAnother participant might feel less reassured without visible formal security.\n\nThere is no correct answer in this scenario."
    }
  },
  {
    id: "scenario_04",
    title: "Visible Belongings vs Low Visibility",
    context:
      "You need to park for a longer period. A laptop bag and sleeping bag are visible inside the vehicle.\nBoth options include mixed cues.",
    options: {
      A: {
        title: "Option A",
        cues: ["Bright lighting", "Clear surroundings", "Visible belongings"]
      },
      B: {
        title: "Option B",
        cues: ["Dim lighting", "Low visibility", "Quiet area", "Belongings less obvious"]
      }
    },
    followUpQuestion:
      "Would your choice change if you could move the bag and sleeping gear out of sight?",
    feedback: {
      A:
        "You selected Option A.\n\nThis may suggest that lighting and clear surroundings felt important.\nAnother participant might focus more on the visibility of belongings inside the vehicle.\n\nThere is no correct answer in this scenario.",
      B:
        "You selected Option B.\n\nThis may suggest that reducing the visibility of belongings felt important.\nAnother participant might focus more on lighting and environmental visibility.\n\nThere is no correct answer in this scenario."
    }
  },
  {
    id: "scenario_05",
    title: "Familiar Residential Area vs Managed Unknown Area",
    context:
      "You need to park for an extended period or overnight.\nBoth options include mixed cues.",
    options: {
      A: {
        title: "Option A",
        cues: [
          "Familiar residential area",
          "Near apartment building",
          "Everyday setting",
          "No clear patrol"
        ]
      },
      B: {
        title: "Option B",
        cues: [
          "Unfamiliar office car park",
          "Guard patrol",
          "Managed access",
          "Less personal familiarity"
        ]
      }
    },
    followUpQuestion:
      "Would your choice change if you later found out the familiar residential area had very little activity at night?",
    feedback: {
      A:
        "You selected Option A.\n\nThis may suggest that familiarity and everyday experience felt reassuring.\nAnother participant might focus more on formal management or patrol presence.\n\nThere is no correct answer in this scenario.",
      B:
        "You selected Option B.\n\nThis may suggest that formal management and patrol presence felt reassuring.\nAnother participant might prefer the familiarity of a residential area.\n\nThere is no correct answer in this scenario."
    }
  }
];

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.id === id);
}
