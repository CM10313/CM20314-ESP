// firestore.test.js
import { db } from '../config'; // Mocked config.js
import { 
  addDocument, 
  fetchDocumentById, 
  fetchDocuments, 
  updateDocument, 
  deleteDocument, 
  createNestedDocument
} from '../firestore';
import { 
  collection, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  deleteDoc, 
  addDoc 
} from 'firebase/firestore';

jest.mock('../config', () => ({
  db: {
    collection: jest.fn(),
    doc: jest.fn(),
  }
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  setDoc: jest.fn(() => Promise.resolve({})),
  getDoc: jest.fn(() => Promise.resolve({ exists: jest.fn(() => true), data: jest.fn(() => ({})) })),
  getDocs: jest.fn(() => Promise.resolve([])),
  updateDoc: jest.fn(() => Promise.resolve({})),
  doc: jest.fn(),
  deleteDoc: jest.fn(() => Promise.resolve({})),
  addDoc: jest.fn(() => Promise.resolve({ id: 'testDocId' })),
}));

describe('Firestore Functions', () => {
    it('addDocument should add a document to a collection', async () => {
        const docRef = 'testDocRef'; // Mock document reference
        const data = { data: 'testData' };
    
        // Mocking doc() function
        doc.mockReturnValueOnce(docRef);
    
        await addDocument('collectionName', data, 'uid');
        expect(doc).toHaveBeenCalledWith(db, 'collectionName', 'uid');
        expect(setDoc).toHaveBeenCalledWith(docRef, data); // Expecting setDoc to be called with doc reference and data
      });
      it('addDocument should log an error if setDoc fails', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Spy on console.error
    
        const docRef = 'testDocRef'; // Mock document reference
        const data = { data: 'testData' };
    
        // Mocking doc() function
        doc.mockReturnValueOnce(docRef);
        setDoc.mockRejectedValueOnce(new Error('Test error')); // Mock setDoc to throw an error
    
        await addDocument('collectionName', data, 'uid');
        expect(doc).toHaveBeenCalledWith(db, 'collectionName', 'uid');
        expect(setDoc).toHaveBeenCalledWith(docRef, data);
    
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error adding document: ', new Error('Test error'));
    
        consoleErrorSpy.mockRestore(); // Restore console.error
      });
      it('createNestedDocument should add a document to a collection', async () => {
        const parentDocRef = 'testParentDocRef'; // Mock document reference
        const childCollectionRef = 'testChildRef'
        const data = { data: 'testData' };
    
        // Mocking doc() function
        doc.mockReturnValueOnce(parentDocRef);
        collection.mockReturnValueOnce(childCollectionRef);
    
        await createNestedDocument('parentCollectionName','collectionName', data, 'uid');
        expect(doc).toHaveBeenCalledWith(db, 'parentCollectionName', 'uid');
        expect(collection).toHaveBeenCalledWith(parentDocRef,'collectionName');
        expect(addDoc).toHaveBeenCalledWith(childCollectionRef, data); // Expecting setDoc to be called with doc reference and data
      });
      
        it('createNestedDocument should throw an error on failed add document to a collection', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Spy on console.error
            const parentDocRef = 'testParentDocRef'; // Mock document reference
            const childCollectionRef = 'testChildRef'
            const data = { data: 'testData' };
        
            // Mocking doc() function
            doc.mockReturnValueOnce(parentDocRef);
            collection.mockReturnValueOnce(childCollectionRef);
            addDoc.mockRejectedValueOnce(new Error('Test error')); // Mock setDoc to throw an error
        
            await createNestedDocument('parentCollectionName','collectionName', data, 'uid');
            expect(doc).toHaveBeenCalledWith(db, 'parentCollectionName', 'uid');
            expect(collection).toHaveBeenCalledWith(parentDocRef,'collectionName');
            expect(addDoc).toHaveBeenCalledWith(childCollectionRef, data); // Expecting setDoc to be called with doc reference and data
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating study: ', new Error('Test error'));
             consoleErrorSpy.mockRestore(); // Restore console.error
      });
      it('updateDocument should update a document ', async () => {
        const docRef = 'testDocRef'; // Mock document reference
        const newData = { data: 'testData' };
    
        // Mocking doc() function
        doc.mockReturnValueOnce(docRef);
    
        await updateDocument('collectionName', 'docId', newData);
        expect(doc).toHaveBeenCalledWith(db, 'collectionName', 'docId');
        expect(updateDoc).toHaveBeenCalledWith(docRef, newData); // Expecting setDoc to be called with doc reference and data
      });
      it('updateDocument should log an error if updateDoc fails', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Spy on console.error
    
        const docRef = 'testDocRef'; // Mock document reference
        const newData = { data: 'testData' };
    
        // Mocking doc() function
        doc.mockReturnValueOnce(docRef);
        updateDoc.mockRejectedValueOnce(new Error('Test error')); // Mock setDoc to throw an error
    
        await updateDocument('collectionName', 'docId', newData);
        expect(doc).toHaveBeenCalledWith(db, 'collectionName', 'docId');
        expect(updateDoc).toHaveBeenCalledWith(docRef, newData);
    
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error updating document: ', new Error('Test error'));
    
        consoleErrorSpy.mockRestore(); // Restore console.error
      });
      it('deletedDocument should update a document ', async () => {
        const docRef = 'testDocRef'; // Mock document reference
        const newData = { data: 'testData' };
    
        // Mocking doc() function
        doc.mockReturnValueOnce(docRef);
    
        await deleteDocument('collectionName', 'docId');
        expect(doc).toHaveBeenCalledWith(db, 'collectionName', 'docId');
        expect(deleteDoc).toHaveBeenCalledWith(docRef); 
      });
      it('deleteDocument should log an error if deleteDoc fails', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Spy on console.error
    
        const docRef = 'testDocRef'; // Mock document reference
    
        // Mocking doc() function
        doc.mockReturnValueOnce(docRef);
        deleteDoc.mockRejectedValueOnce(new Error('Test error')); // Mock setDoc to throw an error
    
        await deleteDocument('collectionName', 'docId');
        expect(doc).toHaveBeenCalledWith(db, 'collectionName', 'docId');
        expect(deleteDoc).toHaveBeenCalledWith(docRef); 
    
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error deleting document: ', new Error('Test error'));
    
        consoleErrorSpy.mockRestore(); // Restore console.error
      });
      it('fetchDocumentById should fetch a document by ID when it does exist', async () => {
        const docRef = 'testDocRef'; // Mock document reference
    
        // Mocking doc() function
        doc.mockReturnValueOnce(docRef);
    
        // Mocking getDoc() function to return a snapshot with dummy data
        getDoc.mockResolvedValueOnce({
          exists: jest.fn().mockReturnValue(true), // Mock the exists property to indicate the document exists
          id: 'testId',
          data: jest.fn(() => ({ data: 'testData' })),
        });
    
        const result = await fetchDocumentById('collectionName', 'documentId');
        expect(doc).toHaveBeenCalledWith(db, 'collectionName', 'documentId');
        expect(getDoc).toHaveBeenCalledWith(docRef);
        expect(result).toEqual({ id: 'testId', data: 'testData' });
    });
    it('fetchDocumentById should throw an error on fetching document by ID when it does not exist', async () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Spy on console.error
        const docRef = 'testDocRef'; // Mock document reference
    
        // Mocking doc() function
        doc.mockReturnValueOnce(docRef);
    
        // Mocking getDoc() function to return a snapshot with dummy data
        getDoc.mockResolvedValueOnce({
          exists: jest.fn().mockReturnValue(false), // Mock the exists property to indicate the document exists
          id: 'testId',
          data: jest.fn(() => ({ data: 'testData' })),
        });
    
        const result = await fetchDocumentById('collectionName', 'documentId');
        expect(doc).toHaveBeenCalledWith(db, 'collectionName', 'documentId');
        expect(getDoc).toHaveBeenCalledWith(docRef);
        expect(result).toEqual(null);
        expect(consoleLogSpy).toHaveBeenCalledWith('No such document!');
        consoleLogSpy.mockRestore(); // Restore console.error
    });
    it('fetchDocumentById should throw an error on fetching document by ID when it does not exist', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Spy on console.error
        const docRef = 'testDocRef'; // Mock document reference
    
        // Mocking doc() function
        doc.mockReturnValueOnce(docRef);
    
        // Mocking getDoc() function to throw an error
        getDoc.mockRejectedValue(new Error('Test error'));
    
        // Expecting fetchDocumentById to throw an error
        await expect(fetchDocumentById('collectionName', 'documentId')).rejects.toThrowError('Test error');
    
        expect(doc).toHaveBeenCalledWith(db, 'collectionName', 'documentId');
        expect(getDoc).toHaveBeenCalledWith(docRef);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching document: ', new Error('Test error'));
    
        consoleErrorSpy.mockRestore(); // Restore console.error
    });
      it('fetchDocuments should fetch all documents from a collection', async () => {
        const querySnapshotMock = {
          forEach: jest.fn(),
        };
    
        // Mocking collection() function
        collection.mockReturnValueOnce(querySnapshotMock);
        
        await fetchDocuments('collectionName');
        expect(collection).toHaveBeenCalledWith(db, 'collectionName');
        expect(getDocs).toHaveBeenCalled();
      });
      it('fetchDocuments should throw an error on fetching documents', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Spy on console.error
        const querySnapshotMock = {
            forEach: jest.fn(),
        };
    
        // Mocking collection() function
        collection.mockReturnValueOnce(querySnapshotMock);
        getDocs.mockRejectedValue(new Error('Test error')); // Mock getDocs() to throw an error
    
        try {
            await fetchDocuments('collectionName');
        } catch (error) {
            expect(error.message).toBe('Test error');
        }
    
        expect(collection).toHaveBeenCalledWith(db, 'collectionName');
        expect(getDocs).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching documents: ', new Error('Test error'));
    
        consoleErrorSpy.mockRestore(); // Restore console.error
    });
    
    
    
    
  // Similarly, write tests for other functions like fetchDocumentById, fetchDocuments, updateDocument, and deleteDocument
});