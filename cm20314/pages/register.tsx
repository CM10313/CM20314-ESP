import React, { useContext, useState } from 'react';
import Image from 'next/image';

import { TextField, Button, Grid, Typography, Box, useMediaQuery } from '@mui/material';

import { useRouter } from 'next/router';
import BoxedNumber from '../Components/FormDialouge';
const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const router = useRouter();
  //const { isLoggedIn,setUserLoggedIn} = useContext(AuthContext);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //handle user login
    };
    const handleLoginRedirect=()=>{
    router.push('/login');
    }
    const isMobile = useMediaQuery('(max-width:1000px)')
    
    return (
        <>
        <BoxedNumber width={300} height={400} currentPage={0} onFormSubmit={()=>handleLoginRedirect()}>
        <Box><TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={Boolean(usernameError)}
        helperText={usernameError}
        sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
        
      /></Box>
    <Box><TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(passwordError)}
            helperText={passwordError}
            sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
            
        />
        </Box>
    <Box>
    <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={Boolean(usernameError)}
            helperText={usernameError}
            sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
            
        /></Box>
</BoxedNumber>
</>
        );
};

export default RegisterForm;