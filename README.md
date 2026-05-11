# Parking Scenario Reflection Tool

This is a local HCI research prototype for studying how participants interpret ambiguous private vehicle parking scenarios.

It is a low-fidelity, text-led, click-based prototype. It presents fictional scenarios, records participant choices and reasoning cues, writes session data to local JSON/CSV files, and shows a single-session result page.

## Research Prototype Purpose

The prototype is designed to observe:

- which parking-related cues participants select;
- how confident they feel about each choice;
- whether they reconsider when the context changes;
- what scenario path they completed.

It is a reaction and reflection tool for class-level HCI testing.

## What This Prototype Does Not Do

This prototype runs locally only. It does not use a database, cloud storage, deployment, maps, or real crime data.

It does not predict crime, rank parking options, identify locations, track personal location, store user accounts, or provide driving instructions.

## Local Setup

Install dependencies:

```bash
npm install
```

Run the local server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

If port `3000` is already in use, choose another browser-compatible local port:

```bash
PORT=6001 npm run dev
```

Port `6000` is intentionally blocked by many browsers because it is a restricted port, so use `6001` instead for local testing.

## How It Works

1. The participant starts on `public/index.html`.
2. Scenario 1 is always shown first.
3. The path branches after Scenario 1:
   - `scenario_01:A > scenario_02 > scenario_04 > scenario_05`
   - `scenario_01:B > scenario_03 > scenario_04 > scenario_05`
4. Each scenario requires:
   - Option A or Option B;
   - at least one cue tag;
   - one confidence value from 1 to 5;
   - one context-shift answer.
5. The browser submits the completed session to `POST /api/save-session`.
6. The TypeScript server writes JSON and CSV files.
7. The result page loads the saved session with `GET /api/sessions/:sessionId`.

## Where Data Is Saved

The server writes:

```text
data/sessions.csv
data/sessions/<session_id>.json
data/sessions/<session_id>.csv
```

`data/sessions.csv` is the master summary table. Each completed test appends one row.

`data/sessions/<session_id>.json` stores the full structured session object:

```text
sessionId
startedAt
completedAt
responses
summary
storedFiles
```

`data/sessions/<session_id>.csv` stores one row per scenario response.

## Reset Data

To clear saved session files and reset the master CSV headers:

```bash
npm run reset-data
```

The script keeps the `data/` folder and recreates `data/sessions/`.

## Useful Routes

```text
GET  /
POST /api/save-session
GET  /api/sessions/:sessionId
GET  /api/sessions
```
