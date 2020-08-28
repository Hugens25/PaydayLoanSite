import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { getSessionCookie } from '../../../session/session';

const useStyles = makeStyles((theme) => ({
  
  inputLabel: {
    paddingLeft: theme.spacing(2),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  datePicker: {
    bottom: '0.5rem',
    width: '100%'
  }
}));

export default function AddressForm(props) {

  const classes = useStyles();

  const date = new Date();
  let minimumValidDOB = date.setFullYear(date.getFullYear() - 18);
  
  const session = getSessionCookie();

  const {
          userInfo, 
          setUserInfo, 
          startedTypingRequiredFields, 
          handleAddUserInformation,
        } = props;    

  const [passwordValidated, setValidatedPassword] = useState(true);
  const [ssnValidated, setValidatedSSN] = useState(true); 

  const handleDateChange = (date) => {
    let mm, dd, yyyy, formattedBday;
    if (date > minimumValidDOB) {
      alert("Unable to Proceed:\n\nYou must be 18 years old or older to apply for a Payday Loan.")
    } else {
      if (date){
        mm = date.getUTCMonth() + 1
        dd = date.getUTCDate()
        yyyy = date.getUTCFullYear()
        formattedBday = `${mm}/${dd}/${yyyy}`
      }
      setUserInfo({...userInfo, "bday":formattedBday})
    }
  };

  const handleValidatePassword = (original, validated) => {
    setValidatedPassword(original === validated ? true : false)
  }

  const handleValidateSSN = (original, validated) => {
    setValidatedSSN(original === validated ? true : false)
  }

  useEffect(() => {
    handleValidatePassword(userInfo.password, userInfo.validatedPassword)
    handleValidateSSN(userInfo.ssn, userInfo.validatedSSN)
  });

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Tell Us About Yourself
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.firstName ? "*required" : ""}
            id="firstName"
            name="firstName"
            value={userInfo.firstName}
            label="First Name"
            InputLabelProps={{
              shrink: userInfo.firstName ? true : false,
            }}
            fullWidth
            autoComplete="given-name"
            error={!userInfo.firstName && (startedTypingRequiredFields.firstName || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.lastName ? "*required" : ""}
            id="lastName"
            name="lastName"
            label="Last name"
            InputLabelProps={{
              shrink: userInfo.lastName ? true : false,
            }}
            fullWidth
            autoComplete="family-name"
            value={userInfo.lastName}
            error={!userInfo.lastName && (startedTypingRequiredFields.lastName || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            helperText={!userInfo.address1 ? "*required" : ""}
            id="address1"
            name="address1"
            label="Address line 1"
            InputLabelProps={{
              shrink: userInfo.address1 ? true : false,
            }}
            fullWidth
            autoComplete="billing address-line1"
            value={userInfo.address1}
            error={!userInfo.address1 && (startedTypingRequiredFields.address1 || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            id="address2"
            name="address2"
            label="Address line 2"
            InputLabelProps={{
              shrink: userInfo.address2 ? true : false,
            }}
            fullWidth
            autoComplete="billing address-line2"
            value={userInfo.address2}
            onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.city ? "*required" : ""}
            id="city"
            name="city"
            label="City"
            InputLabelProps={{
              shrink: userInfo.city ? true : false,
            }}
            fullWidth
            autoComplete="billing address-level2"
            value={userInfo.city}
            error={!userInfo.city && (startedTypingRequiredFields.city || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            variant="outlined"
            helperText={!userInfo.state ? "*required" : ""}
            id="state" 
            name="state" 
            label="State/Province/Region"
            InputLabelProps={{
              shrink: userInfo.state ? true : false,
            }}
            fullWidth
            value={userInfo.state}
            error={!userInfo.state && (startedTypingRequiredFields.state || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.zipCode ? "*required" : ""}
            id="zipCode"
            name="zipCode"
            label="Zip / Postal Code"
            InputLabelProps={{
              shrink: userInfo.zipCode ? true : false,
            }}
            fullWidth
            autoComplete="billing postal-code"
            value={userInfo.zipCode}
            error={!userInfo.zipCode && (startedTypingRequiredFields.zipCode || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.country ? "*required" : ""}
            id="country"
            name="country"
            label="Country"
            InputLabelProps={{
              shrink: userInfo.country ? true : false,
            }}
            fullWidth
            autoComplete="billing country"
            value={userInfo.country}
            error={!userInfo.country && (startedTypingRequiredFields.country || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
          />
        </Grid>
        {!session.isLoggedIn && <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.ssn ? "*required" : ""}
            id="ssn"
            name="ssn"
            label="Social Security Number"
            InputLabelProps={{
              shrink: userInfo.ssn ? true : false,
            }}
            // type="number"
            fullWidth
            autoComplete="SSN"
            error={!ssnValidated}
            value={userInfo.ssn}
            error={!userInfo.ssn && (startedTypingRequiredFields.ssn || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
          />
        </Grid>}
        {!session.isLoggedIn && <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.validatedSSN ? "*required" : ""}
            id="validatedSSN"
            name="validatedSSN"
            label="Re-Enter Social Security Number"
            InputLabelProps={{
              shrink: userInfo.validatedSSN ? true : false,
            }}
            fullWidth
            autoComplete="SSN"
            error={!ssnValidated}
            onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
          />
        </Grid>}
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.validatedSSN ? "*required" : ""}
            id="desiredLoanAmount"
            name="desiredLoanAmount"
            label="Desired Loan Amount"
            InputLabelProps={{
              shrink: userInfo.desiredLoanAmount ? true : false,
            }}
            value={userInfo.desiredLoanAmount}
            fullWidth
            autoComplete="desiredLoanAmount"
            onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
          />
        </Grid>
          {!session.isLoggedIn && <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <KeyboardDatePicker
                helperText={!userInfo.bday ? "*required" : ""}
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date of Birth"
                InputLabelProps={{
                  shrink: userInfo.bday ? true : false,
                }}
                value={userInfo.bday}
                onChange={handleDateChange}
                className={classes.datePicker}
                style={!userInfo.bday && session.attemptedPageSubmit ? {'border-bottom': '2px solid red'} : {}}
              />
            </MuiPickersUtilsProvider>
          </Grid>}
          {!session.isLoggedIn && <Grid item xs={12}>
          <TextField
            variant="outlined"
            helperText={!userInfo.email ? "*required" : ""}
            id="email"
            name="email"
            label="Email"
            InputLabelProps={{
              shrink: userInfo.email ? true : false,
            }}
            fullWidth
            autoComplete="email"
            value={userInfo.email}
            error={!userInfo.email && (startedTypingRequiredFields.email || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
          />
          </Grid>}
          {!session.isLoggedIn && <Grid item xs={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.password ? "*required" : ""}
            id="password"
            name="password"
            label="Choose a Password"
            InputLabelProps={{
              shrink: userInfo.password ? true : false,
            }}
            fullWidth
            autoComplete="password"
            type="password"
            error={!passwordValidated}
            value={userInfo.password}
            error={!userInfo.password && (startedTypingRequiredFields.password || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
          />
        </Grid>}
        {!session.isLoggedIn && <Grid item xs={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.validatedPassword ? "*required" : ""}
            id="validatedPassword"
            name="validatedPassword"
            label="Re-Enter Password"
            InputLabelProps={{
              shrink: userInfo.validatedPassword ? true : false,
            }}
            fullWidth
            autoComplete="password"
            type="password"
            error={!passwordValidated}
            onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
          />
        </Grid>}
      </Grid>
    </Fragment>
  );
}