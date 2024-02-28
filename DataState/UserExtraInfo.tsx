// extraInfoState.ts
import { useState } from 'react';

export enum Faculty {
    ArchitectureCivilEngineering = "Architecture & Civil Engineering",
    ChemicalEngineering = "Chemical Engineering",
    ElectronicElectricalEngineering = "Electronic & Electrical Engineering",
    MechanicalEngineering = "Mechanical Engineering",
    Economics = "Economics",
    Education = "Education",
    Health = "Health",
    PoliticsLanguagesInternationalStudies = "Politics, Languages & International Studies",
    Psychology = "Psychology",
    SocialPolicySciences = "Social & Policy Sciences",
    Chemistry = "Chemistry",
    ComputerScience = "Computer Science",
    LifeSciences = "Life Sciences",
    MathematicalSciences = "Mathematical Sciences",
    NaturalSciences = "Natural Sciences",
    Physics = "Physics",
    AccountingFinanceLaw = "Accounting, Finance & Law",
    MarketingBusinessSociety = "Marketing, Business & Society",
    InformationDecisionsOperations = "Information, Decisions & Operations",
    StrategyOrganisation = "Strategy & Organisation",
    NotSpecified = ''
  }
  
  export interface ParticipantRejectionData{
    rejectedBy:String;
    rejectorId:String;
    reasonForRejection:String;
    dateOfRejection:String;
  }
  export interface ParticipantJoinedStudyData{
   studyId:String;
   departmentName:Faculty;
  }

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
    NonBinary = "non binary",
    NotSpecified = '',
  }
  

export enum Race {
    White = 'white',
    Black = 'black',
    Asian = 'asian',
    Hispanic = 'hispanic',
    NativeAmerican = 'nativeAmerican',
    Other = 'other',
    NotSpecified = ''
  }

export enum Religion {
    Christian = 'christian',
    Muslim = 'muslim',
    Hindu = 'hindu',
    Buddhist = 'buddhist',
    Jewish = 'jewish',
    Other = 'other',
    None = 'none',
    NotSpecified = ''
  }
export enum Sexuality {
    Heterosexual = 'Heterosexual',
    Homosexual = 'Homosexual',
    Bisexual = 'Bisexual',
    Pansexual = 'Pansexual',
    Asexual = 'Asexual',
    Queer = 'Queer',
    Other = 'Other',
    NotSpecified = ''
  }

export enum Anonymity {
  // not sure what these are needed for
  Full = "Full",
  None = "None",
  NotSpecified = '',
}
export enum HighestEducation {
    GCSE = "GCSE",
    IBAC = "IBAC",
    ALevel = "ALevel",
    Bachelors = "Bachelors",
    Masters = "Masters",
    PHD = "PHD",
    NotSpecified = '',
}

export interface ExtraInfoState {
  DemographicData: {
    faculty: Faculty;
    gender: Gender;
    race: Race;
    religion: Religion;
    income: string;
    age: number;
    sexuality: Sexuality;
    yearOfStudies: number;
    occupation: string;
    highestLevelOfEducation: HighestEducation;
  };
  HealthData: {
    preExistingConditions: string;
    allergies: string;
    medication: string;
    disabilities: string;
  };
  TechnicalData: {
    accessToDevice: boolean;
  };
  LanguageData: {
    nativeLanguage: string;
    otherLanguages: string[];
  };
  GeographicData: {
    nearestCity: string;
    maxTravelTime: number;
  };
  PrivacyData: {
    anonymityRequired: Anonymity;
  };
  AccessibilityData: {
    accessibilityRequirements: string;
  };
}

export const useExtraInfoState = (): [ExtraInfoState, React.Dispatch<React.SetStateAction<ExtraInfoState>>] => {
  const [extraInfoObj, setExtraInfoObj] = useState<ExtraInfoState>({
    DemographicData: {
      faculty: Faculty.NotSpecified, 
      gender: Gender.NotSpecified,
      race: Race.NotSpecified, 
      religion: Religion.NotSpecified, 
      income: '',
      age: -1,
      sexuality: Sexuality.NotSpecified, 
      yearOfStudies: -1,
      occupation: '',
      highestLevelOfEducation: HighestEducation.NotSpecified,
    },
    HealthData: {
      preExistingConditions: '',
      allergies: '',
      medication: '',
      disabilities: '',
    },
    TechnicalData: {
      accessToDevice: false,
    },
    LanguageData: {
      nativeLanguage: '',
      otherLanguages: [],
    },
    GeographicData: {
      nearestCity: '',
      maxTravelTime: -1,
    },
    PrivacyData: {
      anonymityRequired: Anonymity.NotSpecified, 
    },
    AccessibilityData: {
      accessibilityRequirements: '',
    },
  });

  return [extraInfoObj, setExtraInfoObj];
};

