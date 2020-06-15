import React, { useEffect, useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Spinner from '../misc/Spinner';

const useStyles = makeStyles((theme) => ({
    layout: {
      width: '98vw',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    paper: {
      width: '80vw',
      height: '90vh',
      margin: 'auto',
      padding: theme.spacing(2),
    },
    container: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between'
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
  }));

export default function HomePage(props) {

  const {userInfo, setUserInfo} = props

  const [userInfoIsFetched, setUserInfoIsFetched] = useState(false);
  const [userInfoReceived, setUserInfoReceived] = useState(false);

  async function getUserInfo() {
    setUserInfoIsFetched(true)
    console.log('getting user info')
    // let url = process.env.REACT_APP_GET_USER_URL
    let url = 'https://8e7wggf57e.execute-api.us-east-1.amazonaws.com/default/get-user'
    let payload = {'email':userInfo.email}
    let data = await (await fetch(url, {method: 'POST', body: JSON.stringify(payload)})).json()
    let firstName = data.user.firstName
    let lastName = data.user.lastName
    setUserInfo({...userInfo, "firstName":firstName, "lastName":lastName})
    setUserInfoReceived(true)
  }

  useEffect(() => {
    if(!userInfoIsFetched){getUserInfo()}
  });
  
  const classes = useStyles();

  return(
      <Fragment>
          <CssBaseline />
          <div className={classes.layout}>
              <Box className={classes.container}>
                  <Paper className={classes.paper} elevation={3}>
                      {!userInfoReceived ? (<Box className={classes.spinnerContainer}><Spinner size={'5rem'}/></Box>) : 
                        (
                          <Box>
                            <Typography variant="h5" gutterBottom>My Account</Typography>
                            <Typography >{`Welcome${userInfo.firstName ? ', '+userInfo.firstName : '' }${userInfo.lastName ? ' '+userInfo.lastName : ''}!`}</Typography>
                            <Button><Link to='/settings'>Settings</Link></Button>
                          </Box>
                        )
                      }
                  </Paper>
              </Box>
          </div>
      </Fragment>    
  );
}