import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RequirementsCard from '../../Components/studyRequirementsCard'

// Mock the router module
jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        query: {
            department: 'exampleDepartment',
            researcherId: 'exampleResearcherId',
            studyId: 'exampleStudyId',
        },
    }),
}));

describe('RequirementsCard component', () => {
    test('renders the component with initial state', () => {
        const { getByText, getByPlaceholderText } = render(<RequirementsCard />);

        expect(getByText('Want to take part?')).toBeInTheDocument();
    });

   

    test('applies and updates formSubmitted state', async () => {
        const { getByText, getByPlaceholderText, getByRole } = render(<RequirementsCard />);

        fireEvent.click(getByRole('button', { name: 'Apply' }));

        // Assuming your updateDocument function is asynchronous, wait for it to complete
        await waitFor(() => {
            expect(getByText('Thank you for your interest!')).toBeInTheDocument();
        });
    });
});