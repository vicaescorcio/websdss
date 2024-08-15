import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LocationForm from './index';
import fortalezaHexagons from '@/../public/sectors_h3.json';
import { AccessibilityForm } from '../AccessibilityForm/types';
import { MultiCriteriaForm } from '../MultiCriteriaForm/types';

// Mock the data and functions that are passed as props
const mockSetLocationFormData = jest.fn();
const mockSetCityGeoJson = jest.fn();

const mockFormData = {
  locationForm: {
    country: '',
    city: '',
    points: [],
  },
  accessibilityForm: {
    transportMode: 'walking',
    year: '2020',
    model: 'passive',
    travelTime: 10,
  } as AccessibilityForm,
  multiCriteriaForm: {
    groups: [
      {
        name: 'Group 1',
        criteriaType: 'max',
        ageLevel: ['0_a_5_anos'],
        incomeRange: [0, 800],
        weight: 1,
      },
    ],
    incomeRange: [],
    criteriaType: 'max',
    ageLevel: [],
    gender: '',
    weight: 1,
  } as MultiCriteriaForm,
};

const mockLocationFormData = {
  country: '',
  city: '',
  points: [],
};

describe('LocationForm Component', () => {
  beforeEach(() => {
    mockSetLocationFormData.mockClear();
    mockSetCityGeoJson.mockClear();
  });

  it('renders the component correctly', () => {
    render(
      <LocationForm
        formData={mockFormData}
        locationFormData={mockLocationFormData}
        setLocationFormData={mockSetLocationFormData}
        setCityGeoJson={mockSetCityGeoJson}
      />
    );

    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByText(/ADD POINT OF INTEREST/i)).toBeInTheDocument();
  });

  it('handles country and city selection', () => {
    render(
      <LocationForm
        formData={mockFormData}
        locationFormData={mockLocationFormData}
        setLocationFormData={mockSetLocationFormData}
        setCityGeoJson={mockSetCityGeoJson}
      />
    );

    const countrySelect = screen.getByLabelText(/Country/i);
    const citySelect = screen.getByLabelText(/City/i);

    fireEvent.change(countrySelect, { target: { value: 'brasil' } });
    fireEvent.change(citySelect, { target: { value: 'fortaleza' } });

    expect(mockSetLocationFormData).toHaveBeenCalledTimes(2);
    expect(mockSetLocationFormData).toHaveBeenCalledWith(
      expect.objectContaining({
        country: 'brasil',
      })
    );
    expect(mockSetLocationFormData).toHaveBeenCalledWith(
      expect.objectContaining({
        city: 'fortaleza',
      })
    );
  });

  it('disables the ADD POINT OF INTEREST button when conditions are not met', () => {
    render(
      <LocationForm
        formData={mockFormData}
        locationFormData={mockLocationFormData}
        setLocationFormData={mockSetLocationFormData}
        setCityGeoJson={mockSetCityGeoJson}
      />
    );

    const addButton = screen.getByText(/ADD POINT OF INTEREST/i);
    expect(addButton).toBeDisabled();
  });

  it('enables the ADD POINT OF INTEREST button when conditions are met and sets city geojson data on click', () => {
    const populatedLocationFormData = {
      country: 'brasil',
      city: 'fortaleza',
      points: [],
    };

    render(
      <LocationForm
        formData={mockFormData}
        locationFormData={populatedLocationFormData}
        setLocationFormData={mockSetLocationFormData}
        setCityGeoJson={mockSetCityGeoJson}
      />
    );

    const addButton = screen.getByText(/ADD POINT OF INTEREST/i);
    expect(addButton).not.toBeDisabled();

    fireEvent.click(addButton);
    expect(mockSetCityGeoJson).toHaveBeenCalledWith(fortalezaHexagons);
  });

  it('renders points and updates their names', () => {
    const populatedLocationFormData = {
      country: 'brasil',
      city: 'fortaleza',
      points: [
        { hexId: '12345', name: '', latitude: -3.7166, longitude: -38.5423 },
      ],
    };

    render(
      <LocationForm
        formData={mockFormData}
        locationFormData={populatedLocationFormData}
        setLocationFormData={mockSetLocationFormData}
        setCityGeoJson={mockSetCityGeoJson}
      />
    );

    const pointNameInput = screen.getByLabelText(/Point 1/i);
    fireEvent.change(pointNameInput, { target: { value: 'New Name' } });

    expect(mockSetLocationFormData).toHaveBeenCalledWith(
      expect.objectContaining({
        points: [
          {
            hexId: '12345',
            name: 'New Name',
            latitude: -3.7166,
            longitude: -38.5423,
          },
        ],
      })
    );
  });
});
