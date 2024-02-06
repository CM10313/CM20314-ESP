import React, { useContext, useState } from 'react';
import Image from 'next/image';

import { TextField, Button, Grid, Typography, Box, useMediaQuery } from '@mui/material';



import { useRouter } from 'next/router';
const LoginForm: React.FC = () => {
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
const handleSignupRedirect=()=>{
  router.push('/register');
}

const handleLoginRedirect = () => {
  router.push('/researchHome');
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
    alignItems: "center",width:'100%',height:'100%'}}><form onSubmit={handleSubmit}>
    
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
      <Grid
      item
      xs={isMobile ?12:12}>
      <Grid container spacing={2} >
        <Grid item xs={12}>
        <Grid container spacing={0} >
        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}><Box sx={{mb:usernameError ? 3: 0}}></Box>
                  <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={Boolean(usernameError)}
                    helperText={usernameError}
                    sx={{width:'80%',padding:0,backgroundColor:'#DAE1E9'}}
                    
                  /></Grid>
        </Grid>
        </Grid>
        <Grid item xs={12}>
        <Grid container spacing={0}>
        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Box sx={{mb:emailError ? 3: 0}}></Box>
                  <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(passwordError)}
                    helperText={passwordError}
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
                    <Button onClick={handleLoginRedirect} variant={'contained'}sx={{whiteSpace:'nowrap',overflow:'auto',width:'60%',height:'55px',backgroundColor:'#0B254A',borderRadius:'10px'}} type="submit">
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

