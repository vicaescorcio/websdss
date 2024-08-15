import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccessibilityForm from './index';
import { AccessibilityForm as AccessibilityFormType } from './types';
import { MultiCriteriaForm } from '../MultiCriteriaForm/types';

describe('AccessibilityForm Component', () => {
  const mockFormData = {
    accessibilityForm: {
      model: 'passive',
      year: '2023',
      transportMode: 'public',
      travelTime: 30,
    } as AccessibilityFormType,
    locationForm: {
      country: 'Country',
      city: 'City',
      points: [],
    },
    multiCriteriaForm: {
      groups: [
        {
          name: 'Group 1',
          criteriaType: 'max',
          ageLevel: ['0_a_5_anos'],
          incomeRange: [0, 800],
          weight: 1,
          // Add any other required properties here
        },
      ],
      incomeRange: [],
      gender: '',
      weight: 1,
      criteriaType: 'max' as 'max',
      ageLevel: [],
      // Add any other required properties here
    } as MultiCriteriaForm,
  };

  it('renders the component with correct initial values', () => {
    render(<AccessibilityForm formData={mockFormData} />);

    // Check that the radio buttons and slider have the correct initial values
    expect(screen.getByLabelText('Passive')).toBeChecked();
    expect(screen.getByLabelText('2023')).toBeChecked();
    expect(screen.getByLabelText('WALKING')).not.toBeChecked();
    expect(screen.getByLabelText('PUBLIC')).toBeChecked();
    expect(screen.getByLabelText('PRIVATE')).not.toBeChecked();
    expect(screen.getByRole('slider')).toHaveValue(30);
  });

  it('allows the user to change the accessibility model', () => {
    render(<AccessibilityForm formData={mockFormData} />);

    const passiveRadio = screen.getByLabelText('Passive');
    const activeRadio = screen.getByLabelText('Active');

    fireEvent.click(passiveRadio);
    expect(passiveRadio).toBeChecked();
    expect(mockFormData.accessibilityForm.model).toBe('passive');

    // Note: The 'Active' model is disabled, so it shouldn't change on click
    fireEvent.click(activeRadio);
    expect(activeRadio).not.toBeChecked();
    expect(passiveRadio).toBeChecked();
  });

  it('allows the user to change the year', () => {
    render(<AccessibilityForm formData={mockFormData} />);

    const year2020Radio = screen.getByLabelText('2020');
    const year2023Radio = screen.getByLabelText('2023');

    // The year 2020 radio is disabled, so it should not be checked
    fireEvent.click(year2020Radio);
    expect(year2020Radio).not.toBeChecked();
    expect(year2023Radio).toBeChecked();

    // Changing to the already selected year should work normally
    fireEvent.click(year2023Radio);
    expect(year2023Radio).toBeChecked();
  });

  it('allows the user to change the transport mode', () => {
    render(<AccessibilityForm formData={mockFormData} />);

    const walkingRadio = screen.getByLabelText('WALKING');
    const publicRadio = screen.getByLabelText('PUBLIC');
    const privateRadio = screen.getByLabelText('PRIVATE');

    // Only the 'PUBLIC' option should be enabled
    fireEvent.click(walkingRadio);
    expect(walkingRadio).not.toBeChecked();
    expect(publicRadio).toBeChecked();

    fireEvent.click(privateRadio);
    expect(privateRadio).not.toBeChecked();
    expect(publicRadio).toBeChecked();

    fireEvent.click(publicRadio);
    expect(publicRadio).toBeChecked();
  });

  it('allows the user to change the travel time', () => {
    render(<AccessibilityForm formData={mockFormData} />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveValue(30);

    fireEvent.change(slider, { target: { value: '20' } });
    expect(slider).toHaveValue(20);
    expect(mockFormData.accessibilityForm.travelTime).toBe(20);
  });
});
