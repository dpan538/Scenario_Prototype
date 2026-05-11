# Parking Scenario Reflection Tool

This is a local HCI research prototype for studying how participants interpret ambiguous private vehicle parking scenarios.

It is a low-fidelity, text-led, click-based prototype. It presents fictional scenarios, records participant choices and reasoning cues, writes session data to local JSON/CSV files, and shows a single-session result page.

## Research Prototype Purpose

The prototype is designed to observe:

- which parking-related cues participants select;
- how confident they feel about each choice;
- whether they reconsider when the context changes;
- how they respond across a shared six-scenario sequence.

It is a reaction and reflection tool for class-level HCI testing.

## What This Prototype Does Not Do

This prototype does not use a database, maps, or real crime data. On Vercel, completed results are shown from the browser session first because serverless file storage is temporary.

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
2. The participant sees six scenarios in the same order.
3. Most scenarios have Option A and Option B. Scenario 3 and Scenario 6 include an Option C to create a middle or third trade-off.
4. Each scenario requires:
   - one option selection;
   - at least one cue tag;
   - one confidence value from 1 to 5;
   - one context-shift answer.
5. The browser stores a result copy locally so the result page can always render after completion.
6. The browser also submits the completed session to `POST /api/save-session`.
7. The TypeScript server writes JSON and CSV files when file storage is available.
8. The result page loads the browser result first, then falls back to `GET /api/sessions/:sessionId` when needed.

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
