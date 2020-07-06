import React, { useEffect, useState, Fragment, useContext, useCallback } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { SessionContext, getSessionCookie, setSessionCookie } from '../../../session';

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
import NotFound from '../../misc/NotFound';

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

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    if(!session.userInfoIsFetched){forceUpdate(); setSessionCookie({...session, 'userInfoIsFetched':true})}
  });
  
  const classes = useStyles();

  return(
      <Fragment>
          <CssBaseline />
          <div className={classes.layout}>
              <Box className={classes.container}>
                  <Paper className={classes.paper} elevation={3}>
                      {/* {!session.userInfoIsFetched ? (<Box className={classes.spinnerContainer}><Spinner size={'5rem'}/></Box>) :  */}
                      {!session.isLoggedIn ? (<Redirect to="/login"/>) :
                        (
                          <Box className={classes.root}>
                            <Typography className={classes.headers} variant="h5" gutterBottom>My Account</Typography>
                            <Typography className={classes.headers}>{`Welcome${session.firstName ? ', '+session.firstName : '' }${session.lastName ? ' '+session.lastName : ''}!`}</Typography>
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