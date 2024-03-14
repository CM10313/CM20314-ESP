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
import AdvertPreview from '../pages/advertPreview';
import { useRouter } from 'next/router';
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
  jest.mock('../firebase/firestore', () => ({
    ...jest.requireActual('../firebase/firestore'), // Keep other functions as they are
    updateDocument: jest.fn(),
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
  

describe('Advert Preview', () => {
  
      it('renders properly when isMobile is true', () => {
        // Mock useMediaQuery to return true (indicating mobile view)
        require('@mui/material').useMediaQuery.mockReturnValue(true);
    
        const { getByText } = render(<AdvertPreview />);
     
      });
      it('renders properly when isMobile is false', () => {
        // Mock useMediaQuery to return true (indicating mobile view)
        require('@mui/material').useMediaQuery.mockReturnValue(false);
    
        const { getByText } = render(<AdvertPreview />);
     
      });
      it('adds a user to study when they apply', () => {
        // Mock useMediaQuery to return true (indicating mobile view)
        jest.mock('../Context/AuthContext', () => ({
          useAuth: () => ({
            isLoggedIn: true,
            username: "fake",
            overallRating: -1,
            department: "fake",
            accountType: "fake",
            id: "user3",
            setAuth: jest.fn((isLoggedIn, username, overallRating, department, accountType, id) => {})
          })
        }));
        const studyData={
          studyObj:{
            awaitingApprovalParticipants:["user1","user2"]
          }
        }
        require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(studyData);
        const pushMock = jest.fn();
        const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
        useRouterMock.mockReturnValue({ push: pushMock });
        const { getByText } =render(
          <AuthContext.Provider value={{ // Add value prop here
            isLoggedIn: true,
            username: "fake",
            overallRating: -1,
            department: "fake",
            accountType: "fake",
            id: "user3",
            setAuth: jest.fn((isLoggedIn, username, overallRating, department, accountType, id) => {})
          }}>
              <AdvertPreview/>
          </AuthContext.Provider>)

        fireEvent.click(getByText('Apply'));
        expect(require('../firebase/firestore').fetchDocumentById).toHaveBeenCalledWith('users', expect.anything());
      });
 
  it('fetches user data and study data', async () => {
    // Mock the response data
   
       // Mock the response data
    const userData = {
      reviewObject:{
       reviews:[{reviewerId:"rId",
        reviewerName:"rName",
        review:"blah blah",
        rating:0,},{reviewerId:"rId",
        reviewerName:"rName",
        review:"blah blah",
        rating:0,}]
      }
     };
     
     const studyData = {
       title:"title",
       publisherName:'publisherName',
       publisherRating:0,
       description:"study",
       closingDate:"study close date",
       dateOfPublish:"study publish date",
       preliminaryDate:"prelim date",
       relatedFields:["maths","comp sci"],
       location:"location",
       externalLink:"externalLink",
       department:"department",
       maxNoParticipants:0,
       minimumAge:0,
       studyObj: {
         RequirementsObject: {
           healthRequirements: ['Allergies', 'Disabilities', 'Medication', 'PreExistingConditions'],
           demoRequirements: ['Age', 'Faculty', 'Gender', 'HighestLevelOfEducation', 'Income', 'Occupation', 'Race', 'Religion', 'Sexuality', 'YearOfStudies'],
           accesibilityRequirements: ['AccessibilityRequirements'],
           techRequirements: ['AccessToDevice'],
           privacyRequirements: ['AnonymityLevel'],
           geographicRequirements: ['MaxTravelTime', 'NearestCity'],
           languageRequirements: ['NativeLanguage', 'OtherLanguages'],
         },
         CompensationObject:{
           description:"money",
           amount:0,
         },
         EthicsApprovalObject:{
           status:"status",
         },
         joinedParticipants:["user1","user2"],
       },
     };
    // Mock the fetchDocumentById function to resolve with userInfo
    require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(studyData);
    require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(userData);

    // Mock the fetchDocumentById function to resolve with rejected studies data
    
    // Mock the useState hook to provide mock state and set functions
    (React.useState as jest.Mock).mockImplementationOnce(() => [[], jest.fn()]); // Mocking setRejectedStudies here

    // Render the component
    render(<AdvertPreview />);

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
          <AdvertPreview/>
      </AuthContext.Provider>)
  });
 
  it('navigates to review page when "Review" button is clicked', () => {
    // Mock useRouter's push function
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    // Render the component
    const { getByText } = render(<AdvertPreview />);

    // Click the "Review" button
    fireEvent.click(getByText('Exit'));

    // Assert that useRouter's push function was called with the expected route
    expect(pushMock).toHaveBeenCalledWith('/participantHome');
  });
});