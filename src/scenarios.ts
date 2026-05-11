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
  "Other"
];

export const contextShiftAnswers = [
  "Yes, I would reconsider",
  "No, I'd keep my choice",
  "Not sure"
];

export const legacyContextShiftAnswers = [
  "Yes, I might reconsider.",
  "No, I would probably stay with my choice.",
  "I am not sure."
];

export const scenarios: Scenario[] = [
  {
    id: "scenario_01",
    title: "Near Destination vs Managed Parking",
    context: "Parking at night, around 40 minutes.",
    options: {
      A: {
        title: "Option A",
        cues: [
          "Closer destination",
          "More street activity",
          "Weaker lighting",
          "Street parking"
        ]
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
      A: "Proximity and street activity may have shaped your choice.",
      B: "Lighting, CCTV, and patrol presence may have shaped your choice."
    }
  },
  {
    id: "scenario_02",
    title: "Quiet Availability vs Crowded Visibility",
    context: "Parking near a public area for one to two hours.",
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
      A: "Quietness and available space may have shaped your choice.",
      B: "Nearby people, vehicles, and direct CCTV visibility may have shaped your choice."
    }
  },
  {
    id: "scenario_03",
    title: "Security Symbol vs Actual Visibility",
    context: "Parking in a less familiar area.",
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
      A: "Security signs and patrol claims may have shaped your choice.",
      B: "Open sightlines and lighting may have shaped your choice."
    }
  },
  {
    id: "scenario_04",
    title: "Visible Belongings vs Less Noticeable Belongings",
    context:
      "Parking for a longer period with a laptop bag and sleeping bag visible inside the vehicle.",
    options: {
      A: {
        title: "Option A",
        cues: [
          "Bright lighting",
          "Clear surroundings",
          "Visible belongings",
          "Near main walking route"
        ]
      },
      B: {
        title: "Option B",
        cues: [
          "Moderate lighting",
          "Side row",
          "Belongings less obvious",
          "Closer to exit"
        ]
      }
    },
    followUpQuestion:
      "Would your choice change if you could move the bag and sleeping gear out of sight?",
    feedback: {
      A: "Lighting and clear surroundings may have shaped your choice.",
      B: "Making belongings less noticeable may have shaped your choice."
    }
  },
  {
    id: "scenario_05",
    title: "Familiar Residential Area vs Managed Unknown Area",
    context: "Parking for an extended period or overnight.",
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
      A: "Familiarity and everyday experience may have shaped your choice.",
      B: "Formal management and patrol presence may have shaped your choice."
    }
  }
];

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.id === id);
}
