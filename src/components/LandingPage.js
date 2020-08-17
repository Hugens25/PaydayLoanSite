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
import { getSessionCookie } from '../session';


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

  const session = getSessionCookie;

  const {applicantInfo, setApplicantInfo} = props;

  const history = useHistory();

  const [startedTypingField, setStartedTypingField] = useState({});
  const [submitingApplicantInfo, setSubmitingApplicantInfo] = useState(false);

  const [fetchedUserInfo, setFetchedUserInfo] = useState(false);

  const classes = useStyles();

  const handleAddApplicantInformation = (key, value) => {
    handleStartedTypingField(key)
    let info = { ...applicantInfo }
    info[key] = value
    setApplicantInfo(info)
  }

  const handleStartedTypingField = (key) => {
    let fields = { ...startedTypingField }
    fields[key] = true
    setStartedTypingField(fields)
  }

  const checkAllRequiredFieldsProvided = () => {
    return applicantInfo.firstName && applicantInfo.lastName && applicantInfo.email
  }

  const setStartedTypingForAllFields = () => {
    setStartedTypingField({'firstName':true, 'lastName':true, 'email':true})
  }

  async function handleSaveApplicantInfo() {
    setStartedTypingForAllFields()
    if (checkAllRequiredFieldsProvided()){
      setSubmitingApplicantInfo(true)
      // let url = process.env.REACT_APP_SAVE_APPLICANT_URL
      let url = 'https://8e7wggf57e.execute-api.us-east-1.amazonaws.com/default/save-applicant'
      applicantInfo.desiredLoanAmount = applicantInfo.desiredLoanAmount ? applicantInfo.desiredLoanAmount.toString() : defaultLoanAmount.toString()
      let data = await (await fetch(url, {method: 'POST', body: JSON.stringify(applicantInfo)})).json()
      if(data.status === 200){setSubmitingApplicantInfo(false); history.push("/apply");}
    }
  }

  useEffect(() => {
    if(submitingApplicantInfo && !applicantInfo.desiredLoanAmount){handleAddApplicantInformation('desiredLoanAmount', defaultLoanAmount.toString())}
  }, [applicantInfo, submitingApplicantInfo])

  useEffect(() => {
    if(!fetchedUserInfo && session.isLoggedIn){
      handleGetUserInfo(session.email)
      .then((data) => {
        if (data.statusCode === 200){
          let user = data.user
          setApplicantInfo({...applicantInfo, ...user})
          setFetchedUserInfo(true)
        }
      })
    }
  })

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
                    helperText={!applicantInfo.firstName && startedTypingField.firstName ? "*required" : ""}
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    variant="outlined"
                    value={applicantInfo.firstName}
                    error={!applicantInfo.firstName && startedTypingField.firstName }
                    onChange={(e) => {handleAddApplicantInformation("firstName", e.target.value)}}
                    onKeyPress={(e)=>{if(e.key === "Enter"){document.getElementById('checkMyOptionsButton').click();}}}
                  />
                  <TextField
                    className={classes.textInputs}
                    helperText={!applicantInfo.lastName && startedTypingField.lastName ? "*required" : ""}
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                    variant="outlined"
                    value={applicantInfo.lastName}
                    error={!applicantInfo.lastName && startedTypingField.lastName }
                    onChange={(e) => {handleAddApplicantInformation("lastName", e.target.value)}}
                    onKeyPress={(e)=>{if(e.key === "Enter"){document.getElementById('checkMyOptionsButton').click();}}}
                  />
                  <TextField
                    className={classes.textInputs}
                    helperText={!applicantInfo.email && startedTypingField.email ? "*required" : ""}
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    variant="outlined"
                    value={applicantInfo.email}
                    error={!applicantInfo.email && startedTypingField.email }
                    onChange={(e) => {handleAddApplicantInformation("email", e.target.value)}}
                    onKeyPress={(e)=>{if(e.key === "Enter"){document.getElementById('checkMyOptionsButton').click();}}}
                  />
                  <Typography className={classes.textInputs} gutterBottom>
                    Desired Loan Amount
                  </Typography>
                  <Slider
                    id="desiredLoanAmount"
                    name="desiredLoanAmount"
                    className={classes.slider}
                    defaultValue={applicantInfo.desiredLoanAmount ? applicantInfo.desiredLoanAmount / 20 : defaultLoanAmount / 20}
                    step={2.5}
                    scale={(num) => num * 20}
                    valueLabelDisplay="on"
                    onChange={(e) => {handleAddApplicantInformation("desiredLoanAmount", parseFloat(document.getElementsByName('desiredLoanAmount')[0].value) * 20)}}
                  />
                  <Box className={classes.buttons}>
                    <Button id="checkMyOptionsButton" className={classes.button} onClick={handleSaveApplicantInfo}>
                      {submitingApplicantInfo ? <Spinner size={'2rem'}/> : "Check My Options!"}
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </div>
      </Fragment>        
  );
}