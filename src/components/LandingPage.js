import React, { Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';


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

  const {applicantInfo, setApplicantInfo} = props;

  const classes = useStyles();

  const handleAddApplicantInformation = (key, e) => {
    let info = { ...applicantInfo }
    info[key] = e.target.value
    setApplicantInfo(info)
  }

  async function handleSaveApplicantInfo() {
    let url = process.env.REACT_APP_SAVE_APPLICANT_URL
    let desiredLoanAmount = document.getElementById('desiredLoanAmount').innerText
    let payload = {...applicantInfo, "desiredLoanAmount":desiredLoanAmount}
    let data = await (await fetch(url, {method: 'POST', body: JSON.stringify(payload)})).json()
  }

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
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    variant="outlined"
                    onChange={(e) => {handleAddApplicantInformation("firstName", e)}}
                  />
                  <TextField
                    className={classes.textInputs}
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                    variant="outlined"
                    onChange={(e) => {handleAddApplicantInformation("lastName", e)}}
                  />
                  <TextField
                    className={classes.textInputs}
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    variant="outlined"
                    onChange={(e) => {handleAddApplicantInformation("email", e)}}
                  />
                  <Typography className={classes.textInputs} gutterBottom>
                    Desired Loan Amount
                  </Typography>
                  <Slider
                    id="desiredLoanAmount"
                    className={classes.slider}
                    defaultValue={20}
                    step={2.5}
                    scale={(num) => num * 20}
                    valueLabelDisplay="on"
                  />
                  <Box className={classes.buttons}>
                    <Button className={classes.button} onClick={handleSaveApplicantInfo}>
                      <Link style={{ textDecoration: 'none' }} to="/apply">Check My Options!</Link>
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </div>
      </Fragment>        
  );
}