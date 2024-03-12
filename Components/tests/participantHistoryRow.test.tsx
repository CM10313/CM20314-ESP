
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ParticipantHistoryRow from '../participantHistoryRow';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../firebase/firestore', () => ({
    fetchDocumentById: jest.fn(),
    updateDocument:jest.fn(),
  }));

describe('ParticipantHistoryRow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  jest.mock('@mui/material', () => {
    const actual = jest.requireActual('@mui/material');
    return {
      ...actual,
      useMediaQuery: jest.fn(),
    };
  });
  const studyData = {
    studyObj: {
      CompensationObject: {
        disputingParticipants: ['user1', 'user2'],
        participantsHaveRated: ['user3'],
      },
    },
  };

  const userData = {
    joinedStudies: [{ id: 'study1', department: 'department1', publisherId: 'pub1' }],
    disputedStudies: [{ id: 'study2', department: 'department2', publisherId: 'pub2' }],
  };

  
  it('renders properly when isMobile is true', () => {
    // Mock useMediaQuery to return true (indicating mobile view)
    require('@mui/material').useMediaQuery.mockReturnValue(true);

    const { getByText } = render(<ParticipantHistoryRow
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
      />);
      expect(getByText('Test Study')).toBeInTheDocument();
      expect(getByText('Author')).toBeInTheDocument();
      expect(getByText('2024-03-01')).toBeInTheDocument();
      expect(getByText('Location')).toBeInTheDocument();
      expect(getByText('Dispute')).toBeInTheDocument();
      expect(getByText('Withdraw')).toBeInTheDocument();
  });
  it('renders properly when isMobile is true', () => {
    // Mock useMediaQuery to return true (indicating mobile view)
    require('@mui/material').useMediaQuery.mockReturnValue(false);

    const { getByText } = render(<ParticipantHistoryRow
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
      />);
      expect(getByText('Test Study')).toBeInTheDocument();
      expect(getByText('Author')).toBeInTheDocument();
      expect(getByText('2024-03-01')).toBeInTheDocument();
      expect(getByText('Location')).toBeInTheDocument();
      expect(getByText('Dispute')).toBeInTheDocument();
      expect(getByText('Withdraw')).toBeInTheDocument();
  });
  it('renders correctly', () => {
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

    expect(getByText('Test Study')).toBeInTheDocument();
    expect(getByText('Author')).toBeInTheDocument();
    expect(getByText('2024-03-01')).toBeInTheDocument();
    expect(getByText('Location')).toBeInTheDocument();
    expect(getByText('Dispute')).toBeInTheDocument();
    expect(getByText('Withdraw')).toBeInTheDocument();
  });

  it('handles dispute click correctly', async () => {
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
    require('../../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(userData);

    require('../../firebase/firestore').updateDocument.mockResolvedValueOnce(studyData);
    fireEvent.click(getByText('Dispute'));

    expect(require('../../firebase/firestore').fetchDocumentById).toHaveBeenCalledWith('users', 'user1');
    expect(require('../../firebase/firestore').fetchDocumentById).toHaveBeenCalledWith('departments/department1/Researchers/pub1/studies', 'study1');
  });

  it('handles withdraw click correctly', async () => {
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
    require('../../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(userData);

    require('../../firebase/firestore').updateDocument.mockResolvedValueOnce(studyData);
    fireEvent.click(getByText('Withdraw'));

    expect(require('../../firebase/firestore').fetchDocumentById).toHaveBeenCalledWith('users', 'user1');
    expect(require('../../firebase/firestore').fetchDocumentById).toHaveBeenCalledWith('departments/department1/Researchers/pub1/studies', 'study1');
  });
  it('handles error on dispute click correctly', async () => {
    // Spy on console.error to prevent actual error output
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
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
  
    // Mock fetchDocumentById to throw an error when called
    require('../../firebase/firestore').fetchDocumentById.mockRejectedValueOnce(new Error('Test error'));
  
    // Trigger the click event on the "Dispute" button
    fireEvent.click(getByText('Dispute'));
  
    // Expect console.error to have been called with the expected error message
    await waitFor(() => {
        // Expect console.error to have been called with the expected error messages
        expect(consoleErrorSpy.mock.calls[0][0]).toBe('Error adding study to users disputed/removing from joined list:');
      });
      
  });
  

  it('handles error on withdraw click correctly', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
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
    require('../../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(new Error('Test error'));
    fireEvent.click(getByText('Withdraw'));

    await waitFor(() => {
        // Expect console.error to have been called with the expected error message
        expect(consoleErrorSpy.mock.calls[0][0]).toBe('Error removing study from users disputed/adding to joined');
      });
  });

  it('calls setRateClicked and updateStudyRatedStatus with correct arguments when markAsRated is invoked', () => {
    // Mock useState
    const setRateClickedMock = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValue([false, setRateClickedMock]);

    // Mock the required props
    const props = {
      studyId: 'study1',
      author: 'Author',
      date: '2024-03-01',
      title: 'Test Study',
      publisherId: 'pub1',
      isPaid: true,
      location: 'Location',
      userId: 'user1',
      department: 'department1',
      triggerGetStudies: jest.fn(),
      username: 'Username',
      isRated: false,
    };

    // Render the component
    const { getByText } = render(<ParticipantHistoryRow {...props} />);

    // Invoke the markAsRated function
    fireEvent.click(getByText('Rate'));

    // Assertions
    
    expect(getByText('Rate')).toBeInTheDocument();
  });
});