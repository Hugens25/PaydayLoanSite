import React, { useEffect, useState } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import LandingPage from '../LandingPage';
import Cookies from "js-cookie";


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
        // display: 'flex',
        // justifyContent: 'center'

      },
  }));

export default function Logout(props) {

  const {userInfo, setUserInfo, applicantInfo, setApplicantInfo, setLoginAttempts } = props
  const [open, setOpen] = useState(true);
  let [timeUntilRedirect, setTimeUntilRedirect] = useState(5);
  const history = useHistory();

  const handleLogOut = () => {
    setUserInfo({"isLoggedIn":false})
    setApplicantInfo({})
    setLoginAttempts(1)  
    handleRemoveLogOutBanner()
    Cookies.remove("session");
  }

  const handleRemoveLogOutBanner = () => {
    setTimeUntilRedirect(timeUntilRedirect--)
    let timer = setInterval(() => {setTimeUntilRedirect(timeUntilRedirect--)}, 1000)
    setTimeout(() => {setOpen(false); clearInterval(timer); history.push('/')}, 5000)
  }

  useEffect(() => {
      if(userInfo.isLoggedIn){
        handleLogOut();
      }
  })
  
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <div style={{width:'90vw'}}>{`Successfully Logged Out. You will be redirected to the home page within ${timeUntilRedirect} seconds.`}</div>
        </Alert>
      </Collapse>
      {/* <LandingPage userInfo={userInfo} setUserInfo={setUserInfo} applicantInfo={applicantInfo} setApplicantInfo={setApplicantInfo} setApplicantInfo={setApplicantInfo} setLoginAttempts={setLoginAttempts} /> */}
      {/* {!open && <Redirect to="/" />} */}
    </div> 
  );
}