import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MultiCriteriaForm from './index';
import { MultiCriteriaForm as MultiCriteriaFormType } from './types';
import { AccessibilityForm as AccessibilityFormType } from '../AccessibilityForm/types';

describe('MultiCriteriaForm Component', () => {
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
    } as MultiCriteriaFormType,
  };

  it('renders the component with correct initial values', () => {
    render(<MultiCriteriaForm formData={mockFormData} />);

    // Check initial slider value
    const slider = screen.getByRole('slider', { name: 'Income Range' });
    expect(slider).toBeInTheDocument();

    // Check initial age level checkbox
    const ageCheckbox = screen.getByLabelText('6 a 10 years');
    expect(ageCheckbox).toBeChecked();

    // Check initial criteria type radio button
    const criteriaRadio = screen.getByLabelText('Max');
    expect(criteriaRadio).toBeChecked();
  });

  it('allows the user to change the income range', () => {
    render(<MultiCriteriaForm formData={mockFormData} />);

    const slider = screen.getByRole('slider', { name: 'Income Range' });
    fireEvent.change(slider, { target: { value: [1000, 4000] } });

    expect(mockFormData.multiCriteriaForm.incomeRange).toEqual([1000, 4000]);
  });

  it('allows the user to select and deselect age levels', () => {
    render(<MultiCriteriaForm formData={mockFormData} />);

    const ageCheckbox = screen.getByLabelText('11 a 14 years');
    fireEvent.click(ageCheckbox);
    expect(ageCheckbox).toBeChecked();
    expect(mockFormData.multiCriteriaForm.ageLevel).toContain('11_a_14_anos');

    fireEvent.click(ageCheckbox);
    expect(ageCheckbox).not.toBeChecked();
    expect(mockFormData.multiCriteriaForm.ageLevel).not.toContain(
      '11_a_14_anos'
    );
  });

  it('allows the user to change the criteria type', () => {
    render(<MultiCriteriaForm formData={mockFormData} />);

    const minRadio = screen.getByLabelText('Min');
    fireEvent.click(minRadio);
    expect(minRadio).toBeChecked();
    expect(mockFormData.multiCriteriaForm.criteriaType).toBe('min');
  });

  it('allows the user to add a group', () => {
    render(<MultiCriteriaForm formData={mockFormData} />);

    const addButton = screen.getByText('ADD GROUP');
    fireEvent.click(addButton);

    expect(mockFormData.multiCriteriaForm.groups).toHaveLength(1);
    expect(mockFormData.multiCriteriaForm.groups[0].name).toBe('Group 1');
  });

  it('prevents adding more than 3 groups', () => {
    const customMockFormData = {
      ...mockFormData,
      multiCriteriaForm: {
        ...mockFormData.multiCriteriaForm,
        groups: [
          {
            name: 'Group 1',
            weight: 1,
            incomeRange: [0, 5000],
            ageLevel: ['6_a_10_anos'],
            criteriaType: 'max',
          },
          {
            name: 'Group 2',
            weight: 2,
            incomeRange: [0, 5000],
            ageLevel: ['6_a_10_anos'],
            criteriaType: 'max',
          },
          {
            name: 'Group 3',
            weight: 3,
            incomeRange: [0, 5000],
            ageLevel: ['6_a_10_anos'],
            criteriaType: 'max',
          },
        ],
      } as MultiCriteriaFormType,
    };

    render(<MultiCriteriaForm formData={customMockFormData} />);

    const addButton = screen.getByText('ADD GROUP');
    expect(addButton).toBeDisabled();
  });

  it('allows the user to edit a group name and weight', () => {
    const customMockFormData = {
      ...mockFormData,
      multiCriteriaForm: {
        ...mockFormData.multiCriteriaForm,
        groups: [
          {
            name: 'Group 1',
            weight: 1,
            incomeRange: [0, 5000],
            ageLevel: ['6_a_10_anos'],
            criteriaType: 'max',
          },
        ],
      } as MultiCriteriaFormType,
    };

    render(<MultiCriteriaForm formData={customMockFormData} />);

    const groupNameInput = screen.getByLabelText('Group 1');
    fireEvent.change(groupNameInput, { target: { value: 'Updated Group 1' } });
    expect(groupNameInput).toHaveValue('Updated Group 1');
    expect(customMockFormData.multiCriteriaForm.groups[0].name).toBe(
      'Updated Group 1'
    );

    const weightInput = screen.getByLabelText('Weight');
    fireEvent.change(weightInput, { target: { value: '5' } });
    expect(weightInput).toHaveValue(5);
    expect(customMockFormData.multiCriteriaForm.groups[0].weight).toBe(5);
  });

  it('allows the user to remove a group', () => {
    const customMockFormData = {
      ...mockFormData,
      multiCriteriaForm: {
        ...mockFormData.multiCriteriaForm,
        groups: [
          {
            name: 'Group 1',
            weight: 1,
            incomeRange: [0, 5000],
            ageLevel: ['6_a_10_anos'],
            criteriaType: 'max',
          },
        ],
      } as MultiCriteriaFormType,
    };

    render(<MultiCriteriaForm formData={customMockFormData} />);

    const removeButton = screen.getByTitle('Remove group');
    fireEvent.click(removeButton);

    expect(customMockFormData.multiCriteriaForm.groups).toHaveLength(0);
  });
});
