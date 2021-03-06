import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../assets/mainlogo.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles({
    root: {
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      height: '100vh',
      backgroundColor: "rgb(102, 178, 240)"
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
        backgroundColor: 'rgb(102, 178, 240)',
        padding: '10px',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        color: 'white',
        zIndex: '1'
      },
  });

const Pricing = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const { loginWithRedirect } = useAuth0();
  
    return (
      <Card className={classes.root}>
        <Typography style={{marginBottom: '50px', color: 'white'}}  variant="h3" component="h2">
            Pricing
          </Typography>
        <div className="pricingCards">
            <div className="pricingCard">
                <h1 style={{marginTop: '35px', fontFamily: 'didot', color: 'white', marginBottom: '60px'}}>Basic Tier</h1>
                <ul>
                    <li className="pricingList">- Up to 1000 job applicants</li>
                    <li className="pricingList">- Up to 5 job listings</li>
                    <li className="pricingList">- Up to 50 queries per month</li>
                </ul>
                <h2 style={{paddingTop: '20px', color: 'white', fontFamily: 'verdana'}}>$60/mo per user</h2>
                <Button style={{maxWidth: '17vw', marginTop: '105px'}} className={classes.submitButton} onClick={() => loginWithRedirect()}>Try For Free!</Button>

            </div>
            <div className="pricingCard2">
                <h1 style={{marginTop: '35px', fontFamily: 'didot', color: 'white', marginBottom: '60px'}}>Premium Tier</h1>
                <ul>
                    <li className="pricingList">- Unlimited job applicants √</li>
                    <li className="pricingList">- Unlimited job listings √</li>
                    <li className="pricingList">- Unlimited queries √</li>
                </ul>
                <h2 style={{paddingTop: '20px', color: 'white', fontFamily: 'verdana'}}>$100/mo per user</h2>
                <Button style={{maxWidth: '17vw', marginTop: '105px'}} className={classes.submitButton} onClick={() => loginWithRedirect()}>More Info</Button>
            </div>
        </div>
      </Card>
    );
}

export default Pricing;