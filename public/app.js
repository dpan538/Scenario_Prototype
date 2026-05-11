const scenarios = [
  {
    id: "scenario_01",
    title: "Near Destination vs Managed Parking",
    context:
      "You are making a short stop at night and expect to be away from your vehicle for around 40 minutes. The destination is still open, but the surrounding streets are not very busy. Both parking options are within walking distance, but they offer different kinds of reassurance.",
    options: {
      A: [
        "Closer destination (about 2 minutes away)",
        "More street activity (people occasionally pass by)",
        "Weaker lighting (streetlights are dim or spaced far apart)",
        "Street parking (no clear entry control or staff presence)"
      ],
      B: [
        "Brighter managed car park (lighting is stronger near the entrance)",
        "CCTV visible (camera signs are present, but coverage is unclear)",
        "Patrol presence (a security vehicle sometimes passes through)",
        "Farther from destination (about 6-8 minutes walking)"
      ]
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
      A: [
        "More parking spaces (you can park without circling)",
        "Quiet corner (few people or cars nearby)",
        "Nearby CCTV (camera is mounted nearby, not directly facing the bay)",
        "Less activity (the area may feel isolated after closing time)"
      ],
      B: [
        "More cars nearby (several vehicles are parked in the same row)",
        "More people nearby (pedestrians are still moving through the area)",
        "Facing CCTV (the bay appears closer to a camera's direction)",
        "Farther from entrance (you would walk a little longer)"
      ]
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
      A: [
        "CCTV sign visible (a sign suggests monitoring is present)",
        "Patrol claim displayed (poster says security patrols visit)",
        "Partial obstruction (a tree or column blocks part of the view)",
        "Unclear sightline (hard to see the bay from the main footpath)"
      ],
      B: [
        "No visible security sign (no obvious camera or patrol information)",
        "Open sightline (the vehicle would be visible from several angles)",
        "Strong lighting (the bay is under bright overhead lights)",
        "Clear surroundings (few objects block the view)"
      ],
      C: [
        "No strong security symbol (no clear CCTV or patrol message)",
        "Moderate lighting (not dark, but not brightly lit)",
        "Some natural visibility (near a walkway people may use)",
        "Few people nearby (the area is not busy at the moment)"
      ]
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
      A: [
        "Bright lighting (the vehicle would be easy to see)",
        "Clear surroundings (few hiding spots around the bay)",
        "Visible belongings (bags can still be seen through the window)",
        "Near main walking route (people may pass the vehicle more often)"
      ],
      B: [
        "Moderate lighting (not dark, but less exposed)",
        "Side row (away from the main walking route)",
        "Belongings less obvious (window angle makes the bags harder to notice)",
        "Closer to exit (easier to leave the car park quickly)"
      ]
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
      A: [
        "Familiar residential area (the street feels like a normal everyday place)",
        "Near apartment building (some residents may overlook the street)",
        "Everyday setting (nothing looks unusual or highly restricted)",
        "No clear patrol (no visible staff or security routine)"
      ],
      B: [
        "Unfamiliar office car park (you have not parked there before)",
        "Guard patrol (a guard is seen walking through occasionally)",
        "Managed access (entry and exit appear controlled)",
        "Less personal familiarity (the area feels less known to you)"
      ]
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
      A: [
        "Underground car park (covered and close to the venue)",
        "Concrete pillars nearby (some parts of the bay are hidden)",
        "Limited street visibility (people outside cannot easily see the vehicle)",
        "Shorter walk (about 2 minutes to the venue)"
      ],
      B: [
        "Open street parking (vehicle is visible from the road)",
        "Nearby businesses (some windows face the street)",
        "No formal management (no staff, gate, or patrol is visible)",
        "Weather exposure (vehicle is fully outside)"
      ],
      C: [
        "Paid managed lot (entry and exit are controlled)",
        "Brighter central area (main rows are well lit)",
        "Farther walk (about 8-10 minutes to the venue)",
        "Higher cost (parking fee is clearly posted)"
      ]
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

const cueList = [
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

const contextShiftAnswers = [
  "Yes, I would reconsider",
  "No, I'd keep my choice",
  "Not sure"
];

const cueIcons = {
  Lighting: "bulb",
  Visibility: "eye",
  "Distance / convenience": "pin",
  "People nearby": "users",
  "CCTV / patrol": "camera",
  Familiarity: "home",
  Quietness: "volume-off",
  "Visible belongings": "backpack",
  "Managed environment": "building",
  Other: "dots"
};

const app = document.querySelector("#app");

const state = {
  startedAt: null,
  completedAt: null,
  scenarioPath: [],
  currentIndex: 0,
  selectedOption: null,
  selectedCues: new Set(),
  confidence: null,
  wasUnsure: false,
  contextShiftAnswer: null,
  responses: [],
  feedbackVisible: false,
  error: ""
};

renderIntro();

function renderIntro() {
  app.innerHTML = `
    <div class="topline">
      <h1>Parking Scenario Reflection Tool</h1>
      <span class="muted">Local research prototype</span>
    </div>
    <div class="rule"></div>
    <p>This prototype does not predict crime, identify parking locations, or provide driving instructions.</p>
    <p>You will see 6 ambiguous parking scenarios. For each one, choose the option you would personally consider, then select the cues that influenced your judgement.</p>
    <p>There are no correct or incorrect answers. The purpose is to understand how people interpret parking-related cues under uncertainty.</p>
    <div class="rule"></div>
    <button class="button primary" data-action="start">Start</button>
  `;
}

function startSession() {
  state.startedAt = new Date().toISOString();
  state.scenarioPath = scenarios.map((scenario) => scenario.id);
  state.currentIndex = 0;
  state.responses = [];
  resetScenarioState();
  renderScenario();
}

function resetScenarioState() {
  state.selectedOption = null;
  state.selectedCues = new Set();
  state.confidence = null;
  state.wasUnsure = false;
  state.contextShiftAnswer = null;
  state.feedbackVisible = false;
  state.error = "";
}

function renderScenario() {
  const scenario = getCurrentScenario();
  const scenarioNumber = state.currentIndex + 1;
  const totalScenarios = state.scenarioPath.length;
  app.innerHTML = `
    <div class="topline">
      <h1>Parking Scenario Reflection Tool</h1>
      <span>Scenario ${scenarioNumber} / ${totalScenarios}</span>
    </div>
    ${renderStepDots(scenarioNumber, totalScenarios)}
    <div class="rule"></div>
    <h2>${escapeHtml(scenario.title)}</h2>
    <p class="preline">${escapeHtml(scenario.context)}</p>
    <div class="rule"></div>
    <div class="option-grid">
      ${Object.keys(scenario.options)
        .map((optionKey) => renderOptionPanel(optionKey, scenario))
        .join("")}
    </div>
    ${renderReflectionPanel(scenario)}
  `;
}

function renderStepDots(current, total) {
  return `
    <div class="step-indicator" aria-label="Scenario ${current} of ${total}">
      ${Array.from({ length: total }, (_, index) => {
        const step = index + 1;
        const dot =
          step < current
            ? `<div class="step-dot done">${icon("check")}</div>`
            : step === current
              ? `<div class="step-dot active">${step}</div>`
              : `<div class="step-dot">${step}</div>`;
        return index === 0 ? dot : `<div class="step-line"></div>${dot}`;
      }).join("")}
    </div>
  `;
}

function renderOptionPanel(optionKey, scenario) {
  const selected = state.selectedOption === optionKey ? " selected" : "";
  const items = scenario.options[optionKey]
    .map((cue) => `<li>${escapeHtml(cue)}</li>`)
    .join("");
  return `
    <section class="option-panel${selected}">
      <h3>Option ${optionKey}</h3>
      <ul>${items}</ul>
      <button class="choice-button${selected}" data-action="choose-option" data-option="${optionKey}">
        Choose ${optionKey}
      </button>
    </section>
  `;
}

function renderReflectionPanel(scenario) {
  if (!state.selectedOption) {
    return `
      <div class="rule"></div>
      <p class="muted small">Choose an option to continue.</p>
    `;
  }

  if (state.feedbackVisible) {
    return `
      <div class="rule"></div>
      <section class="panel">
        <h3>Feedback</h3>
        <p class="preline">${escapeHtml(scenario.feedback[state.selectedOption])}</p>
        <p class="muted small">There is no correct answer - responses vary across individuals.</p>
      </section>
      <div class="rule"></div>
      <section class="panel">
        <h3>Context shift</h3>
        <p>${escapeHtml(scenario.followUpQuestion)}</p>
        <div class="context-row">
          ${contextShiftAnswers
            .map(
              (answer) => `
                <button class="context-button${state.contextShiftAnswer === answer ? " selected" : ""}"
                  data-action="context-answer"
                  data-answer="${escapeAttribute(answer)}">
                  ${escapeHtml(answer)}
                </button>
              `
            )
            .join("")}
        </div>
        ${state.error ? `<div class="error">${escapeHtml(state.error)}</div>` : ""}
        <div class="button-row">
          <button class="button primary" data-action="continue">Continue</button>
        </div>
      </section>
    `;
  }

  const cuesOk = state.selectedCues.size > 0;
  const confidenceOk = Boolean(state.confidence);
  const canSubmit = cuesOk && confidenceOk;
  const hint = !cuesOk
    ? "Select at least one cue"
    : !confidenceOk
      ? "Rate your confidence"
      : "";

  return `
    <div class="rule"></div>
    <section class="panel">
      <h3>What influenced your choice?</h3>
      <div class="tag-row">
        ${cueList
          .map(
            (cue) => `
              <button class="tag${state.selectedCues.has(cue) ? " selected" : ""}"
                data-action="toggle-cue"
                data-cue="${escapeAttribute(cue)}">
                ${icon(cueIcons[cue] || "point", "cue-icon")}
                ${escapeHtml(cue)}
              </button>
            `
          )
          .join("")}
      </div>
      <div class="rule"></div>
      <h3>Uncertainty</h3>
      <button class="tag${state.wasUnsure ? " selected" : ""}" data-action="toggle-unsure">
        ${icon("help", "cue-icon")}
        I was unsure
      </button>
      <div class="rule"></div>
      <h3>How confident are you in this choice?</h3>
      <p class="small muted">1 = Not confident | 5 = Very confident</p>
      <div class="number-row">
        ${[1, 2, 3, 4, 5]
          .map(
            (value) => `
              <button class="number-button${state.confidence === value ? " selected" : ""}"
                data-action="confidence"
                data-confidence="${value}">
                ${value}
              </button>
            `
          )
          .join("")}
      </div>
      ${state.error ? `<div class="error">${escapeHtml(state.error)}</div>` : ""}
      <div class="button-row">
        ${hint ? `<span class="muted small">${escapeHtml(hint)}</span>` : ""}
        <button class="button primary" data-action="submit-reflection" ${canSubmit ? "" : "disabled"}>Submit -&gt;</button>
      </div>
    </section>
  `;
}

async function saveSession() {
  state.completedAt = new Date().toISOString();
  const fallbackSession = createResultSession();
  storeResultSession(fallbackSession);

  app.innerHTML = `
    <h1>Saving session data...</h1>
    <div class="rule"></div>
    <p>Your result is ready. The app is also trying to save a copy on the server.</p>
  `;

  try {
    const response = await fetch("/api/save-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startedAt: state.startedAt,
        completedAt: state.completedAt,
        responses: state.responses
      })
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error || "The server did not accept this session.");
    }

    const saved = await response.json();
    const resultSession = createResultSession(saved);
    storeResultSession(resultSession);

    app.innerHTML = `
      <h1>Result ready.</h1>
      <div class="rule"></div>
      <div class="status-box">
        <p>The result can be viewed now. A server copy was also saved.</p>
        <p>Generated files:</p>
        <ul class="plain-list">
          <li><code>${escapeHtml(saved.storedFiles.sessionJson)}</code></li>
          <li><code>${escapeHtml(saved.storedFiles.sessionCsv)}</code></li>
        </ul>
        <p>Updated:</p>
        <ul class="plain-list">
          <li><code>${escapeHtml(saved.storedFiles.masterCsv)}</code></li>
        </ul>
      </div>
      <div class="button-row">
        <a class="button primary" href="/result.html?session=${encodeURIComponent(resultSession.sessionId)}">View session result</a>
      </div>
    `;
  } catch (error) {
    app.innerHTML = `
      <h1>Result ready.</h1>
      <div class="rule"></div>
      <p>The server copy could not be saved, but your result is available in this browser.</p>
      <p class="small muted">${escapeHtml(error.message)}</p>
      <div class="button-row">
        <a class="button primary" href="/result.html?session=${encodeURIComponent(fallbackSession.sessionId)}">View session result</a>
        <button class="button" data-action="retry-save">Try saving again</button>
      </div>
    `;
  }
}

function createResultSession(saved = {}) {
  const sessionId = saved.sessionId || makeClientSessionId();
  return {
    sessionId,
    startedAt: state.startedAt,
    completedAt: state.completedAt,
    responses: state.responses,
    summary: saved.summary || calculateSummary(state.responses),
    storedFiles: saved.storedFiles || null,
    savedOnServer: Boolean(saved.sessionId)
  };
}

function storeResultSession(session) {
  const payload = JSON.stringify(session);
  try {
    sessionStorage.setItem(`session-result:${session.sessionId}`, payload);
    sessionStorage.setItem("latest-session-result", payload);
  } catch {}

  try {
    localStorage.setItem(`session-result:${session.sessionId}`, payload);
    localStorage.setItem("latest-session-result", payload);
  } catch {}
}

function calculateSummary(responses) {
  const cueCounts = Object.fromEntries(cueList.map((cue) => [cue, 0]));
  for (const response of responses) {
    for (const cue of response.selectedCues) {
      cueCounts[cue] = (cueCounts[cue] || 0) + 1;
    }
  }

  const topCues = Object.entries(cueCounts)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3)
    .map(([cue]) => cue);

  const selectedCueSet = new Set(topCues);
  const lowCues = cueList.filter((cue) => !selectedCueSet.has(cue)).slice(0, 3);
  const confidenceTotal = responses.reduce((total, response) => total + response.confidence, 0);
  const averageConfidence = responses.length
    ? Number((confidenceTotal / responses.length).toFixed(2))
    : 0;

  return {
    scenarioPath: responses
      .map((response) => `${response.scenarioId}:${response.selectedOption}`)
      .join(" > "),
    scenarioCount: responses.length,
    topCues,
    lowCues,
    reconsiderCount: responses.filter(
      (response) =>
        response.contextShiftAnswer === "Yes, I would reconsider" ||
        response.contextShiftAnswer === "Yes, I might reconsider."
    ).length,
    averageConfidence
  };
}

