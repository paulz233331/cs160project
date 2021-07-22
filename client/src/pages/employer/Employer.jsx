import React, {useState} from 'react';
import Navbar from '../../components/navbar/Navbar';
import './employer.css';
import { Redirect } from 'react-router';
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

function Employer() {
    const isFirstTimeUser = localStorage.getItem("firstTimeUser");
    const classes = useStyles();
    const KeyCodes = {
        comma: 188,
        enter: 13,
      };


    if (isFirstTimeUser === "yes") return <Redirect to="/employer-info" />
    
    return (
        <html>
        <head>
            <script type="text/javascript">
        </script>
        </head>
        <body>

        <div>
            <Navbar employerNavBar={true} />
        </div>
             <form action="http://localhost:3001/emp1" method="post" className={classes.root} >
            <h1>Employer Dashboard</h1>
             Resume Management <br /><br />
                <div className={classes.applicationFormHeader}>
                 <label for="fnd">1) Text search: &nbsp;&nbsp;</label>
                 <div className={classes.formLayout}>
                 <input type="text" id="fnd" name="fnd" />&nbsp;&nbsp;
                 Section:&nbsp;&nbsp;
                 <select name="sections" id="cars">
                   <option value="entire">entire</option>
                   <option value="education">education</option>
                   <option value="summary">summary</option>
                   <option value="objective">objective</option>
                   <option value="skills">skills</option>
                   <option value="experience">experience</option>
                   <option value="projects">projects</option>
                   <option value="technology">technology</option>
                   <option value="languages">languages</option>
                 </select>&nbsp;&nbsp;
                 <input type="submit" value="Submit" className={classes.submitApplicationButton} /><br/><br/>
                 </div>
               </div>
             </form>


             <form action="http://localhost:3001/emp3" method="post" className={classes.root} >
               <div className={classes.applicationFormHeader}>
                 2) Find applicants by status: &nbsp;&nbsp;
                 <div className={classes.formLayout}>
                     <select name="status" id="status">
                        <option value="interviewed">interviewed</option>
                        <option value="hired">hired</option>
                        <option value="offered">offered</option>
                        <option value="otherOffer">otherOffer</option>
                      </select> &nbsp;&nbsp;<input type="submit" value="Submit" className={classes.submitApplicationButton}  />
                 </div>
               </div>
              </form>
              <br/>
              <form action="http://localhost:3001/emp4" method="post" className={classes.root} >
                <div className={classes.applicationFormHeader}>
                  <label for="psn">3) Find applicants by position: &nbsp;&nbsp; </label>
                  <div className={classes.formLayout}>
                   <input type="text" id="psn" name="psn" />
                   &nbsp;&nbsp;
                   <input type="submit" value="Submit" className={classes.submitApplicationButton} />
                  </div>
                 </div>
               </form>
               <br />

             <form action="http://localhost:3001/emp2" method="post" className={classes.root} >
               Hiring Process <br /><br />
                <div className={classes.applicationFormHeader}>
                 4) Create a list of names and emails: &nbsp;&nbsp;
                 <div className={classes.formLayout}>
                 <input type="submit" value="Generate" className={classes.submitApplicationButton} /><br/><br/>
                 </div>
                </div>
             </form>

               <form action="http://localhost:3001/emp5" method="post" className={classes.root} >
                <div className={classes.applicationFormHeader}>
                 <label for="stu">5) Update an applicant's status: &nbsp;&nbsp; </label>
                 Name: &nbsp;&nbsp;
                 <div className={classes.formLayout}>
                 <input type="text" id="stu" name="stu" />&nbsp;&nbsp;
                 Status: &nbsp;&nbsp; <select name="sts" id="sts">
                      <option value="interviewed">interviewed</option>
                      <option value="hired">hired</option>
                      <option value="offered">offered</option>
                      <option value="otherOffer">otherOffer</option>
                  </select> &nbsp;&nbsp;
                  <select name="statusValue" id="statusValue">
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select> &nbsp;&nbsp;
                  <input type="submit" value="Update" />
                  </div>
                  <br /><br />
               </div>
              </form>

             <form action="http://localhost:3001/emp6" method="post" className={classes.root} >
               <div className={classes.applicationFormHeader}>
               <label for="prof">6) Find the best applicants by their profile: &nbsp;&nbsp; </label>
                Score:&nbsp;&nbsp;
                <div className={classes.formLayout}>
                <select name="profileValue" id="profileValue">
                  <option value="overall">overall</option>
                  <option value="hardworking">hardworking</option>
                  <option value="experience">experience</option>
                  <option value="intelligence">intelligence</option>
                  <option value="leadership">leadership</option>
                  <option value="organization">organization</option>
                </select> &nbsp;&nbsp;
                <input type="submit" value="Submit" />
                </div>
              </div>
                <br /><br />
                <a href="http://localhost:3000">Return to home page.</a>
                <br/>
                <a href="http://localhost:3000/employer-info">Edit Employer Info</a>
            </form>
         </body>
        </html>
    )
}

export default Employer
