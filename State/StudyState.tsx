// extraInfoState.ts
import { useState } from 'react';

export interface ParticpantObject{

}
export interface DiversityObject{
   hasGender:boolean;
   hasRace:boolean;
   hasReligion:boolean;
   hasIncome:boolean;
   hasAge:boolean;
   hasSexuality:boolean;
   //custom class ?
  }
  export interface CompensationObject{
   amount:string;
   currency:string;
   description:string;
   allPaid:boolean;
   disputingParticipants:ParticpantObject[];
   paidParticipants:ParticpantObject[];
  }
  export interface RequirementsObject{
  demoRequirements:string[];
  healthRequirements:string[];
  techRequirements:string[]; 
  geographicRequirements:string[]; 
  languageRequirements:string[];
  privacyRequirements:string[];
  accesibilityRequirements:string[];
  }
export interface StudyState {
  DiversityObject: {
    DiversityObject:DiversityObject;
  };
  EthicsApproval:boolean;
  CompensationObject: {
   CompensationObject:CompensationObject;
  };
  RequirementsObject: {
   RequirementObject:RequirementsObject;
  };
  joinedParticipants:ParticpantObject[];
  awaitingApprovalParticipants:ParticpantObject[];
}

export const useStudyState = (): [StudyState, React.Dispatch<React.SetStateAction<StudyState>>] => {
  const [studyObj, setStudyObj] = useState<StudyState>({
    DiversityObject: {
      DiversityObject: {
        hasGender: false,
        hasRace: false,
        hasReligion: false,
        hasIncome: false,
        hasAge: false,
        hasSexuality: false
      }
    },
    EthicsApproval:false,
    CompensationObject: { 
      CompensationObject: {
        amount: "",
        currency: "",
        description: "",
        allPaid: false,
        disputingParticipants: [],
        paidParticipants: []
      }
    },
    RequirementsObject: {
      RequirementObject: {
        demoRequirements: [],
        healthRequirements: [],
        techRequirements: [],
        geographicRequirements: [],
        languageRequirements: [],
        privacyRequirements: [],
        accesibilityRequirements: []
      }
    },
    joinedParticipants:[],
    awaitingApprovalParticipants:[],
  });

  return [studyObj, setStudyObj];
};


