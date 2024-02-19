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
//
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
  joinedParticpants:ParticpantObject[];
  awaitingApprovalParticpants:ParticpantObject[];
}


