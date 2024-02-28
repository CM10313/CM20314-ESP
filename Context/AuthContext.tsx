import React, { ReactNode, createContext, useContext, useState } from 'react';
// Create AuthContext
export const AuthContext = createContext({
  isLoggedIn:false,
  username:'',
  overallRating:-2,
  department:'',
  accountType:'',
  id:'',
  setAuth:(isLoggedIn:boolean,username:string,overallRating:number,department:string,accountType:string,id:string) =>{},
});

// AuthProvider component to wrap your entire application
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('None');
  const [overallRating, setOverallRating]= useState(-1);
  const [department, setDepartment]= useState('None');
  const [accountType,setAccountType]= useState('None');
  const [id, setId]= useState('');
 
  const setAuth = (isLoggedIn:boolean,username:string,overallRating:number,department:string,accountType:string,id:string)=>{
    setAccountType(accountType);
    setDepartment(department);
    setIsLoggedIn(isLoggedIn);
    setUsername(username);
    setOverallRating(overallRating);
    setId(id);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn,username,department,overallRating,accountType,id, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
