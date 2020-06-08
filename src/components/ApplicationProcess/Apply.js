import React, { useEffect, useState, Fragment } from 'react';
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
import ProgressBar from '../misc/ProgressBar';

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

export default function Apply(props) {
  const classes = useStyles();

  const {applicantInfo, setApplicantInfo} = props;

  let page1 = {'fields':['firstName', 'lastName', 'address1', 'city', 'state', 'zipCode', 'country', 'email', 'password', 'validatedPassword', 'ssn', 'validatedSSN', 'bday']}
  let page2 = {'fields':['incomeType', 'payFrequency', 'recentCheck', 'additionalSourceOfIncome', 'employerName', 'routingNumber', 'bankAccountNumber', 'verifyBankAccountNumber']}
  let requiredFields = [page1, page2]

  const [activeStep, setActiveStep] = useState(0);
  const [startedTypingRequiredFields, setStartedTypingRequiredFields] = useState({});
  const [missingValues, setMissingValues] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);

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
      // let url = process.env.REACT_APP_ADD_USER_URL
      let url = 'https://8e7wggf57e.execute-api.us-east-1.amazonaws.com/default/add-user'
      let now = new Date(); let mm = now.getUTCMonth() + 1; let dd = now.getUTCDate(); let yy = now.getUTCFullYear(); 
      let hh = now.getUTCHours(); let min = now.getUTCMinutes(); let ss = now.getUTCSeconds();
      
      let payload = {...applicantInfo, "dateOfApplication": `${mm}-${dd}-${yy} ${hh}:${min}:${ss}`}
      fetch(url, {method: 'POST', body: JSON.stringify(payload)})
      .then((data) => null)
      .catch((err) => null)
    }
  });

  return (
    <Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={3}>
          <Typography component="h1" variant="h4" align="center">
            {`Loan Application for $${applicantInfo.desiredLoanAmount}`}
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Fragment>
            {activeStep === steps.length ? (
              !processingComplete ? (<ProgressBar processingComplete={processingComplete} setProcessingComplete={setProcessingComplete}/>) : (<Fragment>
                <Typography variant="h5" gutterBottom>
                  You're On Your Way to a Brighter Future!
                </Typography>
                <Typography variant="subtitle1">
                  We have receieved your application, and are currently reviewing your information.
                  Should additional information be required, we will reach out to you via the contact
                  information provided on this application.
                </Typography>
              </Fragment>)
            ) : (
              <Fragment>
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
              </Fragment>
            )}
          </Fragment>
        </Paper>
      </main>
    </Fragment>
  );
}