import { renderHook, act } from '@testing-library/react-hooks';
import { Anonymity, Faculty, Gender, HighestEducation, Race, Religion, Sexuality, useExtraInfoState } from './UserExtraInfo';

describe('useExtraInfoState', () => {
  test('should update state when calling setter function', () => {
    const { result } = renderHook(() => useExtraInfoState());
    const [state, setState] = result.current;

    act(() => {
      setState({
        DemographicData: {
          faculty: Faculty.ComputerScience,
          gender: Gender.Male,
          race: Race.White,
          religion: Religion.NotSpecified,
          income: "high",
          age: 25,
          sexuality: Sexuality.Asexual,
          yearOfStudies: 3,
          occupation: 'engineer',
          highestLevelOfEducation: HighestEducation.ALevel,
        },
        HealthData: {
          preExistingConditions: 'none',
          allergies: 'none',
          medication: 'none',
          disabilities: 'none',
        },
        TechnicalData: {
          accessToDevice: true,
        },
        LanguageData: {
          nativeLanguage: 'English',
          otherLanguages: ['Spanish', 'French'],
        },
        GeographicData: {
          nearestCity: 'New York',
          maxTravelTime: 60,
        },
        PrivacyData: {
          anonymityRequired: Anonymity.Full,
        },
        AccessibilityData: {
          accessibilityRequirements: 'wheelchair'
        },
      });
    });

    expect(result.current[0]).toEqual({
        DemographicData: {
            faculty: Faculty.ComputerScience,
            gender: Gender.Male,
            race: Race.White,
            religion: Religion.NotSpecified,
            income: "high",
            age: 25,
            sexuality: Sexuality.Asexual,
            yearOfStudies: 3,
            occupation: 'engineer',
            highestLevelOfEducation: HighestEducation.ALevel,
          },
          HealthData: {
            preExistingConditions: 'none',
            allergies: 'none',
            medication: 'none',
            disabilities: 'none',
          },
          TechnicalData: {
            accessToDevice: true,
          },
          LanguageData: {
            nativeLanguage: 'English',
            otherLanguages: ['Spanish', 'French'],
          },
          GeographicData: {
            nearestCity: 'New York',
            maxTravelTime: 60,
          },
          PrivacyData: {
            anonymityRequired: Anonymity.Full,
          },
          AccessibilityData: {
            accessibilityRequirements: 'wheelchair'
          },
        });
  });
});
