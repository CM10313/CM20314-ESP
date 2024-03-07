import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HealthDisplay, { HealthDisplayProps } from '../HealthDisplay';

describe('HealthDisplay Component', () => {
  const mockProps: HealthDisplayProps = {
    hasPreExisting: true,
    hasAllergies: true,
    hasDisabilities: true,
    hasMedication: true,
    preExisitng: "Condition",
    allergies: "Allergy",
    disabilities: "Disability",
    medication: "Medications",
  };
  const falseMockProps: HealthDisplayProps = {
    hasPreExisting: false,
    hasAllergies: false,
    hasDisabilities: false,
    hasMedication: false,
    preExisitng: "Condition",
    allergies: "Allergy",
    disabilities: "Disability",
    medication: "Medications",
  };

  it('renders without crashing', () => {
    render(<HealthDisplay {...mockProps} />);
  });
  it('renders without crashing when all props are false', () => {
    render(<HealthDisplay {...falseMockProps} />);
  });

  it('displays correct content based on props', () => {
    const { getByText } = render(<HealthDisplay {...mockProps} />);
    
    expect(getByText('Pre-Existing Conditions')).toBeInTheDocument();
    expect(getByText('Allergies')).toBeInTheDocument();
    expect(getByText('Disabilities')).toBeInTheDocument();
    expect(getByText('Medication')).toBeInTheDocument();

    expect(getByText('Condition')).toBeInTheDocument();
    expect(getByText('Allergy')).toBeInTheDocument(); 
    expect(getByText('Disability')).toBeInTheDocument(); 
    expect(getByText('Medications')).toBeInTheDocument(); 
  });
});
