import React from 'react';
import { render } from '@testing-library/react';
import OtherRequirementDisplay, { OtherRequirementDisplayProps } from '../OtherRequirementDisplay';
import '@testing-library/jest-dom';

describe('OtherRequirementDisplay Component', () => {
  const mockProps: OtherRequirementDisplayProps = {
    hasAccessToDevice: true,
    hasNativeLanguage: true,
    hasOtherLanguages: true,
    hasNearestCity: true,
    hasMaxTravelTime: true,
    hasAnonymityLevel: true,
    hasAccessRequirements: true,
    accessToDevice: "Yes",
    nativeLanguage: "English",
    otherLanguages: "Spanish, French",
    nearestCity: "New York",
    maxTravelTime: "2 hours",
    anonymityLevel: "High",
    accesRequirements: "Wheelchair accessible",
  };
  const falseMockProps: OtherRequirementDisplayProps = {
    hasAccessToDevice: false,
    hasNativeLanguage: false,
    hasOtherLanguages: false,
    hasNearestCity: false,
    hasMaxTravelTime: false,
    hasAnonymityLevel: false,
    hasAccessRequirements: false,
    accessToDevice: "Yes",
    nativeLanguage: "English",
    otherLanguages: "Spanish, French",
    nearestCity: "New York",
    maxTravelTime: "2 hours",
    anonymityLevel: "High",
    accesRequirements: "Wheelchair accessible",
  };

  it('renders without crashing', () => {
    render(<OtherRequirementDisplay {...mockProps} />);
  });
  it('renders when all fields are false crashing', () => {
    render(<OtherRequirementDisplay {...falseMockProps} />);
  });

  it('displays correct content based on props', () => {
    const { getByText } = render(<OtherRequirementDisplay {...mockProps} />);
    
    expect(getByText('Accessibility Requirements')).toBeInTheDocument();
    expect(getByText('Access to Device')).toBeInTheDocument();
    expect(getByText('Anonymity Level')).toBeInTheDocument();
    expect(getByText('Max Travel Time')).toBeInTheDocument();
    expect(getByText('Nearest City')).toBeInTheDocument();
    expect(getByText('Native Language')).toBeInTheDocument();
    expect(getByText('Other Languages')).toBeInTheDocument();

    expect(getByText('Yes')).toBeInTheDocument(); 
    expect(getByText('English')).toBeInTheDocument();
    expect(getByText('Spanish, French')).toBeInTheDocument();
    expect(getByText('New York')).toBeInTheDocument(); 
    expect(getByText('2 hours')).toBeInTheDocument(); 
    expect(getByText('High')).toBeInTheDocument(); 
    expect(getByText('Wheelchair accessible')).toBeInTheDocument(); 
  });
});
