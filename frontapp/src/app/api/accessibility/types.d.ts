export type AccessibilityPayload = {
  pointsOfInterest: string[];
  groupCriteria: GroupCriteria[];
  accessibilityOptions: AccessibilityOptions;
};

export type RankedResult = [
  string,
  {
    [key: string]: {
      total: number;
      hex: string[];
    };
  },
];

export type AnalysisResult = {
  message: string;
  rankedResults: RankedResult[];
};
