import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import red from '@material-ui/core/colors/red';
import ApplicantForm from './ApplicantInfo';
import BankForm from './IncomeAndBankInfo';
import Review from './Review';

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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  warning : {
    color: red[500],
  },
}));

const steps = ['Applicant Info', 'Income and Bank Details', 'Review and Submit'];

function getStepContent(step, applicantInfo, setApplicantInfo, startedTypingRequiredFields, handleStartedTypingRequiredFields, handleAddApplicantInformation) {
  switch (step) {
    case 0:
      return <ApplicantForm 
              applicantInfo={applicantInfo} 
              setApplicantInfo={setApplicantInfo} 
              startedTypingRequiredFields={startedTypingRequiredFields}
              handleAddApplicantInformation={handleAddApplicantInformation}
            />;
    case 1:
      return <BankForm 
              applicantInfo={applicantInfo} 
              startedTypingRequiredFields={startedTypingRequiredFields}
              handleAddApplicantInformation={handleAddApplicantInformation}
            />;
    case 2:
      return <Review 
              applicantInfo={applicantInfo} 
              setApplicantInfo={setApplicantInfo} 
              startedTypingRequiredFields={startedTypingRequiredFields}
              handleStartedTypingRequiredFields={handleStartedTypingRequiredFields}
              handleAddApplicantInformation={handleAddApplicantInformation}
            />;
    default:
      throw new Error('Unknown step');
  }
}

export default function SubmitApplication() {
  const classes = useStyles();

  let page1 = {'fields':['firstName', 'lastName', 'address1', 'city', 'state', 'zipCode', 'country', 'email', 'password', 'validatedPassword', 'ssn', 'validatedSSN', 'bday']}
  let page2 = {'fields':['incomeType', 'payFrequency', 'recentCheck', 'additionalSourceOfIncome', 'employerName', 'routingNumber', 'bankAccountNumber', 'verifyBankAccountNumber']}
  let requiredFields = [page1, page2]

  const [activeStep, setActiveStep] = useState(0);
  const [applicantInfo, setApplicantInfo] = useState({});
  const [startedTypingRequiredFields, setStartedTypingRequiredFields] = useState({});
  const [missingValues, setMissingValues] = useState(false);

  const handleNext = () => {
    // if (activeStep < 2) {
    //   let fieldValues = requiredFields[activeStep].fields.map((field) => {
    //     return applicantInfo[field] ? true : false
    //   })
    //   if(!fieldValues.includes(false)){
    //     setMissingValues(false)
    //     setActiveStep(activeStep + 1);
    //   } else {
    //     setMissingValues(true)
    //   }
    // } else {
    //   setActiveStep(activeStep + 1);
    // }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleStartedTypingRequiredFields = (key) => {
    let field = {...startedTypingRequiredFields}
    field[key] = true
    setStartedTypingRequiredFields(field)
  }

  const handleAddApplicantInformation = (key, e) => {
    let info = { ...applicantInfo }
    info[key] = e.target.value
    setApplicantInfo(info)
    handleStartedTypingRequiredFields(key)
  }

  useEffect(() => {
    if (activeStep === steps.length) {
      let url = process.env.REACT_APP_ADD_USER_URL
      let payload = applicantInfo
      fetch(url, {method: 'POST', body: JSON.stringify(payload)})
      .then((data) => {console.log(data)})
      .catch((err) => {console.log(err)})
    }
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={3}>
          <Typography component="h1" variant="h4" align="center">
            Application Submitted Successfully!
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  You're On Your Way to a Brighter Future!
                </Typography>
                <Typography variant="subtitle1">
                  We have receieved your application, and are currently reviewing your information.
                  Should additional information be required, we will reach out to you via the contact
                  information provided on this application.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, applicantInfo, setApplicantInfo, startedTypingRequiredFields, handleStartedTypingRequiredFields, handleAddApplicantInformation)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Submit Application' : 'Next'}
                  </Button>
                </div>
                <Box className={classes.warning}>
                {missingValues && <Typography>All required fields must be filled before continuing.</Typography>}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}