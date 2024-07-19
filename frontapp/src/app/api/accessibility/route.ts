import { NextRequest, NextResponse } from 'next/server';
import {
  readData,
  GroupCriteria,
  AccessibilityOptions,
} from '@/utils/modules/accessibility';
import * as MCDMA from '@/utils/modules/mcdma';

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

export type AccessibilityPayload = {
  pointsOfInterest: number[];
  groupCriteria: GroupCriteria[];
  accessibilityOptions: AccessibilityOptions;
};

const mockedPayload: AccessibilityPayload = {
  pointsOfInterest,
  groupCriteria,
  accessibilityOptions,
};

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { pointsOfInterest, groupCriteria, accessibilityOptions } =
      (await request.json()) as AccessibilityPayload;

    if (!groupCriteria || !accessibilityOptions || !pointsOfInterest) {
      return new Response(
        JSON.stringify({
          error: 'Invalid request. Use the template.',
          templatePayload: {
            groupCriteria: [
              {
                name: 'Group 1',
                avgIncomePerCapita: [0, 800],
                ageRange: [0, 100],
              },
            ],
            accessibilityOptions: {
              travelTime: 10,
              transportMode: 'car | bus | train | walk | bike',
              accessibilityType: 'active | passive',
            },
          },
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const accessibilityAnalysisResult = await readData(
      pointsOfInterest,
      groupCriteria,
      accessibilityOptions
    );

    const decisionMatrix: number[][] = Object.values(
      accessibilityAnalysisResult
    ).map((group: any) => Object.values(group));

    const weights = groupCriteria.map((criteria) => criteria.weight);
    const criteria = groupCriteria.map((criteria) => criteria.criteriaType);
    const multiCriteriaAnalysisResult = MCDMA.topsis.apply(
      decisionMatrix,
      weights,
      criteria
    );

    // Example response to the client
    return new Response(
      JSON.stringify({ message: 'Data received', multiCriteriaAnalysisResult }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
