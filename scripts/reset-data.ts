import { rm, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const dataDir = path.join(projectRoot, "data");
const sessionsDir = path.join(dataDir, "sessions");
const masterCsv = path.join(dataDir, "sessions.csv");

const headers =
  "session_id,started_at,completed_at,scenario_path,scenario_count,top_cue_1,top_cue_2,top_cue_3,reconsider_count,average_confidence\n";

await mkdir(sessionsDir, { recursive: true });
await rm(sessionsDir, { recursive: true, force: true });
await mkdir(sessionsDir, { recursive: true });
await writeFile(masterCsv, headers, "utf8");

console.log("Data reset complete.");
