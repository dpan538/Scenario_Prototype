const scenarios = [
  {
    id: "scenario_01",
    title: "Near Destination vs Managed Parking",
    context:
      "You are parking at night for around 40 minutes.\nBoth options include mixed cues.",
    options: {
      A: ["Closer destination", "More street activity", "Weaker lighting"],
      B: [
        "Brighter car park",
        "CCTV visible",
        "Patrol presence",
        "Farther from destination"
      ]
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
      A: ["More parking spaces", "Quiet corner", "Nearby CCTV", "Less activity"],
      B: [
        "More cars nearby",
        "More people nearby",
        "Facing CCTV",
        "Farther from entrance"
      ]
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
      A: [
        "CCTV sign visible",
        "Patrol claim displayed",
        "Partial obstruction",
        "Unclear sightline"
      ],
      B: [
        "No visible security sign",
        "Open sightline",
        "Strong lighting",
        "Clear surroundings"
      ]
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
      A: ["Bright lighting", "Clear surroundings", "Visible belongings"],
      B: ["Dim lighting", "Low visibility", "Quiet area", "Belongings less obvious"]
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
      A: [
        "Familiar residential area",
        "Near apartment building",
        "Everyday setting",
        "No clear patrol"
      ],
      B: [
        "Unfamiliar office car park",
        "Guard patrol",
        "Managed access",
        "Less personal familiarity"
      ]
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
  "I was unsure",
  "Other"
];

const contextShiftAnswers = [
  "Yes, I might reconsider.",
  "No, I would probably stay with my choice.",
  "I am not sure."
];

const app = document.querySelector("#app");

const state = {
  startedAt: null,
  completedAt: null,
  scenarioPath: [],
  currentIndex: 0,
  selectedOption: null,
  selectedCues: new Set(),
  confidence: null,
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
    <p>You will see several ambiguous parking scenarios. For each one, choose the option you would personally consider, then select the cues that influenced your judgement.</p>
    <p>There are no correct or incorrect answers. The purpose is to understand how people interpret parking-related cues under uncertainty.</p>
    <div class="rule"></div>
    <button class="button primary" data-action="start">Start</button>
  `;
}

function startSession() {
  state.startedAt = new Date().toISOString();
  state.scenarioPath = ["scenario_01"];
  state.currentIndex = 0;
  state.responses = [];
  resetScenarioState();
  renderScenario();
}

function resetScenarioState() {
  state.selectedOption = null;
  state.selectedCues = new Set();
  state.confidence = null;
  state.contextShiftAnswer = null;
  state.feedbackVisible = false;
  state.error = "";
}

function renderScenario() {
  const scenario = getCurrentScenario();
  const scenarioNumber = state.currentIndex + 1;
  app.innerHTML = `
    <div class="topline">
      <h1>Parking Scenario Reflection Tool</h1>
      <span>Scenario ${scenarioNumber} / 4</span>
    </div>
    <div class="rule"></div>
    <h2>${escapeHtml(scenario.title)}</h2>
    <p class="preline">${escapeHtml(scenario.context)}</p>
    <div class="rule"></div>
    <div class="option-grid">
      ${renderOptionPanel("A", scenario)}
      ${renderOptionPanel("B", scenario)}
    </div>
    ${renderReflectionPanel(scenario)}
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
      <section class="panel">
        <p>Select Option A or Option B before entering cue and confidence data.</p>
        ${state.error ? `<div class="error">${escapeHtml(state.error)}</div>` : ""}
        <div class="button-row">
          <button class="button" data-action="need-option">Continue</button>
        </div>
      </section>
    `;
  }

  if (state.feedbackVisible) {
    return `
      <div class="rule"></div>
      <section class="panel">
        <h3>Feedback</h3>
        <p class="preline">${escapeHtml(scenario.feedback[state.selectedOption])}</p>
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
                ${escapeHtml(cue)}
              </button>
            `
          )
          .join("")}
      </div>
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
        <button class="button primary" data-action="submit-reflection">Submit reflection</button>
      </div>
    </section>
  `;
}

async function saveSession() {
  state.completedAt = new Date().toISOString();
  app.innerHTML = `
    <h1>Saving session data...</h1>
    <div class="rule"></div>
    <p>The session object is being sent to the local server.</p>
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
    app.innerHTML = `
      <h1>Session saved.</h1>
      <div class="rule"></div>
      <div class="status-box">
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
        <a class="button primary" href="/result.html?session=${encodeURIComponent(saved.sessionId)}">View recorded session result</a>
      </div>
    `;
  } catch (error) {
    app.innerHTML = `
      <h1>Session could not be saved.</h1>
      <div class="rule"></div>
      <p>${escapeHtml(error.message)}</p>
      <div class="button-row">
        <button class="button" data-action="retry-save">Try saving again</button>
      </div>
    `;
  }
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
    contextShiftAnswer: state.contextShiftAnswer,
    submittedAt: new Date().toISOString()
  });

  if (state.responses.length === 1) {
    state.scenarioPath =
      state.selectedOption === "A"
        ? ["scenario_01", "scenario_02", "scenario_04", "scenario_05"]
        : ["scenario_01", "scenario_03", "scenario_04", "scenario_05"];
  }

  if (state.responses.length === 4) {
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
