export type ScenarioOptionKey = "A" | "B" | "C";

export interface ScenarioOption {
  title: string;
  cues: string[];
}

export interface Scenario {
  id: string;
  title: string;
  context: string;
  options: {
    A: ScenarioOption;
    B: ScenarioOption;
    C?: ScenarioOption;
  };
  followUpQuestion: string;
  feedback: {
    A: string;
    B: string;
    C?: string;
  };
}

export interface ParticipantResponse {
  scenarioOrder: number;
  scenarioId: string;
  scenarioTitle: string;
  selectedOption: ScenarioOptionKey;
  selectedCues: string[];
  confidence: number;
  wasUnsure?: boolean;
  contextShiftAnswer: string;
  submittedAt: string;
}

export interface SessionSubmission {
  startedAt: string;
  completedAt: string;
  responses: ParticipantResponse[];
}

export interface SessionSummary {
  scenarioPath: string;
  scenarioCount: number;
  topCues: string[];
  lowCues: string[];
  reconsiderCount: number;
  averageConfidence: number;
}

export interface StoredSession {
  sessionId: string;
  startedAt: string;
  completedAt: string;
  responses: ParticipantResponse[];
  summary: SessionSummary;
  storedFiles: {
    sessionJson: string;
    sessionCsv: string;
    masterCsv: string;
  };
}
