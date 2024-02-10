import { db } from './config'; // Assuming you export your Firestore instance as 'db' in config.js
import { collection, setDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

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

export { addDocument, fetchDocuments, updateDocument, deleteDocument };
