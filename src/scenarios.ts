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
          "Closer destination (about 2 minutes away)",
          "More street activity (people occasionally pass by)",
          "Weaker lighting (streetlights are dim or spaced far apart)",
          "Street parking (no clear entry control or staff presence)"
        ]
      },
      B: {
        title: "Option B",
        cues: [
          "Brighter managed car park (lighting is stronger near the entrance)",
          "CCTV visible (camera signs are present, but coverage is unclear)",
          "Patrol presence (a security vehicle sometimes passes through)",
          "Farther from destination (about 6-8 minutes walking)"
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
          "More parking spaces (you can park without circling)",
          "Quiet corner (few people or cars nearby)",
          "Nearby CCTV (camera is mounted nearby, not directly facing the bay)",
          "Less activity (the area may feel isolated after closing time)"
        ]
      },
      B: {
        title: "Option B",
        cues: [
          "More cars nearby (several vehicles are parked in the same row)",
          "More people nearby (pedestrians are still moving through the area)",
          "Facing CCTV (the bay appears closer to a camera's direction)",
          "Farther from entrance (you would walk a little longer)"
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
          "CCTV sign visible (a sign suggests monitoring is present)",
          "Patrol claim displayed (poster says security patrols visit)",
          "Partial obstruction (a tree or column blocks part of the view)",
          "Unclear sightline (hard to see the bay from the main footpath)"
        ]
      },
      B: {
        title: "Option B",
        cues: [
          "No visible security sign (no obvious camera or patrol information)",
          "Open sightline (the vehicle would be visible from several angles)",
          "Strong lighting (the bay is under bright overhead lights)",
          "Clear surroundings (few objects block the view)"
        ]
      },
      C: {
        title: "Option C",
        cues: [
          "No strong security symbol (no clear CCTV or patrol message)",
          "Moderate lighting (not dark, but not brightly lit)",
          "Some natural visibility (near a walkway people may use)",
          "Few people nearby (the area is not busy at the moment)"
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
          "Bright lighting (the vehicle would be easy to see)",
          "Clear surroundings (few hiding spots around the bay)",
          "Visible belongings (bags can still be seen through the window)",
          "Near main walking route (people may pass the vehicle more often)"
        ]
      },
      B: {
        title: "Option B",
        cues: [
          "Moderate lighting (not dark, but less exposed)",
          "Side row (away from the main walking route)",
          "Belongings less obvious (window angle makes the bags harder to notice)",
          "Closer to exit (easier to leave the car park quickly)"
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
          "Familiar residential area (the street feels like a normal everyday place)",
          "Near apartment building (some residents may overlook the street)",
          "Everyday setting (nothing looks unusual or highly restricted)",
          "No clear patrol (no visible staff or security routine)"
        ]
      },
      B: {
        title: "Option B",
        cues: [
          "Unfamiliar office car park (you have not parked there before)",
          "Guard patrol (a guard is seen walking through occasionally)",
          "Managed access (entry and exit appear controlled)",
          "Less personal familiarity (the area feels less known to you)"
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
          "Underground car park (covered and close to the venue)",
          "Concrete pillars nearby (some parts of the bay are hidden)",
          "Limited street visibility (people outside cannot easily see the vehicle)",
          "Shorter walk (about 2 minutes to the venue)"
        ]
      },
      B: {
        title: "Option B",
        cues: [
          "Open street parking (vehicle is visible from the road)",
          "Nearby businesses (some windows face the street)",
          "No formal management (no staff, gate, or patrol is visible)",
          "Weather exposure (vehicle is fully outside)"
        ]
      },
      C: {
        title: "Option C",
        cues: [
          "Paid managed lot (entry and exit are controlled)",
          "Brighter central area (main rows are well lit)",
          "Farther walk (about 8-10 minutes to the venue)",
          "Higher cost (parking fee is clearly posted)"
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
