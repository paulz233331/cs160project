import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from '../../assets/mainlogo.png';
import { useAuth0 } from '@auth0/auth0-react';

import Apply from '../../pages/apply/Apply'
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      background: '#EBF5EE',
  },
  bar: {
    maxHeight: '15vh',
    overflow: 'hidden'
  },
  buttonContainer: {
    marginRight: '5%'
  },

  applyButton: {
    borderRadius: '11px',
    border: 'solid 2px rgb(102, 178, 240)',
    padding: '10px',
    paddingLeft: '3rem',
    paddingRight: '3rem',
    color: '#009FFD',
    marginRight: '10px'
  },

  loginButton: {
    borderRadius: '11px',
    border: 'solid 2px rgb(102, 178, 240)',
    padding: '10px',
    paddingLeft: '3rem',
    paddingRight: '3rem',
    color: '#009FFD',
    marginRight: '10px'
  },
  signupButton: {
    borderRadius: '11px',
    border: 'solid 2px rgb(102, 178, 240)',
    backgroundColor: 'rgb(102, 178, 240)',
    padding: '10px',
    paddingLeft: '3rem',
    paddingRight: '3rem',
    color: 'white'
  },
  logo: {
    transform: 'scale(1.3)', 
    marginLeft: '5%'
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();

    const location = useLocation();
  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Toolbar className={classes.content}>
          <IconButton className={classes.logo}>
          <img  src={logo} alt="logo" />
          </IconButton>
          <div className={classes.buttonContainer}>
          <Link to="/apply"><Button className={classes.loginButton}>Apply</Button></Link>
          <applyButton />
          <Button  className={classes.loginButton} onClick={() => loginWithRedirect()}>Login</Button>
          <loginButton />
          <Button className={classes.signupButton} onClick={() => loginWithRedirect()}>Sign up</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

