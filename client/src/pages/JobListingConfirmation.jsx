import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../assets/mainlogo.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
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
  });

const JobListingConfirmation = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
  
    return (
      <Card className={classes.root}>
        <img src={logo}></img>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Your job listing has been created!
          </Typography>
          <Typography variant="h5" component="h2" className={classes.confirmationMessage}>
            Thank you for using Lucent ATS, your job listing has been created.
            Applicants can now apply to that position using Lucent ATS.
            An email confirmation of this job listing creation has been sent to your email.
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            You may now exit the page
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/"><Button size="medium">Click here to return to the home page</Button></Link>
        </CardActions>
      </Card>
    );
}

export default JobListingConfirmation;
