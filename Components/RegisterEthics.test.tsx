import React from 'react';
import { render, fireEvent, queryByLabelText } from '@testing-library/react';
import RegisterEthics from './RegisterEthics';
import '@testing-library/jest-dom';
import { EthicsData } from '../pages/register';
describe('RegisterEthics Component', () => {
  it('renders without crashing', () => {
    render(<RegisterEthics handleLoginRedirect={() => { } } handleReset={() => { } } onSubmit={() => {}} />);
  });

  it('displays the username input field', () => {
    const { getByLabelText } = render(<RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => {}}/>);
    expect(getByLabelText('Username')).toBeInTheDocument();
  });
  it('displays the username input field', () => {
    const { getByLabelText } = render(<RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => {}} />);
    expect(getByLabelText('Orginisation')).toBeInTheDocument();
  });
  it('displays the username input field', () => {
    const { getByLabelText } = render(<RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => {}} />);
    expect(getByLabelText('Phone Number')).toBeInTheDocument();
  });

  it('displays the password input field', () => {
    const { getByLabelText } = render(<RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => {}} />);
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('displays the email input field after clicking next', () => {
    const { getByLabelText, getByRole } = render(
      <RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => {}} />
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Email')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
  
    // Check that the email input field is now present
    expect(getByLabelText('Email')).toBeInTheDocument();
  });
  it('calls handleReset when the "Click Here" button is clicked', () => {
    // Mock handleReset function
    const handleResetMock = jest.fn();
    
    // Render the component with the mock function
    const { getByText } = render(
      <RegisterEthics handleLoginRedirect={() => {}} handleReset={handleResetMock} onSubmit={() => {}}/>
    );

    // Find the button element
    const button = getByText('Click Here');

    // Simulate a click on the button
    fireEvent.click(button);

    // Check if handleResetMock was called
    expect(handleResetMock).toHaveBeenCalled();
  });
  // Add more tests for other input fields and functionality
  it('displays password error when an incorrect password is entered', () => {
    const { getByLabelText, getByText } = render(<RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => {}}/>);
    const passwordInput = getByLabelText('Password');

    // Enter an incorrect password
    fireEvent.change(passwordInput, { target: { value: '123' } });

    // Check if the error message is displayed
    expect(getByText('Invalid Password')).toBeInTheDocument();
  });
  it('updates the password state when a key is pressed in the password field', () => {
    const { getByLabelText } = render(<RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => {}}/>);
    const passwordInput = getByLabelText('Password') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(passwordInput, { target: { value: 'newPassword' } });

    // Check if the password state is updated
    expect(passwordInput.value).toBe('newPassword');
  });
});