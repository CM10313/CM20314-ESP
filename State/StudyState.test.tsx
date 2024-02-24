import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useStudyState } from './StudyState'; // Assuming extraInfoState.ts is in the same directory

describe('useStudyState', () => {
  test('should update state when calling setter function', () => {
    const TestComponent = () => {
      const [studyObj, setStudyObj] = useStudyState();

      // Function to update state with new values
      const updateState = () => {
        setStudyObj({
          DiversityObject: {
            hasGender: true,
            hasRace: true,
            hasReligion: true,
            hasIncome: true,
            hasAge: true,
            hasSexuality: true
          },
          EthicsApproval: true,
          CompensationObject: {
            amount: "100",
            currency: "USD",
            description: "Some description",
            allPaid: true,
            disputingParticipants: ["participant1"],
            paidParticipants: ["participant2"]
          },
          RequirementsObject: {
            demoRequirements: ['demo1', 'demo2'],
            healthRequirements: ['health1', 'health2'],
            techRequirements: ['tech1', 'tech2'],
            geographicRequirements: ['geo1', 'geo2'],
            languageRequirements: ['lang1', 'lang2'],
            privacyRequirements: ['privacy1', 'privacy2'],
            accesibilityRequirements: ['accessibility1', 'accessibility2']
          },
          joinedParticipants: ['participant3'],
          awaitingApprovalParticipants: ['participant4'],
        });
      };

      return (
        <div>
          <button onClick={updateState}>Update State</button>
          <div data-testid="state">{JSON.stringify(studyObj)}</div>
        </div>
      );
    };

    const { getByTestId, getByText } = render(<TestComponent />);

    // Click button to trigger state update
    fireEvent.click(getByText('Update State'));

    // Check if state is updated correctly
    const stateElement = getByTestId('state');
    const updatedState = JSON.parse(stateElement.textContent);
    
    expect(updatedState).toEqual({
      DiversityObject: {
        hasGender: true,
        hasRace: true,
        hasReligion: true,
        hasIncome: true,
        hasAge: true,
        hasSexuality: true
      },
      EthicsApproval: true,
      CompensationObject: {
        amount: "100",
        currency: "USD",
        description: "Some description",
        allPaid: true,
        disputingParticipants: ["participant1"],
        paidParticipants: ["participant2"]
      },
      RequirementsObject: {
        demoRequirements: ['demo1', 'demo2'],
        healthRequirements: ['health1', 'health2'],
        techRequirements: ['tech1', 'tech2'],
        geographicRequirements: ['geo1', 'geo2'],
        languageRequirements: ['lang1', 'lang2'],
        privacyRequirements: ['privacy1', 'privacy2'],
        accesibilityRequirements: ['accessibility1', 'accessibility2']
      },
      joinedParticipants: ['participant3'],
      awaitingApprovalParticipants: ['participant4'],
    });
  });
});
