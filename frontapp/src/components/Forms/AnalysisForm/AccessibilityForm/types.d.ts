export type AccessibilityForm = {
  distance?: number;
  transportMode: 'walking' | 'public' | 'private';
  year: '2020' | '2023';
  model: 'passive' | 'active';
  travelTime: number;
};
