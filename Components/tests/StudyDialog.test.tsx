import React from 'react';
import { render, fireEvent, queryByLabelText, screen, waitFor, within  } from '@testing-library/react';
import RegisterStudent from '../RegisterStudent';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'; 
import StudyDialog from '../StudyDialog';
import { StudyData } from '../../pages/studyCreator';
jest.mock('next/router', () => ({
    ...jest.requireActual('next/router'),
    useRouter: jest.fn(),
  }));
// Mocking the useMediaQuery hook
jest.mock('@mui/material/useMediaQuery', () => {
    return jest.fn().mockImplementation(query => query === '(max-width:1000px)' ? true : true);//returns true used to trigger media query for branch test
  });
describe('Study Dialogue Component', () => {
    it('should render correctly on non-mobile view', () => {
        // Render the component
        render(<StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"} />);
      
        // Assert that certain elements are rendered based on non-mobile view
        expect(screen.getByLabelText('Title')).toBeInTheDocument();
        expect(screen.getByText('Closing Date')).toBeInTheDocument();
        // Add more assertions as needed based on your component's structure
      });
    
      it('should render correctly on mobile view', () => {
        // Mocking the useMediaQuery hook to return true for mobile view
        jest.mock('@mui/material/useMediaQuery', () => jest.fn().mockImplementation(query => query === '(max-width:1000px)' ? true : false));
    
        // Render the component
        render(<StudyDialog onSubmit={() => {}} handleHomeRedirect={() => {}} jestBypass={false} department={"none"} />);
      
        // Assert that certain elements are rendered based on mobile view
        // Add assertions specific to mobile view rendering
      });
      it('updates the minimum age state when a key is pressed in the minimum age field', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
      
        // Check that the email input field is not initially present
        expect(queryByLabelText(document.body, 'Minimum Age')).toBeNull();
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        // Click the next button
        const ageInput = getByLabelText('Minimum Age') as HTMLInputElement; // Cast to HTMLInputElement
    
        // Simulate typing in the password field
        fireEvent.change(ageInput, { target: { value: '21' } });
    
        // Check if the password state is updated
        expect(ageInput.value).toBe('21');
      });
      it('displays minimum age error when an incorrect minimum age is entered', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
      
        // Check that the email input field is not initially present
        expect(queryByLabelText(document.body, 'Minimum Age')).toBeNull();
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        // Click the next button
        const minimumAgeInput = getByLabelText('Minimum Age') as HTMLInputElement; // Cast to HTMLInputElement
    
        // Simulate typing in the password field
        fireEvent.change(minimumAgeInput, { target: { value: '0' } });
        expect(getByText('Participants must be between 18 and 99')).toBeInTheDocument();
      });
      it('updates the closing date state when a key is pressed in the closing datefield', () => {
        const { getByLabelText, getByRole , getByTestId,getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        // Click the next button
        const closingDateInput = screen.getByTestId('closingDateInput').querySelector('input') as HTMLInputElement; // Cast to HTMLInputElement
        expect(closingDateInput ).toBeInTheDocument()

        fireEvent.change(closingDateInput , {target: { value: '2024-03-12'}});
        expect(closingDateInput.value).toBe('2024-03-12');
      });
      it('displays closing date error when an incorrect closing date is entered', () => {
        const { getByLabelText, getByRole , getByTestId,getAllByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        // Click the next button
        const closingDateInput = screen.getByTestId('closingDateInput').querySelector('input') as HTMLInputElement; // Cast to HTMLInputElement
        expect(closingDateInput ).toBeInTheDocument()

        fireEvent.change(closingDateInput , {target: { value: '2023-03-12'}});
        expect(getAllByText('A date must not be in the past')[1]).toBeInTheDocument();
      });
      it('updates the prelimnary date state when a key is pressed in the closing datefield', () => {
        const { getByLabelText, getByRole , getByTestId,getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        // Click the next button
        const preliminaryDateInput =  screen.getByTestId('preliminaryDateInput').querySelector('input') as HTMLInputElement; // Cast to HTMLInputElement
        expect(preliminaryDateInput ).toBeInTheDocument()

        fireEvent.change(preliminaryDateInput , {target: { value: '2024-03-12'}});
        expect(preliminaryDateInput.value).toBe('2024-03-12');
      });
      it('displays preliminary date error when an incorrect closing date is entered', () => {
        const { getByLabelText, getByRole , getByTestId,getAllByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        // Click the next button
        const preliminaryDateInput = screen.getByTestId('preliminaryDateInput').querySelector('input') as HTMLInputElement; // Cast to HTMLInputElement
        expect(preliminaryDateInput ).toBeInTheDocument()

        fireEvent.change(preliminaryDateInput , {target: { value: '2023-03-12'}});
        expect(getAllByText('A date must not be in the past')[0]).toBeInTheDocument();
      });
      it('updates the Max Number Of Participants state when a key is pressed in the Max Number Of Participants field', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        const maxParticipantsInput = getByLabelText('Max Number Of Participants') as HTMLInputElement; // Cast to HTMLInputElement
        // Simulate typing in the password field
        fireEvent.change(maxParticipantsInput, { target: { value: '10' } });
    
        // Check if the password state is updated
        expect(maxParticipantsInput.value).toBe('10');
      });
      it('displays Max Number Of Participants error when an incorrect Max Number Of Participants is entered', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
      
        // Check that the email input field is not initially present
        
        // Click the next button
        const maxParticipantsInput = getByLabelText('Max Number Of Participants') as HTMLInputElement; // Cast to HTMLInputElement
    
        // Simulate typing in the password field
        fireEvent.change(maxParticipantsInput, { target: { value: '-1' } });
        expect(getByText('A study must allow between 1 and 99 participants')).toBeInTheDocument();
      });
      it('updates the  externalLink state when a key is pressed in the externalLink field', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
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
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        expect(queryByLabelText(document.body, 'External Link')).toBeNull();
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const externalLinkInput = getByLabelText('External Link') as HTMLInputElement; // Cast to HTMLInputElement
    
        // Simulate typing in the password field
        fireEvent.change(externalLinkInput, { target: { value: '/empty' } });
        expect(getByText('URLs must be of general http/https or ftp form')).toBeInTheDocument();
      });
      it('updates the title state when a key is pressed in the title field', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        const titleInput = getByLabelText('Title') as HTMLInputElement; // Cast to HTMLInputElement
        // Simulate typing in the password field
        fireEvent.change(titleInput, { target: { value: 'Study title' } });
    
        // Check if the password state is updated
        expect(titleInput.value).toBe('Study title');
      });
      it('displays title error when an incorrect title is entered', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        const titleInput = getByLabelText('Title') as HTMLInputElement; // Cast to HTMLInputElement
    
        // Simulate typing in the password field
        fireEvent.change(titleInput, { target: { value: '' } });
        expect(getByText('A Title Is Required')).toBeInTheDocument();
      });
      it('updates the description state when a key is pressed in the description field', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        const descriptionInput = getByLabelText('Description') as HTMLInputElement; // Cast to HTMLInputElement
        // Simulate typing in the password field
        fireEvent.change(descriptionInput, { target: { value: 'Description' } });
    
        // Check if the password state is updated
        expect(descriptionInput.value).toBe('Description');
      });
      it('displays description error when an incorrect description is entered', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        const descriptionInput = getByLabelText('Description') as HTMLInputElement; // Cast to HTMLInputElement
    
        // Simulate typing in the password field
        fireEvent.change(descriptionInput, { target: { value: '' } });
        expect(getByText('A Description Is Required')).toBeInTheDocument();
      });
      it('updates the location state when a key is pressed in the location field', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        const locationInput = getByLabelText('Location') as HTMLInputElement; // Cast to HTMLInputElement
        // Simulate typing in the password field
        fireEvent.change(locationInput, { target: { value: 'Location' } });
    
        // Check if the password state is updated
        expect(locationInput.value).toBe('Location');
      });
      it('displays location error when an incorrect locaiton is entered', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        const locationInput = getByLabelText('Location') as HTMLInputElement; // Cast to HTMLInputElement
    
        // Simulate typing in the password field
        fireEvent.change(locationInput, { target: { value: '' } });
        expect(getByText('A Location Is Required')).toBeInTheDocument();
      });
    it('updates the field name when a key is pressed in the field name field', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const fieldNameInput = getByLabelText('Field Name') as HTMLInputElement; // Cast to HTMLInputElement
        // Simulate typing in the password field
        fireEvent.change(fieldNameInput, { target: { value: 'Field value' } });
    
        // Check if the password state is updated
        expect(fieldNameInput.value).toBe('Field value');
      });
      it('updates the compensation  when a key is pressed in the compensation field', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const compensationInput = getByLabelText('£ Compensation') as HTMLInputElement; // Cast to HTMLInputElement
        // Simulate typing in the password field
        fireEvent.change(compensationInput, { target: { value: '10.00' } });
    
        // Check if the password state is updated
        expect(compensationInput.value).toBe('10.00');
      });
      it('updates the compensation descripion when a key is pressed in the compensation description field', () => {
        const { getByLabelText, getByRole , getByText } = render(
            <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>
        );
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const compensationDescInput = getByLabelText('Compensation Description') as HTMLInputElement; // Cast to HTMLInputElement
        // Simulate typing in the password field
        fireEvent.change(compensationDescInput, { target: { value: 'Cash' } });
    
        // Check if the password state is updated
        expect(compensationDescInput.value).toBe('Cash');
      });
      it('updates grouped chekbox to clicked on first click', () => {
        const { getByLabelText,getByRole } = render( <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const genderCheckbox = getByLabelText('Gender') as HTMLElement;
            fireEvent.click(genderCheckbox);
            expect(genderCheckbox).toHaveProperty('checked', true)
      });
      it('should check grouped checkbox unsets on remove ', () => {
        const { getByLabelText,getByRole } = render( <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const genderCheckbox = getByLabelText('Gender') as HTMLElement;
            fireEvent.click(genderCheckbox);
            fireEvent.click(genderCheckbox);
            expect(genderCheckbox).toHaveProperty('checked', false)
      });
      it('adds extra field when handleAddExtraField is called', () => {
        const { getByLabelText, getByText,getByRole } = render(<StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>);
        
        // Simulate entering a field name
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
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
        const { getByText, queryByText,getByRole } = render(<StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>);
        
        // Simulate adding a field
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByText('Add Field'));
    
        // Click on the "Remove Field" button
        const removeButton = getByText('Remove Field');
        fireEvent.click(removeButton);
    
        // Assert that the field has been removed
        expect(queryByText('New Field')).not.toBeInTheDocument();
      });
      it('updates chekbox to clicked on first click', () => {
        const { getByLabelText,getByRole } = render( <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const genderCheckbox = getByLabelText('Gender') as HTMLElement;
            fireEvent.click(genderCheckbox);
            expect(genderCheckbox).toHaveProperty('checked', true)
      });
      it('should checks checkbox unsets on remove ', () => {
        const { getByLabelText,getByRole } = render( <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const genderCheckbox = getByLabelText('Gender') as HTMLElement;
            fireEvent.click(genderCheckbox);
            fireEvent.click(genderCheckbox);
            expect(genderCheckbox).toHaveProperty('checked', false)
      });
      it('updates race checkbox to clicked on first click', () => {
        const { getByLabelText,getByRole } = render( <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const genderCheckbox = getByLabelText('Race') as HTMLElement;
            fireEvent.click(genderCheckbox);
            expect(genderCheckbox).toHaveProperty('checked', true)
      });
      it('updates religion checkbox to clicked on first click', () => {
        const { getByLabelText,getByRole } = render( <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const genderCheckbox = getByLabelText('Religion') as HTMLElement;
            fireEvent.click(genderCheckbox);
            expect(genderCheckbox).toHaveProperty('checked', true)
      });
      it('updates age checkbox to clicked on first click', () => {
        const { getByLabelText,getByRole } = render( <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const genderCheckbox = getByLabelText('Age') as HTMLElement;
            fireEvent.click(genderCheckbox);
            expect(genderCheckbox).toHaveProperty('checked', true)
      });
      it('updates sexuality checkbox to clicked on first click', () => {
        const { getByLabelText,getByRole } = render( <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const genderCheckbox = getByLabelText('Sexuality') as HTMLElement;
            fireEvent.click(genderCheckbox);
            expect(genderCheckbox).toHaveProperty('checked', true)
      });
      it('updates Income checkbox to clicked on first click', () => {
        const { getByLabelText,getByRole } = render( <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const genderCheckbox = getByLabelText('Income') as HTMLElement;
            fireEvent.click(genderCheckbox);
            expect(genderCheckbox).toHaveProperty('checked', true)
      });
      it('updates all grouped checkbox to selected', () => {
        const { getByLabelText,getByRole } = render( <StudyDialog onSubmit={() => { } } handleHomeRedirect={() => { } } jestBypass={false} department={"none"}/>);
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        fireEvent.click(getByRole('button', { name: 'NEXT' }));
        const facultyCheckbox = getByLabelText('Faculty') as HTMLElement;
            fireEvent.click(facultyCheckbox);
            expect(facultyCheckbox).toHaveProperty('checked', true)
        const  raceCheckbox = getByLabelText('Race') as HTMLElement;
            fireEvent.click(raceCheckbox);
            expect(raceCheckbox).toHaveProperty('checked', true)
        const  religionCheckbox= getByLabelText('Religion') as HTMLElement;
            fireEvent.click(religionCheckbox);
            expect(religionCheckbox).toHaveProperty('checked', true)
        const  incomeCheckbox= getByLabelText('Income') as HTMLElement;
            fireEvent.click(incomeCheckbox);
            expect(incomeCheckbox).toHaveProperty('checked', true)
        const  ageCheckbox= getByLabelText('Age') as HTMLElement;
            fireEvent.click(ageCheckbox);
            expect(ageCheckbox).toHaveProperty('checked', true)
        const  sexualityCheckbox= getByLabelText('Sexuality') as HTMLElement;
            fireEvent.click(sexualityCheckbox);
            expect(sexualityCheckbox).toHaveProperty('checked', true)
        const yofCheckbox = getByLabelText('Year Of Studies') as HTMLElement;
            fireEvent.click(yofCheckbox);
            expect(yofCheckbox).toHaveProperty('checked', true)
        const occupationCheckbox = getByLabelText('Occupation') as HTMLElement;
            fireEvent.click(occupationCheckbox);
            expect(occupationCheckbox).toHaveProperty('checked', true)
        const  hlofCheckbox= getByLabelText('Highest Level Of Education') as HTMLElement;
            fireEvent.click(hlofCheckbox);
            expect(hlofCheckbox).toHaveProperty('checked', true)
        const pecCheckbox = getByLabelText('Pre-Existing Conditions') as HTMLElement;
            fireEvent.click(pecCheckbox);
            expect(pecCheckbox).toHaveProperty('checked', true)
        const  allergiesCheckbox= getByLabelText('Allergies') as HTMLElement;
            fireEvent.click(allergiesCheckbox);
            expect(allergiesCheckbox).toHaveProperty('checked', true)
        const medicationCheckbox= getByLabelText('Medication') as HTMLElement;
            fireEvent.click(medicationCheckbox);
            expect(medicationCheckbox).toHaveProperty('checked', true)
        const disabCheckbox = getByLabelText('Disabilities') as HTMLElement;
            fireEvent.click(disabCheckbox);
            expect(disabCheckbox).toHaveProperty('checked', true)
        const  atdCheckbox= getByLabelText('Access To Device') as HTMLElement;
            fireEvent.click(atdCheckbox);
            expect(atdCheckbox).toHaveProperty('checked', true)
        const  nlCheckbox= getByLabelText('Native Language') as HTMLElement;
            fireEvent.click(nlCheckbox);
            expect(nlCheckbox).toHaveProperty('checked', true)
        const  olCheckbox = getByLabelText('Other Languages') as HTMLElement;
            fireEvent.click(olCheckbox);
            expect(olCheckbox).toHaveProperty('checked', true)
        const   ncCheckbox= getByLabelText('Nearest City') as HTMLElement;
            fireEvent.click(ncCheckbox);
            expect(ncCheckbox).toHaveProperty('checked', true)
        const   mttCheckbox= getByLabelText('Max Travel Time') as HTMLElement;
            fireEvent.click(mttCheckbox);
            expect(mttCheckbox).toHaveProperty('checked', true)
        const   alCheckbox= getByLabelText('Anonymity Level') as HTMLElement;
            fireEvent.click(alCheckbox);
            expect(alCheckbox).toHaveProperty('checked', true)
        const  arCheckbox = getByLabelText('Accesibility Requirements') as HTMLElement;
            fireEvent.click(arCheckbox);
            expect(arCheckbox).toHaveProperty('checked', true)
      });
    });