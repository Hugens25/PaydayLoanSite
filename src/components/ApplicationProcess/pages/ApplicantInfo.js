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
          applicantInfo, 
          setApplicantInfo, 
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
      setApplicantInfo({...applicantInfo, "bday":formattedBday})
    }
  };

  const handleValidatePassword = (original, validated) => {
    setValidatedPassword(original === validated ? true : false)
  }

  const handleValidateSSN = (original, validated) => {
    setValidatedSSN(original === validated ? true : false)
  }

  useEffect(() => {
    handleValidatePassword(applicantInfo.password, applicantInfo.validatedPassword)
    handleValidateSSN(applicantInfo.ssn, applicantInfo.validatedSSN)
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
            helperText={!applicantInfo.firstName ? "*required" : ""}
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            value={applicantInfo.firstName}
            error={!applicantInfo.firstName && (startedTypingRequiredFields.firstName || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("firstName", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!applicantInfo.lastName ? "*required" : ""}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={applicantInfo.lastName}
            error={!applicantInfo.lastName && (startedTypingRequiredFields.lastName || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("lastName", e)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            helperText={!applicantInfo.address1 ? "*required" : ""}
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            value={applicantInfo.address1}
            error={!applicantInfo.address1 && (startedTypingRequiredFields.address1 || session.attemptedPageSubmit)}
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
            value={applicantInfo.address2}
            onChange={(e) => {handleAddApplicantInformation("address2", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!applicantInfo.city ? "*required" : ""}
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            value={applicantInfo.city}
            error={!applicantInfo.city && (startedTypingRequiredFields.city || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("city", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            variant="outlined"
            helperText={!applicantInfo.state ? "*required" : ""}
            id="state" 
            name="state" 
            label="State/Province/Region" 
            fullWidth
            value={applicantInfo.state}
            error={!applicantInfo.state && (startedTypingRequiredFields.state || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("state", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!applicantInfo.zipCode ? "*required" : ""}
            id="zip"
            name="zip"
            label="Zip / Postal Code"
            fullWidth
            autoComplete="billing postal-code"
            value={applicantInfo.zipCode}
            error={!applicantInfo.zipCode && (startedTypingRequiredFields.zipCode || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("zipCode", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!applicantInfo.country ? "*required" : ""}
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            value={applicantInfo.country}
            error={!applicantInfo.country && (startedTypingRequiredFields.country || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("country", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!applicantInfo.ssn ? "*required" : ""}
            id="SSN"
            name="SSN"
            label="Social Security Number"
            // type="number"
            fullWidth
            autoComplete="SSN"
            error={!ssnValidated}
            value={applicantInfo.ssn}
            error={!applicantInfo.ssn && (startedTypingRequiredFields.ssn || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("ssn", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            helperText={!applicantInfo.validatedSSN ? "*required" : ""}
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
            helperText={!applicantInfo.validatedSSN ? "*required" : ""}
            id="desiredLoanAmount"
            name="desiredLoanAmount"
            label="Desired Loan Amount"
            value={applicantInfo.desiredLoanAmount}
            fullWidth
            autoComplete="desiredLoanAmount"
            onChange={(e) => {handleAddApplicantInformation("desiredLoanAmount", e)}}
          />
        </Grid>
          {!session.isLoggedIn && <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <KeyboardDatePicker
                helperText={!applicantInfo.bday ? "*required" : ""}
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date of Birth"
                value={applicantInfo.bday}
                onChange={handleDateChange}
                className={classes.datePicker}
                style={!applicantInfo.bday && session.attemptedPageSubmit ? {'border-bottom': '2px solid red'} : {}}
              />
            </MuiPickersUtilsProvider>
          </Grid>}
          {!session.isLoggedIn && <Grid item xs={12}>
          <TextField
            variant="outlined"
            helperText={!applicantInfo.email ? "*required" : ""}
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            value={applicantInfo.email}
            error={!applicantInfo.email && (startedTypingRequiredFields.email || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("email", e)}}
          />
          </Grid>}
          {!session.isLoggedIn && <Grid item xs={6}>
          <TextField
            variant="outlined"
            helperText={!applicantInfo.password ? "*required" : ""}
            id="password"
            name="password"
            label="Choose a Password"
            fullWidth
            autoComplete="password"
            type="password"
            error={!passwordValidated}
            value={applicantInfo.password}
            error={!applicantInfo.password && (startedTypingRequiredFields.password || session.attemptedPageSubmit)}
            onChange={(e) => {handleAddApplicantInformation("password", e)}}
          />
        </Grid>}
        {!session.isLoggedIn && <Grid item xs={6}>
          <TextField
            variant="outlined"
            helperText={!applicantInfo.validatedPassword ? "*required" : ""}
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