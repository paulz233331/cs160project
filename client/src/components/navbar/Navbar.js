import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from '../../assets/mainlogo.png';
import { useAuth0 } from '@auth0/auth0-react';

import Apply from '../../pages/apply/Apply'
import { Link, useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    background: '#EBF5EE',
    
    
},
bar: {
  maxHeight: '15vh',
  overflow: 'hidden',
  
},
buttonContainer: {
  marginRight: '5%'
},

loginButton: {
  borderRadius: '11px',
  border: 'solid 2px rgb(102, 178, 240)',
  padding: '10px',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  color: '#009FFD',
  marginRight: '10px'
},
signupButton: {
  borderRadius: '11px',
  border: 'solid 2px rgb(102, 178, 240)',
  backgroundColor: 'rgb(102, 178, 240)',
  padding: '10px',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  color: 'white',
  marginRight: '10px',
},
logo: {
  transform: 'scale(1.3)', 
  marginLeft: '5%'
},
}));

export default function Navbar({employerNavBar, isFirstTimeUser, applyNavBar}) {
  localStorage.clear()
  const [IsEmployerNavbar, setIsEmployerNavbar] = useState(employerNavBar);
  const classes = useStyles();
  const { loginWithRedirect, logout } = useAuth0();

  const handleSignup = () => {
    localStorage.setItem("firstTimeUser", "yes");
    loginWithRedirect();
  }

  const handleLogin = () => {
    localStorage.setItem("firstTimeUser", "no");
    loginWithRedirect();
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Toolbar className={classes.content}>
          <Link to="/"><IconButton className={classes.logo} >
          <img  src={logo} alt="logo" />
          </IconButton></Link>
          <div className={classes.buttonContainer}>
          {!IsEmployerNavbar ?
          <div>
          <Link to="/apply" style={{ textDecoration: 'none' }}><Button data-testid="navbar-apply-button" className={classes.signupButton}>Applicant Apply</Button></Link>
          <Button data-testid="navbar-login-button" className={classes.loginButton} onClick={() => handleLogin()}>Employer Login</Button>
          <Button data-testid="navbar-signup-button" className={classes.loginButton} onClick={() => handleSignup()}> Employer Sign up</Button>
          </div>
          :
          !applyNavBar && 
          <Button className={classes.signupButton} onClick={() => logout()}>log out</Button>
  }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}




