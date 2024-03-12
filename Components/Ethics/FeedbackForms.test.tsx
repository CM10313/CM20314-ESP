import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FeedbackForms from './FeedbackForms';



jest.mock('../../firebase/firestore', () => ({
  fetchDocumentById: jest.fn(),
  updateDocument: jest.fn(),
}));

describe('FeedbackForms', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles rating submission correctly', async () => {
    // Mock the Firestore function
    require('../../firebase/firestore').fetchDocumentById.mockResolvedValueOnce({
      reviewObject: {
        reviews: [],
        numberOfRatings: 0,
        overallRating: 0,
      },
    });

    // Render the component
    const { getByLabelText, getByText,getByRole } = render(
      <FeedbackForms
        userId="user1"
        destinationName="Test Destination"
        usersName="Test User"
        markAsRated={() => {}}
        ratingStatus={false}
      />
    );
    fireEvent.click(getByText('Rate'));
    // Enter description
    fireEvent.change(getByLabelText('Description'), { target: { value: 'Test description' } });

    const ratingInput = getByRole('radio', { name: '3 Stars' }); // Assuming you want to select 3 stars
    fireEvent.click(ratingInput);

    // Submit feedback
    fireEvent.click(getByText('Submit'));

    // Expect the Firestore function to have been called with the correct arguments
    await waitFor(() => {
      expect(require('../../firebase/firestore').updateDocument).toHaveBeenCalledWith('users', 'user1', expect.any(Object));
    });
  });

  it('displays error message if required fields are not filled', async () => {
    // Render the component
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { getByText } = render(
      <FeedbackForms
        userId="user1"
        destinationName="Test Destination"
        usersName="Test User"
        markAsRated={() => {}}
        ratingStatus={false}
      />
    );
    fireEvent.click(getByText('Rate'));

    // Submit feedback without filling in required fields
    fireEvent.click(getByText('Submit'));

    // Expect console.error to have been called with the expected error message
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Please fill in all fields before submitting.');
    });

    // Ensure that Firestore function is not called
    expect(require('../../firebase/firestore').updateDocument).not.toHaveBeenCalled();
  });
  it('closes the dialog when clicking the close button', () => {
    const { getByTestId, queryByText,getByText } = render(
        <FeedbackForms
        userId="user1"
        destinationName="Test Destination"
        usersName="Test User"
        markAsRated={() => {}}
        ratingStatus={false}
      />
    );
    fireEvent.click(getByText('Rate'));
    // Click the close button
    fireEvent.click(getByTestId('close-button'));
  
    // Assert that the dialog is closed
    expect(queryByText('Rate')).toBeInTheDocument; // Replace 'Your Dialog Content' with the actual content of the dialog
  });
});