function makeClientSessionId() {
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    "_",
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0")
  ].join("");
  const suffix = Math.random().toString(36).slice(2, 6);
  return `session_${stamp}_${suffix}`;
}

function continueFromContext() {
  if (!state.contextShiftAnswer) {
    state.error = "Please answer the context-shift question.";
    renderScenario();
    return;
  }

  const scenario = getCurrentScenario();
  state.responses.push({
    scenarioOrder: state.currentIndex + 1,
    scenarioId: scenario.id,
    scenarioTitle: scenario.title,
    selectedOption: state.selectedOption,
    selectedCues: [...state.selectedCues],
    confidence: state.confidence,
    wasUnsure: state.wasUnsure,
    contextShiftAnswer: state.contextShiftAnswer,
    submittedAt: new Date().toISOString()
  });

  if (state.responses.length === state.scenarioPath.length) {
    saveSession();
    return;
  }

  state.currentIndex += 1;
  resetScenarioState();
  renderScenario();
}

function getCurrentScenario() {
  const id = state.scenarioPath[state.currentIndex];
  return scenarios.find((scenario) => scenario.id === id);
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;

  if (action === "start") {
    startSession();
  }

  if (action === "choose-option") {
    state.selectedOption = target.dataset.option;
    state.error = "";
    renderScenario();
  }

  if (action === "need-option") {
    state.error = "Please choose an option.";
    renderScenario();
  }

  if (action === "toggle-cue") {
    const cue = target.dataset.cue;
    if (state.selectedCues.has(cue)) {
      state.selectedCues.delete(cue);
    } else {
      state.selectedCues.add(cue);
    }
    state.error = "";
    renderScenario();
  }

  if (action === "toggle-unsure") {
    state.wasUnsure = !state.wasUnsure;
    state.error = "";
    renderScenario();
  }

  if (action === "confidence") {
    state.confidence = Number(target.dataset.confidence);
    state.error = "";
    renderScenario();
  }

  if (action === "submit-reflection") {
    if (state.selectedCues.size === 0) {
      state.error = "Please select at least one cue.";
      renderScenario();
      return;
    }
    if (!state.confidence) {
      state.error = "Please select a confidence value.";
      renderScenario();
      return;
    }
    state.feedbackVisible = true;
    state.error = "";
    renderScenario();
  }

  if (action === "context-answer") {
    state.contextShiftAnswer = target.dataset.answer;
    state.error = "";
    renderScenario();
  }

  if (action === "continue") {
    continueFromContext();
  }

  if (action === "retry-save") {
    saveSession();
  }
});

