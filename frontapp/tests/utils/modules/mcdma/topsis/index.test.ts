// import * as mcdma from '@/utils/modules/mcdma'; // Adjust the import according to your file structure

// describe('TOPSIS Method', () => {
//   it('should normalize the decision matrix correctly', () => {
//     const decisionMatrix = [
//       [250, 16, 12, 5],
//       [200, 16, 8, 3],
//       [300, 32, 16, 4],
//       [275, 32, 8, 4],
//       [225, 16, 16, 2],
//     ];
//     const weights = [0.25, 0.25, 0.25, 0.25];
//     const criteria = ['max', 'max', 'max', 'max'];

//     const expectedNormalizedMatrix = [
//       [0.40273877, 0.28867513, 0.33333333, 0.54772256],
//       [0.32219102, 0.28867513, 0.22222222, 0.32863323],
//       [0.48328652, 0.57735027, 0.44444444, 0.43817772],
//       [0.44301014, 0.57735027, 0.22222222, 0.43817772],
//       [0.36246239, 0.28867513, 0.44444444, 0.21908886],
//     ];

//     const normalizedMatrix = mcdma.topsis.normalizeMatrix(decisionMatrix);

//     expect(normalizedMatrix).toEqual(expectedNormalizedMatrix);
//   });

//   it('should calculate the weighted normalized decision matrix correctly', () => {
//     const normalizedMatrix = [
//       [0.40273877, 0.28867513, 0.33333333, 0.54772256],
//       [0.32219102, 0.28867513, 0.22222222, 0.32863323],
//       [0.48328652, 0.57735027, 0.44444444, 0.43817772],
//       [0.44301014, 0.57735027, 0.22222222, 0.43817772],
//       [0.36246239, 0.28867513, 0.44444444, 0.21908886],
//     ];
//     const weights = [0.25, 0.25, 0.25, 0.25];

//     const expectedWeightedMatrix = [
//       [0.10068469, 0.07216878, 0.08333333, 0.13693064],
//       [0.08054776, 0.07216878, 0.05555556, 0.08215831],
//       [0.12082163, 0.14433757, 0.11111111, 0.10954443],
//       [0.11075254, 0.14433757, 0.05555556, 0.10954443],
//       [0.0906156, 0.07216878, 0.11111111, 0.05477226],
//     ];

//     const weightedMatrix = mcdma.topsis.weightedNormalizedMatrix(
//       normalizedMatrix,
//       weights
//     );

//     expect(weightedMatrix).toEqual(expectedWeightedMatrix);
//   });

//   it('should determine the ideal solutions correctly', () => {
//     const weightedMatrix = [
//       [0.10068469, 0.07216878, 0.08333333, 0.13693064],
//       [0.08054776, 0.07216878, 0.05555556, 0.08215831],
//       [0.12082163, 0.14433757, 0.11111111, 0.10954443],
//       [0.11075254, 0.14433757, 0.05555556, 0.10954443],
//       [0.0906156, 0.07216878, 0.11111111, 0.05477226],
//     ];
//     const criteria = ['max', 'max', 'max', 'max'];

//     const expectedPositiveIdeal = [
//       0.12082163, 0.14433757, 0.11111111, 0.13693064,
//     ];
//     const expectedNegativeIdeal = [
//       0.08054776, 0.07216878, 0.05555556, 0.05477226,
//     ];

//     const ideals = mcdma.topsis.idealSolutions(weightedMatrix, criteria);

//     expect(ideals.positiveIdeal).toEqual(expectedPositiveIdeal);
//     expect(ideals.negativeIdeal).toEqual(expectedNegativeIdeal);
//   });

//   it('should calculate the separation measures correctly', () => {
//     const weightedMatrix = [
//       [0.10068469, 0.07216878, 0.08333333, 0.13693064],
//       [0.08054776, 0.07216878, 0.05555556, 0.08215831],
//       [0.12082163, 0.14433757, 0.11111111, 0.10954443],
//       [0.11075254, 0.14433757, 0.05555556, 0.10954443],
//       [0.0906156, 0.07216878, 0.11111111, 0.05477226],
//     ];
//     const ideals = {
//       positiveIdeal: [0.12082163, 0.14433757, 0.11111111, 0.13693064],
//       negativeIdeal: [0.08054776, 0.07216878, 0.05555556, 0.05477226],
//     };

//     const expectedSeparations = [
//       { positiveSeparation: 0.04300702, negativeSeparation: 0.10335444 },
//       { positiveSeparation: 0.06736415, negativeSeparation: 0 },
//       { positiveSeparation: 0, negativeSeparation: 0.06736415 },
//       { positiveSeparation: 0.04709679, negativeSeparation: 0.05976143 },
//       { positiveSeparation: 0.07561496, negativeSeparation: 0.07561496 },
//     ];

//     const separations = mcdma.topsis.separationMeasures(weightedMatrix, ideals);

//     expect(separations).toEqual(expectedSeparations);
//   });

//   it('should calculate the relative closeness correctly', () => {
//     const separations = [
//       { positiveSeparation: 0.04300702, negativeSeparation: 0.10335444 },
//       { positiveSeparation: 0.06736415, negativeSeparation: 0 },
//       { positiveSeparation: 0, negativeSeparation: 0.06736415 },
//       { positiveSeparation: 0.04709679, negativeSeparation: 0.05976143 },
//       { positiveSeparation: 0.07561496, negativeSeparation: 0.07561496 },
//     ];

//     const expectedCloseness = [0.70637119, 0, 1, 0.55979267, 0.5];

//     const closeness = mcdma.topsis.relativeCloseness(separations);

//     expect(closeness).toEqual(expectedCloseness);
//   });

//   it('should rank the alternatives correctly', () => {
//     const closeness = [0.70637119, 0, 1, 0.55979267, 0.5];

//     const expectedRanking = [2, 0, 3, 4, 1];

//     const ranking = mcdma.topsis.rankAlternatives(closeness);

//     expect(ranking).toEqual(expectedRanking);
//   });

//   it('should execute the TOPSIS method correctly', () => {
//     const decisionMatrix = [
//       [250, 16, 12, 5],
//       [200, 16, 8, 3],
//       [300, 32, 16, 4],
//       [275, 32, 8, 4],
//       [225, 16, 16, 2],
//     ];
//     const weights = [0.25, 0.25, 0.25, 0.25];
//     const criteria = ['max', 'max', 'max', 'max'];

//     const expectedRanking = [2, 0, 3, 4, 1];

//     const ranking = mcdma.topsis.apply(decisionMatrix, weights, criteria);

//     expect(ranking).toEqual(expectedRanking);
//   });
// });
