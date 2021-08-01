import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../assets/mainlogo.png';
import { Link } from 'react-router-dom';
import StorageIcon from '@material-ui/icons/Storage';
import DescriptionIcon from '@material-ui/icons/Description';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles({
    root: {
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      textAlign: 'center',
      height: '100vh'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 50,
    },
    pos: {
      marginBottom: 12,
    },
    aboutustabs: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-evenly'
    },
    aboutustab: {
        height: '250px',
        width: '250px',
        backgroundColor: '#EBF5EE',
        borderRadius: '13px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        boxShadow: '5px 5px 10px #888888'
    }
  });

const About = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
  
    return (
      <Card className={classes.root}>
        <Typography style={{paddingBottom: '10px'}} variant="h3" component="h2">
            About Us
          </Typography>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <p style={{fontSize: '2rem', fontFamily: 'verdana', maxWidth: '80%', color: 'gray'}}> Lucent is an applicant tracking system for both applicants and employers. It parses resumes and stores them in a database, allowing employers to easily access and manage applicant data. It was created to simplify the job process for employers and applicants alike.
</p>
          </div>
          <div className={classes.aboutustabs}>
              <div className={classes.aboutustab}>
                <DescriptionIcon style={{transform: 'scale(4)', color: 'dodgerblue'}} />
                  <p style={{fontSize: '1rem', fontFamily: 'verdana'}}>Applicant Resume Parser</p>
              </div>
              <div className={classes.aboutustab}>
                  <StorageIcon style={{transform: 'scale(4)', color: 'dodgerblue'}} />
                <p style={{fontSize: '1rem', fontFamily: 'verdana'}}>Applicant Storage in Database</p>
              </div>
              <div className={classes.aboutustab}>
                <GroupIcon style={{transform: 'scale(4)', color: 'dodgerblue'}} />
                <p style={{fontSize: '1rem', fontFamily: 'verdana'}}>Employer Dashboard for Applicant Management</p>
              </div>
          </div>
      </Card>
    );
}

export default About;