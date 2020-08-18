import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Spinner from './misc/Spinner';

import { handleGetUserInfo } from '../utilities/utils'
import { getSessionCookie } from '../session/session';

import * as CryptoJS from "crypto-js";



const useStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: '90vw',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(3),
      },
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),

    },
    textInputs: {
      marginTop: theme.spacing(3),
    },
    slider: {
      marginTop: theme.spacing(5),
    }
  }));

export default function LandingPage(props) {

  const defaultLoanAmount = 400;

  const session = getSessionCookie();

  const {userInfo, setUserInfo} = props;

  const history = useHistory();

  const [startedTypingField, setStartedTypingField] = useState({});
  const [submitingUserInfo, setSubmitingUserInfo] = useState(false);

  const [fetchedUserInfo, setFetchedUserInfo] = useState(false);

  const classes = useStyles();

  const handleAddUserInformation = (key, value) => {
    handleStartedTypingField(key)
    let info = { ...userInfo }
    info[key] = value
    setUserInfo(info)
  }

  const handleStartedTypingField = (key) => {
    let fields = { ...startedTypingField }
    fields[key] = true
    setStartedTypingField(fields)
  }

  const checkAllRequiredFieldsProvided = () => {
    return userInfo.firstName && userInfo.lastName && userInfo.email
  }

  const setStartedTypingForAllFields = () => {
    setStartedTypingField({'firstName':true, 'lastName':true, 'email':true})
  }

  async function handleSaveUserInfo() {
    setStartedTypingForAllFields()
    if (checkAllRequiredFieldsProvided()){
      setSubmitingUserInfo(true)
      // let url = process.env.REACT_APP_SAVE_APPLICANT_URL
      let url = 'https://8e7wggf57e.execute-api.us-east-1.amazonaws.com/default/save-applicant'
      userInfo.desiredLoanAmount = userInfo.desiredLoanAmount ? userInfo.desiredLoanAmount.toString() : defaultLoanAmount.toString()
      let data = await (await fetch(url, {method: 'POST', body: JSON.stringify(userInfo)})).json()
      if(data.status === 200){setSubmitingUserInfo(false); history.push("/apply");}
    }
  }

  useEffect(() => {
    if(submitingUserInfo && !userInfo.desiredLoanAmount){handleAddUserInformation('desiredLoanAmount', defaultLoanAmount.toString())}
  }, [userInfo, submitingUserInfo])

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
  }, [fetchedUserInfo])

  return(
      <Fragment>
          <CssBaseline />
          <div className={classes.layout}>
            <Grid container spacing={1}>
              <Grid item xs={8} sm={8}>
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h5" gutterBottom>Company Name</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Paper className={classes.paper} elevation={3}>
                  <Typography variant="h6" gutterBottom>Start Your Application!</Typography>
                  <TextField
                    className={classes.textInputs}
                    helperText={!userInfo.firstName && startedTypingField.firstName ? "*required" : ""}
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    variant="outlined"
                    value={userInfo.firstName}
                    error={!userInfo.firstName && startedTypingField.firstName }
                    onChange={(e) => {handleAddUserInformation("firstName", e.target.value)}}
                    onKeyPress={(e)=>{if(e.key === "Enter"){document.getElementById('checkMyOptionsButton').click();}}}
                  />
                  <TextField
                    className={classes.textInputs}
                    helperText={!userInfo.lastName && startedTypingField.lastName ? "*required" : ""}
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                    variant="outlined"
                    value={userInfo.lastName}
                    error={!userInfo.lastName && startedTypingField.lastName }
                    onChange={(e) => {handleAddUserInformation("lastName", e.target.value)}}
                    onKeyPress={(e)=>{if(e.key === "Enter"){document.getElementById('checkMyOptionsButton').click();}}}
                  />
                  <TextField
                    className={classes.textInputs}
                    helperText={!userInfo.email && startedTypingField.email ? "*required" : ""}
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    variant="outlined"
                    value={userInfo.email}
                    error={!userInfo.email && startedTypingField.email }
                    onChange={(e) => {handleAddUserInformation("email", e.target.value)}}
                    onKeyPress={(e)=>{if(e.key === "Enter"){document.getElementById('checkMyOptionsButton').click();}}}
                  />
                  <Typography className={classes.textInputs} gutterBottom>
                    Desired Loan Amount
                  </Typography>
                  <Slider
                    id="desiredLoanAmount"
                    name="desiredLoanAmount"
                    className={classes.slider}
                    defaultValue={userInfo.desiredLoanAmount ? userInfo.desiredLoanAmount / 20 : defaultLoanAmount / 20}
                    step={2.5}
                    scale={(num) => num * 20}
                    valueLabelDisplay="on"
                    onChange={(e) => {handleAddUserInformation("desiredLoanAmount", parseFloat(document.getElementsByName('desiredLoanAmount')[0].value) * 20)}}
                  />
                  <Box className={classes.buttons}>
                    <Button id="checkMyOptionsButton" className={classes.button} onClick={handleSaveUserInfo}>
                      {submitingUserInfo ? <Spinner size={'2rem'}/> : "Check My Options!"}
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </div>
      </Fragment>        
  );
}