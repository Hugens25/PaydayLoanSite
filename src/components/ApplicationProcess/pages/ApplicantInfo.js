import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { getSessionCookie } from '../../../session';

const useStyles = makeStyles((theme) => ({
  
  inputLabel: {
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
          handleAddApplicantInformation,
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
            label="First name"
            fullWidth
            autoComplete="given-name"
            value={userInfo.firstName}
            error={!userInfo.firstName && (startedTypingRequiredFields.firstName || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("firstName", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.lastName ? "*required" : ""}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={userInfo.lastName}
            error={!userInfo.lastName && (startedTypingRequiredFields.lastName || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("lastName", e)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            helperText={!userInfo.address1 ? "*required" : ""}
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            value={userInfo.address1}
            error={!userInfo.address1 && (startedTypingRequiredFields.address1 || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("address1", e)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
            value={userInfo.address2}
            onChange={(e) => {handleAddApplicantInformation("address2", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.city ? "*required" : ""}
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            value={userInfo.city}
            error={!userInfo.city && (startedTypingRequiredFields.city || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("city", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            variant="outlined"
            helperText={!userInfo.state ? "*required" : ""}
            id="state" 
            name="state" 
            label="State/Province/Region" 
            fullWidth
            value={userInfo.state}
            error={!userInfo.state && (startedTypingRequiredFields.state || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("state", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.zipCode ? "*required" : ""}
            id="zip"
            name="zip"
            label="Zip / Postal Code"
            fullWidth
            autoComplete="billing postal-code"
            value={userInfo.zipCode}
            error={!userInfo.zipCode && (startedTypingRequiredFields.zipCode || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("zipCode", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.country ? "*required" : ""}
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            value={userInfo.country}
            error={!userInfo.country && (startedTypingRequiredFields.country || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("country", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.ssn ? "*required" : ""}
            id="SSN"
            name="SSN"
            label="Social Security Number"
            // type="number"
            fullWidth
            autoComplete="SSN"
            error={!ssnValidated}
            value={userInfo.ssn}
            error={!userInfo.ssn && (startedTypingRequiredFields.ssn || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("ssn", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.validatedSSN ? "*required" : ""}
            id="verifySSN"
            name="verifySSN"
            label="Re-Enter Social Security Number"
            fullWidth
            autoComplete="SSN"
            error={!ssnValidated}
            onChange={(e) => {handleAddApplicantInformation("validatedSSN", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.validatedSSN ? "*required" : ""}
            id="desiredLoanAmount"
            name="desiredLoanAmount"
            label="Desired Loan Amount"
            value={userInfo.desiredLoanAmount}
            fullWidth
            autoComplete="desiredLoanAmount"
            onChange={(e) => {handleAddApplicantInformation("desiredLoanAmount", e)}}
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
            fullWidth
            autoComplete="email"
            value={userInfo.email}
            error={!userInfo.email && (startedTypingRequiredFields.email || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("email", e)}}
          />
          </Grid>}
          {!session.isLoggedIn && <Grid item xs={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.password ? "*required" : ""}
            id="password"
            name="password"
            label="Choose a Password"
            fullWidth
            autoComplete="password"
            type="password"
            error={!passwordValidated}
            value={userInfo.password}
            error={!userInfo.password && (startedTypingRequiredFields.password || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("password", e)}}
          />
        </Grid>}
        {!session.isLoggedIn && <Grid item xs={6}>
          <TextField
            variant="outlined"
            helperText={!userInfo.validatedPassword ? "*required" : ""}
            id="validatePassword"
            name="validatePassword"
            label="Re-Enter Password"
            fullWidth
            autoComplete="password"
            type="password"
            error={!passwordValidated}
            onChange={(e) => {handleAddApplicantInformation("validatedPassword", e)}}
          />
        </Grid>}
      </Grid>
    </Fragment>
  );
}