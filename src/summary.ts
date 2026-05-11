import { cueList } from "./scenarios.js";
import type { ParticipantResponse, SessionSummary } from "./types.js";

export function calculateSummary(responses: ParticipantResponse[]): SessionSummary {
  const cueCounts = countCues(responses);
  const sortedCues = [...cueList].sort((a, b) => {
    const diff = cueCounts[b] - cueCounts[a];
    return diff === 0 ? a.localeCompare(b) : diff;
  });

  const scenarioPath = responses
    .map((response) => `${response.scenarioId}:${response.selectedOption}`)
    .join(" > ");

  const totalConfidence = responses.reduce(
    (sum, response) => sum + response.confidence,
    0
  );

  return {
    scenarioPath,
    scenarioCount: responses.length,
    topCues: sortedCues.filter((cue) => cueCounts[cue] > 0).slice(0, 3),
    lowCues: [...cueList]
      .sort((a, b) => {
        const diff = cueCounts[a] - cueCounts[b];
        return diff === 0 ? a.localeCompare(b) : diff;
      })
      .slice(0, 3),
    reconsiderCount: responses.filter(
      (response) =>
        response.contextShiftAnswer === "Yes, I would reconsider" ||
        response.contextShiftAnswer === "Yes, I might reconsider."
    ).length,
    averageConfidence:
      responses.length === 0
        ? 0
        : Number((totalConfidence / responses.length).toFixed(2))
  };
}

export function countCues(responses: ParticipantResponse[]): Record<string, number> {
  const counts = Object.fromEntries(cueList.map((cue) => [cue, 0]));

  for (const response of responses) {
    for (const cue of response.selectedCues) {
      counts[cue] = (counts[cue] ?? 0) + 1;
    }
  }

  return counts;
}
