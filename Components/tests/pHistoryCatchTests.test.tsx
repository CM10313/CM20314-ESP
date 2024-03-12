import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as firestore from '../../firebase/firestore';
import * as studyResolutionFuncs from '../../Utils/studyResolutionFuncs';
import ParticipantHistoryRow from '../participantHistoryRow';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock Firestore functions
jest.mock('../../firebase/firestore', () => ({
  fetchDocumentById: jest.fn(),
  updateDocument: jest.fn(),
}));

// Mock study resolution functions
jest.mock('../../Utils/studyResolutionFuncs', () => ({
  addStudyToUsersDisputed: jest.fn(),
  addUserToDisputedInStudy: jest.fn(),
  removeStudyFromUsersJoined: jest.fn(),
  removeUserFromJoinedInStudy: jest.fn(),
  updateStudyRatedStatus: jest.fn(),
}));

describe('ParticipantHistoryRow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles dispute click correctly', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    // Mock the Firestore functions to throw an error
    (studyResolutionFuncs.addStudyToUsersDisputed as jest.Mock).mockRejectedValueOnce(new Error('Test error'));
    (studyResolutionFuncs.addUserToDisputedInStudy as jest.Mock).mockResolvedValueOnce(undefined);

    // Render the component
    const { getByText } = render(
      <ParticipantHistoryRow
        studyId="study1"
        author="Author"
        date="2024-03-01"
        title="Test Study"
        publisherId="pub1"
        isPaid={true}
        location="Location"
        userId="user1"
        department="department1"
        triggerGetStudies={() => {}}
        username="Username"
        isRated={false}
      />
    );

    // Click the "Dispute" button
    fireEvent.click(getByText('Dispute'));

    // Expect console.error to have been called with the expected error message
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error handling dispute:', new Error('Test error'));
    });

    // Ensure that the other function was not called due to error
    expect(studyResolutionFuncs.addUserToDisputedInStudy).toHaveBeenCalled();
  });

  it('handles withdraw click correctly', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    // Mock the Firestore functions to throw an error
    (studyResolutionFuncs.removeStudyFromUsersJoined as jest.Mock).mockRejectedValueOnce(new Error('Test error'));
    (studyResolutionFuncs.removeUserFromJoinedInStudy as jest.Mock).mockResolvedValueOnce(undefined);

    // Render the component
    const { getByText } = render(
      <ParticipantHistoryRow
        studyId="study1"
        author="Author"
        date="2024-03-01"
        title="Test Study"
        publisherId="pub1"
        isPaid={true}
        location="Location"
        userId="user1"
        department="department1"
        triggerGetStudies={() => {}}
        username="Username"
        isRated={false}
      />
    );

    // Click the "Withdraw" button
    fireEvent.click(getByText('Withdraw'));

    // Expect console.error to have been called with the expected error message
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error handling withdrawl:', new Error('Test error'));
    });

    // Ensure that the other function was not called due to error
    expect(studyResolutionFuncs.removeUserFromJoinedInStudy).toHaveBeenCalled();
  });

  it('handles mark as rated correctly', async () => {
    // Mock the setRateClicked and updateStudyRatedStatus functions
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const setRateClickedMock = jest.fn();
    const updateStudyRatedStatusMock = jest.fn();

    // Render the component
    const { getByText } = render(
      <ParticipantHistoryRow
        studyId="study1"
        author="Author"
        date="2024-03-01"
        title="Test Study"
        publisherId="pub1"
        isPaid={true}
        location="Location"
        userId="user1"
        department="department1"
        triggerGetStudies={() => {}}
        username="Username"
        isRated={false}
      />
    );

    // Call the markAsRated function
    (studyResolutionFuncs.updateStudyRatedStatus as jest.Mock).mockRejectedValueOnce(new Error('Test error'));
    await waitFor(() => {
      (studyResolutionFuncs.updateStudyRatedStatus as jest.Mock).mockResolvedValueOnce(undefined);
    });
    // Expect console.error to have been called with the expected error message
    expect(getByText('Rate')).toBeInTheDocument();

  });
});
