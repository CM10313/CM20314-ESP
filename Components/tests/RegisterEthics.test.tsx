import React from 'react';
import { render, fireEvent, queryByLabelText, screen, waitFor  } from '@testing-library/react';
import RegisterEthics from './RegisterEthics';
import '@testing-library/jest-dom';
import { EthicsData } from '../pages/register';

jest.mock('@mui/material/useMediaQuery', () => {
  return jest.fn().mockImplementation(query => query === '(max-width:1000px)' ? true : true);//returns true used to trigger media query for branch test
});

describe('RegisterEthics Component', () => {
  it('renders without crashing', () => {
    render(<RegisterEthics handleLoginRedirect={() => { } } handleReset={() => { } } onSubmit={() => {}} />);
  });

  it('should render correctly on mobile view', () => {
    jest.mock('@mui/material/useMediaQuery', () => jest.fn().mockImplementation(query => query === '(max-width:1000px)' ? true : false));

    render(<RegisterEthics handleLoginRedirect={() => { } } handleReset={() => { } } onSubmit={() => {}} />);
  });
  it('displays the username input field', () => {
    const { getByLabelText } = render(<RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => {}}/>);
    expect(getByLabelText('Username')).toBeInTheDocument();
  });
  it('displays the orginisation input field', () => {
    const { getByLabelText, getByRole } = render(
      <RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => {}} />
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Orginisation')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    expect(getByLabelText('Orginisation')).toBeInTheDocument();
  });
  it('displays the phoneNumber input field', () => {
    const { getByLabelText, getByRole } = render(
      <RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {} }onSubmit={() => {}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Phone Number')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
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
  it('updates the username state when a key is pressed in the username field', () => {
    const { getByLabelText } = render(<RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}}  onSubmit={() => {}} />);
    const usernameInput = getByLabelText('Username') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(usernameInput, { target: { value: 'newUsername' } });

    // Check if the password state is updated
    expect(usernameInput.value).toBe('newUsername');
  });
  it('displays nothing when a correct password is entered', () => {
    const { getByLabelText, queryByText } = render(
      <RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}}  onSubmit={() => {}} />
    );
    const passwordInput = getByLabelText('Password');
  
    // Enter a valid password
    fireEvent.change(passwordInput, { target: { value: 'valdiPassword!1' } });
  
    // Check if the error message is not displayed
    expect(queryByText('Invalid Password')).toBeNull();
  });
  
  // Add more tests for other input fields and functionality
  it('displays email error when an incorrect email is entered', () => {
    const { getByLabelText, getByRole , getByText } = render(
      <RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}}  onSubmit={() => {}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Email')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const emailInput = getByLabelText('Email');

    // Enter an incorrect password
    fireEvent.change(emailInput, { target: { value: '@email.com' } });
    // Check if the error message is displayed
    expect(getByText('Invalid Email')).toBeInTheDocument();
  });
  it('displays no error when a correct email is entered', () => {
    const { getByLabelText, getByRole , queryByText } = render(
      <RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}}  onSubmit={() => {}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Email')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const emailInput = getByLabelText('Email');

    // Enter an incorrect password
    fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
    // Check if the error message is displayed
    expect(queryByText('Invalid Email')).toBeNull();
  });
  it('displays no error when a correct phone number is entered', () => {
    const { getByLabelText, getByRole , queryByText } = render(
      <RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}}  onSubmit={() => {}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Phone Number')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const phoneNumberInput = getByLabelText('Phone Number');

    // Enter an incorrect password
    fireEvent.change(phoneNumberInput, { target: { value: '0123456789' } });
    // Check if the error message is displayed
    expect(queryByText('Invalid Phone Number')).toBeNull();
  });
  
  it('updates the email state when a key is pressed in the email field', () => {
    const { getByLabelText, getByRole , getByText } = render(
      <RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}}  onSubmit={() => {}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Email')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const emailInput = getByLabelText('Email') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(emailInput, { target: { value: 'newEmail@newEmail' } });

    // Check if the password state is updated
    expect(emailInput.value).toBe('newEmail@newEmail');
  });
  it('updates the phone number state when a key is pressed in the phone number field', () => {
    const { getByLabelText, getByRole , getByText } = render(
      <RegisterEthics handleLoginRedirect={() => {}} handleReset={() => {}}  onSubmit={() => {}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Phone Number')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const phoneNumberInput = getByLabelText('Phone Number') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(phoneNumberInput, { target: { value: '021' } });

    // Check if the password state is updated
    expect(phoneNumberInput.value).toBe('021');
  });
});