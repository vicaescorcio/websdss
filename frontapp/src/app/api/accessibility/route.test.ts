import { NextRequest, NextResponse } from 'next/server';
import { POST } from './route'; // Adjust the import path accordingly
import { readData } from '@/utils/modules/accessibility';
import * as MCDMA from '@/utils/modules/mcdma';

jest.mock('@/utils/modules/accessibility', () => ({
  readData: jest.fn(),
}));

jest.mock('@/utils/modules/mcdma', () => ({
  topsis: {
    apply: jest.fn(),
  },
}));

describe('API Route POST /api/yourApiRoute', () => {
  const mockRequestPayload = {
    pointsOfInterest: ['hex1', 'hex2'],
    groupCriteria: [
      {
        name: 'Group 1',
        weight: 0.5,
        incomeRange: [0, 800],
        criteriaType: 'max',
        ageLevel: ['0_a_5_anos'],
      },
    ],
    accessibilityOptions: {
      travelTime: 10,
      transportMode: 'car',
      accessibilityModel: 'passive',
    },
  };

  const mockAccessibilityAnalysisResult = {
    hex1: {
      'Group 1': {
        total: 10,
        hex: ['origin_hex1'],
      },
    },
    hex2: {
      'Group 1': {
        total: 20,
        hex: ['origin_hex2'],
      },
    },
  };

  const mockMultiCriteriaAnalysisResult = [0, 1]; // Assuming two hex locations

  it('returns 400 when the request is invalid', async () => {
    const invalidRequest = {
      pointsOfInterest: null,
      groupCriteria: null,
      accessibilityOptions: null,
    };

    const req = new NextRequest(JSON.stringify(invalidRequest));
    const res = await POST(req, new NextResponse());

    const resJson = await res.json();

    expect(res.status).toBe(400);
    expect(resJson.error).toBe('Invalid request. Use the template.');
    expect(resJson.templatePayload).toBeDefined();
  });

  it('returns 200 and processes data correctly', async () => {
    // Mock the return value of readData and MCDMA.topsis.apply
    (readData as jest.Mock).mockResolvedValue(mockAccessibilityAnalysisResult);
    (MCDMA.topsis.apply as jest.Mock).mockReturnValue(
      mockMultiCriteriaAnalysisResult
    );

    const req = new NextRequest(JSON.stringify(mockRequestPayload));
    const res = await POST(req, new NextResponse());

    const resJson = await res.json();

    expect(res.status).toBe(200);
    expect(readData).toHaveBeenCalledWith(
      mockRequestPayload.pointsOfInterest,
      mockRequestPayload.groupCriteria,
      mockRequestPayload.accessibilityOptions
    );
    expect(MCDMA.topsis.apply).toHaveBeenCalledWith(
      [[10], [20]],
      [0.5],
      ['max']
    );

    expect(resJson.message).toBe('Data received');
    expect(resJson.rankedResults).toEqual([
      ['hex1', mockAccessibilityAnalysisResult.hex1],
      ['hex2', mockAccessibilityAnalysisResult.hex2],
    ]);
  });

  it('returns 500 when an error occurs', async () => {
    (readData as jest.Mock).mockRejectedValue(new Error('Test Error'));

    const req = new NextRequest(JSON.stringify(mockRequestPayload));
    const res = await POST(req, new NextResponse());

    const resJson = await res.json();

    expect(res.status).toBe(500);
    expect(resJson.error).toBe('Something went wrong');
  });
});
