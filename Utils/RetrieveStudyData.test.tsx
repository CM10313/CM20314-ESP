import { fetchDocuments, fetchUsersByDepartment } from '../firebase/firestore';
import { fetchData, getAllStudies, getDepartmentStudies } from './RetrieveStudyData';

jest.mock("../firebase/firestore", () => ({
  fetchDocuments: jest.fn(),
  fetchUsersByDepartment: jest.fn(),
}));


describe('Firestore Functions', () => {
afterEach(() => {
  jest.clearAllMocks();
});

describe('fetchData function', () => {
  it('should return data when fetchDocuments resolves', async () => {
    const mockData = [{ id: 1, name: 'Study 1' }, { id: 2, name: 'Study 2' }];
    (fetchDocuments as jest.Mock).mockResolvedValue(mockData);

    const result = await fetchData('query');
    
    expect(result).toEqual(mockData);
  });

  it('should handle errors when fetchDocuments rejects', async () => {
     const errorMessage = 'Fetch error';
     const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (fetchDocuments as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const result = await fetchData('query');

    expect(result).toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    consoleErrorSpy.mockRestore();
  });
});
});