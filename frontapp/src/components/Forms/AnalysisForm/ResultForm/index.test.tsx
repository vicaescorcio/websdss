import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultForm from './index';
import { AnalysisResult } from '@/app/api/accessibility/types';
import { LocationForm } from '../LocationsForm/types';
import { AccessibilityForm } from '../AccessibilityForm/types';
import { MultiCriteriaForm } from '../MultiCriteriaForm/types';

// Mock the ReviewForm and LocationMapIconButton components
// eslint-disable-next-line react/display-name
jest.mock('../../ReviewForm', () => () => <div>ReviewForm Component</div>);
// eslint-disable-next-line react/display-name
jest.mock('@/components/Buttons/LocationMapIconButton', () => () => (
  <div>Map Icon Button</div>
));

describe('ResultForm Component', () => {
  const mockResults: AnalysisResult = {
    message: 'Mock Results',
    rankedResults: [
      [
        'hex1',
        { group1: { total: 0.75, hex: [] }, group2: { total: 0.65, hex: [] } },
      ],
      [
        'hex2',
        { group1: { total: 0.85, hex: [] }, group2: { total: 0.55, hex: [] } },
      ],
    ],
  };

  const mockAnalysisFormData = {
    locationForm: {
      country: 'Country',
      city: 'City',
      points: [
        {
          hexId: 'hex1',
          name: 'Point 1',
          latitude: -3.7166,
          longitude: -38.5423,
        },
        {
          hexId: 'hex2',
          name: 'Point 2',
          latitude: -3.7166,
          longitude: -38.5423,
        },
      ],
    } as LocationForm,
    accessibilityForm: {} as AccessibilityForm,
    multiCriteriaForm: {
      incomeRange: [],
      criteriaType: 'max',
      ageLevel: [],
      gender: '',
      weight: 1,
      groups: [
        {
          name: 'group1',
          criteriaType: 'max',
          ageLevel: [],
          incomeRange: [],
          weight: 1,
        },
        {
          name: 'group2',
          criteriaType: 'max',
          ageLevel: [],
          incomeRange: [],
          weight: 1,
        },
      ],
    } as MultiCriteriaForm,
  };

  const mockSetResultsFilter = jest.fn();
  const mockResetAnalysis = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the ResultForm component with results', () => {
    render(
      <ResultForm
        results={mockResults}
        analysisFormData={mockAnalysisFormData}
        resultsFilter={null}
        setResultsFilter={mockSetResultsFilter}
        resetAnalysis={mockResetAnalysis}
      />
    );

    // Check that the RESULTS tab is active
    expect(screen.getByText('RESULTS')).toBeInTheDocument();
    expect(screen.getByText('Point 1')).toBeInTheDocument();
    expect(screen.getByText('Point 2')).toBeInTheDocument();
    expect(screen.getAllByText('Hex').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Latitude').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Longitude').length).toBeGreaterThan(0);
  });

  it('allows switching between INPUTS and RESULTS views', () => {
    render(
      <ResultForm
        results={mockResults}
        analysisFormData={mockAnalysisFormData}
        resultsFilter={null}
        setResultsFilter={mockSetResultsFilter}
        resetAnalysis={mockResetAnalysis}
      />
    );

    // By default, the RESULTS view should be active
    expect(screen.getByText('RESULTS')).toHaveStyle('borderBottom: 1px solid');

    // Switch to INPUTS view
    fireEvent.click(screen.getByText('INPUTS'));
    expect(screen.getByText('RESULTS')).toHaveStyle('borderBottom: none');
    expect(screen.getByText('ReviewForm Component')).toBeInTheDocument();

    // Switch back to RESULTS view
    fireEvent.click(screen.getByText('RESULTS'));
    expect(screen.getByText('ReviewForm Component')).not.toBeInTheDocument();
  });

  it('calls resetAnalysis when "New Analysis" button is clicked', () => {
    render(
      <ResultForm
        results={mockResults}
        analysisFormData={mockAnalysisFormData}
        resultsFilter={null}
        setResultsFilter={mockSetResultsFilter}
        resetAnalysis={mockResetAnalysis}
      />
    );

    const newAnalysisButton = screen.getByText('New Analysis');
    fireEvent.click(newAnalysisButton);

    expect(mockResetAnalysis).toHaveBeenCalledTimes(1);
  });

  it('calls setResultsFilter when a group criteria button is clicked', () => {
    render(
      <ResultForm
        results={mockResults}
        analysisFormData={mockAnalysisFormData}
        resultsFilter={null}
        setResultsFilter={mockSetResultsFilter}
        resetAnalysis={mockResetAnalysis}
      />
    );

    const groupCriteriaButtons = screen.getAllByTitle(
      'Visualize this group criteria on the map'
    );
    fireEvent.click(groupCriteriaButtons[0]);

    expect(mockSetResultsFilter).toHaveBeenCalledWith({
      hex: 'hex1',
      group: 'group1',
    });
  });

  it('displays the "SCORES" section with correct values', () => {
    render(
      <ResultForm
        results={mockResults}
        analysisFormData={mockAnalysisFormData}
        resultsFilter={null}
        setResultsFilter={mockSetResultsFilter}
        resetAnalysis={mockResetAnalysis}
      />
    );

    expect(screen.getByText('SCORES:')).toBeInTheDocument();
    expect(screen.getByText('group1')).toBeInTheDocument();
    expect(screen.getByText('0.75000')).toBeInTheDocument();
    expect(screen.getByText('group2')).toBeInTheDocument();
    expect(screen.getByText('0.65000')).toBeInTheDocument();
  });
});
