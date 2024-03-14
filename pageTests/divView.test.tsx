import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ResearchHome from '../pages/researcherHome';
import { AuthContext, AuthProvider } from '../Context/AuthContext';
import ParticipantHome from '../pages/participantHome';
import '@testing-library/jest-dom';
import ViewParticipantDetails from '../pages/viewParticipantDetails';
import '@testing-library/jest-dom';
import { HealthDisplayProps } from '../Components/HealthDisplay';
import { DemoGraphicDisplayProps } from '../Components/DempographicDisplay';
import { OtherRequirementDisplayProps } from '../Components/OtherRequirementDisplay';
import DiversityView from '../pages/diversityView';
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
    
        const { getByText } = render(<DiversityView />);
     
      });
      it('renders properly when isMobile is false', () => {
        // Mock useMediaQuery to return true (indicating mobile view)
        require('@mui/material').useMediaQuery.mockReturnValue(false);
    
        const { getByText } = render(<DiversityView />);
     
      });
  
  it('renders with the correct initial state', () => {
    const barData = {
        graphData:{
          yAxisLabels : [1, 2, 3, 60,3,6],
          xAxisLabels : [
                  "0 - 10k",
                  "11 - 15k",
                  "16 - 20k",
                  "21 - 25k", 
                  "25 - 30k", 
                  "30k +"
              ],
          title: "Income",
          studyId: "1234",
          hasData: true
        }
      }
      const horizontalBarData={
          graphData:{
            yAxisLabels: [5,10,15,30],
            xAxisLabels: [
                "White-British",
                "Black-British",
                "White-Irish",
                "other",
            ],
            title: "Race",
            studyId: "12345",
            hasData: true
          }
      }
      const donughtData={
          graphData:{
            yAxisLabels: [5,10,15,30,20,60],
            xAxisLabels: [
                "Hetrosexual",
                "Homosexual",
                "Pansexual",
                "Asexual",
                "Other",
                "Not stated",
            ],
            title: "Sexuality",
            studyId:"123456",
            hasData: true
          }
      }
    const {getAllByText}=render(
      
            <DiversityView testBypass1={barData} testBypass2={horizontalBarData} testBypass3={donughtData}/>
        )
        const elements = getAllByText('Sexuality');
    expect(elements.length).toBeGreaterThan(0);

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
          <DiversityView/>
      </AuthContext.Provider>)
  });
  it('fetches user data and study requirements', async () => {
    // Mock the response data
    
    const user1Data = {
        extraInfoObj: {
          DemographicData: {
            age: '18',
            faculty: 'User faculty',
            gender: 'User gender',
            highestLevelOfEducation: 'User highest level of education',
            income: '5000',
            occupation: 'User occupation',
            race: 'User race',
            religion: 'User religion',
            sexuality: 'User sexuality',
            yearOfStudies: 'User year of studies',
          },
        },
      };
      
      const studyData = {
        studyObj: {
          joinedParticipants:["user1"],
          DiversityObject:{
            hasAge:true,
            hasRace:true,
            hasIncome:true,
            hasSexuality:true,
            hasReligion:true,
            hasGender:true,
          }
        },
      };

    // Mock the fetchDocumentById function to resolve with rejected studies data
    require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(studyData);
    require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(user1Data);



    // Mock the useState hook to provide mock state and set functions
    (React.useState as jest.Mock).mockImplementationOnce(() => [[], jest.fn()]); // Mocking setRejectedStudies here

    // Render the component
    render(<DiversityView />);

    // Assert that fetchDocumentById is called with correct arguments
    expect(require('../firebase/firestore').fetchDocumentById).toHaveBeenCalledWith('departments//Researchers//studies', '');

  });
});