'use server';

import {
  AccessibilityOptions,
  GroupCriteria,
} from '@/utils/modules/accessibility';

const groupCriteria: GroupCriteria[] = [
  {
    name: 'Group 1',
    avgIncomePerCapita: [1000, 1200],
    ageRange: [0, 100],
    criteriaType: 'max',
    weight: 0.25,
  },
  {
    name: 'Group 2',
    avgIncomePerCapita: [0, 800],
    ageRange: [100, 200],
    criteriaType: 'max',
    weight: 0.25,
  },
  {
    name: 'Group 3',
    avgIncomePerCapita: [1600, 2400],
    ageRange: [200, 300],
    criteriaType: 'max',
    weight: 0.25,
  },
  {
    name: 'Group 4',
    avgIncomePerCapita: [2400, 3200],
    ageRange: [300, 400],
    criteriaType: 'max',
    weight: 0.25,
  },
]; // populate with actual groupCriteria
const pointsOfInterest = [0, 1, 2, 3]; // populate with actual hexLocation
const accessibilityOptions: AccessibilityOptions = {
  travelTime: 10,
  transportMode: 'car',
  accessibilityType: 'active',
};
const mockedPayload = {
  pointsOfInterest,
  groupCriteria,
  accessibilityOptions,
};

export const startAnalysis = async () => {};
