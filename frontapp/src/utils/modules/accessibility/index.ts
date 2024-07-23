import { GroupCriteria } from '@/components/Forms/AnalysisForm/MultiCriteriaForm/types';
import fs from 'fs';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';
import { AccessibilityOptions, AccessibilityAnalysisResult } from './types';

function readData(
  hexLocations: string[],
  groupCriteria: GroupCriteria[],
  accessibilityOptions: AccessibilityOptions
): Promise<AccessibilityAnalysisResult> {
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
          [criteria.name]: { total: 0, hex: '' },
        };
      }
      if (
        data.properties.renda_per_capita >= criteria.incomeRange[0] &&
        data.properties.renda_per_capita < criteria.incomeRange[1]
      ) {
        criteria.ageLevel.forEach((ageLevel: string) => {
          criteriaMatrix[data.properties.h3_polyfill_destino][
            criteria.name
          ].total += data.properties[ageLevel];
        });
        criteriaMatrix[data.properties.h3_polyfill_destino][criteria.name].hex =
          data.properties.h3_polyfill_origem;
      }
    });
    return criteriaMatrix;
  }
}

const groupResults = (results: any[]): AccessibilityAnalysisResult => {
  const groupedResults: AccessibilityAnalysisResult = {};
  results.forEach((result) => {
    Object.keys(result).forEach((key) => {
      if (!groupedResults[key]) {
        groupedResults[key] = {};
      }
      Object.keys(result[key]).forEach((group) => {
        if (!groupedResults[key][group]) {
          groupedResults[key][group] = { total: 0, hex: [] };
        }
        groupedResults[key][group].total += result[key][group].total;
        groupedResults[key][group].hex.push(result[key][group].hex);
      });
    });
  });
  return groupedResults;
};

export { readData, processData };
