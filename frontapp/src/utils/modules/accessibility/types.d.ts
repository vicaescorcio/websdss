export type AccessibilityOptions = {
  travelTime: number;
  transportMode: string;
  accessibilityModel: 'active' | 'passive';
};

export type AccessibilityAnalysisResult = {
  [key: string]: {
    [key: string]: {
      total: number;
      hex: string[]; // Replace `any` with the appropriate type for the `hex` property
    };
  };
};
