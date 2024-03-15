import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router'; // Import the useRouter hook from 'next/router'
import WebinarCreator from '../pages/webinarCreator';
import { addSpecialDocument, createNestedDocument } from '../firebase/firestore';

jest.mock('next/router', () => ({
  __esModule: true,
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(), 
}));
jest.mock('../firebase/firestore', () => ({
 addSpecialDocument: jest.fn(),
}));


describe('webinar creator', () => {
  it('renders without crashing', () => {
    // Mock the useRouter implementation
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    // Render the component
    render(<WebinarCreator jestBypass={false}/>);
  });
  it('submits study data when WebinarDialog form is submitted', async () => {
    // Render the component
    const handleWebinarSubmitMock = jest.fn();
    const { getByText, getByRole } = render(<WebinarCreator jestBypass={true} />);
    
    // Simulate filling out the form in WebinarDialog
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
  
    // Expect that handleWebinarSubmit is called with the correct data
    // Wait for any side effects to settle
    await waitFor(() => {
      // Assert that the submit button is not disabled when canSubmit is true
      expect(submitButton).not.toHaveAttribute('disabled');
      expect(addSpecialDocument).toHaveBeenCalled();
    });
});


it('returns to home page on click', () => {
  const {  getByText} = render(<WebinarCreator jestBypass={true}/>);
  const button = getByText('Click Here');

  fireEvent.click(button);

  // Expect that createNestedDocument is called with the correct data
  expect(require('next/router').useRouter().push).toHaveBeenCalledWith(
    '/researcherHome'
  );
});

});