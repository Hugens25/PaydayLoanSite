import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const StyledButton = withStyles({
    root: {
      color: green[500]
    }
  })(Button);

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
    warning : {
      color: red[500],
    },
  }));

export default function Login(props) {

  const classes = useStyles();
  const history = useHistory();

  const {userInfo, setUserInfo} = props

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [startedTypingEmail, setStartedTypingEmail] = useState(false);
  const [startedTypingPassword, setStartedTypingPassword] = useState(false);
  const [validateCredentials, setValidateCredentials] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(1);
  const [maximumAttemptsReached, setMaximumAttemptsReached] = useState(false);
  const [requiredValuesProvided, setRequiredValuesProvided] = useState(false);

  const handleEmaileEntry = (e) => {
    setStartedTypingEmail(true)
    setEmail(e.target.value);
  };

  const handlePasswordEntry = (e) => {
    setStartedTypingPassword(true)
    setPassword(e.target.value);
  };

  const handleValuesExist = () => {
    setRequiredValuesProvided(email && email.length > 0 && password && password.length > 0 ? true : false)
  }

  const handleValidateCredentials = (val) => {
    setValidateCredentials(val);
    if(val) {
      setUserInfo({...userInfo, "email":email, "isLoggedIn":true});
    }
  };

  const handleLoginAttempts = (val) => {
    setLoginAttempts(val + 1);
    handleMaximumAttemptsReached();
  };

  const handleMaximumAttemptsReached = () => {
    if(loginAttempts === 3){
      setMaximumAttemptsReached(true)
    }
  };
  
  const handleNotAllValuesProvided = () => {
    setStartedTypingEmail(true)
    setStartedTypingPassword(true)
  }

  useEffect(() => {
    if(validateCredentials) {
      history.push("/home");
    }
    handleValuesExist()
  });

  async function handleValidation() {
    let url = process.env.REACT_APP_VALIDATE_USER_URL
    let payload = {'email':email, 'password_hash':password}
    let data = await fetch(url, {method: 'POST', body: JSON.stringify(payload)})
    handleValidateCredentials(data.status === 200 ? true : false)
    handleLoginAttempts(loginAttempts);
  }

    return(
      <Fragment>
        <CssBaseline />
        <div className={classes.layout}>
          <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5" gutterBottom>Account Login</Typography>
              <Box mt={5}>
                  <Grid container spacing={4}>
                      <Grid item xs={12} sm={12}>
                          <TextField 
                            helperText={!email ? "*required" : ""}
                            id="email" 
                            label="Email" 
                            fullWidth 
                            autoComplete="email"
                            error={!email && startedTypingEmail} 
                            onChange={handleEmaileEntry}
                          />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <TextField 
                            helperText={!password ? "*required" : ""}
                            id="password" 
                            label="Password" 
                            type="password" 
                            fullWidth
                            error={!password && startedTypingPassword} 
                            onChange={handlePasswordEntry}
                          />
                      </Grid>
                  </Grid>
              </Box>
              <Box className={classes.warning}>
                {
                  !validateCredentials && loginAttempts > 1 && <Typography>{loginAttempts <= 3 ? 'Invalid Credentials Provided. Please try again.' : 'Maximum Login Attempts (3) has been exceeded. For your protection, this account has been locked.'}</Typography>
                }
              </Box>
              <Box className={classes.buttons}>
                  <StyledButton className={classes.button} onClick={!maximumAttemptsReached && requiredValuesProvided ? handleValidation : handleNotAllValuesProvided}>Login</StyledButton>
              </Box>
          </Paper>
        </div>
      </Fragment>
    );
}