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
import ApplicantForm from './pages/ApplicantInfo';
import BankForm from './pages/IncomeAndBankInfo';
import Review from './pages/Review';
import ProgressBar from '../misc/ProgressBar';
import { getSessionCookie, setSessionCookie } from '../../session/session';
import { handleGetUserInfo } from '../../utilities/utils';


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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  container: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between'
  },
  stepper: {
    width: '100%'
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
  label: {
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
    // width: '100%',
  },
}));

const steps = ['Applicant Info', 'Income & Bank Info', 'Review and Submit'];

function getStepContent(step, userInfo, setUserInfo, startedTypingRequiredFields, handleStartedTypingRequiredFields, handleAddUserInformation) {
  switch (step) {
    case 0:
      return <ApplicantForm 
              userInfo={userInfo} 
              setUserInfo={setUserInfo} 
              startedTypingRequiredFields={startedTypingRequiredFields}
              handleAddUserInformation={handleAddUserInformation}
            />;
    case 1:
      return <BankForm 
              userInfo={userInfo} 
              startedTypingRequiredFields={startedTypingRequiredFields}
              handleAddUserInformation={handleAddUserInformation}
            />;
    case 2:
      return <Review 
              userInfo={userInfo} 
              setUserInfo={setUserInfo} 
              startedTypingRequiredFields={startedTypingRequiredFields}
              handleStartedTypingRequiredFields={handleStartedTypingRequiredFields}
              handleAddUserInformation={handleAddUserInformation}
            />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Apply(props) {

  const classes = useStyles();

  const {userInfo, setUserInfo} = props;

  const session = getSessionCookie();
  
  let page1RequiredFieldsWhenSignedIn = {'fields':['firstName', 'lastName', 'address1', 'city', 'state', 'zipCode', 'country', 'desiredLoanAmount']}
  let page2RequiredFieldsWhenSignedIn = {'fields':['incomeType', 'payFrequency', 'recentCheck', 'additionalSourceOfIncome', 'employerName', 'routingNumber', 'bankAccountNumber', 'verifyBankAccountNumber']}

  let page1RequiredFieldsWhenSignedOut = {'fields':['firstName', 'lastName', 'address1', 'city', 'state', 'zipCode', 'country', 'email', 'password', 'validatedPassword', 'ssn', 'validatedSSN', 'bday', 'desiredLoanAmount']}
  let page2RequiredFieldsWhenSignedOut = {'fields':['incomeType', 'payFrequency', 'recentCheck', 'additionalSourceOfIncome', 'employerName', 'routingNumber', 'bankAccountNumber', 'verifyBankAccountNumber']}
  
  let requiredFields = session.isLoggedIn ? [page1RequiredFieldsWhenSignedIn, page2RequiredFieldsWhenSignedIn] : [page1RequiredFieldsWhenSignedOut, page2RequiredFieldsWhenSignedOut]

  const [activeStep, setActiveStep] = useState(0);
  const [startedTypingRequiredFields, setStartedTypingRequiredFields] = useState({});
  const [missingValues, setMissingValues] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [errorSendingUpdate, setErrorSendingUpdate] = useState(false);
  const [sentUserInfo, setSentUserInfo] = useState(false);
  const [date, setDate] = useState(Date.now());

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
  }, [fetchedUserInfo])

  const handleNext = () => {
    setSessionCookie({...session, 'attemptedPageSubmit':true})
    if (activeStep < 2) {
      let fieldValues = requiredFields[activeStep].fields.map((field) => {
        return userInfo[field] ? true : false
        // return true // uncomment to bypass application validation
      })
      if(!fieldValues.includes(false)){
        handleSendApplicationInfo('false');
        setMissingValues(false)
        setActiveStep(activeStep + 1);
        setSessionCookie({...session, 'attemptedPageSubmit':false})
      } else {
        setMissingValues(true)
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleStartedTypingRequiredFields = (key) => {
    let field = {...startedTypingRequiredFields}
    field[key] = true
    setStartedTypingRequiredFields(field)
  }

  const handleAddUserInformation = (key, e) => {
    let info = { ...userInfo }
    info[key] = e.target.value
    setUserInfo(info)
    handleStartedTypingRequiredFields(key)
  }

  const handleSendApplicationInfo = (applicationComplete) => {
    let url = 'https://8e7wggf57e.execute-api.us-east-1.amazonaws.com/default/add-application'
    let now = new Date(date); let mm = now.getUTCMonth() + 1; let dd = now.getUTCDate(); let yy = now.getUTCFullYear(); 
    let hh = now.getUTCHours(); let min = now.getUTCMinutes(); let ss = now.getUTCSeconds();
    
    if(userInfo.additionalSourceOfIncome === 'N / A'){userInfo.additionalIncomeAmount = 'N / A'; userInfo.additionalPayFrequency = 'N / A'}
    let payload = {...userInfo, "applicationComplete": applicationComplete, "date": `${yy}-${mm}-${dd}@${hh}:${min}:${ss}`}
    fetch(url, {method: 'POST', body: JSON.stringify(payload)})
    .then((data) => {
      if(data.status != 200){
        setErrorSendingUpdate(true)
      }
    })
    .catch((err) => {console.log(err)})
  }

  const handleSendUserInfo = () => {
    // let url = process.env.REACT_APP_ADD_USER_URL
    let url = 'https://8e7wggf57e.execute-api.us-east-1.amazonaws.com/default/add-user'
    let now = new Date(); let mm = now.getUTCMonth() + 1; let dd = now.getUTCDate(); let yy = now.getUTCFullYear(); 
    let userFields = [
      'firstName', 
      'lastName', 
      'email',
      'password', 
      'address1', 
      'address2', 
      'city', 
      'state', 
      'country',
      'zipCode', 
      'bankAccountNumber', 
      'routingNumber', 
      'ssn',
      'bday',
      'payFrequency',
      'incomeType',
      'employerName',
      'additionalSourceOfIncome',
      'additionalIncomeAmount',
      'additionalPayFrequency',
      'recentCheck',
    ]  
    const userDetails = {}
    Object.keys(userInfo)
      .filter((key) => userFields.includes(key))
      .map((key) => {userDetails[key] = userInfo[key]})
  
    if(userDetails.additionalSourceOfIncome === 'N / A'){userDetails.additionalIncomeAmount = 'N / A'; userDetails.additionalPayFrequency = 'N / A'}
    let payload = {...userDetails, "memberSince": `${mm}-${dd}-${yy}`}
    fetch(url, {method: 'POST', body: JSON.stringify(payload)})
    .then((data) => {
      if(data.status == 200){
        setSentUserInfo(true)
        setStartedTypingRequiredFields({})
        setSessionCookie({})
      }
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    if(userInfo.additionalSourceOfIncome && userInfo.additionalSourceOfIncome != 'N / A'){
      requiredFields[1]['fields'].push('additionalPayFrequency', 'additionalIncomeAmount')
    }
  })

  useEffect(() => {
    if (activeStep === steps.length) {
      handleSendApplicationInfo('true')
      if(!sentUserInfo){handleSendUserInfo()}
    }
  }, [activeStep, sentUserInfo]);

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <Box className={classes.container}>
        <Paper className={classes.paper} elevation={3}>
          <Typography component="h1" variant="h4" align="center">
            {`Loan Application for $${userInfo.desiredLoanAmount ? userInfo.desiredLoanAmount : '0'}`}
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label} className={steps.indexOf(label) === activeStep ? '' : classes.label}>
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
                {getStepContent(activeStep, userInfo, setUserInfo, startedTypingRequiredFields, handleStartedTypingRequiredFields, handleAddUserInformation)}
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
        </Box>
      </div>
    </Fragment>
  );
}