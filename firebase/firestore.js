import { db } from './config'; // Assuming you export your Firestore instance as 'db' in config.js

import { collection, setDoc, getDoc, getDocs, updateDoc, doc, deleteDoc,addDoc , query , where , onSnapshot} from 'firebase/firestore';


// Add a document to a collection

const addMultipleDocuments = async (collectionName, dataArray, idPropertyName) => {
  try {
    const collectionRef = collection(db, collectionName);

    // Loop through the dataArray and add each document to the collection
    for (const data of dataArray) {
      const docRef = doc(collectionRef, data[idPropertyName]); // Use the specified ID property
      await setDoc(docRef, data);
      console.log('Document written with ID: ', docRef.id);
    }

  } catch (e) {
    console.error('Error adding documents: ', e);
  }
};


const addDocument = async (collectionName, data, uid) => {
  try {
    const docRef = doc(db, collectionName, uid);
    await setDoc(docRef, data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export const addSpecialDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding nested document: ", e);
  }
};
export const createNestedDocument = async (parentCollectionName, collectionName, data, uid) => {
  try {
    const parentDocRef = doc(db, parentCollectionName, uid);
    const childCollectionRef = collection(parentDocRef, collectionName);
    const docRef = await addDoc(childCollectionRef, data);
    console.log('Document created with ID:', docRef.id);
  } catch (error) {
    console.error('Error creating study: ', error);
  }
};
// retrieve document by ID
const fetchDocumentById = async (collectionName, documentId) => {
  try {
    // Use the doc() method to get a reference to the specific document
    const docRef = doc(db, collectionName, documentId);
    // Use the getDoc() method to fetch the document
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // If the document exists, return its data along with the document ID
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      // Handle the case where the document does not exist
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error fetching document: ", e);
    throw e;
  }
};


const updateDocumentWithArray = async (collectionName, docId, FieldArray, newArrayData) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const existingData = docSnapshot.data();
      const existingArray = existingData[FieldArray] || [];

      const updatedArray = [...existingArray, ...newArrayData];

      // Update the document with the modified array within the nested field
      await setDoc(docRef, { [FieldArray]: updatedArray }, { merge: true });

      console.log("Document updated with array: ", docRef.id);
    } else {
      console.error("Document does not exist!");
    }
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}


const fetchUsersByDepartment = async(department) => {
  try{
    const q =  query(collection(db,'users'),where('department', '==',department));
    const querySnapshot = await getDocs(q)
    let users = []
    querySnapshot.forEach((doc)=>{
      users.push({
        id:doc.id,
      })
    });
    
    return users
  } catch (e){
    console.error("Error fetching users:",e)
  }
}



const fetchAllStudiesByDepartment = async (department) => {
  try {
   
    const users = await fetchUsersByDepartment(department);
    
    let studies = [];

    for (let i = 0; i < users.length; i++) {
      const userId = users[i].id;
      const userStudiesRef = collection(db, 'departments', department, 'Researchers', userId, 'studies');
      const userStudiesSnapshot = await getDocs(userStudiesRef);
    
      userStudiesSnapshot.forEach((studyDoc) => {
        const studyData = studyDoc.data(); // Access the data within the document
        studies.push({
          userId: userId,
          studyId: studyDoc.id,
          // Include the study data
          studyData: studyData,
        });
      });
    }

   
    return studies;
  } catch (e) {
    console.error("Error fetching studies:", e);
  }
};


// Fetch all documents from a collection
const fetchDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    
    return docs;
  } catch (e) {
    console.error("Error fetching documents: ", e);
  }
};


// Update a document
const updateDocument = async (collectionName, docId, newData) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, newData, { merge: true });
    console.log("Document updated");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Delete a document
const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    console.log("Document deleted");
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
const fetchUserByDepartment = async (department) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'users'), where('department', '==', department))
    );
    console.log(querySnapshot)
    let user = null;

    querySnapshot.forEach((doc) => {
      user = {
        id: doc.id
      };
    });
    console.log(user)
    return user;
  } catch (e) {
    console.error("Error fetching user: ", e);
    return null;
  }
};


const setupDatabaseListener = (collectionName, callback) => {
  const docRef = collection(db, collectionName);

  // Subscribe to real-time updates
  const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    // Call the provided callback with the updated data
    callback(data);
  });

  // Return an unsubscribe function to stop listening when needed
  return unsubscribe;
};

export default setupDatabaseListener;



// Trigger the update when the page loads

const clearCollection = async (collectionName) => {
  if (collectionName == 'Studies'){
        try {
          const collectionRef = collection(db, collectionName);

          // Retrieve all documents in the collection
          const querySnapshot = await getDocs(collectionRef);

          // Delete each document
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            console.log('Document deleted: ', doc.id);
          });

          console.log('Collection cleared.');
        } catch (e) {
          console.error('Error clearing collection: ', e);
        }
      };
    }





const createFieldIfNotExists = async (collectionName, docId, fieldName, fieldType) => {
  try {
    const docRef = doc(db, collectionName, docId);

    // Get the existing document data
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // Document exists, check if the field exists
      const existingData = docSnapshot.data();

      if (!existingData || !existingData[fieldName]) {
        // Field doesn't exist, create it based on fieldType
        const initialValue = fieldType === 'map' ? {} : fieldType === 'array' ? [] : fieldValue.delete();

        await setDoc(docRef, {
          [fieldName]: initialValue,
        }, { merge: true });

        console.log('Field created:', fieldName);
      } else {
        console.log('Field already exists:', fieldName);
      }
    } else {
      // Document doesn't exist, create it with the field based on fieldType
      const initialValue = fieldType === 'map' ? {} : fieldType === 'array' ? [] : fieldValue.delete();

      await setDoc(docRef, {
        [fieldName]: initialValue,
      });

      console.log('Document created with field:', fieldName);
    }
  } catch (error) {
    console.error('Error creating field:', error);
  }
};

export { createFieldIfNotExists };

export { addDocument, fetchDocumentById, fetchDocuments, updateDocument, deleteDocument,addMultipleDocuments, fetchUserByDepartment,fetchUsersByDepartment, fetchAllStudiesByDepartment , clearCollection ,updateDocumentWithArray};
