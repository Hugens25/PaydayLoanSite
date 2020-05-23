import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PaymentForm(props) {

  const classes = useStyles();

  const {
          applicantInfo, 
          setApplicantInfo, 
          startedTypingRequiredFields, 
          handleStartedTypingRequiredFields,
          handleAddApplicantInformation
        } = props;

  const [secondaryIncomeType, setsecondaryIncomeType] = useState('');
  const [hasSecondaryIncome, setHasSecondaryIncome] = useState('');
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
    handleVerifyAccountNumber(applicantInfo.bankAccountNumber, applicantInfo.verifyfBankAccountNumber)
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Income and Direct Deposit Information
      </Typography>
      <Box mt={5}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="sourceOfIncome">Primary Income</InputLabel>
              <Select
                labelId="sourceOfIncome"
                id="sourceOfIncomeSelect"
                value={applicantInfo.incomeType}
                error={!applicantInfo.incomeType && startedTypingRequiredFields.incomeType}
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
              <InputLabel id="payFrequency">How often are you paid?</InputLabel>
                <Select
                  labelId="payFrequency"
                  id="payFrequencySelect"
                  value={applicantInfo.payFrequency}
                  error={!applicantInfo.payFrequency && startedTypingRequiredFields.payFrequency}
                  onChange={(e) => {handleAddApplicantInformation("payFrequency", e)}}
                  renderValue={(value) => `${value}`}
                >
                  <MenuItem value={"Every Week"}>Weekly</MenuItem>
                  <MenuItem value={"Bi-Weekly"}>Bi-Weekly (Every other week)</MenuItem>
                  <MenuItem value={"Semi-Monthly"}>Semi-Monthly (Twice a Month)</MenuItem>
                  <MenuItem value={"Monthly"}>Monthly</MenuItem>
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField 
              required 
              id="recentCheck" 
              label="What was the amount of your most recent check?" 
              fullWidth 
              error={!applicantInfo.recentCheck && startedTypingRequiredFields.recentCheck}
              onChange={(e) => {handleAddApplicantInformation("recentCheck", e)}}
              value={applicantInfo.recentCheck}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="additionalSourceOfIncome">Additional Source of Income</InputLabel>
              <Select
                labelId="additionalSourceOfIncome"
                id="additionalSourceOfIncomeSelect"
                value={secondaryIncomeType}
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
              <TextField 
                required 
                id="recentCheck" 
                label="Additional Income Amount" 
                fullWidth
                error={!applicantInfo.additionalIncomeAmount && startedTypingRequiredFields.additionalIncomeAmount}
                onChange={(e) => {handleAddApplicantInformation("additionalIncomeAmount", e)}}
                value={applicantInfo.additionalIncomeAmount}
                />
            </Grid>
          }
          <Grid item xs={12} sm={8}>
            <TextField 
              required 
              id="employerName" 
              label="Company or Employer Name:" 
              fullWidth 
              onChange={(e) => {handleAddApplicantInformation("employerName", e)}}  
              error={!applicantInfo.employerName && startedTypingRequiredFields.employerName}
              value={applicantInfo.employerName}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField 
              required 
              id="routingNumber" 
              label="Bank Routing Number" 
              fullWidth 
              error={!applicantInfo.routingNumber && startedTypingRequiredFields.routingNumber}
              onChange={(e) => {handleAddApplicantInformation("routingNumber", e)}}
              value={applicantInfo.routingNumber}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField 
              required 
              id="accountNumber" 
              label="Bank Account Number" 
              fullWidth 
              error={!applicantInfo.bankAccountNumber && startedTypingRequiredFields.bankAccountNumber}
              onChange={(e) => {handleAddApplicantInformation("bankAccountNumber", e)}}
              value={applicantInfo.bankAccountNumber}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField 
              required 
              id="verifyAccountNumber" 
              label="Re-Enter Bank Account Number" 
              fullWidth 
              error={!accountNumberVerified}
              onChange={(e) => {handleAddApplicantInformation("verifyfBankAccountNumber", e)}}
            />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}