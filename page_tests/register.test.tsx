import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RegisterForm from '../pages/register';
import '@testing-library/jest-dom';

// Mock next/router

jest.mock('next/router', () => ({
    useRouter: () => ({
      push: jest.fn(),
    }),
  }));
jest.mock('@mui/material', () => {
    const actual = jest.requireActual('@mui/material');
    return {
      ...actual,
      useMediaQuery: jest.fn(),
    };
  });
describe('RegisterForm component', () => {
  it('renders user type selection form correctly', () => {
    const { getByText, getByLabelText } = render(<RegisterForm />);
    
    // Ensure that user type selection form is rendered
    expect(getByText('Please select the type of user you would like to be')).toBeInTheDocument();
    
    // Ensure that radio buttons for user types are rendered
    expect(getByLabelText('Student')).toBeInTheDocument();
    expect(getByLabelText('Researcher')).toBeInTheDocument();
    expect(getByLabelText('Ethics Board')).toBeInTheDocument();
    expect(getByLabelText('None')).toBeInTheDocument();
  });

  it('updates user type state on selection', () => {
    const { getByLabelText, getByText } = render(<RegisterForm />);
    
    // Select user type "Researcher"
    fireEvent.click(getByLabelText('Ethics Board'));
    
    // Check if user type state is updated correctly
    expect(getByLabelText('Username')).toBeInTheDocument();
  });

  it('redirects to login page after form submission', () => {
    const pushMock = jest.fn();
    const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
    useRouterMock.mockReturnValue({ push: pushMock });
    const { getByLabelText, getByText,getByRole } = render(<RegisterForm />);
    
    // Select user type "Researcher"
    fireEvent.click(getByLabelText('Ethics Board'));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    fireEvent.click(getByRole('button', { name: 'NEXT' }));
    // Submit the form
    fireEvent.click(getByText('Submit'));
    // Check if the router's push function is called with the correct path
    expect(pushMock).toHaveBeenCalledWith("/login");
  });
 
  it('renders properly when isMobile is false', () => {
    const { getByText } = render(<RegisterForm/>);
    expect(getByText('Please select the type of user you would like to be')).toBeInTheDocument();
  });
  it('renders properly when isMobile is true', () => {
    // Mock useMediaQuery to return true (indicating mobile view)
    require('@mui/material').useMediaQuery.mockReturnValue(true);

    const { getByText } = render(<RegisterForm />);
    expect(getByText('Please select the type of user you would like to be')).toBeInTheDocument();
  });
});