// Step-by-Step Implementation

// Step 1: Normalize the Decision Matrix
// Method: Normalize each element of the decision matrix by dividing it by the square root of the sum of squares of its column.

// Step 2: Calculate the Weighted Normalized Decision Matrix
// Method: Multiply each normalized value by the corresponding weight.

// Step 3: Determine the Positive Ideal and Negative Ideal Solutions
// Method: For each criterion, determine the maximum and minimum values in the weighted normalized decision matrix.
// The positive ideal solution consists of the maximum values for benefit criteria and the minimum values for cost criteria.
// The negative ideal solution consists of the opposite.

// Step 4: Calculate the Separation Measures
// Method: Calculate the Euclidean distance from each alternative to the positive and negative ideal solutions

// Step 5: Calculate the Relative Closeness to the Ideal Solution
// Method: Calculate the relative closeness of each alternative to the ideal solution.

// Step 6: Rank the Alternatives
// Method: Rank the alternatives based on their relative closeness to the ideal solution, in descending order.

// ----------------------------------------------------------------------------------------------------------------------------

// Step 1: Normalize the Decision Matrix
function normalizeMatrix(matrix: number[][]): number[][] {
  let normalizedMatrix: number[][] = [];
  let numRows = matrix.length;
  let numCols = matrix[0].length;
  const epsilon = 0.0001; // Small constant to avoid division by zero

  for (let j = 0; j < numCols; j++) {
    let sumSquares = 0;
    for (let i = 0; i < numRows; i++) {
      sumSquares += (matrix[i][j] === 0 ? epsilon : matrix[i][j]) ** 2;
    }
    let normFactor = Math.sqrt(sumSquares);
    for (let i = 0; i < numRows; i++) {
      if (!normalizedMatrix[i]) {
        normalizedMatrix[i] = [];
      }
      normalizedMatrix[i][j] =
        (matrix[i][j] === 0 ? epsilon : matrix[i][j]) / normFactor;
    }
  }

  return normalizedMatrix;
}

// Step 2: Calculate the Weighted Normalized Decision Matrix
function weightedNormalizedMatrix(
  normalizedMatrix: number[][],
  weights: number[]
): number[][] {
  let weightedMatrix: number[][] = normalizedMatrix.map((row) =>
    row.map((value, index) => value * weights[index])
  );
  return weightedMatrix;
}
// Step 3: Determine the Positive Ideal and Negative Ideal Solutions
function idealSolutions(
  weightedMatrix: number[][],
  criteria: string[]
): { positiveIdeal: number[]; negativeIdeal: number[] } {
  let numCols = weightedMatrix[0].length;
  let positiveIdeal: number[] = Array(numCols).fill(-Infinity);
  let negativeIdeal: number[] = Array(numCols).fill(Infinity);

  for (let j = 0; j < numCols; j++) {
    for (let i = 0; i < weightedMatrix.length; i++) {
      if (criteria[j] === 'max') {
        if (weightedMatrix[i][j] > positiveIdeal[j])
          positiveIdeal[j] = weightedMatrix[i][j];
        if (weightedMatrix[i][j] < negativeIdeal[j])
          negativeIdeal[j] = weightedMatrix[i][j];
      } else {
        if (weightedMatrix[i][j] < positiveIdeal[j])
          positiveIdeal[j] = weightedMatrix[i][j];
        if (weightedMatrix[i][j] > negativeIdeal[j])
          negativeIdeal[j] = weightedMatrix[i][j];
      }
    }
  }

  return { positiveIdeal, negativeIdeal };
}
// Step 4: Calculate the Separation Measures
function separationMeasures(
  weightedMatrix: number[][],
  idealSolutions: { positiveIdeal: number[]; negativeIdeal: number[] }
): { positiveSeparation: number; negativeSeparation: number }[] {
  let positiveIdeal = idealSolutions.positiveIdeal;
  let negativeIdeal = idealSolutions.negativeIdeal;
  let separations = weightedMatrix.map((row) => {
    let positiveSeparation = Math.sqrt(
      row.reduce(
        (sum, value, index) => sum + (value - positiveIdeal[index]) ** 2,
        0
      )
    );
    let negativeSeparation = Math.sqrt(
      row.reduce(
        (sum, value, index) => sum + (value - negativeIdeal[index]) ** 2,
        0
      )
    );
    return { positiveSeparation, negativeSeparation };
  });

  return separations;
}
// Step 5: Calculate the Relative Closeness to the Ideal Solution
function relativeCloseness(
  separations: { positiveSeparation: number; negativeSeparation: number }[]
): number[] {
  return separations.map(
    (separation) =>
      separation.negativeSeparation /
      (separation.positiveSeparation + separation.negativeSeparation)
  );
}
// Step 6: Rank the Alternatives
function rankAlternatives(closeness: number[]): number[] {
  let sortedIndices = closeness
    .map((value, index) => [value, index] as [number, number])
    .sort((a, b) => b[0] - a[0])
    .map((pair) => pair[1]);
  return sortedIndices;
}

const apply = (matrix: number[][], weights: number[], criteria: string[]) => {
  let normalizedMatrix = normalizeMatrix(matrix);
  console.log('normalized', normalizedMatrix);
  let weightedMatrix = weightedNormalizedMatrix(normalizedMatrix, weights);
  console.log('weighted', weightedMatrix);
  let ideals = idealSolutions(weightedMatrix, criteria);
  console.log('ideals', ideals);
  let separations = separationMeasures(weightedMatrix, ideals);
  console.log('separations', separations);
  let closeness = relativeCloseness(separations);
  console.log('close', closeness);
  let ranking = rankAlternatives(closeness);

  console.log('Ranking (0-indexed):', ranking);
  return ranking;
};

export { apply };

// Example usage:
// let decisionMatrix: number[][] = [
//   [250, 16, 12, 5],
//   [200, 16, 8, 3],
//   [300, 32, 16, 4],
//   [275, 32, 8, 4],
//   [225, 16, 16, 2],
// ];

// let weights: number[] = [0.25, 0.25, 0.25, 0.25];
// let criteria: string[] = ['max', 'max', 'max', 'max'];

// apply(decisionMatrix, weights, criteria);
