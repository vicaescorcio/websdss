import fs from 'fs';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';

export type GroupCriteria = {
  name: string;
  avgIncomePerCapita: number[];
  ageRange: number[];
  weight: number;
  criteriaType: 'max' | 'min';
};

export type AccessibilityOptions = {
  travelTime: number;
  transportMode: string;
  accessibilityType: 'active' | 'passive';
};

// Example returned value:
// {
//   '0': {
//     'Group 1': 120.25,
//     'Group 2': 0,
//     'Group 3': 0,
//     'Group 4': 0
//    },
//   '1': {
//     'Group 1': 323.8225806451612,
//     'Group 2': 0,
//     'Group 3': 0,
//     'Group 4': 0
//    },
//   '2': {
//     'Group 1': 217.2,
//     'Group 2': 0,
//     'Group 3': 0,
//     'Group 4': 0
//    },
//   '3': {
//     'Group 1': 175.7983870967742,
//     'Group 2': 0,
//     'Group 3': 0,
//     'Group 4': 0
//    }
// }
function readData(
  hexLocations: number[],
  groupCriteria: GroupCriteria[],
  accessibilityOptions: AccessibilityOptions
): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    const stream = fs.createReadStream(
      process.cwd() + '/src/utils/modules/accessibility/geojson.json'
    );

    stream
      .pipe(parser())
      .pipe(streamArray())
      .on('data', (d: any) => {
        const result = processData2(
          d.value,
          accessibilityOptions,
          hexLocations,
          groupCriteria
        );
        if (result) results.push(result);
      })
      .on('end', () => {
        resolve(groupResults(results));
      })
      .on('error', (err: any) => {
        console.error('Error reading stream:', err);
        reject(err);
      });
  });
}

function processData(
  data: any,
  accessibilityOptions: AccessibilityOptions,
  hexLocations: number[]
) {
  if (
    hexLocations.includes(data.properties.to_id) &&
    data.properties.travel_time <= accessibilityOptions.travelTime
  ) {
    return data;
  }
}

function processData2(
  data: any,
  accessibilityOptions: AccessibilityOptions,
  hexLocations: number[],
  groupCriteria: GroupCriteria[]
) {
  const criteriaMatrix: any = {};
  if (
    hexLocations.includes(data.properties.to_id) &&
    data.properties.travel_time <= accessibilityOptions.travelTime
  ) {
    groupCriteria.forEach((criteria) => {
      if (
        !(
          criteriaMatrix[data.properties.to_id] &&
          criteriaMatrix[data.properties.to_id][criteria.name]
        )
      ) {
        criteriaMatrix[data.properties.to_id] = {
          ...criteriaMatrix[data.properties.to_id],
          [criteria.name]: 0,
        };
      }
      if (
        data.properties.renda_per_capita >= criteria.avgIncomePerCapita[0] &&
        data.properties.renda_per_capita < criteria.avgIncomePerCapita[1]
      )
        criteriaMatrix[data.properties.to_id][criteria.name] +=
          data.properties.total;
    });
    return criteriaMatrix;
  }
}

const groupResults = (results: any[]) => {
  const groupedResults: any = {};
  results.forEach((result) => {
    Object.keys(result).forEach((key) => {
      if (!groupedResults[key]) {
        groupedResults[key] = {};
      }
      Object.keys(result[key]).forEach((group) => {
        if (!groupedResults[key][group]) {
          groupedResults[key][group] = 0;
        }
        groupedResults[key][group] += result[key][group];
      });
    });
  });
  return groupedResults;
};

export { readData, processData };
