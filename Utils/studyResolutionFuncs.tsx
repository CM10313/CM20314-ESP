import { fetchDocumentById, updateDocument } from "../firebase/firestore";

export const resolveUserStudy= async (id:string,studyId:string,publisherId:string,department:string)=>{
    try{
    const userData:any= await fetchDocumentById("users",id );
    const currentJoinedStudies = userData.joinedStudies
    const currentDisputedStudies = userData.disputedStudies
    const updatedJoinedStudies = [...currentJoinedStudies,{department:department,id:studyId,publisherId:publisherId,}]
    const updatedDisputedStudies = currentDisputedStudies.filter((study: any) => study.id !== studyId);
    const updatedUserDoc = { ...userData };
    updatedUserDoc.disputedStudies = updatedDisputedStudies;
    updatedUserDoc.joinedStudies = updatedJoinedStudies;
    updateDocument('users',id,updatedUserDoc);
    } catch (error) {
    console.error("Error removing study from users disputed/adding to joined", error);
    }
  }
export const removeUserFromDisputedInStudy = async (id:string,studyId:string,publisherId:string,department:string)=>{
  try{
      const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${publisherId}/studies`,studyId);
      const currentDisputingParticipantsList = studyData.studyObj.CompensationObject.disputingParticipants;
      const updatedDisputedList = currentDisputingParticipantsList.filter((elem: string) => elem !== id);
      const updatedStudyDoc = {...studyData};
          updatedStudyDoc.studyObj.CompensationObject.disputingParticipants = updatedDisputedList;
          updateDocument(`departments/${department}/Researchers/${publisherId}/studies`,studyId,updatedStudyDoc);
      } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error editing user status in study", error);
      }
}
export const handleResolvedStudies = async (id:string,studyId:string,publisherId:string,department:string,triggerFunction:()=>void)=>{
  try {
      // Call the asynchronous functions and await their completion
      await Promise.all([resolveUserStudy(id,studyId,publisherId,department), removeUserFromDisputedInStudy(id,studyId,publisherId,department)]);
      
      // Once both asynchronous functions are completed, triggerGetStudies
      triggerFunction();
    } catch (error) {
      console.error('Error handling dispute:', error);
      // Handle errors appropriately
    }
}
export  const removeUserFromJoinedInStudy = async(department:string,publisherId:string,studyId:string,userId:string)=>{
    try{
      const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${publisherId}/studies`,studyId);
      const currentJoinedList = studyData.studyObj.joinedParticipants;
      const updatedJoinedList = currentJoinedList.filter((elem: string) => elem !== userId);
      const updatedStudyDoc = {...studyData};
          updatedStudyDoc.joinedParticipants = updatedJoinedList;
          updateDocument(`departments/${department}/Researchers/${publisherId}/studies`,studyId,updatedStudyDoc);
      } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error editing user status in study", error);
      }
  }
export const updateStudyRatedStatus = async(department:string,publisherId:string,studyId:string,userId:string)=>{
    try{
      const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${publisherId}/studies`,studyId);
      const currentRatedList = studyData.studyObj.CompensationObject.participantsHaveRated;
      const updatedRatedList = [...currentRatedList,userId];
      const updatedStudyDoc = {...studyData};
          updatedStudyDoc.studyObj.CompensationObject.participantsHaveRated = updatedRatedList;
          updateDocument(`departments/${department}/Researchers/${publisherId}/studies`,studyId,updatedStudyDoc);
      } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error editing user status in study", error);
      }
  }
 export const removeStudyFromUsersJoined = async(department:string,publisherId:string,studyId:string,userId:string)=>{
    try{
      const userData:any= await fetchDocumentById("users",userId );
      const currentJoinedStudies = userData.joinedStudies
      const updatedJoinedStudies = currentJoinedStudies.filter((study: any) => study.id !== studyId);
      const updatedUserDoc = { ...userData };
      updatedUserDoc.joinedStudies = updatedJoinedStudies;
      updateDocument('users',userId,updatedUserDoc);
      } catch (error) {
      console.error("Error removing study from users disputed/adding to joined", error);
      }
  }
  export const addStudyToUsersDisputed= async (department:string,publisherId:string,studyId:string,userId:string)=>{
    try{
    const userData:any= await fetchDocumentById("users",userId );
    const currentJoinedStudies = userData.joinedStudies
    const currentDisputedStudies = userData.disputedStudies
    console.log(userData);
    console.log(currentJoinedStudies);
    const updatedJoinedStudies = currentJoinedStudies.filter((study: any) => study.id !== studyId);
    const updatedDisputedStudies = [...currentDisputedStudies,{department:department,id:studyId,publisherId:publisherId,}]
    const updatedUserDoc = { ...userData };
    updatedUserDoc.disputedStudies = updatedDisputedStudies;
    updatedUserDoc.joinedStudies = updatedJoinedStudies;
    updateDocument('users',userId,updatedUserDoc);
    } catch (error) {
    console.error("Error adding study to users disputed/removing from joined list:", error);
    }
  }
 export const addUserToDisputedInStudy = async (department:string,publisherId:string,studyId:string,userId:string)=>{
    try{
        const studyData:any= await fetchDocumentById(`departments/${department}/Researchers/${publisherId}/studies`,studyId);
        const currentDisputingParticipantsList = studyData.studyObj.CompensationObject.disputingParticipants;
        const updatedDisputedList = [...currentDisputingParticipantsList, userId];
        const updatedStudyDoc = {...studyData};
        console.log(updatedStudyDoc)
            updatedStudyDoc.studyObj.CompensationObject.disputingParticipants = updatedDisputedList;
            console.log(updatedStudyDoc);
            updateDocument(`departments/${department}/Researchers/${publisherId}/studies`,studyId,updatedStudyDoc);
        } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error editing user status in study", error);
        }
  }