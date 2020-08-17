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
import { getSessionCookie, setSessionCookie } from '../../session';
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

  const {applicantInfo, setApplicantInfo, setUserInfo} = props;

  let page1 = {'fields':['firstName', 'lastName', 'address1', 'city', 'state', 'zipCode', 'country', 'email', 'password', 'validatedPassword', 'ssn', 'validatedSSN', 'bday']}
  let page2 = {'fields':['incomeType', 'payFrequency', 'recentCheck', 'additionalSourceOfIncome', 'employerName', 'routingNumber', 'bankAccountNumber', 'verifyBankAccountNumber']}
  let requiredFields = [page1, page2]

  const [activeStep, setActiveStep] = useState(0);
  const [startedTypingRequiredFields, setStartedTypingRequiredFields] = useState({});
  const [missingValues, setMissingValues] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [errorSendingUpdate, setErrorSendingUpdate] = useState(false);
  const [sentUserInfo, setSentUserInfo] = useState(false);
  const [date, setDate] = useState(Date.now());

  const session = getSessionCookie();

  const [fetchedUserInfo, setFetchedUserInfo] = useState(false);

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

  const handleNext = () => {
    setSessionCookie({...session, 'attemptedPageSubmit':true})
    if (activeStep < 2) {
      let fieldValues = requiredFields[activeStep].fields.map((field) => {
        // return applicantInfo[field] ? true : false
        return true // uncomment to bypass application validation
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

  const handleAddApplicantInformation = (key, e) => {
    let info = { ...applicantInfo }
    info[key] = e.target.value
    setApplicantInfo(info)
    handleStartedTypingRequiredFields(key)
  }

  const handleSendApplicationInfo = (applicationComplete) => {
    let url = 'https://8e7wggf57e.execute-api.us-east-1.amazonaws.com/default/add-application'
    let now = new Date(date); let mm = now.getUTCMonth() + 1; let dd = now.getUTCDate(); let yy = now.getUTCFullYear(); 
    let hh = now.getUTCHours(); let min = now.getUTCMinutes(); let ss = now.getUTCSeconds();
    
    if(applicantInfo.additionalSourceOfIncome === 'N / A'){applicantInfo.additionalIncomeAmount = 'N / A'; applicantInfo.additionalPayFrequency = 'N / A'}
    let payload = {...applicantInfo, "applicationComplete": applicationComplete, "date": `${yy}-${mm}-${dd}@${hh}:${min}:${ss}`}
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
    Object.keys(applicantInfo)
      .filter((key) => userFields.includes(key))
      .map((key) => {userDetails[key] = applicantInfo[key]})
  
    if(userDetails.additionalSourceOfIncome === 'N / A'){userDetails.additionalIncomeAmount = 'N / A'; userDetails.additionalPayFrequency = 'N / A'}
    let payload = {...userDetails, "memberSince": `${mm}-${dd}-${yy}`}
    fetch(url, {method: 'POST', body: JSON.stringify(payload)})
    .then((data) => {
      if(data.status == 200){
        setSentUserInfo(true)
        setApplicantInfo({}) 
        setStartedTypingRequiredFields({})
        setUserInfo({})
        setSessionCookie({})
      }
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    if(applicantInfo.additionalSourceOfIncome && applicantInfo.additionalSourceOfIncome != 'N / A'){
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
            {`Loan Application for $${applicantInfo.desiredLoanAmount ? applicantInfo.desiredLoanAmount : '400'}`}
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
        </Box>
      </div>
    </Fragment>
  );
}