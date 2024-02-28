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
  export interface EthicsApprovalObject{
    status:String;
    rejectedByID:String;
    rejectedByName:String;
    rejectionReason:String;
  }
  export interface StudyState {
    DiversityObject: {
        hasGender: boolean;
        hasRace: boolean;
        hasReligion: boolean;
        hasIncome: boolean;
        hasAge: boolean;
        hasSexuality: boolean;
    };
    EthicsApprovalObject: {
        status:String;
        rejectedByID:String;
        rejectedByName:String;
        rejectionReason:String;
    }
    CompensationObject: {
        amount: string;
        currency: string;
        description: string;
        allPaid: boolean;
        disputingParticipants: string[];
        paidParticipants: string[];
    };
    RequirementsObject: {
        demoRequirements: string[];
        healthRequirements: string[];
        techRequirements: string[];
        geographicRequirements: string[];
        languageRequirements: string[];
        privacyRequirements: string[];
        accesibilityRequirements: string[];
    };
    joinedParticipants: string[];
    awaitingApprovalParticipants: string[];
}

export const useStudyState = (): [StudyState, React.Dispatch<React.SetStateAction<StudyState>>] => {
  const [studyObj, setStudyObj] = useState<StudyState>({
      DiversityObject: {
          hasGender: false,
          hasRace: false,
          hasReligion: false,
          hasIncome: false,
          hasAge: false,
          hasSexuality: false
      },
      EthicsApprovalObject:{
        status:"Waiting",
        rejectedByID:"",
        rejectedByName:"",
        rejectionReason:"",
      },
      CompensationObject: {
          amount: "",
          currency: "£",
          description: "None",
          allPaid: false,
          disputingParticipants: [],
          paidParticipants: []
      },
      RequirementsObject: {
          demoRequirements: [],
          healthRequirements: [],
          techRequirements: [],
          geographicRequirements: [],
          languageRequirements: [],
          privacyRequirements: [],
          accesibilityRequirements: []
      },
      joinedParticipants: [],
      awaitingApprovalParticipants: [],
  });

  return [studyObj, setStudyObj];
};



