import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ResearchHome from '../pages/researchHome';
import { AuthContext, AuthProvider } from '../Context/AuthContext';

// Mock useRouter
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

describe('ResearchHome component', () => {
  it('renders without crashing', () => {
    render(<ResearchHome />);
  });
  it('renders with context',()=>{
    render( <AuthProvider>
      <ResearchHome />
    </AuthProvider>)
  })

  it('calls a card on click properly', () => {
    const pushMock = jest.fn();
    const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
    useRouterMock.mockReturnValue({ push: pushMock });
    const { getAllByText } = render(
        <ResearchHome/>
      );
      fireEvent.click(getAllByText('Lorem ipsum dolor sit amet')[0]); // Click on a study card
      expect(pushMock).toHaveBeenCalledWith("/advert-preview/id");
  });

  it('renders properly when isMobile is false', () => {
    const { getByText } = render(<ResearchHome />);
    fireEvent.click(getByText('Want to publish something new'));
  });

  it('renders properly when isMobile is true', () => {
    // Mock useMediaQuery to return true (indicating mobile view)
    require('@mui/material').useMediaQuery.mockReturnValue(true);

    const { getByText } = render(<ResearchHome />);
    fireEvent.click(getByText('Want to publish something new'));
  });
 
    it('renders without crashing', () => {
      // Mock useAuth to return the expected values
      jest.mock('../Context/AuthContext', () => ({
        useAuth: () => ({
          isLoggedIn: true,
          username: "fake",
          overallRating: -1,
          department: "fake",
          accountType: "fake",
          id: "fake",
          setAuth: jest.fn((isLoggedIn, username, overallRating, department, accountType, id) => {})
        })
      }));

    // Mock useAuth to return values matching destructuring in ResearchHome
    
    // Wrap your component with the mocked useAuth context provider
    render(
        <AuthContext.Provider value={{ // Add value prop here
          isLoggedIn: true,
          username: "fake",
          overallRating: -1,
          department: "fake",
          accountType: "fake",
          id: "fake",
          setAuth: jest.fn((isLoggedIn, username, overallRating, department, accountType, id) => {})
        }}>
            <ResearchHome />
        </AuthContext.Provider>)
    });

  });
