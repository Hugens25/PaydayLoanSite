import React, { useEffect, useState} from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { getSessionCookie, setSessionCookie} from '../../session';


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
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
  }));

export default function Logout(props) {

  let session = getSessionCookie();

  const {userInfo, setUserInfo, applicantInfo, setApplicantInfo, setLoginAttempts } = props
  const [open, setOpen] = useState(true);
  let [timeUntilRedirect, setTimeUntilRedirect] = useState(5);
  const [redirected, setRedirected] = useState(false);
  const [intervalValue, setIntervalValue] = useState(null);
  const [timeoutValue, setTimeoutValue] = useState(null);
  
  const history = useHistory();

  const handleLogOut = () => {
    setUserInfo({"isLoggedIn":false})
    setApplicantInfo({})
    setLoginAttempts(1)  
    setSessionCookie({"isLoggedIn":false})
    handleRemoveLogOutBanner()
  }

  const handleRemoveLogOutBanner = () => {
    setTimeUntilRedirect(timeUntilRedirect--)
    setIntervalValue(setInterval(() => {setTimeUntilRedirect(timeUntilRedirect--)}, 1000))
    setTimeoutValue(setTimeout(() => {setOpen(false); clearInterval(intervalValue); if(!redirected){redirectToHome()}}, 5000))
  }

  const redirectToHome = () => {
    setRedirected(true)    
    history.push('/')
  }

  useEffect(() => {
      if(session.isLoggedIn){
        handleLogOut();
      }
  })

  useEffect(() => {
    if(redirected){
      clearInterval(intervalValue);
      clearTimeout(timeoutValue);
    }
},[redirected]);
  
  const classes = useStyles();
  return(
    <div className={classes.root}>
      {!session.isLoggedIn ? (<Redirect to="/login"/>) :
      (
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                  redirectToHome();
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <div style={{width:'90vw'}}>{`Successfully Logged Out. You will be redirected to the home page within ${timeUntilRedirect} seconds.`}</div>
          </Alert>
        </Collapse>
      )}
      </div>
  );
}