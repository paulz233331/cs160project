import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './apply.css';


import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/mainlogo.png';

const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
        alignSelf: 'center',
        justifySelf: 'center'
    }
},
submitApplicationButton: {
  border: '1px solid skyblue',
  width: '100%'
}
}));
    
function Apply() {
    const classes = useStyles();
    const KeyCodes = {
        comma: 188,
        enter: 13,
      };

    return (
        <html>
        <head>
            <script type="text/javascript">
        </script>
        </head>
        <body topmargin="40" leftmargin="40">
        <div>
            <Navbar employerNavBar={true} applyNavBar={true} />
        </div>
            <center>    <h1>Applicant Dashboard</h1></center><br />
             <form action="http://localhost:3001/test" method="POST" className={classes.root} >

                <div className={classes.applicationFormHeader}>
                 <label for="resume">Enter a resume:</label>
                 <textarea id="resume" class="resume-area" name="resume" rows="4" cols="50"></textarea>
                    <br />
                 <button type="submit" >Submit</button>
                </div>
             </form> <br />
             <form action="http://localhost:3001/test2" method="post" enctype="multipart/form-data" className={classes.root} >

               <div className={classes.applicationFormHeader}>
             <label for="resume2">Upload a resume:</label>
                <input type="file" id="resume2" name="resume2" /><br />
                <input type="submit" value="Upload" />
                <br />
                <a href="http://localhost:3000">Return to home page.</a>
               </div>
             </form>
             <br /> <br />
         </body>
        </html>
    )
}

export default Apply
