import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter as useRouterWrapper } from '../Utils/router';
import { TextField, Button, Grid, Typography, Box, useMediaQuery } from '@mui/material';
import validatePassword from '../Utils/ValidatePassword';
import validateUsername from '../Utils/ValidateUsername';


import {getUID, signIn} from '../firebase/auth';

import { useRouter } from 'next/router';
import { useAuth } from '../Context/AuthContext';
import { fetchDocumentById } from '../firebase/firestore';


const LoginForm: React.FC = () => {
  const {isLoggedIn,setAuth,username} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const router = useRouterWrapper();
  //const { isLoggedIn,setUserLoggedIn} = useContext(AuthContext);

  const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
 
const handleSignupRedirect=()=>{
  router.push('/register');
}
const makeLoginErrorFriendly=(loginError:string)=>{
  switch (loginError){
    case "Firebase: Error (auth/invalid-email).":
      return "The Email you used doesn't seem to exist";
    case "Firebase: Error (auth/invalid-credential).":
      return "You have entered an incorrect Username or Password";
    case  "Firebase: Error (auth/network-request-failed).":
      return "There is a network issue"; 
    case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
      return "Account has been temporarily disabled due to too many failed login attempts.";
   default:
    return "Unknown error";
  }
}


const handleLoginRedirect = async () => {
  try {
    await signIn(email, password);
    //check account type then push research/ethics/participant home page
    let doc_data:any  = await fetchDocumentById('users', getUID());
    console.log(doc_data);
    let account_type = (doc_data as any).accountType
    let department = (doc_data as any).department
    let username = (doc_data as any).username
    let overallRating = (doc_data as any).reviewObject?.overallRating || 5;//sets default of 5 for ethics users
    setAuth(true,username,overallRating,department,account_type, getUID());
    console.log(isLoggedIn)
    console.log(account_type)
    switch (account_type) {
      case "participant":
        router.push('/participantHome');
        break;
      case "researcher":
        router.push('/researchHome');
        break;
      case "ethics":
        router.push('/EthicsBoardHome')
        break;
      default:
       
        break;
    }
  }
  catch (error) {
    if (error instanceof Error){
      setLoginError(makeLoginErrorFriendly(error.message));
    }
    else{
      setLoginError('An unexpected error occurred');
    }
  }
}


const isMobile = useMediaQuery('(max-width:1000px)')
return (
  <>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: 'linear-gradient(to right, #FFFFFF, #9F9F9F)'
      }}
    > 
    <Grid
        container
        rowSpacing={0}
        sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}
        >
        <Grid item xs={isMobile?12:6} sx={{height:'100%'}}>
            <Grid
            container
            rowSpacing={0}
            sx={{display:'flex',justifyContent:'center',height:'100%',width:'100%'}}
            > 
            <Grid item xs={12} sx={{position:'relative',height:'100%',top:150,left:20}}>
                {isMobile ? null : (
                    <Box sx={{height:'100%',justifyContent:'center',display:'flex'}}><Typography fontSize={64}>Welcome Back</Typography></Box>)}
            </Grid>
            <Grid item xs={12} sx={{height:'100%',justifyContent:'center',display:'flex' }}>
                <Image
                    src="/images/bath-icon.svg"
                    alt="Google Logo"
                    width={isMobile?100:400}
                    height={isMobile?100:400} 
                    
                    />  
            </Grid>
            {isMobile ? null : (
            <Grid item xs={12} sx={{height:'100%',width:'100%',justifyContent:'center',display:'flex' }}>
                
                <Box
          sx={{
            
            height: '300px',
            width: '50vw',
            
            position: 'relative', // Set position relative for absolute positioning of the triangle
          }}
        >
          <div
            className="triangle"
            style={{
              position: 'absolute',
              left: 0,
              top: -100,
              width: 0,
              height: 0,
              borderBottom: '400px solid #0B254A', // Set the height of the triangle
              borderRight: '50vw solid transparent', // Set the base of the triangle
            }}
          ></div>
        </Box>
                        
                
            </Grid>
            )}
        </Grid>
    </Grid>
        <Grid item xs={isMobile?12:6}sx={{
    justifyContent: 'center',
    
    overflow: 'hidden', // Hide overflow from child elements
  }}>
        <Box sx={{minHeight:'760px',height:'100vh',width:'100%'}}><>  <Box sx={{display: "flex",
    justifyContent: "center",
    alignItems: "center",width:'100%',height:'100%'}}><form>
    
    <Grid
    container
    rowSpacing={0}
    columnSpacing={{ xs: 0, sm: 0, md: 0 }}
    sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',maxWidth:'600px'}}
    >
    <Grid
      item
      xs={8}
      sx={{
        justifyContent: "center",
        display: "flex",
        backgroundColor: "#F6F6F6",
        height: "600px",
        width:'600px',
        overflow:'auto',
        borderRadius:5,
        boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Grid
    container spacing={0}>
      <Grid item xs={12}></Grid>
      <Grid
      item
      xs={12} sx={{display:'flex',justifyContent:'center'}}><Typography fontFamily={"Yapari"} fontWeight={'bold'} sx={{color:'#000000'}} fontSize={45}>LOGIN</Typography></Grid>
     {loginError ? (
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'start', flexDirection:'column',alignItems:'flex-start' }}>
          <Typography fontWeight={'bold'} sx={{ color: 'black', justifyContent: 'start', display: 'flex', borderRadius: '5px', ml: 5 }} fontSize={20}>
            Oops!
          </Typography>
          <Typography fontWeight={'bold'} sx={{ color: '#ed8787', justifyContent: 'start', display: 'flex', borderRadius: '5px', ml: 5 }} fontSize={15}>
            {loginError}
          </Typography>
        </Grid>
      ) : null}
      <Grid
      item
      xs={isMobile ?12:12}>
      <Grid container spacing={2} >
        <Grid item xs={12}>
        <Grid container spacing={0} >
        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={handleEmailChange}
                    sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                    
                  /></Grid>
        </Grid>
        </Grid>
        <Grid item xs={12}>
        <Grid container spacing={0}>
        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                    sx={{width:'80%',backgroundColor:'#DAE1E9'}}
                    
                />
        </Grid>
        </Grid>
        </Grid>
    </Grid>
    </Grid>
        <Grid
        item
        xs={12} sx={{display:'flex',justifyContent:'center'}}>
        <Grid
            container
            rowSpacing={0} sx={{justifyContent:'center',textAlign:'center'}}>
            <Grid item xs={12}>
                    <Button onClick={handleLoginRedirect} variant={'contained'}sx={{whiteSpace:'nowrap',overflow:'auto',width:'60%',height:'55px',backgroundColor:'#0B254A',borderRadius:'10px'}} >
                        Login
                    </Button>
            </Grid>
            <Grid item xs={12}> 
                <Typography>or login with</Typography>
            </Grid>
            <Grid item xs={12}> 
               <Button><Image
        src="/images/google-icon.svg"
        alt="Google Logo"
        width={100} // Adjust the width as needed
        height={100} // Adjust the height as needed
      /></Button>
            </Grid>
            <Grid item xs={12} sx={{marginBottom:'30px'}}> 
            <Typography fontSize={12}>
              {"Don't have an account ?"}
              <Button sx ={{color:'black'}} onClick={handleSignupRedirect}><Typography component="span" fontWeight="bold" fontSize={12}>Register here</Typography></Button>
               
              
            </Typography>
            </Grid>
        </Grid>
    </Grid>
    </Grid>
    </Grid> 
    </Grid></form></Box></>
    </Box>

        </Grid>
    </Grid>
    
          </div>
  </>
);
};

export default LoginForm;

