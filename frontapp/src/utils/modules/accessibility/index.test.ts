import { readData, processData, groupResults } from './index'; // Adjust the import path as necessary
import { AccessibilityOptions, AccessibilityAnalysisResult } from './types';
import { GroupCriteria } from '../../../components/Forms/AnalysisForm/MultiCriteriaForm/types';
import fs, { ReadStream } from 'fs';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';

jest.mock('fs', () => ({
  createReadStream: jest.fn(),
}));

jest.mock('stream-json', () => ({
  parser: jest.fn().mockReturnValue({
    pipe: jest.fn().mockReturnThis(),
    on: jest.fn(),
  }),
}));

jest.mock('stream-json/streamers/StreamArray', () => ({
  streamArray: jest.fn().mockReturnValue({
    pipe: jest.fn().mockReturnThis(),
    on: jest.fn(),
  }),
}));

describe('readData function', () => {
  const mockHexLocations = ['hex1', 'hex2'];
  const mockGroupCriteria: GroupCriteria[] = [
    {
      name: 'Group 1',
      weight: 1,
      incomeRange: [0, 5000],
      criteriaType: 'max',
      ageLevel: ['0_a_5_anos'],
    },
  ];
  const mockAccessibilityOptions: AccessibilityOptions = {
    travelTime: 30,
    transportMode: 'public',
    accessibilityModel: 'passive',
  };

  const mockData = {
    properties: {
      h3_polyfill_destino: 'hex1',
      travel_time: 20,
      renda_per_capita: 4000,
      '0_a_5_anos': 5,
      h3_polyfill_origem: 'origin_hex',
    },
  };

  it('should process data from the stream and resolve with results', async () => {
    const mockStream: any = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn((event, handler) => {
        if (event === 'data') handler({ value: mockData });
        if (event === 'end') handler();
        return mockStream;
      }),
    };
    (fs.createReadStream as jest.Mock).mockReturnValue(mockStream);

    const result = await readData(
      mockHexLocations,
      mockGroupCriteria,
      mockAccessibilityOptions
    );

    expect(result).toEqual({
      hex1: {
        'Group 1': {
          total: 5,
          hex: ['origin_hex'],
        },
      },
    });
  });

  it('should reject with an error if the stream encounters an error', async () => {
    const mockStream: any = {
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn((event, handler) => {
        if (event === 'error') handler(new Error('Stream error'));
        return mockStream;
      }),
    };
    (fs.createReadStream as jest.Mock).mockReturnValue(mockStream);

    await expect(
      readData(mockHexLocations, mockGroupCriteria, mockAccessibilityOptions)
    ).rejects.toThrow('Stream error');
  });
});

describe('processData function', () => {
  const mockAccessibilityOptions: AccessibilityOptions = {
    travelTime: 30,
    transportMode: 'public',
    accessibilityModel: 'passive',
  };

  const mockHexLocations = ['hex1', 'hex2'];

  const mockGroupCriteria: GroupCriteria[] = [
    {
      name: 'Group 1',
      weight: 1,
      incomeRange: [0, 5000],
      criteriaType: 'max',
      ageLevel: ['0_a_5_anos'],
    },
  ];

  const mockData = {
    properties: {
      h3_polyfill_destino: 'hex1',
      travel_time: 20,
      renda_per_capita: 4000,
      '0_a_5_anos': 5,
      h3_polyfill_origem: 'origin_hex',
    },
  };

  it('should return a criteria matrix when the data meets the criteria', () => {
    const result = processData(
      mockData,
      mockAccessibilityOptions,
      mockHexLocations,
      mockGroupCriteria
    );

    expect(result).toEqual({
      hex1: {
        'Group 1': {
          total: 5,
          hex: 'origin_hex',
        },
      },
    });
  });

  it('should return undefined when the data does not meet the criteria', () => {
    const mockDataInvalid = {
      ...mockData,
      properties: {
        ...mockData.properties,
        travel_time: 50, // Exceeds the travelTime in accessibilityOptions
      },
    };

    const result = processData(
      mockDataInvalid,
      mockAccessibilityOptions,
      mockHexLocations,
      mockGroupCriteria
    );

    expect(result).toBeUndefined();
  });
});

describe('groupResults function', () => {
  const mockResults = [
    {
      hex1: {
        'Group 1': {
          total: 5,
          hex: 'origin_hex1',
        },
      },
    },
    {
      hex1: {
        'Group 1': {
          total: 10,
          hex: 'origin_hex2',
        },
      },
    },
  ];

  it('should correctly group results', () => {
    const groupedResult = groupResults(mockResults);

    expect(groupedResult).toEqual({
      hex1: {
        'Group 1': {
          total: 15,
          hex: ['origin_hex1', 'origin_hex2'],
        },
      },
    });
  });
});
