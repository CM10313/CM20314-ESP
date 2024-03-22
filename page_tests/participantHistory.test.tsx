import React from 'react';
import { render, fireEvent, waitFor, getByText } from '@testing-library/react';
import ResearchHome from '../pages/researchHome';
import { AuthContext, AuthProvider } from '../Context/AuthContext';
import ParticipantHome from '../pages/participantHome';
import '@testing-library/jest-dom';
import ViewParticipantDetails from '../pages/viewParticipantDetails';
import '@testing-library/jest-dom';
import { HealthDisplayProps } from '../Components/HealthDisplay';
import { DemoGraphicDisplayProps } from '../Components/DempographicDisplay';
import { OtherRequirementDisplayProps } from '../Components/OtherRequirementDisplay';
import ParticipantHistory, { JoinedProps } from '../pages/participantHistory';
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
  
  // Mock the fetchDocumentById function
  jest.mock('../firebase/firestore', () => ({
    fetchDocumentById: jest.fn(),
  }));
  
  // Mock the getAllStudies function
  jest.mock('../Utils/RetrieveStudyData', () => ({
    getAllStudies: jest.fn(),
  }));

  // Mock the useState hook
  jest.mock('react', () => {
    const originalModule = jest.requireActual('react');
    return {
      ...originalModule,
      useState: jest.fn(initialValue => [initialValue, jest.fn()]), // Mock the useState hook
    };
  });
  jest.mock('../firebase/firestore', () => ({
    fetchDocumentById: jest.fn(),
  }));
  

describe('ViewParticipantDetails', () => {
  
      it('renders properly when isMobile is true', () => {
        // Mock useMediaQuery to return true (indicating mobile view)
        require('@mui/material').useMediaQuery.mockReturnValue(true);
    
        const { getByText } = render(<ParticipantHistory />);
     
      });
      it('renders properly when isMobile is false', () => {
        // Mock useMediaQuery to return true (indicating mobile view)
        require('@mui/material').useMediaQuery.mockReturnValue(false);
    
        const { getByText } = render(<ParticipantHistory />);
     
      });
 
  it('fetches user data and study requirements', async () => {
    // Mock the response data
    const joinedStudiesData: JoinedProps[] = [
        {
          publisher: "name",
          location: "location",
          date: "date",
          title: "title",
          id: "id",
          publisherId: "pubId",
          isPaid: false,
          department: "department",
          isRated: false,
        },
        {
          publisher: "name2",
          location: "location2",
          date: "date2",
          title: "title2",
          id: "id2",
          publisherId: "pubId2",
          isPaid: true,
          department: "department2",
          isRated: true,
        }
      ];
      
    const disputedStudiesData:JoinedProps[] = [
        {
            publisher:"name3",
            location:"location3",
            date:"date3",
            title:"title3",
            id:"id3",
            publisherId:"pubId3",
            isPaid:false,
            department:"department3",
            isRated:false,
         },
        ];
      
      const userInfo = {
        disputedStudies:[{id:"id3",department:"department",publisherId:"pubId3"}],
        joinedStudies:[{id:"id1",department:"department",publisherId:"pubId1"},{id:"id2",department:"department",publisherId:"pubId2"}],
       
      };
    // Mock the fetchDocumentById function to resolve with userInfo
    require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(userInfo);

    // Mock the fetchDocumentById function to resolve with rejected studies data
    require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(joinedStudiesData);
    require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(disputedStudiesData);
    // Mock the useState hook to provide mock state and set functions
    (React.useState as jest.Mock).mockImplementationOnce(() => [[], jest.fn()]); // Mocking setRejectedStudies here

    // Render the component
    const {getByText}=render(<ParticipantHistory />);

    // Assert that fetchDocumentById is called with correct arguments
    expect(require('../firebase/firestore').fetchDocumentById).toHaveBeenCalledWith('users', expect.anything());
  });

  it('renders without crashing with context', () => {
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
          <ParticipantHistory/>
      </AuthContext.Provider>)
  });
  it('renders without crashing when state is present', () => {
    const joinedStudies:JoinedProps[]=[
        {
          title: 'Joined Study 1',
          id: '1',
          publisher: 'Publisher A',
          date: '2024-03-15',
          location: 'Location A',
          publisherId: 'publisherAId',
          isPaid: true,
          isRated: false,
          department: 'Department A',
        },
        {
          title: 'Joined Study 2',
          id: '2',
          publisher: 'Publisher B',
          date: '2024-03-20',
          location: 'Location B',
          publisherId: 'publisherBId',
          isPaid: false,
          isRated: true,
          department: 'Department B',
        }]
      const disputedStudies:JoinedProps[]=[
        {
          title: 'Disputed Study 1',
          id: '3',
          publisher: 'Publisher C',
          date: '2024-03-25',
          location: 'Location C',
          publisherId: 'publisherCId',
          isPaid: false,
          isRated: false,
          department: 'Department C',
        }]
  const {getByText}=render(
    
          <ParticipantHistory testBypass1={joinedStudies} testBypass2={disputedStudies}/>
      )
      expect(getByText('Guest')).toBeInTheDocument();
     
  });
  
});