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
import { getSessionCookie } from '../../../session/session';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectLabel: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    backgroundColor: 'white',
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
          userInfo, 
          startedTypingRequiredFields, 
          handleAddUserInformation
        } = props;

  const [secondaryIncomeType, setsecondaryIncomeType] = useState('');
  const [hasSecondaryIncome, setHasSecondaryIncome] = useState(userInfo.additionalSourceOfIncome && userInfo.additionalSourceOfIncome !== 'N / A' ? true : false);
  const [accountNumberVerified, setAccountNumberVerified] = useState(true);

  const handleSecondaryIncomeTypeChange = (e) => {
    setHasSecondaryIncome(e.target.value !== "N / A" ? true : false)
    setsecondaryIncomeType(e.target.value);
    handleAddUserInformation("additionalSourceOfIncome", e)
  };

  const handleVerifyAccountNumber = (original, validated) => {
    console.log(original, validated);
    setAccountNumberVerified(original === validated ? true : false)
  }

  useEffect(() => {
    handleVerifyAccountNumber(userInfo.bankAccountNumber, userInfo.verifyBankAccountNumber)
  }, [userInfo]);

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>Income and Direct Deposit Information</Typography>
      <Box mt={5}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="sourceOfIncome" variant="outlined" className={classes.selectLabel}>Primary Income</InputLabel>
              <Select
                variant="outlined"
                helperText={!userInfo.incomeType ? "*required" : ""}
                labelId="sourceOfIncome"
                id="sourceOfIncomeSelect"
                name="incomeType"
                value={userInfo.incomeType}
                error={!userInfo.incomeType && (startedTypingRequiredFields.incomeType || session.attemptedPageSubmit)}
                onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
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
              <InputLabel id="payFrequency" variant="outlined" className={classes.selectLabel}>How often are you paid?</InputLabel>
                <Select
                  variant="outlined"
                  helperText={!userInfo.payFrequency ? "*required" : ""}
                  id="payFrequencySelect"
                  labelId="payFrequency"
                  name="payFrequency"
                  value={userInfo.payFrequency}
                  error={!userInfo.payFrequency && (startedTypingRequiredFields.payFrequency || session.attemptedPageSubmit)}
                  onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
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
              helperText={!userInfo.recentCheck ? "*required" : ""} 
              id="recentCheck" 
              name="recentCheck" 
              label="What was the amount of your most recent check?"
              InputLabelProps={{
                shrink: userInfo.recentCheck ? true : false,
              }}
              fullWidth 
              // InputProps={{
              //   startAdornment: <InputAdornment position="start">$</InputAdornment>,
              // }}
              error={!userInfo.recentCheck && (startedTypingRequiredFields.recentCheck || session.attemptedPageSubmit)}
              onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
              value={userInfo.recentCheck}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="additionalSourceOfIncome" variant="outlined" className={classes.selectLabel}>Additional Source of Income</InputLabel>
              <Select
                variant="outlined"
                helperText={!userInfo.additionalSourceOfIncome ? "*required" : ""}
                labelId="additionalSourceOfIncome"
                id="additionalSourceOfIncomeSelect"
                error={!userInfo.additionalSourceOfIncome && session.attemptedPageSubmit}
                onChange={handleSecondaryIncomeTypeChange} 
                value={userInfo.additionalSourceOfIncome}
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
                <InputLabel id="additionalPayFrequency" variant="outlined" className={classes.selectLabel}>How often are you paid?</InputLabel>
                <Select
                  variant="outlined"
                  helperText={!userInfo.payFrequency ? "*required" : ""}
                  id="additionalPayFrequencySelect"
                  labelId="additionalPayFrequency"
                  name="additionalPayFrequency"
                  value={userInfo.additionalPayFrequency}
                  error={!userInfo.additionalPayFrequency && (startedTypingRequiredFields.additionalPayFrequency || session.attemptedPageSubmit)}
                  onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
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
                  helperText={!userInfo.additionalIncomeAmount ? "*required" : ""} 
                  id="additionalIncomeAmount" 
                  name="additionalIncomeAmount" 
                  label="Additional Income Amount" 
                  InputLabelProps={{
                    shrink: userInfo.additionalIncomeAmount ? true : false,
                  }}
                  fullWidth
                  error={!userInfo.additionalIncomeAmount && (startedTypingRequiredFields.additionalIncomeAmount || session.attemptedPageSubmit)}
                  onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
                  value={userInfo.additionalIncomeAmount}
                  />
              </Grid>
            
          }
          <Grid item xs={12} sm={6}>
            <TextField 
              // className={classes.inputLabel}
              variant="outlined"
              helperText={!userInfo.employerName ? "*required" : ""} 
              id="employerName" 
              name="employerName" 
              label="Primary Employer Name"
              InputLabelProps={{
                shrink: userInfo.employerName ? true : false,
              }}
              fullWidth 
              onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}} 
              error={!userInfo.employerName && (startedTypingRequiredFields.employerName || session.attemptedPageSubmit)}
              value={userInfo.employerName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField  
              // className={classes.inputLabel}
              variant="outlined"
              helperText={!userInfo.routingNumber ? "*required" : ""} 
              id="routingNumber" 
              name="routingNumber" 
              label="Bank Routing Number"
              InputLabelProps={{
                shrink: userInfo.routingNumber ? true : false,
              }}
              fullWidth 
              error={!userInfo.routingNumber && (startedTypingRequiredFields.routingNumber || session.attemptedPageSubmit)}
              onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
              value={userInfo.routingNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              // className={classes.inputLabel}
              variant="outlined"
              helperText={!userInfo.bankAccountNumber ? "*required" : ""} 
              id="bankAccountNumber" 
              name="bankAccountNumber"
              label="Bank Account Number"
              InputLabelProps={{
                shrink: userInfo.bankAccountNumber ? true : false,
              }}
              fullWidth 
              error={!userInfo.bankAccountNumber && (startedTypingRequiredFields.bankAccountNumber || session.attemptedPageSubmit)}
              onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
              value={userInfo.bankAccountNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              // className={classes.inputLabel}
              variant="outlined"
              helperText={!userInfo.verifyBankAccountNumber ? "*required" : ""} 
              id="verifyBankAccountNumber" 
              name="verifyBankAccountNumber"
              label="Re-Enter Bank Account Number"
              InputLabelProps={{
                shrink: userInfo.verifyBankAccountNumber ? true : false,
              }}
              fullWidth 
              error={!accountNumberVerified}
              onChange={(e) => {handleAddUserInformation(e.target.name, e.target.value)}}
            />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}