import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export default function AddressForm() {

  const date = new Date();
  let minimumValidDOB = date.setFullYear(date.getFullYear() - 18);
  
  const [selectedDate, setSelectedDate] = useState(minimumValidDOB);
  const [applicantInfo, setApplicantInfo] = useState({});
  const [passwordValidated, setValidatedPassword] = useState(true);
  const [ssnValidated, setValidatedSSN] = useState(true);
  const [maskedSSN, setMaskedSSN] = useState();
  

  const handleDateChange = (date) => {
    if (date > minimumValidDOB) {
      alert("Unable to Proceed:\n\nYou must be 18 years old or older to apply for a Payday Loan.")
    } else {
      setSelectedDate(date);
      setApplicantInfo({"bday":date})
    }
  };

  const handleAddApplicantInformation = (key, e) => {
    let info = { ...applicantInfo }
    info[key] = e.target.value
    setApplicantInfo(info)
    
  }

  const handleValidatePassword = (e) => {
    setValidatedPassword(applicantInfo.password === e.target.value ? true : false)
  }

  const handleValidateSSN = (e) => {
    setValidatedSSN(applicantInfo.ssn === e.target.value ? true : false)
  }

  const handleMaskSSN = (e) => {
    let maskValue = 'X'
    setMaskedSSN(maskValue.repeat(applicantInfo.ssn.length))
  }

  useEffect(() => {console.log(applicantInfo)});

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Tell Us About Yourself
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            onChange={(e) => {handleAddApplicantInformation("first-name", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            onChange={(e) => {handleAddApplicantInformation("last-name", e)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            onChange={(e) => {handleAddApplicantInformation("address-1", e)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
            onChange={(e) => {handleAddApplicantInformation("address-2", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            onChange={(e) => {handleAddApplicantInformation("city", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            id="state" 
            name="state" 
            label="State/Province/Region" 
            fullWidth
            onChange={(e) => {handleAddApplicantInformation("state", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal Code"
            fullWidth
            autoComplete="billing postal-code"
            onChange={(e) => {handleAddApplicantInformation("zip-code", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            onChange={(e) => {handleAddApplicantInformation("country", e)}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            onChange={(e) => {handleAddApplicantInformation("email", e)}}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="password"
            name="password"
            label="Choose a Password"
            fullWidth
            autoComplete="password"
            type="password"
            error={!passwordValidated}
            onChange={(e) => {handleAddApplicantInformation("password", e)}}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="validatePassword"
            name="validatePassword"
            label="Re-Enter Password"
            fullWidth
            autoComplete="password"
            type="password"
            error={!passwordValidated}
            onChange={handleValidatePassword}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="SSN"
            name="SSN"
            label="Social Security Number"
            // type="number"
            fullWidth
            autoComplete="SSN"
            value={maskedSSN}
            error={!ssnValidated}
            onChange={(e) => {handleAddApplicantInformation("ssn", e)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="verifySSN"
            name="verifySSN"
            label="Re-Enter Social Security Number"
            fullWidth
            autoComplete="SSN"
            error={!ssnValidated}
            onChange={handleValidateSSN}
          />
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item xs={12} sm={12}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date of Birth"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>
    </React.Fragment>
  );
}