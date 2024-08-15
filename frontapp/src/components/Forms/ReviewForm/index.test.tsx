import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReviewForm from './index';

// Mock the LocationMapIconButton component
jest.mock('@/components/Buttons/LocationMapIconButton', () => () => (
  <div>Map Icon Button</div>
));

describe('ReviewForm Component', () => {
  const mockFormData = {
    locationForm: {
      points: [
        { name: 'Point 1', latitude: -3.7166, longitude: -38.5423 },
        { name: 'Point 2', latitude: -3.7167, longitude: -38.5424 },
      ],
    },
    accessibilityForm: {
      distance: 1000,
      transportMode: 'public',
      year: '2023',
      model: 'passive',
      travelTime: 30,
    },
    multiCriteriaForm: {
      groups: [
        {
          name: 'Group 1',
          incomeRange: [0, 5000],
          ageLevel: ['0_a_5_anos'],
          weight: 1,
          criteriaType: 'max',
        },
        {
          name: 'Group 2',
          incomeRange: [1000, 3000],
          ageLevel: ['6_a_10_anos', '11_a_14_anos'],
          weight: 2,
          criteriaType: 'min',
        },
      ],
    },
  };

  it('renders Points of Interest correctly', () => {
    render(<ReviewForm formData={mockFormData} />);

    expect(screen.getByText('Points of Interest')).toBeInTheDocument();
    expect(screen.getByText('Name: Point 1')).toBeInTheDocument();
    expect(screen.getByText('Name: Point 2')).toBeInTheDocument();
    expect(screen.getByText('Lat: -3.716600')).toBeInTheDocument();
    expect(screen.getByText('Long: -38.542300')).toBeInTheDocument();
  });

  it('renders Accessibility Parameters correctly', () => {
    render(<ReviewForm formData={mockFormData} />);

    expect(screen.getByText('Accessibility Parameters')).toBeInTheDocument();
    expect(screen.getByText('Distance: 1000')).toBeInTheDocument();
    expect(screen.getByText('Transport Mode: public')).toBeInTheDocument();
    expect(screen.getByText('Year: 2023')).toBeInTheDocument();
    expect(screen.getByText('Model: passive')).toBeInTheDocument();
    expect(screen.getByText('Travel Time: 30')).toBeInTheDocument();
  });

  it('renders Population Group Criterias correctly', () => {
    render(<ReviewForm formData={mockFormData} />);

    expect(screen.getByText('Population Group Criterias')).toBeInTheDocument();
    expect(screen.getByText('Name: Group 1')).toBeInTheDocument();
    expect(screen.getByText('Income Range: 0,5000')).toBeInTheDocument();
    expect(screen.getByText('Age Levels: 0_a_5_anos')).toBeInTheDocument();
    expect(screen.getByText('Weight: 1')).toBeInTheDocument();
    expect(screen.getByText('Criteria Type: max')).toBeInTheDocument();

    expect(screen.getByText('Name: Group 2')).toBeInTheDocument();
    expect(screen.getByText('Income Range: 1000,3000')).toBeInTheDocument();
    expect(
      screen.getByText('Age Levels: 6_a_10_anos, 11_a_14_anos')
    ).toBeInTheDocument();
    expect(screen.getByText('Weight: 2')).toBeInTheDocument();
    expect(screen.getByText('Criteria Type: min')).toBeInTheDocument();
  });
});
