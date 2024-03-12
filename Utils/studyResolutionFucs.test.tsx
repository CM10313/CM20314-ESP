import { render } from '@testing-library/react';
import { resolveUserStudy, removeUserFromDisputedInStudy, handleResolvedStudies } from './studyResolutionFuncs';


jest.mock('../firebase/firestore', () => ({
  fetchDocumentById: jest.fn(),
  updateDocument: jest.fn(),
}));

describe('Utility functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('resolveUserStudy', () => {
    it('updates user document and resolves study', async () => {
      // Mock userData
      const userData = {
        id: 'user1',
        joinedStudies: [{ id: 'study1', department: 'department1', publisherId: 'pub1' }],
        disputedStudies: [{ id: 'study2', department: 'department2', publisherId: 'pub2' }],
      };
      const fetchDocumentByIdMock = jest.fn().mockResolvedValue(userData);
      const updateDocumentMock = jest.fn();
      require('../firebase/firestore').fetchDocumentById.mockImplementation(fetchDocumentByIdMock);
      require('../firebase/firestore').updateDocument.mockImplementation(updateDocumentMock);

      // Call the function
      await resolveUserStudy('user1', 'study1', 'pub1', 'department1');

      // Assertions
      expect(fetchDocumentByIdMock).toHaveBeenCalledWith('users', 'user1');
      expect(updateDocumentMock).toHaveBeenCalledWith('users', 'user1', {
        id: 'user1',
        joinedStudies: expect.arrayContaining([{ id: 'study1', department: 'department1', publisherId: 'pub1' }]),
        disputedStudies: [{ id: 'study2', department: 'department2', publisherId: 'pub2' }],
      });
    });
  });

  describe('removeUserFromDisputedInStudy', () => {
    it('removes user from disputed participants list in study', async () => {
      // Mock studyData
      const studyData = {
        studyObj: {
          CompensationObject: {
            disputingParticipants: ['user1', 'user2'],
          },
        },
      };
      const fetchDocumentByIdMock = jest.fn().mockResolvedValue(studyData);
      const updateDocumentMock = jest.fn();
      require('../firebase/firestore').fetchDocumentById.mockImplementation(fetchDocumentByIdMock);
      require('../firebase/firestore').updateDocument.mockImplementation(updateDocumentMock);

      // Call the function
      await removeUserFromDisputedInStudy('user1', 'study1', 'pub1', 'department1');

      // Assertions
      expect(fetchDocumentByIdMock).toHaveBeenCalledWith('departments/department1/Researchers/pub1/studies', 'study1');
      expect(updateDocumentMock).toHaveBeenCalledWith(
        'departments/department1/Researchers/pub1/studies',
        'study1',
        expect.objectContaining({
          studyObj: {
            CompensationObject: {
              disputingParticipants: ['user2'],
            },
          },
        })
      );
    });
  });

  describe('handleResolvedStudies', () => {
    it('calls resolveUserStudy and removeUserFromDisputedInStudy', async () => {

      const triggerFunctionMock = jest.fn()

      await handleResolvedStudies('user1', 'study1', 'pub1', 'department1', triggerFunctionMock);
      expect(triggerFunctionMock).toHaveBeenCalled();
    });
  });
});
