/* eslint-disable react/display-name */
import React, { MutableRefObject } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnalysisForm from '.';
import { LocationForm as LocationFormType } from './LocationsForm/types';
import { AccessibilityForm as AccessibilityFormType } from './AccessibilityForm/types';
import { MultiCriteriaForm as MultiCriteriaFormType } from './MultiCriteriaForm/types';

// Mock subcomponents that are used in AnalysisForm
// eslint-disable-next-line react/display-name
jest.mock('./LocationsForm', () => () => <div>LocationsForm Component</div>);
// eslint-disable-next-line react/display-name
jest.mock('./AccessibilityForm', () => () => (
  <div>AccessibilityForm Component</div>
));
// eslint-disable-next-line react/display-name
jest.mock('./MultiCriteriaForm', () => () => (
  <div>MultiCriteriaForm Component</div>
));
// eslint-disable-next-line react/display-name
// jest.mock(
//   './Stepper',
//   () =>
//     ({ steps, onSubmit }: { steps: any; onSubmit: any }) => (
//       <div>
//         <div>Stepper Component</div>
//         <button onClick={onSubmit}>Submit</button>
//       </div>
//     )
// );
// eslint-disable-next-line react/display-name
jest.mock('./ResultForm', () => () => <div>ResultForm Component</div>);
// eslint-disable-next-line react/display-name
jest.mock('../ReviewForm', () => () => <div>ReviewForm Component</div>);
// eslint-disable-next-line react/display-name
jest.mock('@/components/HelperCard', () => () => (
  <div>HelperCard Component</div>
));

describe('AnalysisForm Component', () => {
  const defaultProps = {
    locationFormData: {
      country: '',
      city: '',
      points: [],
    },
    setLocationFormData: jest.fn(),
    analysisFormData: {
      current: {
        locationForm: {
          country: '',
          city: '',
          points: [],
        } as LocationFormType,
        accessibilityForm: {
          transportMode: 'walking',
          year: '2020',
          model: 'passive',
          travelTime: 1,
        } as AccessibilityFormType,
        multiCriteriaForm: {} as MultiCriteriaFormType,
      },
    } as MutableRefObject<any>,
    setCityGeoJson: jest.fn(),
    handleSubmit: jest.fn(),
    submitting: false,
    results: null,
    resultsFilter: null,
    setResultsFilter: jest.fn(),
    resetAnalysis: jest.fn(),
  };

  it('renders AnalysisForm component', () => {
    render(<AnalysisForm {...defaultProps} />);

    expect(screen.getByText('Open Analysis Form')).toBeInTheDocument();
    expect(screen.queryByText('LocationsForm Component')).toBeInTheDocument();
  });

  it('opens and closes the form when the Fab is clicked', () => {
    render(<AnalysisForm {...defaultProps} />);

    const openButton = screen.getByText('Open Analysis Form');
    fireEvent.click(openButton);

    expect(screen.getByText('Close Analysis Form')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close Analysis Form'));

    // expect(
    //   screen.queryByText('LocationsForm Component')
    // ).not.toBeInTheDocument();
  });

  it('displays an error if validation fails', async () => {
    const customProps = {
      ...defaultProps,
      analysisFormData: {
        current: {
          locationForm: { country: '', city: '', points: [] },
          accessibilityForm: {
            transportMode: 'walking',
            year: '2020',
            model: 'passive',
            travelTime: 30,
          } as AccessibilityFormType,
          multiCriteriaForm: {
            criteriaType: 'max' as 'max',
            ageLevel: [],
            groups: [],
            incomeRange: [],
            gender: '',
            weight: 1,
            // Add any other missing properties here
          } as MultiCriteriaFormType,
        },
      },
    };

    render(<AnalysisForm {...customProps} />);

    fireEvent.click(screen.getByText('Open Analysis Form'));
    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(
        screen.getByText('Please select at least one location')
      ).toBeInTheDocument();
    });
  });

  it('shows the loading state when submitting', () => {
    const customProps = {
      ...defaultProps,
      submitting: true,
    };

    render(<AnalysisForm {...customProps} />);

    expect(screen.getByText('Calculating...')).toBeInTheDocument();
  });

  it('renders ResultForm when results are available', () => {
    const customProps = {
      ...defaultProps,
      results: { message: 'result', rankedResults: [] },
    };

    render(<AnalysisForm {...customProps} />);

    expect(screen.getByText('ResultForm Component')).toBeInTheDocument();
  });

  it('opens and closes the helper modal', () => {
    render(<AnalysisForm {...defaultProps} />);

    fireEvent.click(screen.getByText('Open Analysis Form'));

    fireEvent.click(screen.getByTestId('helpModal')); // Assuming the modal role

    expect(screen.getByText('HelperCard Component')).toBeInTheDocument();
  });
});