function icon(name, extraClass = "") {
  const cls = extraClass ? `icon ${extraClass}` : "icon";
  const shapes = {
    backpack:
      '<path d="M7 7h10"/><path d="M8 7v-1a4 4 0 0 1 8 0v1"/><rect x="5" y="7" width="14" height="13" rx="2"/><path d="M8 12h8"/><path d="M8 16h3"/>',
    building:
      '<rect x="5" y="4" width="14" height="16" rx="1"/><path d="M9 8h1"/><path d="M14 8h1"/><path d="M9 12h1"/><path d="M14 12h1"/><path d="M9 20v-4h6v4"/>',
    bulb:
      '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M8 11a4 4 0 1 1 8 0c0 2-2 3-2 5h-4c0-2-2-3-2-5z"/>',
    camera:
      '<rect x="4" y="7" width="16" height="11" rx="2"/><path d="M8 7l1.5-3h5L16 7"/><circle cx="12" cy="12.5" r="3"/>',
    check: '<path d="M5 12l4 4L19 6"/>',
    dots:
      '<circle cx="6" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18" cy="12" r="1"/>',
    eye:
      '<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="3"/>',
    help:
      '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 4.7 1.2c0 2-2.2 2.1-2.2 4"/><path d="M12 18h.01"/>',
    home:
      '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    pin:
      '<path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11z"/><circle cx="12" cy="10" r="2"/>',
    point: '<circle cx="12" cy="12" r="2"/>',
    users:
      '<circle cx="9" cy="8" r="3"/><path d="M3 20c.5-4 3-6 6-6s5.5 2 6 6"/><path d="M16 11a3 3 0 1 0 0-6"/><path d="M17 14c2.3.5 3.7 2.4 4 6"/>',
    "volume-off":
      '<path d="M5 9v6h4l5 4V5L9 9H5z"/><path d="M19 9l-4 4"/><path d="M15 9l4 4"/>'
  };
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${shapes[name] || shapes.point}</svg>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
