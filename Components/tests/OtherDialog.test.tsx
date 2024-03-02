import React from 'react';
import { render, fireEvent, queryByLabelText, screen, waitFor, within  } from '@testing-library/react';
import RegisterStudent from '../RegisterStudent';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'; 
import OtherDialog from '../OtherDialog';
import { StudyData } from '../../pages/studyCreator';
jest.mock('next/router', () => ({
    ...jest.requireActual('next/router'),
    useRouter: jest.fn(),
  }));
// Mocking the useMediaQuery hook
jest.mock('@mui/material/useMediaQuery', () => {
    return jest.fn().mockImplementation(query => query === '(max-width:1000px)' ? true : true);//returns true used to trigger media query for branch test
  });
describe('Other Dialogue Component', () => {
    it('should render correctly on non-mobile view', () => {
        // Render the component
        render(<OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"} uid={"none"} />);
      
        // Assert that certain elements are rendered based on non-mobile view
        expect(screen.getByLabelText('Title')).toBeInTheDocument();
        expect(screen.getByText('Closing Date')).toBeInTheDocument();
        // Add more assertions as needed based on your component's structure
      });
    
      it('should render correctly on mobile view', () => {
        // Mocking the useMediaQuery hook to return true for mobile view
        jest.mock('@mui/material/useMediaQuery', () => jest.fn().mockImplementation(query => query === '(max-width:1000px)' ? true : false));
    
        // Render the component
        render(<OtherDialog onSubmit={() => {}} handleHomeRedirect={() => {}} jestBypass={false} department={"none"}  uid={"none"} />);
      
        // Assert that certain elements are rendered based on mobile view
        // Add assertions specific to mobile view rendering
      });
      it('updates the closing date state when a key is pressed in the closing datefield', () => {
        const { getByLabelText, getByRole , getByTestId,getByText } = render(
            <OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}  uid={"none"}/>
        );
        // Click the next button
        const closingDateInput = screen.getByTestId('closingDateInput').querySelector('input') as HTMLInputElement; // Cast to HTMLInputElement
        expect(closingDateInput ).toBeInTheDocument()

        fireEvent.change(closingDateInput , {target: { value: '2024-03-12'}});
        expect(closingDateInput.value).toBe('2024-03-12');
      });
      it('displays closing date error when an incorrect closing date is entered', () => {
        const { getByLabelText, getByRole , getByTestId,getAllByText } = render(
            <OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}  uid={"none"}/>
        );
        // Click the next button
        const closingDateInput = screen.getByTestId('closingDateInput').querySelector('input') as HTMLInputElement; // Cast to HTMLInputElement
        expect(closingDateInput ).toBeInTheDocument()

        fireEvent.change(closingDateInput , {target: { value: '2023-03-12'}});
        expect(getAllByText('A date must not be in the past')[1]).toBeInTheDocument();
      });
      it('updates the prelimnary date state when a key is pressed in the closing datefield', () => {
        const { getByLabelText, getByRole , getByTestId,getByText } = render(
            <OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}  uid={"none"}/>
        );
        // Click the next button
        const preliminaryDateInput =  screen.getByTestId('preliminaryDateInput').querySelector('input') as HTMLInputElement; // Cast to HTMLInputElement
        expect(preliminaryDateInput ).toBeInTheDocument()

        fireEvent.change(preliminaryDateInput , {target: { value: '2024-03-12'}});
        expect(preliminaryDateInput.value).toBe('2024-03-12');
      });
      it('displays preliminary date error when an incorrect closing date is entered', () => {
        const { getByLabelText, getByRole , getByTestId,getAllByText } = render(
            <OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}  uid={"none"}/>
        );
        // Click the next button
        const preliminaryDateInput = screen.getByTestId('preliminaryDateInput').querySelector('input') as HTMLInputElement; // Cast to HTMLInputElement
        expect(preliminaryDateInput ).toBeInTheDocument()

        fireEvent.change(preliminaryDateInput , {target: { value: '2023-03-12'}});
        expect(getAllByText('A date must not be in the past')[0]).toBeInTheDocument();
      });
      it('updates the title state when a key is pressed in the title field', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}  uid={"none"}/>
        );
        const titleInput = getByLabelText('Title') as HTMLInputElement; // Cast to HTMLInputElement
        // Simulate typing in the password field
        fireEvent.change(titleInput, { target: { value: 'Study title' } });
    
        // Check if the password state is updated
        expect(titleInput.value).toBe('Study title');
      });
      it('updates the location state when a key is pressed in the location field', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}  uid={"none"}/>
        );
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const locationInput = getByLabelText('Location') as HTMLInputElement; // Cast to HTMLInputElement
        // Simulate typing in the password field
        fireEvent.change(locationInput, { target: { value: 'Location' } });
    
        // Check if the password state is updated
        expect(locationInput.value).toBe('Location');
      });
      it('displays location error when an incorrect location is entered', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}  uid={"none"}/>
        );
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const locationInput = getByLabelText('Location') as HTMLInputElement; // Cast to HTMLInputElement
    
        // Simulate typing in the password field
        fireEvent.change(locationInput, { target: { value: '' } });
        expect(getByText('A Location Is Required')).toBeInTheDocument();
      });
      it('displays title error when an incorrect title is entered', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}  uid={"none"}/>
        );
        const titleInput = getByLabelText('Title') as HTMLInputElement; // Cast to HTMLInputElement
    
        // Simulate typing in the password field
        fireEvent.change(titleInput, { target: { value: '' } });
        expect(getByText('A Title Is Required')).toBeInTheDocument();
      });
      it('updates the  externalLink state when a key is pressed in the externalLink field', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}  uid={"none"}/>
        );
        expect(queryByLabelText(document.body, 'External Link')).toBeNull();
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const externalLinkInput = getByLabelText('External Link') as HTMLInputElement; // Cast to HTMLInputElement
        // Simulate typing in the password field
        fireEvent.change(externalLinkInput, { target: { value: 'https://test.com' } });
    
        // Check if the password state is updated
        expect(externalLinkInput.value).toBe('https://test.com');
      });
      it('displays externalLink error when an incorrect externalLink is entered', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}  uid={"none"}/>
        );
        expect(queryByLabelText(document.body, 'External Link')).toBeNull();
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const externalLinkInput = getByLabelText('External Link') as HTMLInputElement; // Cast to HTMLInputElement
    
        // Simulate typing in the password field
        fireEvent.change(externalLinkInput, { target: { value: '/empty' } });
        expect(getByText('URLs must be of general http/https or ftp form.')).toBeInTheDocument();
      });
      it('updates the description state when a key is pressed in the description field', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}  uid={"none"}/>
        );
        const descriptionInput = getByLabelText('Description') as HTMLInputElement; // Cast to HTMLInputElement
        // Simulate typing in the password field
        fireEvent.change(descriptionInput, { target: { value: 'Description' } });
    
        // Check if the password state is updated
        expect(descriptionInput.value).toBe('Description');
      });
      it('displays description error when an incorrect description is entered', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}  uid={"none"}/>
        );
        const descriptionInput = getByLabelText('Description') as HTMLInputElement; // Cast to HTMLInputElement
    
        // Simulate typing in the password field
        fireEvent.change(descriptionInput, { target: { value: '' } });
        expect(getByText('A Description Is Required')).toBeInTheDocument();
      });
    it('updates the field name when a key is pressed in the field name field', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}  uid={"none"}/>
        );
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const fieldNameInput = getByLabelText('Field Name') as HTMLInputElement; // Cast to HTMLInputElement
        // Simulate typing in the password field
        fireEvent.change(fieldNameInput, { target: { value: 'Field value' } });
    
        // Check if the password state is updated
        expect(fieldNameInput.value).toBe('Field value');
      });
      it('adds extra field when handleAddExtraField is called', () => {
        const { getByLabelText, getByText,getByRole } = render(<OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}   uid={"none"}/>);
        
        // Simulate entering a field name
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const fieldNameInput = getByLabelText('Field Name');
        fireEvent.change(fieldNameInput, { target: { value: 'New Field' } });
        
        // Click on the "Add Field" button
        const addButton = getByText('Add Field');
        fireEvent.click(addButton);
    
        // Assert that the field has been added
        expect(getByText('New Field')).toBeInTheDocument();
      });
    
      it('removes the last extra field when handleRemoveExtraField is called', () => {
        const { getByText, queryByText,getByRole } = render(<OtherDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}  uid={"none"}/>);
        
        // Simulate adding a field
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByText('Add Field'));
    
        // Click on the "Remove Field" button
        const removeButton = getByText('Remove Field');
        fireEvent.click(removeButton);
    
        // Assert that the field has been removed
        expect(queryByText('New Field')).not.toBeInTheDocument();
      });
      
    });