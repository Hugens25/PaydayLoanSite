import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { getSessionCookie, setSessionCookie } from '../../../session/session';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ViewApplications from './options/application/ViewApplications';
import ViewPayments from './options/payments/ViewPayments';
import LoanDetails from './options/loan/LoanDetails';
import ViewSettings from './options/settings/ViewSettings';

import { handleGetUserInfo } from '../../../utilities/utils'

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

  let session = getSessionCookie()
  console.log(session);

  const {userInfo, setUserInfo} = props;
  
  const [fetchedUserInfo, setFetchedUserInfo] = useState(false);

  useEffect(() => {
    if(!fetchedUserInfo && session.isLoggedIn){
      handleGetUserInfo(session.email)
      .then((data) => {
        if (data.statusCode === 200){
          let user = data.user
          setUserInfo({...userInfo, ...user})
          setFetchedUserInfo(true)
        }
      })
    }
  })
  
  const classes = useStyles();

  return(
      <Fragment>
          <CssBaseline />
          <div className={classes.layout}>
              <Box className={classes.container}>
                  <Paper className={classes.paper} elevation={3}>
                      {!session.isLoggedIn ? (<Redirect to="/login"/>) :
                        (
                          <Box className={classes.root}>
                            <Typography className={classes.headers} variant="h5" gutterBottom>My Account</Typography>
                            <Typography className={classes.headers}>{`Welcome${userInfo.firstName ? ', '+userInfo.firstName : '' }${userInfo.lastName ? ' '+userInfo.lastName : ''}!`}</Typography>
                            <Box className={classes.element}><ViewApplications userInfo={userInfo} setUserInfo={setUserInfo} /></Box>
                            <Box className={classes.element}><LoanDetails userInfo={userInfo} setUserInfo={setUserInfo} /></Box>
                            <Box className={classes.element}><ViewPayments userInfo={userInfo} setUserInfo={setUserInfo} /></Box>
                            <Box className={classes.element}><ViewSettings userInfo={userInfo} setUserInfo={setUserInfo} /></Box>
                          </Box>
                        )
                      }
                  </Paper>
              </Box>
          </div>
      </Fragment>    
  );
}