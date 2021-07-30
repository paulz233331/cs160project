import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import logo from '../../assets/mainlogo.png';
import { WithContext as ReactTags } from 'react-tag-input';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      overflow: 'scroll',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
},
formLayout: {
    display: 'flex',
    flexDirection: 'column',
},
applicationFormHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'gray',
    '& img': {
        height: '200px',
        width: '200px',
        alignSelf: 'center',
        justifySelf: 'center'
    }
},
submitApplicationButton: {
  border: '1px solid skyblue',
  marginTop: '50px',
  width: '100%'
}
}));

const EmployerInfo = () => {
    const [Tags, setTags] = useState([{id: 'html', text: 'html'}, {id: 'javascript', text: 'javascript'}])
    const classes = useStyles();
    const KeyCodes = {
        comma: 188,
        enter: 13,
      };
       
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = e => {
        setTags(Tags.filter((tag, index) => index !== e));
    }

    const handleAddition = tag => {
        setTags([...Tags, tag]);
    }

    // temporary submit function
    const handleSubmit = () => {
      localStorage.clear();
    }

    const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    if (isLoading)
        return <div>Loading...</div>
    return (
    <form className={classes.root} action="http://localhost:3001/empInf" method="POST">
     <div className={classes.applicationFormHeader}>
          <img src={logo} alt="" />
          <h2>Create a New Job Listing</h2>
      <h2>{user} </h2>
      </div>

      <div className={classes.formLayout}>
        <form action="http://localhost:3001/empInf" method="POST">
        <TextField id="standard-required" name="company" label="Company Name" />
        <TextField
          required
          id="standard-email-input"
          name = "email"
          label="Email"
          type="email"
          autoComplete="email"
        />
        <TextField
          id="outlined-multiline-static"
          name = "jobTitle"
          label="Job Title"
        />
        <Button color="primary" className={classes.submitApplicationButton} type="submit">Submit</Button>
        </form>
        <br /> <a href="http://localhost:3000">Return to home page.</a>
      </div>
    </form>
    );
}

export default EmployerInfo;
