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

const result = document.querySelector("#result");
const params = new URLSearchParams(window.location.search);
const sessionId = params.get("session");

if (!sessionId) {
  result.innerHTML = `
    <h1>Recorded Session Result</h1>
    <div class="rule"></div>
    <p>No session id was provided.</p>
    <a class="button" href="/">Return to prototype</a>
  `;
} else {
  loadSession(sessionId);
}

async function loadSession(id) {
  result.innerHTML = `
    <h1>Recorded Session Result</h1>
    <div class="rule"></div>
    <p>Reading saved session data from the local server...</p>
  `;

  try {
    const response = await fetch(`/api/sessions/${encodeURIComponent(id)}`);
    if (!response.ok) {
      throw new Error("The requested session was not found.");
    }
    const session = await response.json();
    renderSession(session);
  } catch (error) {
    result.innerHTML = `
      <h1>Recorded Session Result</h1>
      <div class="rule"></div>
      <p>${escapeHtml(error.message)}</p>
      <a class="button" href="/">Return to prototype</a>
    `;
  }
}

function renderSession(session) {
  const cueCounts = countCues(session.responses);
  const topCueRows = Object.entries(cueCounts)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3);

  result.innerHTML = `
    <div class="topline">
      <h1>Recorded Session Path</h1>
      <span>Session ID: ${escapeHtml(session.sessionId)}</span>
    </div>
    <div class="rule"></div>
    <p><strong>Started:</strong> ${escapeHtml(formatDate(session.startedAt))}</p>
    <p><strong>Completed:</strong> ${escapeHtml(formatDate(session.completedAt))}</p>
    <p><strong>Scenario path:</strong> ${escapeHtml(session.summary.scenarioPath)}</p>
    <div class="rule"></div>
    <section class="path-tree">
      ${session.responses.map(renderPathNode).join('<div class="down">|</div>')}
    </section>
    <div class="rule"></div>
    <section>
      <h2>Session Statistics</h2>
      <div class="stats-grid">
        <div class="panel">
          <h3>Top selected cues</h3>
          ${
            topCueRows.length
              ? `<ol>${topCueRows
                  .map(
                    ([cue, count]) =>
                      `<li>${escapeHtml(cue)} - ${escapeHtml(count)}</li>`
                  )
                  .join("")}</ol>`
              : "<p>No cues were recorded.</p>"
          }
        </div>
        <div class="panel">
          <h3>Less often selected</h3>
          <ul class="plain-list">
            ${session.summary.lowCues
              .map((cue) => `<li>${escapeHtml(cue)} - ${cueCounts[cue] ?? 0}</li>`)
              .join("")}
          </ul>
        </div>
        <div class="panel">
          <h3>Average confidence</h3>
          <p>${escapeHtml(session.summary.averageConfidence)} / 5</p>
        </div>
        <div class="panel">
          <h3>Reconsideration</h3>
          <p>${escapeHtml(session.summary.reconsiderCount)} of ${escapeHtml(session.summary.scenarioCount)} context shifts</p>
        </div>
      </div>
    </section>
    <div class="rule"></div>
    <section class="panel">
      <h2>Stored Files</h2>
      <p>Generated files:</p>
      <ul class="plain-list">
        <li><code>${escapeHtml(session.storedFiles.sessionJson)}</code></li>
        <li><code>${escapeHtml(session.storedFiles.sessionCsv)}</code></li>
      </ul>
      <p>Updated file:</p>
      <ul class="plain-list">
        <li><code>${escapeHtml(session.storedFiles.masterCsv)}</code></li>
      </ul>
    </section>
    <div class="button-row">
      <a class="button" href="/">Restart</a>
      <a class="button" href="/api/sessions/${encodeURIComponent(session.sessionId)}">View JSON through API</a>
    </div>
  `;
}

function renderPathNode(response) {
  return `
    <article class="result-node">
      <h3>[${escapeHtml(response.scenarioOrder)}] ${escapeHtml(response.scenarioTitle)}</h3>
      <p>Selected: Option ${escapeHtml(response.selectedOption)}</p>
      <p>Cues: ${escapeHtml(response.selectedCues.join(", "))}</p>
      <p>Confidence: ${escapeHtml(response.confidence)} / 5</p>
      <p>Context shift: ${escapeHtml(response.contextShiftAnswer)}</p>
    </article>
  `;
}

function countCues(responses) {
  const counts = Object.fromEntries(cueList.map((cue) => [cue, 0]));
  for (const response of responses) {
    for (const cue of response.selectedCues) {
      counts[cue] = (counts[cue] || 0) + 1;
    }
  }
  return counts;
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
