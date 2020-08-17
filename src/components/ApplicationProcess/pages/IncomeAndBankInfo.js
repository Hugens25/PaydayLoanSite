import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import { getSessionCookie } from '../../../session';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectLabel: {
    paddingLeft: theme.spacing(2),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  inputLabel: {
    textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

export default function PaymentForm(props) {
  const session = getSessionCookie();
  const classes = useStyles();

  const {
          applicantInfo, 
          startedTypingRequiredFields, 
          handleAddApplicantInformation
        } = props;

  const [secondaryIncomeType, setsecondaryIncomeType] = useState('');
  const [hasSecondaryIncome, setHasSecondaryIncome] = useState(applicantInfo.additionalSourceOfIncome && applicantInfo.additionalSourceOfIncome !== 'N / A' ? true : false);
  const [accountNumberVerified, setAccountNumberVerified] = useState(true);

  const handleSecondaryIncomeTypeChange = (e) => {
    setHasSecondaryIncome(e.target.value !== "N / A" ? true : false)
    setsecondaryIncomeType(e.target.value);
    handleAddApplicantInformation("additionalSourceOfIncome", e)
  };

  const handleVerifyAccountNumber = (original, validated) => {
    setAccountNumberVerified(original === validated ? true : false)
  }

  useEffect(() => {
    handleVerifyAccountNumber(applicantInfo.bankAccountNumber, applicantInfo.verifyBankAccountNumber)
  });

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>Income and Direct Deposit Information</Typography>
      <Box mt={5}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="sourceOfIncome" className={classes.selectLabel}>Primary Income</InputLabel>
              <Select
                variant="outlined"
                helperText={!applicantInfo.incomeType ? "*required" : ""}
                labelId="sourceOfIncome"
                id="sourceOfIncomeSelect"
                value={applicantInfo.incomeType}
                error={!applicantInfo.incomeType && (startedTypingRequiredFields.incomeType || session.attemptedPageSubmit)}
                onChange={(e) => {handleAddApplicantInformation("incomeType", e)}}
              >
                <MenuItem value={"Employed"}>Employed</MenuItem>
                <MenuItem value={"Self-Employed"}>Self-Employed</MenuItem>
                <MenuItem value={"Social-Security / Disability"}>Social-Security / Disability</MenuItem>
                <MenuItem value={"Pension / Retirement"}>Pension / Retirement</MenuItem>
                <MenuItem value={"Other Source"}>Other Source</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="payFrequency" className={classes.selectLabel}>How often are you paid?</InputLabel>
                <Select
                  variant="outlined"
                  helperText={!applicantInfo.payFrequency ? "*required" : ""}
                  labelId="payFrequency"
                  id="payFrequencySelect"
                  value={applicantInfo.payFrequency}
                  error={!applicantInfo.payFrequency && (startedTypingRequiredFields.payFrequency || session.attemptedPageSubmit)}
                  onChange={(e) => {handleAddApplicantInformation("payFrequency", e)}}
                  renderValue={(value) => `${value}`}
                >
                  <MenuItem value={"Weekly"}>Weekly</MenuItem>
                  <MenuItem value={"Bi-Weekly"}>Bi-Weekly (Every other week)</MenuItem>
                  <MenuItem value={"Semi-Monthly"}>Semi-Monthly (Twice a Month)</MenuItem>
                  <MenuItem value={"Monthly"}>Monthly</MenuItem>
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField 
              // className={classes.inputLabel}
              variant="outlined"
              helperText={!applicantInfo.recentCheck ? "*required" : ""} 
              id="recentCheck" 
              label="What was the amount of your most recent check?" 
              fullWidth 
              // InputProps={{
              //   startAdornment: <InputAdornment position="start">$</InputAdornment>,
              // }}
              error={!applicantInfo.recentCheck && (startedTypingRequiredFields.recentCheck || session.attemptedPageSubmit)}
              onChange={(e) => {handleAddApplicantInformation("recentCheck", e)}}
              value={applicantInfo.recentCheck}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="additionalSourceOfIncome" className={classes.selectLabel}>Additional Source of Income</InputLabel>
              <Select
                variant="outlined"
                helperText={!applicantInfo.additionalSourceOfIncome ? "*required" : ""}
                labelId="additionalSourceOfIncome"
                id="additionalSourceOfIncomeSelect"
                error={!applicantInfo.additionalSourceOfIncome && session.attemptedPageSubmit}
                onChange={handleSecondaryIncomeTypeChange} 
                value={applicantInfo.additionalSourceOfIncome}
              >
                <MenuItem value={"N / A"}>N / A</MenuItem>
                <MenuItem value={"Second Job"}>Second Job</MenuItem>
                <MenuItem value={"Self-Employed"}>Self-Employed</MenuItem>
                <MenuItem value={"Social-Security / Disability"}>Social-Security / Disability</MenuItem>
                <MenuItem value={"Pension / Retirement"}>Pension / Retirement</MenuItem>
                <MenuItem value={"Alimony / Child Support"}>Alimony / Child Support</MenuItem>
                <MenuItem value={"Investments"}>Investments</MenuItem>
                <MenuItem value={"Other Source"}>Other Source</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          { 
            hasSecondaryIncome &&
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="additionalPayFrequency" className={classes.selectLabel}>How often are you paid?</InputLabel>
                <Select
                  variant="outlined"
                  helperText={!applicantInfo.payFrequency ? "*required" : ""}
                  labelId="additionalPayFrequency"
                  id="additionalPayFrequencySelect"
                  value={applicantInfo.additionalPayFrequency}
                  error={!applicantInfo.additionalPayFrequency && (startedTypingRequiredFields.additionalPayFrequency || session.attemptedPageSubmit)}
                  onChange={(e) => {handleAddApplicantInformation("additionalPayFrequency", e)}}
                  renderValue={(value) => `${value}`}
                >
                  <MenuItem value={"Weekly"}>Weekly</MenuItem>
                  <MenuItem value={"Bi-Weekly"}>Bi-Weekly (Every other week)</MenuItem>
                  <MenuItem value={"Semi-Monthly"}>Semi-Monthly (Twice a Month)</MenuItem>
                  <MenuItem value={"Monthly"}>Monthly</MenuItem>
                  <MenuItem value={"Quarterly"}>Quarterly</MenuItem>
                  <MenuItem value={"Semi-Annually"}>Semi-Annually</MenuItem>
                  <MenuItem value={"Annually"}>Annually</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          }
          {hasSecondaryIncome &&
              <Grid item xs={12}>
                <TextField 
                  // className={classes.inputLabel}
                  variant="outlined"
                  helperText={!applicantInfo.additionalIncomeAmount ? "*required" : ""} 
                  id="additionalIncomeAmount" 
                  label="Additional Income Amount" 
                  fullWidth
                  error={!applicantInfo.additionalIncomeAmount && (startedTypingRequiredFields.additionalIncomeAmount || session.attemptedPageSubmit)}
                  onChange={(e) => {handleAddApplicantInformation("additionalIncomeAmount", e)}}
                  value={applicantInfo.additionalIncomeAmount}
                  />
              </Grid>
            
          }
          <Grid item xs={12} sm={6}>
            <TextField 
              // className={classes.inputLabel}
              variant="outlined"
              helperText={!applicantInfo.employerName ? "*required" : ""} 
              id="employerName" 
              label="Primary Employer Name" 
              fullWidth 
              onChange={(e) => {handleAddApplicantInformation("employerName", e)}}  
              error={!applicantInfo.employerName && (startedTypingRequiredFields.employerName || session.attemptedPageSubmit)}
              value={applicantInfo.employerName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField  
              // className={classes.inputLabel}
              variant="outlined"
              helperText={!applicantInfo.routingNumber ? "*required" : ""} 
              id="routingNumber" 
              label="Bank Routing Number" 
              fullWidth 
              error={!applicantInfo.routingNumber && (startedTypingRequiredFields.routingNumber || session.attemptedPageSubmit)}
              onChange={(e) => {handleAddApplicantInformation("routingNumber", e)}}
              value={applicantInfo.routingNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              // className={classes.inputLabel}
              variant="outlined"
              helperText={!applicantInfo.bankAccountNumber ? "*required" : ""} 
              id="accountNumber" 
              label="Bank Account Number" 
              fullWidth 
              error={!applicantInfo.bankAccountNumber && (startedTypingRequiredFields.bankAccountNumber || session.attemptedPageSubmit)}
              onChange={(e) => {handleAddApplicantInformation("bankAccountNumber", e)}}
              value={applicantInfo.bankAccountNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              // className={classes.inputLabel}
              variant="outlined"
              helperText={!applicantInfo.verifyBankAccountNumber ? "*required" : ""} 
              id="verifyAccountNumber" 
              label="Re-Enter Bank Account Number" 
              fullWidth 
              error={!accountNumberVerified}
              onChange={(e) => {handleAddApplicantInformation("verifyBankAccountNumber", e)}}
            />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}