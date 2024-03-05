import { fetchDocuments, fetchUsersByDepartment } from '../firebase/firestore';
import { fetchData, getAllStudies, getDepartmentStudies } from './RetrieveStudyData';

jest.mock("../firebase/firestore", () => ({
    fetchDocuments: jest.fn(),
    fetchUsersByDepartment: jest.fn(),
  }));
  
  // Mock the RetrieveStudyData module
  jest.mock("./RetrieveStudyData", () => ({
    ...jest.requireActual("./RetrieveStudyData"), // Get the actual implementation
    fetchData: jest.fn(),
  }));
describe('Firestore Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchData function', () => {


  it('should return department studies when all fetches are successful', async () => {
    const department = 'TestDepartment';
    const user1 = { id: 'user1' };
    const user2 = { id: 'user2' };
    const users = [user1, user2];
    const expectedStudies = ['study1', 'study2'];

    (fetchUsersByDepartment as jest.Mock).mockResolvedValue(users);
    (fetchData as jest.Mock).mockResolvedValueOnce('study1').mockResolvedValueOnce('study2');


    const result = await getDepartmentStudies(department, false, false, false);

    expect(fetchUsersByDepartment).toHaveBeenCalledWith(department);
  });

  it('should handle errors during fetches', async () => {
    const department = 'TestDepartment';
    const user = { id: 'user1' };
    const errorMessage = 'Fetch error';
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (fetchUsersByDepartment as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
    (fetchData as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const result = await getDepartmentStudies(department, false, false, false);

    expect(fetchUsersByDepartment).toHaveBeenCalledWith(department);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error:",new Error(errorMessage));
    consoleErrorSpy.mockRestore();
  });


    it('should return studies for all departments', async () => {
      const departments = {
        'Department1': [],
        'Department2': [],
      };
      const department ="Department1" ;

      const getDepartmentStudiesMock = jest.fn().mockResolvedValue([]);

      jest.spyOn(Object, 'keys').mockReturnValueOnce(Object.keys(departments));
      jest.spyOn(Object, 'values').mockReturnValueOnce(Object.values(departments));
      jest.spyOn(Object, 'assign').mockReturnValueOnce(departments);


      await getAllStudies(true, true, true);
      expect(fetchUsersByDepartment).toHaveBeenCalledWith(department);
    });
  });
});