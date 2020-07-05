import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { SessionContext, setSessionCookie } from '../../../session';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import Box from '@material-ui/core/Box';
import Spinner from '../../misc/Spinner';
import ViewApplications from './options/application/ViewApplications';
import ViewPayments from './options/payments/ViewPayments';
import LoanDetails from './options/loan/LoanDetails';

const useStyles = makeStyles((theme) => ({
    layout: {
      width: '98vw',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    paper: {
      width: '80vw',
      minHeight: '85vh',
      margin: 'auto',
      padding: theme.spacing(2),
    },
    container: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between'
    },
    headers: {
      // color: green[800]
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
    spinnerContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    element: {
      padding: '1rem',
    }
  }));

export default function HomePage(props) {

  const location = useLocation();

  const session = useContext(SessionContext);
  console.log('session',session);

  // const {userInfo} = location.state

  const {userInfo, setUserInfo} = props

  const [userInfoIsFetched, setUserInfoIsFetched] = useState(session.userInfoIsFetched);
  const [userInfoReceived, setUserInfoReceived] = useState(false);

  

  async function getUserInfo() {
    setUserInfoIsFetched(true)
    console.log("In getUserInfo");
    // let url = process.env.REACT_APP_GET_USER_URL
    let url = 'https://8e7wggf57e.execute-api.us-east-1.amazonaws.com/default/get-user'
    let payload = {'email':userInfo.email}
    let data = await (await fetch(url, {method: 'POST', body: JSON.stringify(payload)})).json()
    let firstName = data.user.firstName
    let lastName = data.user.lastName
    setUserInfoReceived(true)
    setSessionCookie({ ...session, 'userInfoIsFetched': true });
    setUserInfo({...userInfo, "firstName":firstName, "lastName":lastName, "userInfoIsFetched":true})
  }

  useEffect(() => {
    if(!userInfoIsFetched){console.log(session); getUserInfo()}
  });
  
  const classes = useStyles();

  return(
      <Fragment>
          <CssBaseline />
          <div className={classes.layout}>
              <Box className={classes.container}>
                  <Paper className={classes.paper} elevation={3}>
                      {!userInfoIsFetched ? (<Box className={classes.spinnerContainer}><Spinner size={'5rem'}/></Box>) : 
                        (
                          <Box className={classes.root}>
                            <Typography className={classes.headers} variant="h5" gutterBottom>My Account</Typography>
                            <Typography className={classes.headers}>{`Welcome${userInfo.firstName ? ', '+userInfo.firstName : '' }${userInfo.lastName ? ' '+userInfo.lastName : ''}!`}</Typography>
                            {/* <Button><Link to='/settings'>Settings</Link></Button> */}
                            <Box className={classes.element}><ViewApplications /></Box>
                            <Box className={classes.element}><LoanDetails /></Box>
                            <Box className={classes.element}><ViewPayments /></Box>
                          </Box>
                        )
                      }
                  </Paper>
              </Box>
          </div>
      </Fragment>    
  );
}