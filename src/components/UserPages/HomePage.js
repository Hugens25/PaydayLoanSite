import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

export default function HomePage(props) {

  const {userInfo, setUserInfo} = props

  const [userInfoIsFetched, setUserInfoIsFetched] = useState(false);

  async function getUserInfo() {
    let url = process.env.REACT_APP_GET_USER_URL
    let payload = {'email':userInfo.email}
    let data = await (await fetch(url, {method: 'POST', body: JSON.stringify(payload)})).json()
    let firstName = data.user.firstName
    let lastName = data.user.lastName
    setUserInfo({...userInfo, "firstName":firstName, "lastName":lastName})
  }

  const handleUserInfoIsFetched = () => {
    setUserInfoIsFetched(true)
  }

  useEffect(() => {
    getUserInfo();
    handleUserInfoIsFetched();
  });
  
  const classes = useStyles();
  return(
      <Fragment>
          <CssBaseline />
          <div className={classes.layout}>
              <Paper className={classes.paper} elevation={3}>
                  {
                    userInfoIsFetched &&
                    <Typography variant="h5" gutterBottom>{`${userInfo.firstName || ''} ${userInfo.lastName || ''} Home Page`}</Typography>
                  }
              </Paper>
          </div>
      </Fragment>        
  );
}