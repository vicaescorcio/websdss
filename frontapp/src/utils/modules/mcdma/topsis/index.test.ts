import {
  apply,
  normalizeMatrix,
  weightedNormalizedMatrix,
  idealSolutions,
  separationMeasures,
  relativeCloseness,
  rankAlternatives,
} from './index'; // Adjust the import path accordingly

describe('TOPSIS Implementation', () => {
  let decisionMatrix: number[][];
  let weights: number[];
  let criteria: string[];

  beforeEach(() => {
    decisionMatrix = [
      [250, 16, 12, 5],
      [200, 16, 8, 3],
      [300, 32, 16, 4],
      [275, 32, 8, 4],
      [225, 16, 16, 2],
    ];
    weights = [0.25, 0.25, 0.25, 0.25];
    criteria = ['max', 'max', 'max', 'max'];
  });

  it('should normalize the decision matrix correctly', () => {
    const normalized = normalizeMatrix(decisionMatrix);
    expect(normalized).toHaveLength(decisionMatrix.length);
    expect(normalized[0]).toHaveLength(decisionMatrix[0].length);

    // Further tests can include specific value checks if needed
  });

  it('should calculate the weighted normalized matrix correctly', () => {
    const normalized = normalizeMatrix(decisionMatrix);
    const weighted = weightedNormalizedMatrix(normalized, weights);

    expect(weighted).toHaveLength(normalized.length);
    expect(weighted[0]).toHaveLength(normalized[0].length);

    // Further tests can include specific value checks if needed
  });

  it('should determine the ideal solutions correctly', () => {
    const normalized = normalizeMatrix(decisionMatrix);
    const weighted = weightedNormalizedMatrix(normalized, weights);
    const ideals = idealSolutions(weighted, criteria);

    expect(ideals.positiveIdeal).toHaveLength(decisionMatrix[0].length);
    expect(ideals.negativeIdeal).toHaveLength(decisionMatrix[0].length);

    // Further tests can include specific value checks if needed
  });

  it('should calculate the separation measures correctly', () => {
    const normalized = normalizeMatrix(decisionMatrix);
    const weighted = weightedNormalizedMatrix(normalized, weights);
    const ideals = idealSolutions(weighted, criteria);
    const separations = separationMeasures(weighted, ideals);

    expect(separations).toHaveLength(decisionMatrix.length);

    // Further tests can include specific value checks if needed
  });

  it('should calculate the relative closeness to the ideal solution correctly', () => {
    const normalized = normalizeMatrix(decisionMatrix);
    const weighted = weightedNormalizedMatrix(normalized, weights);
    const ideals = idealSolutions(weighted, criteria);
    const separations = separationMeasures(weighted, ideals);
    const closeness = relativeCloseness(separations);

    expect(closeness).toHaveLength(decisionMatrix.length);

    // Further tests can include specific value checks if needed
  });

  it('should rank the alternatives correctly', () => {
    const normalized = normalizeMatrix(decisionMatrix);
    const weighted = weightedNormalizedMatrix(normalized, weights);
    const ideals = idealSolutions(weighted, criteria);
    const separations = separationMeasures(weighted, ideals);
    const closeness = relativeCloseness(separations);
    const ranking = rankAlternatives(closeness);

    expect(ranking).toHaveLength(decisionMatrix.length);

    // Further tests can include specific value checks if needed
  });

  it('should execute the full TOPSIS process correctly', () => {
    const ranking = apply(decisionMatrix, weights, criteria);

    expect(ranking).toHaveLength(decisionMatrix.length);

    // Depending on the expected result, you can test for specific rankings
    // Example: expect(ranking).toEqual([2, 3, 0, 1, 4]);
  });
});
