import { NextRequest, NextResponse } from 'next/server';
import { readData, AccessibilityOptions } from '@/utils/modules/accessibility';
import * as MCDMA from '@/utils/modules/mcdma';
import { GroupCriteria } from '@/components/Forms/AnalysisForm/MultiCriteriaForm/types';

export type AccessibilityPayload = {
  pointsOfInterest: string[];
  groupCriteria: GroupCriteria[];
  accessibilityOptions: AccessibilityOptions;
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

    console.log(pointsOfInterest, groupCriteria, accessibilityOptions);

    const accessibilityAnalysisResult = await readData(
      pointsOfInterest,
      groupCriteria,
      accessibilityOptions
    );

    console.log(accessibilityAnalysisResult);

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
