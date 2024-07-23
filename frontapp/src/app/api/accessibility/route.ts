import { NextRequest, NextResponse } from 'next/server';
import { readData } from '@/utils/modules/accessibility';
import * as MCDMA from '@/utils/modules/mcdma';
import { AccessibilityPayload, AnalysisResult, RankedResult } from './types';
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
    console.log(
      'params',
      pointsOfInterest,
      groupCriteria,
      accessibilityOptions
    );
    console.log(
      'results',
      Object.values(accessibilityAnalysisResult).map((group: any) =>
        Object.values(group).map((value: any) => value.hex)
      )
    );

    const decisionMatrix: number[][] = Object.values(
      accessibilityAnalysisResult
    ).map((group: any) =>
      Object.values(group).map((value: any) => value.total)
    );

    const weights = groupCriteria.map((criteria) => criteria.weight);
    const criteria = groupCriteria.map((criteria) => criteria.criteriaType);
    const multiCriteriaAnalysisResult = MCDMA.topsis.apply(
      decisionMatrix,
      weights,
      criteria
    );

    const hexLocationsRanked = Object.keys(accessibilityAnalysisResult);
    const rankedResults: RankedResult[] = multiCriteriaAnalysisResult.map(
      (result) => {
        return [
          hexLocationsRanked[result],
          accessibilityAnalysisResult[hexLocationsRanked[result]],
        ];
      }
    );

    const analysiResult = {
      message: 'Data received',
      rankedResults,
    } as AnalysisResult;

    // Example response to the client
    return new Response(JSON.stringify(analysiResult), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
