import { GroupCriteria } from '@/components/Forms/AnalysisForm/MultiCriteriaForm/types';
import fs from 'fs';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';

export type AccessibilityOptions = {
  travelTime: number;
  transportMode: string;
  accessibilityModel: 'active' | 'passive';
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
  hexLocations: string[],
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
        const result = processData(
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
  hexLocations: string[],
  groupCriteria: GroupCriteria[]
) {
  const criteriaMatrix: any = {};
  if (
    hexLocations.includes(data.properties.h3_polyfill_destino) &&
    data.properties.travel_time <= accessibilityOptions.travelTime
  ) {
    groupCriteria.forEach((criteria) => {
      if (
        !(
          criteriaMatrix[data.properties.h3_polyfill_destino] &&
          criteriaMatrix[data.properties.h3_polyfill_destino][criteria.name]
        )
      ) {
        criteriaMatrix[data.properties.h3_polyfill_destino] = {
          ...criteriaMatrix[data.properties.h3_polyfill_destino],
          [criteria.name]: 0,
        };
      }
      if (
        data.properties.renda_per_capita >= criteria.incomeRange[0] &&
        data.properties.renda_per_capita < criteria.incomeRange[1]
      )
        criteriaMatrix[data.properties.h3_polyfill_destino][criteria.name] +=
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
