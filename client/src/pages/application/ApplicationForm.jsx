import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import logo from '../../assets/mainlogo.png';
import { WithContext as ReactTags } from 'react-tag-input';

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
skillsInput: {
    margin: '500px',
    '& input[type=text]': {
        height: '500px'
    }
},
submitApplicationButton: {
  border: '1px solid skyblue',
  marginTop: '50px'
}
}));

const ApplicationForm = () => {
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

    return (
<form className={classes.root} noValidate autoComplete="off">
      <div className={classes.applicationFormHeader}>
          <img src={logo} alt="" />
          <h2>Applying for 'insert job position here' role at 'insert company name here'.</h2>
      </div>
      <div className={classes.formLayout}>
        <TextField required id="standard-required" label="Full Name" />
        <TextField
          required
          id="standard-email-input"
          label="Email"
          type="email"
          autoComplete="email"
        />
        <TextField
          id="outlined-multiline-static"
          label="Objective"
          multiline
          rows={4}
          variant="outlined"
        />
        <TextField
          id="outlined-multiline-static"
          label="Summary"
          multiline
          rows={4}
          variant="outlined"
        />
        <ReactTags 
        className={classes.skillsInput}
         tags={Tags}
         handleDelete={handleDelete}
         handleAddition={handleAddition}
         delimiters={delimiters}
          />
        <Button color="primary" className={classes.submitApplicationButton}>Submit</Button>
      </div>
      
    </form>
    );
}

export default ApplicationForm;
