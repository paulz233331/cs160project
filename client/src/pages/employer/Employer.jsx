import React, {useState} from 'react';
import Navbar from '../../components/navbar/Navbar';
import './employer.css';
import { Redirect } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/mainlogo.png';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import CreateIcon from '@material-ui/icons/Create';

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
    borderRadius: '11px',
    border: 'solid 3px rgb(102, 178, 240)',
    padding: '10px',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    backgroundColor: '#EBF5EE',
    color: '#009FFD',
    marginRight: '10px',
    cursor: 'pointer',
},
card: {
    position: 'absolute',
    top: '20%',
    left: '25%',
    minWidth: 275,
    backgroundColor: '#EBF5EE',
    width: '50vw',
    alignSelf: 'center',
    justifySelf: 'center',
    paddingBottom: '80px'
  },
  queryTitle: {
      fontSize: '1.7rem',
      color: 'gray'
  },
  textField: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'white',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500
},

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
        <Card className={classes.card}>
             <form action="http://localhost:3001/emp1" method="post" className={classes.root} >
            <h1 style={{marginTop: '30px', fontSize: '3rem', fontFamily: 'verdana'}}>Employer Dashboard</h1>
              <br /><br />
             <div style={{height: '7px', width: '80px', backgroundColor: 'dodgerblue', marginBottom: '30px'}}></div>
                <h1 style={{marginBottom: '30px', fontSize: '2rem', fontFamily: 'verdana'}}>Resume Management</h1>
                <div className={classes.applicationFormHeader}>
                 <label className={classes.queryTitle} for="fnd">1) Text search: &nbsp;&nbsp;</label>
                 <div className={classes.formLayout}>
                 <TextField placeholder="Search for Keywords" className={classes.textField} type="text" id="fnd" name="fnd" />&nbsp;&nbsp;
                 &nbsp;&nbsp;
                 <InputLabel id="section">Section</InputLabel>
                 <Select labelId="section" name="sections" id="cars">
                   <MenuItem value="entire">entire</MenuItem>
                   <MenuItem value="education">education</MenuItem>
                   <MenuItem value="summary">summary</MenuItem>
                   <MenuItem value="objective">objective</MenuItem>
                   <MenuItem value="skills">skills</MenuItem>
                   <MenuItem value="experience">experience</MenuItem>
                   <MenuItem value="projects">projects</MenuItem>
                   <MenuItem value="technology">technology</MenuItem>
                   <MenuItem value="languages">languages</MenuItem>
                 </Select>&nbsp;&nbsp;
                 <input type="submit" value="Submit" className={classes.submitApplicationButton} /><br/><br/>
                 </div>
               </div>
             </form>


             <form action="http://localhost:3001/emp3" method="post" className={classes.root} >
               <div className={classes.queryTitle}>
                 2) Find applicants by status: &nbsp;&nbsp;
                 <div className={classes.formLayout}>
                     <InputLabel style={{marginTop: '20px'}} id="appstatus">Applicant Status</InputLabel>
                     <Select labelId="appstatus" name="status" id="status">
                        <MenuItem value="interviewed">interviewed</MenuItem>
                        <MenuItem value="hired">hired</MenuItem>
                        <MenuItem value="offered">offered</MenuItem>
                        <MenuItem value="otherOffer">otherOffer</MenuItem>
                      </Select> &nbsp;&nbsp;<input type="submit" value="Submit" className={classes.submitApplicationButton}  />
                 </div>
               </div>
              </form>
              <br/>
              <form action="http://localhost:3001/emp4" method="post" className={classes.root} >
                <div className={classes.applicationFormHeader}>
                  <label className={classes.queryTitle} for="psn">3) Find applicants by position: &nbsp;&nbsp; </label>
                  <div className={classes.formLayout}>
                   <TextField placeholder="Applicant Position" style={{width: '100%'}} type="text" id="psn" name="psn" />
                   &nbsp;&nbsp;
                   <input type="submit" value="Submit" className={classes.submitApplicationButton} />
                  </div>
                 </div>
               </form>
               <br />

             <form action="http://localhost:3001/emp2" method="post" className={classes.root} >
               <br /><br />
               <h1 style={{marginBottom: '30px', fontSize: '2rem', fontFamily: 'verdana'}}>Hiring Process</h1>
                <div className={classes.queryTitle}>
                 4) Create a list of names and emails: &nbsp;&nbsp;
                 <div className={classes.formLayout}>
                 <input type="submit" value="Generate" className={classes.submitApplicationButton} /><br/><br/>
                 </div>
                </div>
             </form>

               <form action="http://localhost:3001/emp5" method="post" className={classes.root} >
                <div className={classes.applicationFormHeader}>
                 <label className={classes.queryTitle} for="stu">5) Update an applicant's status: &nbsp;&nbsp; </label>
                  &nbsp;&nbsp;
                 <div className={classes.formLayout}>
                 <TextField style={{width: '100%'}} placeholder="Applicant Name" type="text" id="stu" name="stu" />&nbsp;&nbsp;
                 <InputLabel id="status">Status</InputLabel>
                 &nbsp;&nbsp; <Select labelId="status" name="sts" id="sts">
                      <MenuItem value="interviewed">interviewed</MenuItem>
                      <MenuItem value="hired">hired</MenuItem>
                      <MenuItem value="offered">offered</MenuItem>
                      <MenuItem value="otherOffer">otherOffer</MenuItem>
                  </Select> &nbsp;&nbsp;
                  <InputLabel id="setstatus">Set Status</InputLabel>
                  <Select labelId="setstatus" name="statusValue" id="statusValue">
                    <MenuItem default value="true">true</MenuItem>
                    <MenuItem value="false">false</MenuItem>
                  </Select> &nbsp;&nbsp;
                  <input className={classes.submitApplicationButton} type="submit" value="Update" />
                  </div>
                  <br /><br />
               </div>
              </form>

             <form action="http://localhost:3001/emp6" method="post" className={classes.root} >
               <div className={classes.applicationFormHeader}>
               <label className={classes.queryTitle} for="prof">6) Find the best applicants by their profile: &nbsp;&nbsp; </label>
                &nbsp;&nbsp;
                <div className={classes.formLayout}>
                <InputLabel id="score">Score</InputLabel>
                <Select labelId="score" name="profileValue" id="profileValue">
                  <MenuItem value="overall">overall</MenuItem>
                  <MenuItem value="hardworking">hardworking</MenuItem>
                  <MenuItem value="experience">experience</MenuItem>
                  <MenuItem value="intelligence">intelligence</MenuItem>
                  <MenuItem value="leadership">leadership</MenuItem>
                  <MenuItem value="organization">organization</MenuItem>
                </Select> &nbsp;&nbsp;
                <input className={classes.submitApplicationButton} type="submit" value="Submit" />
                </div>
              </div>
                <br /><br />
                <br/>
                
                <a  href="http://localhost:3000/employer-info">
                    <div style={{position: 'fixed', bottom : '70px', right: '70px', height: '100px', width: '100px', backgroundColor: 'rgb(102, 178, 240)', borderRadius: '10px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', textAlign: 'center', color: 'white', fontSize: '1rem', flexDirection: 'column', fontFamily: 'verdana' }}>
                        <CreateIcon />Create New Job Listing</div></a>
            </form>
            </Card>
         </body>
        </html>
    )
}

export default Employer
