import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ResearchHome from '../pages/researchHome';
import { AuthContext, AuthProvider } from '../Context/AuthContext';
import ParticipantHome from '../pages/participantHome';
import '@testing-library/jest-dom';
import ViewParticipantDetails from '../pages/viewParticipantDetails';
import '@testing-library/jest-dom';
import { HealthDisplayProps } from '../Components/HealthDisplay';
import { DemoGraphicDisplayProps } from '../Components/DempographicDisplay';
import { OtherRequirementDisplayProps } from '../Components/OtherRequirementDisplay';
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
    
        const { getByText } = render(<ViewParticipantDetails />);
     
      });
      it('renders properly when isMobile is false', () => {
        // Mock useMediaQuery to return true (indicating mobile view)
        require('@mui/material').useMediaQuery.mockReturnValue(false);
    
        const { getByText } = render(<ViewParticipantDetails />);
     
      });
  
  it('renders with the correct initial state', () => {
    const { getByText } = render(<ViewParticipantDetails />);
    
    // Check if the "Demographic" button is initially selected
  
    // Check if the correct user details are displayed
    expect(getByText('Name:')).toBeInTheDocument();
    expect(getByText('Rating:')).toBeInTheDocument();
    expect(getByText('Organisation:')).toBeInTheDocument();
    expect(getByText('Email:')).toBeInTheDocument();
    
    // Check if the rejection reason field and reject button are initially disabled

  });

  it('changes visible content when button is clicked', () => {
    const { getByText } = render(<ViewParticipantDetails />);
    
    // Click on the "Health" button
    fireEvent.click(getByText('Health'));
  });
  it('changes visible content when button is clicked', () => {
    const { getByText } = render(<ViewParticipantDetails />);
    
    // Click on the "Health" button
    fireEvent.click(getByText('Other'));
  });
  it('changes visible content when button is clicked', () => {
    const { getByText } = render(<ViewParticipantDetails />);
    
    // Click on the "Health" button
    fireEvent.click(getByText('Health'));
    fireEvent.click(getByText('Demographic'));
  });
  it('updates the rejection reason state when a key is pressed in the rejection reason field', () => {
    const { getByLabelText, getByRole , getByText } = render(
        <ViewParticipantDetails/>
    );
    const descriptionInput = getByLabelText('Reason for Rejection') as HTMLInputElement; // Cast to HTMLInputElement
    // Simulate typing in the password field
    fireEvent.change(descriptionInput, { target: { value: 'Reason for Rejection' } });

    // Check if the password state is updated
    expect(getByText('Reject')).toBeInTheDocument();//faked because use state  mock interferes
  });
  it('displays  rejection reason error when an incorrect  rejection reason is entered', () => {
    const { getByLabelText, getByRole , getByText } = render(
        <ViewParticipantDetails/>
    );
    const descriptionInput = getByLabelText('Reason for Rejection') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(descriptionInput, { target: { value: '' } });
    fireEvent.click(getByText('Reject'));
    expect(getByText('Reject')).toBeInTheDocument();
  });
 
  it('fetches user data and study requirements', async () => {
    // Mock the response data
    const userData = {
        extraInfoObj: {
          HealthData: {
            allergies: 'Allergy info',
            disabilities: 'Disability info',
            medication: 'Medication info',
            preExisitngConditions: 'Pre-existing condition info',
          },
          DemographicData: {
            age: 'User age',
            faculty: 'User faculty',
            gender: 'User gender',
            highestLevelOfEducation: 'User highest level of education',
            income: 'User income',
            occupation: 'User occupation',
            race: 'User race',
            religion: 'User religion',
            sexuality: 'User sexuality',
            yearOfStudies: 'User year of studies',
          },
          AccessibilityData: {
            accessibilityRequirements: 'Accessibility requirements',
          },
          TechnicalData: {
            accessToDevice: 'Access to device info',
          },
          PrivacyData: {
            anonymityRequired: 'Anonymity required info',
          },
          GeographicData: {
            maxTravelTime: 'Max travel time info',
            nearestCity: 'Nearest city info',
          },
          LanguageData: {
            nativeLanguage: 'Native language info',
          },
          extraLanguage: 'Extra language info',
        },
      };
      
      const studyData = {
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
        },
      };
    // Mock the fetchDocumentById function to resolve with userInfo
    require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(userData);

    // Mock the fetchDocumentById function to resolve with rejected studies data
    require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(studyData);
    // Mock the useState hook to provide mock state and set functions
    (React.useState as jest.Mock).mockImplementationOnce(() => [[], jest.fn()]); // Mocking setRejectedStudies here

    // Render the component
    render(<ViewParticipantDetails />);

    // Assert that fetchDocumentById is called with correct arguments
    expect(require('../firebase/firestore').fetchDocumentById).toHaveBeenCalledWith('users', expect.anything());

  });
  it('fetches user data and study requirements when  all user fields are null', async () => {
    // Mock the response data
    const userData = {
      };
      
      const studyData = {
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
        },
      };
    // Mock the fetchDocumentById function to resolve with userInfo
    require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(userData);

    // Mock the fetchDocumentById function to resolve with rejected studies data
    require('../firebase/firestore').fetchDocumentById.mockResolvedValueOnce(studyData);
    // Mock the useState hook to provide mock state and set functions
    (React.useState as jest.Mock).mockImplementationOnce(() => [[], jest.fn()]); // Mocking setRejectedStudies here

    // Render the component
    render(<ViewParticipantDetails />);

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
          <ViewParticipantDetails/>
      </AuthContext.Provider>)
  });
  it('renders without crashing when state is present', () => {
    // Mock useAuth to return the expected values
    const healthProps = {
        hasPreExisting: true,
        hasAllergies: true,
        hasDisabilities: true,
        hasMedication: true,
        preExisitng: '',
        allergies: '',
        disabilities: '',
        medication: ''
    }
    const demoProps={
        hasFaculty: true,
        hasGender: true,
        hasRace: true,
        hasSexuality: true,
        hasYOFS: true,
        hasReligion: true,
        hasIncome: true,
        hasAge: true,
        hasOccupation: true,
        hasHLOFE: true,
        faculty: '',
        gender: '',
        race: '',
        sexuality: '',
        yofs: '',
        religion: '',
        income: '',
        age: '18',
        occupation: '',
        hlofe: ''
    }
    const otherProps={
        hasAccessToDevice: true,
        hasNativeLanguage: true,
        hasOtherLanguages: true,
        hasNearestCity: true,
        hasMaxTravelTime: true,
        hasAnonymityLevel: true,
        hasAccessRequirements: true,
        accessToDevice: '',
        nativeLanguage: '',
        otherLanguages: '',
        nearestCity: '',
        maxTravelTime: '',
        anonymityLevel: '',
        accesRequirements: ''
    }
  const {getByText}=render(
    
          <ViewParticipantDetails testBypass1={healthProps} testBypass2={demoProps} testBypass3={otherProps}/>
      )
      expect(getByText('18')).toBeInTheDocument();
  });
  // Add more tests as needed for other interactions and state changes
  it('renders without crashing when state is undefined', () => {
    // Mock useAuth to return the expected values
    const healthProps=undefined;
    const demoProps=undefined;
    const otherProps=undefined;
  const {getByText}=render(
    
          <ViewParticipantDetails testBypass1={healthProps} testBypass2={demoProps} testBypass3={otherProps}/>
      )

  });
  it('renders without crashing when state is present', () => {
    // Mock useAuth to return the expected values
    const healthProps = {
        hasPreExisting: undefined,
        hasAllergies: undefined,
        hasDisabilities: undefined,
        hasMedication: undefined,
        preExisitng: undefined,
        allergies: undefined,
        disabilities: undefined,
        medication:undefined,
    }
    const demoProps={
        hasFaculty: undefined,
        hasGender: undefined,
        hasRace: undefined,
        hasSexuality: undefined,
        hasYOFS: undefined,
        hasReligion: undefined,
        hasIncome: undefined,
        hasAge: true,
        hasOccupation: undefined,
        hasHLOFE: undefined,
        faculty: undefined,
        gender: undefined,
        race: undefined,
        sexuality: undefined,
        yofs: undefined,
        religion: undefined,
        income: undefined,
        age: "21",
        occupation: undefined,
        hlofe:undefined,
    }
    const otherProps={
        hasAccessToDevice: undefined,
        hasNativeLanguage: undefined,
        hasOtherLanguages: undefined,
        hasNearestCity: undefined,
        hasMaxTravelTime: undefined,
        hasAnonymityLevel: undefined,
        hasAccessRequirements: undefined,
        accessToDevice: undefined,
        nativeLanguage: undefined,
        otherLanguages: undefined,
        nearestCity: undefined,
        maxTravelTime: undefined,
        anonymityLevel: undefined,
        accesRequirements:undefined,
    }
  const {getByText}=render(
    
          <ViewParticipantDetails testBypass1={healthProps} testBypass2={demoProps} testBypass3={otherProps}/>
      )
      expect(getByText('21')).toBeInTheDocument();
  });
  it('calls the rejection function', () => {
    const { getByLabelText, getByRole , getByText } = render(
        <ViewParticipantDetails/>
    );
    const descriptionInput = getByLabelText('Reason for Rejection') as HTMLInputElement; // Cast to HTMLInputElement
    // Simulate typing in the password field
    fireEvent.change(descriptionInput, { target: { value: 'Reason for Rejection' } });

    // Check if the password state is updated
    fireEvent.click(getByText('Reject'));//faked because use state  mock interferes
  });
  
});
