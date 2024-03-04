import { db } from './config'; // Assuming you export your Firestore instance as 'db' in config.js
import { collection, setDoc, getDoc, getDocs, updateDoc, doc, deleteDoc,addDoc,query,where } from 'firebase/firestore';

// Add a document to a collection
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
    await updateDoc(docRef, newData);
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
const fetchUsersByDepartment = async (department) => {
  try {
    const q = query(collection(db, 'users'), where('department', '==', department));
    const querySnapshot = await getDocs(q);

    let users = [];

    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
      });
    });
    return users;
  } catch (e) {
    console.error("Error fetching users: ", e);
    return [];
  }
};



export { addDocument, fetchDocumentById, fetchDocuments, updateDocument, deleteDocument,fetchUserByDepartment,fetchUsersByDepartment };
