import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { calculateSummary } from "./summary.js";
import type { SessionSubmission, StoredSession } from "./types.js";

const masterCsvHeaders = [
  "session_id",
  "started_at",
  "completed_at",
  "scenario_path",
  "scenario_count",
  "top_cue_1",
  "top_cue_2",
  "top_cue_3",
  "reconsider_count",
  "average_confidence"
];

const sessionCsvHeaders = [
  "session_id",
  "scenario_order",
  "scenario_id",
  "scenario_title",
  "selected_option",
  "selected_cues",
  "confidence",
  "was_unsure",
  "context_shift_answer",
  "submitted_at"
];

export interface DataPaths {
  dataDir: string;
  sessionsDir: string;
  masterCsvPath: string;
}

export function createDataPaths(projectRoot: string): DataPaths {
  const dataDir = path.join(projectRoot, "data");
  const sessionsDir = path.join(dataDir, "sessions");
  return {
    dataDir,
    sessionsDir,
    masterCsvPath: path.join(dataDir, "sessions.csv")
  };
}

export async function ensureDataFiles(paths: DataPaths): Promise<void> {
  await mkdir(paths.sessionsDir, { recursive: true });
  try {
    await readFile(paths.masterCsvPath, "utf8");
  } catch {
    await writeFile(paths.masterCsvPath, `${masterCsvHeaders.join(",")}\n`, "utf8");
  }
}

export async function writeStoredSession(
  submission: SessionSubmission,
  paths: DataPaths
): Promise<StoredSession> {
  await ensureDataFiles(paths);

  const sessionId = makeSessionId();
  const sessionJsonRelative = `data/sessions/${sessionId}.json`;
  const sessionCsvRelative = `data/sessions/${sessionId}.csv`;
  const masterCsvRelative = "data/sessions.csv";
  const summary = calculateSummary(submission.responses);

  const storedSession: StoredSession = {
    sessionId,
    startedAt: submission.startedAt,
    completedAt: submission.completedAt,
    responses: submission.responses,
    summary,
    storedFiles: {
      sessionJson: sessionJsonRelative,
      sessionCsv: sessionCsvRelative,
      masterCsv: masterCsvRelative
    }
  };

  const sessionJsonPath = path.join(paths.sessionsDir, `${sessionId}.json`);
  const sessionCsvPath = path.join(paths.sessionsDir, `${sessionId}.csv`);

  await writeFile(
    sessionJsonPath,
    `${JSON.stringify(storedSession, null, 2)}\n`,
    "utf8"
  );
  await writeFile(sessionCsvPath, buildSessionCsv(storedSession), "utf8");
  await appendFile(paths.masterCsvPath, buildMasterCsvRow(storedSession), "utf8");

  return storedSession;
}

export async function readStoredSession(
  sessionId: string,
  paths: DataPaths
): Promise<StoredSession | null> {
  if (!/^session_\d{8}_\d{6}_[a-z0-9]{4}$/.test(sessionId)) {
    return null;
  }

  try {
    const file = await readFile(path.join(paths.sessionsDir, `${sessionId}.json`), "utf8");
    return JSON.parse(file) as StoredSession;
  } catch {
    return null;
  }
}

export async function readMasterCsv(paths: DataPaths): Promise<string> {
  await ensureDataFiles(paths);
  return readFile(paths.masterCsvPath, "utf8");
}

function makeSessionId(): string {
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

function buildSessionCsv(session: StoredSession): string {
  const rows = session.responses.map((response) =>
    [
      session.sessionId,
      response.scenarioOrder,
      response.scenarioId,
      response.scenarioTitle,
      response.selectedOption,
      response.selectedCues.join("|"),
      response.confidence,
      response.wasUnsure ? "yes" : "no",
      response.contextShiftAnswer,
      response.submittedAt
    ]
      .map(csvEscape)
      .join(",")
  );

  return `${sessionCsvHeaders.join(",")}\n${rows.join("\n")}\n`;
}

function buildMasterCsvRow(session: StoredSession): string {
  return `${[
    session.sessionId,
    session.startedAt,
    session.completedAt,
    session.summary.scenarioPath,
    session.summary.scenarioCount,
    session.summary.topCues[0] ?? "",
    session.summary.topCues[1] ?? "",
    session.summary.topCues[2] ?? "",
    session.summary.reconsiderCount,
    session.summary.averageConfidence
  ]
    .map(csvEscape)
    .join(",")}\n`;
}

function csvEscape(value: unknown): string {
  const text = String(value ?? "");
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}
