import React from 'react';
import { render, fireEvent, queryByLabelText, screen, waitFor, within  } from '@testing-library/react';
import RegisterResearcher from './RegisterResearcher';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'; 
import { Faculty } from '../State/UserExtraInfo';
import { ResearcherData } from '../pages/register';

const mockSetDepartment = jest.fn();


describe('RegisterResearcher Component', () => {
    it('opens the faculty dropdown', async () => {
        const { getByLabelText, getByRole } = render(<RegisterResearcher handleLoginRedirect={() => { } } handleReset={() => { } } onSubmit={() => { }} />);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
        // Simulate opening the dropdown
        fireEvent.mouseDown(getByLabelText('Faculty'));
    
        // Assert that the dropdown is open
        const dropdownList = document.querySelector('[role="listbox"]');
        expect(dropdownList).toBeInTheDocument();
      });
      it('updates faculty dropdown', async () => {
        const { getByLabelText, getByRole } = render(<RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => { }}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
        // Simulate opening the dropdown
        
        const selectEl = await screen.findByLabelText('Faculty');

        expect(selectEl).toBeInTheDocument();
      
        userEvent.click(selectEl);
      
        // Locate the corresponding popup (`listbox`) of options.
        const optionsPopupEl = await screen.findByRole("listbox", {
          name: 'Faculty'
        });
      
        // Click an option in the popup.
        userEvent.click(within(optionsPopupEl).getByText(/Architecture & Civil Engineering/i));
      
        // Confirm the outcome.
        expect(
          await screen.findByText(/Architecture & Civil Engineering/i)
        ).toBeInTheDocument();
        
      });
      it('updates department state on select change', async () => {
        const { getByLabelText, getByRole } = render(<RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => { }}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
        // Simulate opening the dropdown
        const selectEl = await screen.findByLabelText('Faculty') as HTMLElement;
        expect(selectEl).toBeInTheDocument();
        userEvent.click(selectEl);
      
        // Locate the corresponding popup (`listbox`) of options.
        const optionsPopupEl = await screen.findByRole("listbox", {
          name: 'Faculty'
        });
      
        // Click an option in the popup.
        userEvent.click(within(optionsPopupEl).getByText(/Architecture & Civil Engineering/i));
      
        await waitFor(() => expect(selectEl).toHaveTextContent('Architecture & Civil Engineering'));

        // Confirm the outcome by checking if the department state has been updated
        expect(selectEl).toHaveTextContent('Architecture & Civil Engineering');

    });
    
    
      
  it('renders without crashing', () => {
    render(<RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => { }}/>);
  });

  it('displays the username input field', () => {
    const { getByLabelText } = render(<RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => { }}/>);
    expect(getByLabelText('Username')).toBeInTheDocument();
  });
  it('displays the orginisation input field', () => {
    const { getByLabelText, getByRole } = render(
      <RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}}onSubmit={() => { }} />
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Orginisation')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    expect(getByLabelText('Orginisation')).toBeInTheDocument();
  });
  it('displays the phoneNumber input field', () => {
    const { getByLabelText, getByRole } = render(
      <RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => { }}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Phone Number')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    expect(getByLabelText('Phone Number')).toBeInTheDocument();
  });

  it('displays the password input field', () => {
    const { getByLabelText } = render(<RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}}onSubmit={() => { }} />);
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('displays the email input field after clicking next', () => {
    const { getByLabelText, getByRole } = render(
      <RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => { }}/>
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
      <RegisterResearcher handleLoginRedirect={() => {}} handleReset={handleResetMock} onSubmit={() => { }}/>
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
    const { getByLabelText, getByText } = render(<RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}}onSubmit={() => { }} />);
    const passwordInput = getByLabelText('Password');

    // Enter an incorrect password
    fireEvent.change(passwordInput, { target: { value: '123' } });

    // Check if the error message is displayed
    expect(getByText('Invalid Password')).toBeInTheDocument();
  });
  it('updates the password state when a key is pressed in the password field', () => {
    const { getByLabelText } = render(<RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}}onSubmit={() => { }} />);
    const passwordInput = getByLabelText('Password') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(passwordInput, { target: { value: 'newPassword' } });

    // Check if the password state is updated
    expect(passwordInput.value).toBe('newPassword');
  });
  it('updates the username state when a key is pressed in the username field', () => {
    const { getByLabelText } = render(<RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => { }}/>);
    const usernameInput = getByLabelText('Username') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(usernameInput, { target: { value: 'newUsername' } });

    // Check if the password state is updated
    expect(usernameInput.value).toBe('newUsername');
  });
  it('displays nothing when a correct password is entered', () => {
    const { getByLabelText, queryByText } = render(
      <RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}}onSubmit={() => { }} />
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
      <RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => { }}/>
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
      <RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => { }}/>
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
      <RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => { }}/>
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
      <RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => { }}/>
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
      <RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={() => { }}/>
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
  it('correctly updates the Sort Code in BankDetails', () => {
    // Render the component
    const { getByLabelText,getByRole } = render(
      <RegisterResearcher handleLoginRedirect={() => {}} handleReset={() => {}}onSubmit={() => { }}/>
    );
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
    // Get the TextField for Sort Code
    const sortCodeInput = getByLabelText('Sort Code') as HTMLInputElement;

    // Simulate a user input event to change the Sort Code
    fireEvent.change(sortCodeInput, { target: { value: '123456' } });

    // Assert that the BankDetails.SortCode has been updated
    
    expect(sortCodeInput.value).toBe('123456');
  });
});