import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Anonymity, Faculty, Gender, HighestEducation, Race, Religion, Sexuality, useExtraInfoState } from './UserExtraInfo';

describe('useExtraInfoState', () => {
  test('should update state when calling setter function', () => {
    const TestComponent = () => {
      const [state, setState] = useExtraInfoState();

      // Function to update state with new values
      const updateState = () => {
        setState({
          DemographicData: {
            faculty: Faculty.ComputerScience,
            gender: Gender.Male,
            race: Race.White,
            religion: Religion.NotSpecified,
            income: "high",
            age: 25,
            sexuality: Sexuality.Asexual,
            yearOfStudies: 3,
            occupation: 'engineer',
            highestLevelOfEducation: HighestEducation.ALevel,
          },
          HealthData: {
            preExistingConditions: 'none',
            allergies: 'none',
            medication: 'none',
            disabilities: 'none',
          },
          TechnicalData: {
            accessToDevice: true,
          },
          LanguageData: {
            nativeLanguage: 'English',
            otherLanguages: ['Spanish', 'French'],
          },
          GeographicData: {
            nearestCity: 'New York',
            maxTravelTime: 60,
          },
          PrivacyData: {
            anonymityRequired: Anonymity.Full,
          },
          AccessibilityData: {
            accessibilityRequirements: 'wheelchair'
          },
        });
      };

      return (
        <div>
          <button onClick={updateState}>Update State</button>
          <div data-testid="state">{JSON.stringify(state)}</div>
        </div>
      );
    };

    const { getByTestId, getByText } = render(<TestComponent />);

    // Click button to trigger state update
    fireEvent.click(getByText('Update State'));

    // Check if state is updated correctly
    const stateElement = getByTestId('state');
    const updatedState = JSON.parse(stateElement.textContent as string);
    
    expect(updatedState).toEqual({
      DemographicData: {
        faculty: Faculty.ComputerScience,
        gender: Gender.Male,
        race: Race.White,
        religion: Religion.NotSpecified,
        income: "high",
        age: 25,
        sexuality: Sexuality.Asexual,
        yearOfStudies: 3,
        occupation: 'engineer',
        highestLevelOfEducation: HighestEducation.ALevel,
      },
      HealthData: {
        preExistingConditions: 'none',
        allergies: 'none',
        medication: 'none',
        disabilities: 'none',
      },
      TechnicalData: {
        accessToDevice: true,
      },
      LanguageData: {
        nativeLanguage: 'English',
        otherLanguages: ['Spanish', 'French'],
      },
      GeographicData: {
        nearestCity: 'New York',
        maxTravelTime: 60,
      },
      PrivacyData: {
        anonymityRequired: Anonymity.Full,
      },
      AccessibilityData: {
        accessibilityRequirements: 'wheelchair'
      },
    });
  });
});

