// import fs from 'fs';
// import { parser } from 'stream-json';
// import { streamArray } from 'stream-json/streamers/StreamArray';
// import {
//   readData,
//   processData,
//   GroupCriteria,
//   AccessibilityOptions,
// } from '@/utils/modules/accessibility';

// // Mock data for testing
// const mockGeojsonData = [
//   {
//     properties: {
//       to_id: 1,
//       travel_time: 15,
//       renda_per_capita: 200,
//       total: 50,
//     },
//   },
//   {
//     properties: {
//       to_id: 2,
//       travel_time: 30,
//       renda_per_capita: 100,
//       total: 30,
//     },
//   },
// ];

// // Mock fs.createReadStream to return mockGeojsonData
// jest.mock('fs', () => ({
//   createReadStream: jest.fn().mockReturnValue({
//     pipe: jest.fn().mockReturnThis(),
//     on: jest.fn((event, callback) => {
//       if (event === 'data') {
//         mockGeojsonData.forEach((data) => callback({ value: data }));
//       }
//       if (event === 'end') {
//         callback();
//       }
//       return this;
//     }),
//   }),
// }));

// // Mock implementations for imported functions
// jest.mock('stream-json', () => ({
//   parser: jest.fn(),
// }));

// jest.mock('stream-json/streamers/StreamArray', () => ({
//   streamArray: jest.fn(),
// }));

// describe('readData function', () => {
//   const hexLocations = [1, 2];
//   const groupCriteria: GroupCriteria[] = [
//     {
//       name: 'Group 1',
//       avgIncomePerCapita: [0, 300],
//       ageRange: [20, 30],
//       weight: 0.5,
//       criteriaType: 'max',
//     },
//   ];
//   const accessibilityOptions: AccessibilityOptions = {
//     travelTime: 20,
//     transportMode: 'bus',
//     accessibilityType: 'active',
//   };

//   it('should process data correctly and return grouped results', async () => {
//     const result = await readData(
//       hexLocations,
//       groupCriteria,
//       accessibilityOptions
//     );
//     expect(result).toEqual({
//       '1': {
//         'Group 1': 50,
//       },
//     });
//   });

//   it('should handle empty data correctly', async () => {
//     jest.mock('fs', () => ({
//       createReadStream: jest.fn().mockReturnValue({
//         pipe: jest.fn().mockReturnThis(),
//         on: jest.fn((event, callback) => {
//           if (event === 'end') {
//             callback();
//           }
//           return this;
//         }),
//       }),
//     }));
//     const result = await readData([], [], accessibilityOptions);
//     expect(result).toEqual({});
//   });
// });

// describe('processData function', () => {
//   it('should process data based on hex locations and travel time', () => {
//     const data = {
//       properties: {
//         to_id: 1,
//         travel_time: 10,
//         renda_per_capita: 200,
//         total: 50,
//       },
//     };
//     const result = processData(data, accessibilityOptions, hexLocations);
//     expect(result).toEqual(data);
//   });

//   it('should return undefined if conditions are not met', () => {
//     const data = {
//       properties: {
//         to_id: 3,
//         travel_time: 25,
//         renda_per_capita: 200,
//         total: 50,
//       },
//     };
//     const result = processData(data, accessibilityOptions, hexLocations);
//     expect(result).toBeUndefined();
//   });
// });
