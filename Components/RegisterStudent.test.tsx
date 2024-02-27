import React from 'react';
import { render, fireEvent, queryByLabelText, screen, waitFor, within  } from '@testing-library/react';
import RegisterStudent from './RegisterStudent';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'; 
import { Faculty } from '../State/UserExtraInfo';
import { StudentData } from '../pages/register';

jest.mock('@mui/material/useMediaQuery', () => {
  return jest.fn().mockImplementation(query => query === '(max-width:1000px)' ? true : true);//returns true used to trigger media query for branch test
});

describe('RegisterStudent Component', () => {
  it('should render correctly on mobile view', () => {
    jest.mock('@mui/material/useMediaQuery', () => jest.fn().mockImplementation(query => query === '(max-width:1000px)' ? true : false));

    render(<RegisterStudent handleLoginRedirect={() => { } } handleReset={() => { } } onSubmit={()=>{}} />);
  });
    it('updates extrainfoobj faculty  state on select change', async () => {
        const { getByLabelText, getByRole } = render(<RegisterStudent handleLoginRedirect={() => { } } handleReset={() => { } } onSubmit={()=>{}} />);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
        // Simulate opening the dropdown
        const selectEl = await screen.findAllByLabelText('Faculty');// fixes error of multipe elements with same label even though same structure as register researcher
        expect(selectEl[0] as HTMLElement).toBeInTheDocument();
      
        userEvent.click(selectEl[0] as HTMLElement);
      
        // Locate the corresponding popup (`listbox`) of options.
        const optionsPopupEl = await screen.findByRole("listbox", {
          name: 'Faculty'
        });
      
        // Click an option in the popup.
        userEvent.click(within(optionsPopupEl).getByText(/Architecture & Civil Engineering/i));
      
        await waitFor(() => expect(selectEl[0]).toHaveTextContent('Architecture & Civil Engineering'));

        // Confirm the outcome by checking if the department state has been updated
        expect(selectEl[0]).toHaveTextContent('Architecture & Civil Engineering');

    });
    it('updates extrainfoobj race state on select change', async () => {
        const { getByLabelText, getByRole } = render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
        // Simulate opening the dropdown
        const selectEl = await screen.findAllByLabelText('Race');// fixes error of multipe elements with same label even though same structure as register researcher
        expect(selectEl[0] as HTMLElement).toBeInTheDocument();
      
        userEvent.click(selectEl[0] as HTMLElement);
      
        // Locate the corresponding popup (`listbox`) of options.
        const optionsPopupEl = await screen.findByRole("listbox", {
          name: 'Race'
        });

        // Click an option in the popup.
        userEvent.click(within(optionsPopupEl).getByText(/Asian/i));
      
        await waitFor(() => expect(selectEl[0]).toHaveTextContent('Asian'));

        // Confirm the outcome by checking if the department state has been updated
        expect(selectEl[0]).toHaveTextContent('Asian');

    });
    it('updates extrainfoobj Sexuality state on select change', async () => {
        const { getByLabelText, getByRole } = render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
        // Simulate opening the dropdown
        const selectEl = await screen.findAllByLabelText('Sexuality');// fixes error of multipe elements with same label even though same structure as register researcher
        expect(selectEl[0] as HTMLElement).toBeInTheDocument();
      
        userEvent.click(selectEl[0] as HTMLElement);
      
        // Locate the corresponding popup (`listbox`) of options.
        const optionsPopupEl = await screen.findByRole("listbox", {
          name: 'Sexuality'
        });
      
        // Click an option in the popup.
        userEvent.click(within(optionsPopupEl).getByText(/Asexual/i));
      
        await waitFor(() => expect(selectEl[0]).toHaveTextContent('Asexual'));

        // Confirm the outcome by checking if the department state has been updated
        expect(selectEl[0]).toHaveTextContent('Asexual');

    });
    it('updates extrainfoobj Gender state on select change', async () => {
        const { getByLabelText, getByRole } = render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
        // Simulate opening the dropdown
        const selectEl = await screen.findAllByLabelText('Gender');// fixes error of multipe elements with same label even though same structure as register researcher
        expect(selectEl[0] as HTMLElement).toBeInTheDocument();
      
        userEvent.click(selectEl[0] as HTMLElement);
      
        // Locate the corresponding popup (`listbox`) of options.
        const optionsPopupEl = await screen.findByRole("listbox", {
          name: 'Gender'
        });
      
        // Click an option in the popup.
        userEvent.click(within(optionsPopupEl).getByText(/Female/i));
      
        await waitFor(() => expect(selectEl[0]).toHaveTextContent('Female'));

        // Confirm the outcome by checking if the department state has been updated
        expect(selectEl[0]).toHaveTextContent('Female');

    });
    it('updates extrainfoobj Religion state on select change', async () => {
        const { getByLabelText, getByRole } = render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
        // Simulate opening the dropdown
        const selectEl = await screen.findAllByLabelText('Religion');// fixes error of multipe elements with same label even though same structure as register researcher
        expect(selectEl[0] as HTMLElement).toBeInTheDocument();
      
        userEvent.click(selectEl[0] as HTMLElement);
      
        // Locate the corresponding popup (`listbox`) of options.
        const optionsPopupEl = await screen.findByRole("listbox", {
          name: 'Religion'
        });
      
        // Click an option in the popup.
        userEvent.click(within(optionsPopupEl).getByText(/Buddhist/i));
      
        await waitFor(() => expect(selectEl[0]).toHaveTextContent('Buddhist'));

        // Confirm the outcome by checking if the department state has been updated
        expect(selectEl[0]).toHaveTextContent('Buddhist');

    });
    it('updates extrainfoobj highest level of education state on select change', async () => {
        const { getByLabelText, getByRole } = render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}}onSubmit={()=>{}} />);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
        // Simulate opening the dropdown
        const selectEl = await screen.findAllByLabelText('Highest Level Of Education');// fixes error of multipe elements with same label even though same structure as register researcher
        expect(selectEl[0] as HTMLElement).toBeInTheDocument();
      
        userEvent.click(selectEl[0] as HTMLElement);
      
        // Locate the corresponding popup (`listbox`) of options.
        const optionsPopupEl = await screen.findByRole("listbox", {
          name: 'Highest Level Of Education'
        });
      
        // Click an option in the popup.
        userEvent.click(within(optionsPopupEl).getByText(/Bachelors/i));
      
        await waitFor(() => expect(selectEl[0]).toHaveTextContent('Bachelors'));

        // Confirm the outcome by checking if the department state has been updated
        expect(selectEl[0]).toHaveTextContent('Bachelors');

    });
    it('updates extrainfoobj privacy state on select change', async () => {
        const { getByLabelText, getByRole } = render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}}onSubmit={()=>{}} />);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
        // Simulate opening the dropdown
        const selectEl = await screen.findAllByLabelText('Level Of Anonymity');// fixes error of multipe elements with same label even though same structure as register researcher
        expect(selectEl[0] as HTMLElement).toBeInTheDocument();
      
        userEvent.click(selectEl[0] as HTMLElement);
      
        // Locate the corresponding popup (`listbox`) of options.
        const optionsPopupEl = await screen.findByRole("listbox", {
          name: 'Level Of Anonymity'
        });
      
        // Click an option in the popup.
        userEvent.click(within(optionsPopupEl).getByText(/Full/i));
      
        await waitFor(() => expect(selectEl[0]).toHaveTextContent('Full'));

        // Confirm the outcome by checking if the department state has been updated
        expect(selectEl[0]).toHaveTextContent('Full');
    });
    it('opens the faculty dropdown', async () => {
        const { getAllByLabelText, getByRole } = render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}}onSubmit={()=>{}} />);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
        // Simulate opening the dropdown
        fireEvent.mouseDown(getAllByLabelText('Faculty')[0]);
    
        // Assert that the dropdown is open
        const dropdownList = document.querySelector('[role="listbox"]');
        expect(dropdownList).toBeInTheDocument();
      });
      it('updates faculty dropdown', async () => {
        const { getByLabelText, getByRole } = render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        // Simulate opening the dropdown
        
        const selectEl = await screen.findAllByLabelText('Faculty');// fixes error of multipe elements with same label even though same structure as register researcher
        expect(selectEl[0] as HTMLElement).toBeInTheDocument();
      
        userEvent.click(selectEl[0] as HTMLElement);
      
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
        const { getByLabelText, getByRole } = render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
        // Simulate opening the dropdown
        const selectEl = await screen.findAllByLabelText('Faculty');// fixes error of multipe elements with same label even though same structure as register researcher
        expect(selectEl[0] as HTMLElement).toBeInTheDocument();
      
        userEvent.click(selectEl[0] as HTMLElement);
      
        // Locate the corresponding popup (`listbox`) of options.
        const optionsPopupEl = await screen.findByRole("listbox", {
          name: 'Faculty'
        });
      
        // Click an option in the popup.
        userEvent.click(within(optionsPopupEl).getByText(/Architecture & Civil Engineering/i));
      
        await waitFor(() => expect(selectEl[0]).toHaveTextContent('Architecture & Civil Engineering'));

        // Confirm the outcome by checking if the department state has been updated
        expect(selectEl[0]).toHaveTextContent('Architecture & Civil Engineering'); 
    });
    
    
      
  it('renders without crashing', () => {
    render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>);
  });

  it('displays the username input field', () => {
    const { getByLabelText } = render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>);
    expect(getByLabelText('Username')).toBeInTheDocument();
  });
  it('displays the orginisation input field', () => {
    const { getByLabelText, getByRole } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}} />
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Orginisation')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    expect(getByLabelText('Orginisation')).toBeInTheDocument();
  });
  it('displays the phoneNumber input field', () => {
    const { getByLabelText, getByRole } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Phone Number')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    expect(getByLabelText('Phone Number')).toBeInTheDocument();
  });

  it('displays the password input field', () => {
    const { getByLabelText } = render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>);
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  it('displays the email input field after clicking next', () => {
    const { getByLabelText, getByRole } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}}onSubmit={()=>{}} />
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
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={handleResetMock}onSubmit={()=>{}} />
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
    const { getByLabelText, getByText } = render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}}onSubmit={()=>{}} />);
    const passwordInput = getByLabelText('Password');

    // Enter an incorrect password
    fireEvent.change(passwordInput, { target: { value: '123' } });

    // Check if the error message is displayed
    expect(getByText('Invalid Password')).toBeInTheDocument();
  });
  it('updates the password state when a key is pressed in the password field', () => {
    const { getByLabelText } = render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>);
    const passwordInput = getByLabelText('Password') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(passwordInput, { target: { value: 'newPassword' } });

    // Check if the password state is updated
    expect(passwordInput.value).toBe('newPassword');
  });
  it('updates the username state when a key is pressed in the username field', () => {
    const { getByLabelText } = render(<RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>);
    const usernameInput = getByLabelText('Username') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(usernameInput, { target: { value: 'newUsername' } });

    // Check if the password state is updated
    expect(usernameInput.value).toBe('newUsername');
  });
  it('displays nothing when a correct password is entered', () => {
    const { getByLabelText, queryByText } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
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
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Email')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const emailInput = getByLabelText('Email');

    // Enter an incorrect email
    fireEvent.change(emailInput, { target: { value: '@email.com' } });
    // Check if the error message is displayed
    expect(getByText('Invalid Email')).toBeInTheDocument();
  });
  it('displays no error when a correct email is entered', () => {
    const { getByLabelText, getByRole , queryByText } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
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
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
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
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}} />
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
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}}onSubmit={()=>{}} />
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
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}}onSubmit={()=>{}} />
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


  it('updates the accesibility requirements state when a key is pressed in the accesibility requirements field', () => {
    const { getByLabelText, getByRole , getByText } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Accessibility Requirements')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    
    const accessibilityInput = getByLabelText('Accessibility Requirements') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(accessibilityInput, { target: { value: 'Text' } });

    // Check if the password state is updated
    expect(accessibilityInput.value).toBe('Text');
  });
  it('updates the income state when a key is pressed in the phone number field', () => {
    const { getByLabelText, getByRole , getByText } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Income')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const incomeInput = getByLabelText('Income') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(incomeInput, { target: { value: '£1000' } });

    // Check if the password state is updated
    expect(incomeInput.value).toBe('£1000');
  });
  it('updates the Age state when a key is pressed in the age number field', () => {
    const { getByLabelText, getByRole , getByText } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Age')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const ageInput = getByLabelText('Age') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(ageInput, { target: { value: '99' } });

    // Check if the password state is updated
    expect(ageInput.value).toBe('99');
  });
  it('updates the Year of Studies state when a key is pressed in the phone number field', () => {
    const { getByLabelText, getByRole , getByText } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Current Year Of Studies')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const yosInput = getByLabelText('Current Year Of Studies') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(yosInput, { target: { value: '99' } });

    // Check if the password state is updated
    expect(yosInput.value).toBe('99');
  });
  it('updates the Occupation state when a key is pressed in the phone number field', () => {
    const { getByLabelText, getByRole , getByText } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}}onSubmit={()=>{}} />
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Occuptation')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const occupationInput = getByLabelText('Occupation') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(occupationInput, { target: { value: 'Software Engineer' } });

    // Check if the password state is updated
    expect(occupationInput.value).toBe('Software Engineer');
  });
  it('updates the Health Conditions state when a key is pressed in the phone number field', () => {
    const { getByLabelText, getByRole , getByText } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Pre-Exisitng Conditions')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const conditionsInput = getByLabelText('Pre-Exisitng Conditions') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(conditionsInput, { target: { value: 'Conditions' } });

    // Check if the password state is updated
    expect(conditionsInput.value).toBe('Conditions');
  });
  it('updates the Allergies state when a key is pressed in the phone number field', () => {
    const { getByLabelText, getByRole , getByText } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Allergies')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const allergyInput = getByLabelText('Allergies') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(allergyInput, { target: { value: 'Allergy' } });

    // Check if the password state is updated
    expect(allergyInput.value).toBe('Allergy');
  });
  it('updates the Medication state when a key is pressed in the phone number field', () => {
    const { getByLabelText, getByRole , getByText } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Medication')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const medicalInput = getByLabelText('Medication') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(medicalInput, { target: { value: 'Medicine' } });

    // Check if the password state is updated
    expect(medicalInput.value).toBe('Medicine');
  });
  
  it('updates the Disabilities state when a key is pressed in the phone number field', () => {
    const { getByLabelText, getByRole , getByText } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Disabilities')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const disabilitiesInput = getByLabelText('Disabilities') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(disabilitiesInput, { target: { value: 'Disability' } });

    // Check if the password state is updated
    expect(disabilitiesInput.value).toBe('Disability');
  });
  it('updates the native language  state when a key is pressed in the phone number field', () => {
    const { getByLabelText, getByRole , getByText } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Native Language')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    const natLangInput = getByLabelText('Native Language') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(natLangInput, { target: { value: 'English' } });

    // Check if the password state is updated
    expect(natLangInput.value).toBe('English');
  });
  it('updates the accessToDevice state when the checkbox is clicked', () => {
    const { getByLabelText, getByRole , getByText } = render(
        <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
      );
      fireEvent.click(getByRole('button', { name: 'NEXT' }));
      fireEvent.click(getByRole('button', { name: 'NEXT' }));
      fireEvent.click(getByRole('button', { name: 'NEXT' }));
      fireEvent.click(getByRole('button', { name: 'NEXT' }));
      fireEvent.click(getByRole('button', { name: 'NEXT' }));
    // Check that the checkbox is initially unchecked
    const checkbox = getByLabelText('I have a device with internet access') as HTMLInputElement; // Cast to HTMLInputElement
    expect(checkbox.checked).toBe(false);
  
    // Simulate clicking the checkbox
    fireEvent.click(checkbox);
  
    // Check if the accessToDevice state is updated
    expect(checkbox.checked).toBe(true);
  });
  it('displays the Accessibility Requirements input field', () => {
    const { getByLabelText, getByRole } = render(
      <RegisterStudent handleLoginRedirect={() => {}} handleReset={() => {}} onSubmit={()=>{}}/>
    );
  
    // Check that the email input field is not initially present
    expect(queryByLabelText(document.body, 'Accessibility Requirements')).toBeNull();
  
    // Click the next button
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    expect(getByLabelText('Accessibility Requirements')).toBeInTheDocument();
  });

});