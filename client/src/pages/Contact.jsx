import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../assets/mainlogo.png';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import emailjs from 'emailjs-com';

const useStyles = makeStyles({
    root: {
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      height: '100vh',
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
    submitButton: {
        borderRadius: '11px',
        border: 'solid 2px rgb(102, 178, 240)',
        padding: '10px',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        color: '#009FFD',
        marginRight: '10px'
      },
  });

const Contact = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
      
    function sendEmail(e) {
      e.preventDefault();

      emailjs.sendForm('service_ixzpq2b', 'template_ndeicis', e.target, 'user_KFRJ434zsQFvVZIM43ZS5')
        .then((result) => {
          emailjs.sendForm('service_ixzpq2b', 'template_jndggaq', e.target, 'user_KFRJ434zsQFvVZIM43ZS5')
          .then((result) => {
              window.location.reload();
          }, (error) => {
              console.log(error.text);
          });
        }, (error) => {
            console.log(error.text);
        });
    }

    return (
      <Card className={classes.root}>
        <Typography style={{paddingBottom: '20px'}} variant="h3" component="h2">
            Contact Us
          </Typography>

        <form action="#" onSubmit={sendEmail}>
          <TextField required id="standard-required" name="name" label="Full Name" style={{width: '30vw'}} />
        <br />
        <TextField
          required
          id="standard-email-input"
          name="email"
          label="Email"
          type="email"
          style={{width: '30vw'}}
          autoComplete="email"
        /><br />
        <TextField
        required
          id="outlined-multiline-static"
          name="message"
          label="Message"
          multiline
          rows={4}
          style={{width: '30vw', marginTop: '25px'}}
          variant="outlined"
        /> 
        <br />
        <button type="submit" style={{width: '30vw', marginTop: '25px'}} className={classes.submitButton}>Submit</button>
        </form>
      </Card>
    );
}

export default Contact;