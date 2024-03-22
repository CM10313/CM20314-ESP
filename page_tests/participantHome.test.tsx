import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ResearchHome from '../pages/researchHome';
import { AuthContext, AuthProvider } from '../Context/AuthContext';
import ParticipantHome from '../pages/participantHome';
import '@testing-library/jest-dom';
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
 
describe('ResearchHome component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mock calls before each test
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
            <ParticipantHome />
        </AuthContext.Provider>)
    });
    it('fetches rejected studies', async () => {
        // Mock the response data
        const userInfo = {
          rejectedStudies: [{ id: 1, title: 'Rejected Study 1', publisherId: 1, department: 'Computer Science' }],
          joinedStudies: [{ id: 2, title: 'Joined Study 1', publisherId: 2, department: 'Computer Science' }],
        };
        const rejectedStudiesData = [
          { id: 1, title: 'Rejected Study 1', publisherName: 'Publisher 1', preliminaryDate: '2024-03-01' },
        ];
        const upcomingStudiesData = [
            { id: 2, title: 'Joined Study 1', publisherName: 'Publisher 2', preliminaryDate: '2024-03-01' },
          ];
    
        // Mock the fetchDocumentById function to resolve with userInfo
        require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(userInfo);
    
        // Mock the fetchDocumentById function to resolve with rejected studies data
        require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(rejectedStudiesData);
        require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(upcomingStudiesData);
    
        // Mock the useState hook to provide mock state and set functions
        (React.useState as jest.Mock).mockImplementationOnce(() => [[], jest.fn()]); // Mocking setRejectedStudies here
    
        // Render the component
        render(<ParticipantHome />);
    
        // Assert that fetchDocumentById is called with correct arguments
        expect(require('../firebase/firestore').fetchDocumentById).toHaveBeenCalledWith('users', expect.anything());
    
        // Assert that fetchDocumentById is called with correct arguments to fetch rejected studies
        expect(require('../firebase/firestore').fetchDocumentById).toHaveBeenCalledWith(
          "users",
          ""
        );
    
        // Assert that setRejectedStudies is called with the correct data
        await expect(require('../firebase/firestore').fetchDocumentById).toHaveBeenCalledTimes(1);
      });
      it('fetches rejected studies with error', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        // Mock the response data
        const userInfo = {
          rejectedStudies: [{ id: 1, title: 'Rejected Study 1', publisherId: 1, department: 'Computer Science' }],
          joinedStudies: [{ id: 2, title: 'Joined Study 1', publisherId: 2, department: 'Computer Science' }],
        };
        const rejectedStudiesData = [
          { id: 1, title: 'Rejected Study 1', publisherName: 'Publisher 1', preliminaryDate: '2024-03-01' },
        ];
        const upcomingStudiesData = [
            { id: 2, title: 'Joined Study 1', publisherName: 'Publisher 2', preliminaryDate: '2024-03-01' },
          ];
    
        // Mock the fetchDocumentById function to resolve with userInfo
        require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(userInfo);
    
        // Mock the fetchDocumentById function to resolve with rejected studies data
        require('../firebase/firestore').fetchDocumentById.mockRejectedValueOnce(new Error('Test error'));
        render(
              <ParticipantHome />
          );
      
          // Wait for the component to finish rendering
          await waitFor(() => {});
      
          // Assert that the console.error was called with the expected error message
          expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching study list:', new Error('Test error'));
      });
      it('fetches study list', async () => {
        // Mock the response data
        const studyDict = {
          'Computer Science': [
            [{ title: 'Live Study 1', publisherName: 'Publisher 1', department: 'Computer Science' }],
          ],
        };
    
        // Mock the getAllStudies function to resolve with studyDict
        require('../Utils/RetrieveStudyData').getAllStudies.mockResolvedValueOnce(studyDict);
    
        // Mock the useState hook to provide mock state and set functions
        (React.useState as jest.Mock).mockImplementationOnce(() => [[], jest.fn()]); // Mocking setUpcomingStudies here
    
        // Render the component
        render(<ParticipantHome />);
    
        // Assert that getAllStudies is called
        expect(require('../Utils/RetrieveStudyData').getAllStudies).toHaveBeenCalled();
    
        // Assert that setUpcomingStudies is called with the correct data
        await expect(require('../firebase/firestore').fetchDocumentById).toHaveBeenCalledTimes(1);
      });
      

      it('renders without crashing', async () => {
        // Mock data for asynchronous functions
        const mockUserInfo = {
          id: 'fakeUserId',
          rejectedStudies: [{ id: 1, title: 'Rejected Study 1' }],
          joinedStudies: [{ id: 2, title: 'Joined Study 1' }],
        };
    
        const mockRejectedStudiesData = [{ title: 'Rejected Study 1' }];
        const mockUpcomingStudiesData = [{ title: 'Upcoming Study 1' }];
    
        // Mock asynchronous functions
        require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(mockUserInfo);
        require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(mockRejectedStudiesData);
        require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(mockUpcomingStudiesData);
        require('../Utils/RetrieveStudyData').getAllStudies.mockResolvedValueOnce({});
    
        // Render the component
        render(<ParticipantHome />);
    
        // Assert that the component renders without crashing
        // Add more assertions as needed
      });
    
      it('fetches and renders live studies', async () => {
        // Mock data for live studies
        const mockLiveStudiesData = [
          { title: 'Live Study 1', publisherName: 'Publisher 1' },
          { title: 'Live Study 2', publisherName: 'Publisher 2' },
        ];
    
        // Mock getAllStudies function to return live studies data
        require('../Utils/RetrieveStudyData').getAllStudies.mockResolvedValueOnce({
          'Computer Science': [mockLiveStudiesData],
        });
        const testBypass1 = [{ name: 'Study 1', rating: 4, department: 'Computer Science', title: 'Study 1', borderColour: '#D7BE69',onCardClick:()=>{},id:"id",publisherId:'pubId' }];
        const testBypass2 = [{ studyTitle: 'Rejected Study 1', studyId: '1', publisher: 'Publisher 1', date: '2024-03-01',buttonTitle:"title",department:'department',publisherId:"id",buttonFunction:()=>{} }];
        const testBypass3 = [{ borderColor:"green",title:"title",location:'location', publisher: 'Publisher 1',date:"date",id:'id' }];
        // Render the component
        const { getByText } = render(<ParticipantHome  testBypass1={testBypass1} testBypass2={testBypass2} testBypass3={testBypass3}/>);
    
        // Wait for live studies to be fetched and rendered

          expect(getByText('Live Studies')).toBeInTheDocument();
      });
  });




