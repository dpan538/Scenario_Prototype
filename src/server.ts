import express from "express";
import path from "node:path";
import {
  contextShiftAnswers,
  cueList,
  legacyContextShiftAnswers,
  scenarios
} from "./scenarios.js";
import {
  createDataPaths,
  ensureDataFiles,
  readMasterCsv,
  readStoredSession,
  writeStoredSession
} from "./session-writer.js";
import type {
  ParticipantResponse,
  ScenarioOptionKey,
  SessionSubmission
} from "./types.js";

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");
const dataRoot =
  process.env.DATA_DIR ??
  (process.env.VERCEL ? path.join("/tmp", "parking-paper-prototype") : projectRoot);
const dataPaths = createDataPaths(dataRoot);

const app = express();
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "127.0.0.1";

app.use(express.json({ limit: "256kb" }));
app.use(express.static(publicDir));

app.post("/api/save-session", async (req, res) => {
  const validation = validateSubmission(req.body);
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const storedSession = await writeStoredSession(validation.submission, dataPaths);
    res.status(201).json({
      sessionId: storedSession.sessionId,
      storedFiles: storedSession.storedFiles,
      summary: storedSession.summary
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Session data could not be written." });
  }
});

app.get("/api/sessions/:sessionId", async (req, res) => {
  const session = await readStoredSession(req.params.sessionId, dataPaths);
  if (!session) {
    return res.status(404).json({ error: "Session was not found." });
  }

  res.json(session);
});

app.get("/api/sessions", async (_req, res) => {
  const csv = await readMasterCsv(dataPaths);
  res.type("text/plain").send(csv);
});

app.get("/", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

export default app;

if (!process.env.VERCEL) {
  await ensureDataFiles(dataPaths);

  app.listen(port, host, () => {
    console.log(`Parking Scenario Reflection Tool running at http://${host}:${port}`);
  });
}

type ValidationResult =
  | { ok: true; submission: SessionSubmission }
  | { ok: false; error: string };

function validateSubmission(value: unknown): ValidationResult {
  if (!isRecord(value)) {
    return { ok: false, error: "Submission must be an object." };
  }

  const { startedAt, completedAt, responses } = value;
  if (typeof startedAt !== "string" || typeof completedAt !== "string") {
    return { ok: false, error: "Submission timestamps are required." };
  }

  if (!Array.isArray(responses) || responses.length !== scenarios.length) {
    return {
      ok: false,
      error: `Exactly ${scenarios.length} scenario responses are required.`
    };
  }

  const parsedResponses: ParticipantResponse[] = [];
  for (const response of responses) {
    const parsed = validateResponse(response);
    if (!parsed.ok) {
      return parsed;
    }
    parsedResponses.push(parsed.response);
  }

  return {
    ok: true,
    submission: {
      startedAt,
      completedAt,
      responses: parsedResponses
    }
  };
}

type ResponseValidationResult =
  | { ok: true; response: ParticipantResponse }
  | { ok: false; error: string };

function validateResponse(value: unknown): ResponseValidationResult {
  if (!isRecord(value)) {
    return { ok: false, error: "Each response must be an object." };
  }

  const selectedCues = value.selectedCues;
  const selectedOption = value.selectedOption;
  if (
    typeof value.scenarioOrder !== "number" ||
    typeof value.scenarioId !== "string" ||
    typeof value.scenarioTitle !== "string" ||
    !isScenarioOptionKey(selectedOption) ||
    !Array.isArray(selectedCues) ||
    selectedCues.length === 0 ||
    typeof value.confidence !== "number" ||
    value.confidence < 1 ||
    value.confidence > 5 ||
    !Number.isInteger(value.confidence) ||
    typeof value.contextShiftAnswer !== "string" ||
    typeof value.submittedAt !== "string"
  ) {
    return { ok: false, error: "A response is missing required fields." };
  }

  const scenario = scenarios.find((item) => item.id === value.scenarioId);
  if (!scenario || !scenario.options[selectedOption]) {
    return { ok: false, error: "Selected option is not valid for this scenario." };
  }

  if (!selectedCues.every((cue) => typeof cue === "string" && cueList.includes(cue))) {
    return { ok: false, error: "Selected cues must use the fixed cue list." };
  }

  if (
    ![...contextShiftAnswers, ...legacyContextShiftAnswers].includes(
      value.contextShiftAnswer
    )
  ) {
    return { ok: false, error: "Context-shift answer is not recognised." };
  }

  return {
    ok: true,
    response: {
      scenarioOrder: value.scenarioOrder,
      scenarioId: value.scenarioId,
      scenarioTitle: value.scenarioTitle,
      selectedOption,
      selectedCues,
      confidence: value.confidence,
      wasUnsure: typeof value.wasUnsure === "boolean" ? value.wasUnsure : false,
      contextShiftAnswer: value.contextShiftAnswer,
      submittedAt: value.submittedAt
    }
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isScenarioOptionKey(value: unknown): value is ScenarioOptionKey {
  return value === "A" || value === "B" || value === "C";
}
