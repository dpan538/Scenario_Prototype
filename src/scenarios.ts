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
    context:
      "You are making a short stop at night and expect to be away from your vehicle for around 40 minutes. The destination is still open, but the surrounding streets are not very busy. Both parking options are within walking distance, but they offer different kinds of reassurance.",
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
          "Brighter managed car park",
          "CCTV visible",
          "Patrol presence",
          "Farther from destination"
        ]
      }
    },
    followUpQuestion:
      "Would your choice change if you were parking for three hours instead of 40 minutes?",
    feedback: {
      A: "You may have prioritised being close to the destination and having some casual street activity nearby.",
      B: "You may have prioritised formal management cues such as lighting, CCTV signs, and patrol presence."
    }
  },
  {
    id: "scenario_02",
    title: "Quiet Availability vs Crowded Visibility",
    context:
      "You are visiting a public area during the evening and plan to leave your vehicle unattended for one to two hours. The main entrance is busy now, but nearby shops may close before you return. One option is easier and quieter; the other has more people and vehicles around.",
    options: {
      A: {
        title: "Option A",
        cues: [
          "More parking spaces",
          "Quiet corner",
          "Nearby CCTV",
          "Less activity"
        ]
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
      A: "You may have prioritised convenience and available space, even though the area is quieter.",
      B: "You may have prioritised natural visibility from nearby people, vehicles, and CCTV direction."
    }
  },
  {
    id: "scenario_03",
    title: "Security Symbol vs Actual Visibility",
    context:
      "You need to park in an area you do not regularly visit. It is after dark, and you only have a short moment to assess the space before walking away. Some security cues are visible, but it is not obvious whether they actually cover the parking bay.",
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
      },
      C: {
        title: "Option C",
        cues: [
          "No strong security symbol",
          "Moderate lighting",
          "Some natural visibility",
          "Few people nearby"
        ]
      }
    },
    followUpQuestion:
      "Would your choice change if the CCTV sign did not show where the camera actually points?",
    feedback: {
      A: "You may have placed weight on formal security symbols, even though the actual view is partly blocked.",
      B: "You may have placed more weight on direct visibility and lighting than on security signage.",
      C: "You may have preferred a middle position where the space is not strongly managed but also not fully hidden."
    }
  },
  {
    id: "scenario_04",
    title: "Visible Belongings vs Less Noticeable Belongings",
    context:
      "You need to leave your vehicle parked for several hours. Before stepping away, you notice that a laptop bag and a sleeping bag are clearly visible through the rear window. You cannot remove the items immediately, so the parking position may affect how noticeable they are.",
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
      A: "You may have prioritised environmental visibility even though the belongings remain noticeable.",
      B: "You may have prioritised making the belongings less obvious, even with less public visibility."
    }
  },
  {
    id: "scenario_05",
    title: "Familiar Residential Area vs Managed Unknown Area",
    context:
      "You need to leave your vehicle overnight or for an extended period. One option is in a residential area that feels socially familiar, while the other is a more formal parking area you have not used before. Both involve uncertainty because you will not return for many hours.",
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
      A: "You may have treated familiarity and a normal residential setting as reassuring cues.",
      B: "You may have treated management, access control, and patrol presence as reassuring cues."
    }
  },
  {
    id: "scenario_06",
    title: "Underground vs Open Street vs Paid Managed Lot",
    context:
      "You are arriving for an evening event and expect to park for two to three hours. Three parking options are available near the venue. Each option offers a different balance of visibility, management, cost, and walking distance.",
    options: {
      A: {
        title: "Option A",
        cues: [
          "Underground car park",
          "Concrete pillars nearby",
          "Limited street visibility",
          "Shorter walk"
        ]
      },
      B: {
        title: "Option B",
        cues: [
          "Open street parking",
          "Nearby businesses",
          "No formal management",
          "Weather exposure"
        ]
      },
      C: {
        title: "Option C",
        cues: [
          "Paid managed lot",
          "Brighter central area",
          "Farther walk",
          "Higher cost"
        ]
      }
    },
    followUpQuestion:
      "Would your choice change if the event ended later than expected and you returned after most nearby businesses had closed?",
    feedback: {
      A: "You may have prioritised being close and covered, even though the underground layout reduces public visibility.",
      B: "You may have prioritised openness and street visibility, even without formal management.",
      C: "You may have prioritised controlled access and lighting, even with a longer walk and higher cost."
    }
  }
];

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.id === id);
}
