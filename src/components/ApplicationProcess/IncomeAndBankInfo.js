import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

  const {applicantInfo, setApplicantInfo} = props;

  const [incomeType, setIncomeType] = React.useState('');

  const handleIncomeTypeChange = (event) => {
    setIncomeType(event.target.value);
  };

  const [payFrequency, setPayFrequency] = React.useState('');

  const handlePayFrequencyChange = (event) => {
    setPayFrequency(event.target.value);
  };

  const [secondaryIncomeType, setsecondaryIncomeType] = React.useState('');
  const [hasSecondaryIncome, setHasSecondaryIncome] = React.useState('');

  const handleSecondaryIncomeTypeChange = (event) => {
    setHasSecondaryIncome(event.target.value !== "N / A" ? true : false)
    setsecondaryIncomeType(event.target.value);
  };

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
                value={incomeType}
                onChange={handleIncomeTypeChange}
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
                  value={payFrequency}
                  onChange={handlePayFrequencyChange}
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
            <TextField required id="recentCheck" label="What was the amount of your most recent check?" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="additionalSourceOfIncome">Additional Source of Income</InputLabel>
              <Select
                labelId="sourceOfIncome"
                id="sourceOfIncomeSelect"
                value={secondaryIncomeType}
                onChange={handleSecondaryIncomeTypeChange}
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
          { hasSecondaryIncome && <Grid item xs={12} sm={6}>
            <TextField required id="recentCheck" label="Additional Income Amount" fullWidth />
          </Grid>}
          <Grid item xs={12} sm={8}>
            <TextField required id="employerName" label="Company or Employer Name:" fullWidth />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField required id="routingNumber" label="Bank Routing Number" fullWidth />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField required id="accountNumber" label="Bank Account Number" fullWidth />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField required id="verifyAccountNumber" label="Re-Enter Bank Account Number" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value="yes" />}
              label="Remember credit card details for next time"
            />
          </Grid>
        </Grid>
      </Box>
      
    </React.Fragment>
  );
}