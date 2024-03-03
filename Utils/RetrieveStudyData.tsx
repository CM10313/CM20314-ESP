import { fetchDocuments, fetchUsersByDepartment } from "../firebase/firestore";

export const fetchData = async (query:string) => {
    try {
      const queryData = await fetchDocuments(query);
      return queryData;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const getDepartmentStudies = async (department: string, getStudies:boolean,getWebinars:boolean,getOthers:boolean) => {
    let departmentStudies = [];
    try {
      const users = await fetchUsersByDepartment(department);
      for (const user of users) {
        if(getStudies){
          departmentStudies.push(await fetchData(`departments/${department}/Researchers/${user.id}/studies`,));
        }
        if(getWebinars){
          departmentStudies.push(await fetchData(`departments/${department}/Researchers/${user.id}/webinars`));
        }
        if(getOthers){
          departmentStudies.push(await fetchData(`departments/${department}/Researchers/${user.id}/others`));
        }
      }
      return departmentStudies;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export let departments:{[key: string]: any} = {
    "Accounting, Finance & Law": null,
    "Architecture & Civil Engineering": null,
    "Chemical Engineering": null,
    "Electronic & Electrical Engineering": null,
    "Mechanical Engineering": null,
    "Economics": null,
    "Education": null,
    "Health": null,
    "Politics, Languages & International Studies": null,
    "Psychology": null,
    "Social & Policy Sciences": null,
    "Chemistry": null,
    "Computer Science": null,
    "Life Sciences": null,
    "Mathematical Sciences": null,
    "Natural Sciences": null,
    "Physics": null,
    "Marketing, Business & Society": null,
    "Information, Decisions & Operations": null,
    "Strategy & Organisation": null
  };
  
  export const getAllStudies = async (getStudies:boolean,getWebinars:boolean,getOthers:boolean) => {
    for (const department of Object.keys(departments)) {
      departments[department] = await getDepartmentStudies(department,getStudies,getWebinars,getOthers);
    }
    return departments;
  };