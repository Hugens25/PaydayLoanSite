import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();

  const {applicantInfo} = props;

  return (
    <Fragment>
      <Typography align="left" variant="h6" gutterBottom>Application Summary</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography align="left">{`Applicant Name: ${applicantInfo.firstName} ${applicantInfo.lastName}`}</Typography>
          <Typography align="left">{`Applicant Address: ${applicantInfo.address1} ${applicantInfo.address2 || ''} ${applicantInfo.city}, ${applicantInfo.state} ${applicantInfo.zipCode}`}</Typography>
          <Typography align="left">{`Applicant Email: ${applicantInfo.email}`}</Typography>
        </Grid>
        <Grid item xs={12} sm={12}>

          <Typography align="left" variant="h6" gutterBottom className={classes.title}>Income Details</Typography>
          
          <Typography align="left">{`Employment Type: ${applicantInfo.incomeType}`}</Typography>
          <Typography align="left">{`Employer: ${applicantInfo.employerName}`}</Typography>
          <Typography align="left">{`Income Per Check: ${applicantInfo.recentCheck}`}</Typography>

          <Typography align="left">{`Additional Source of Income: ${applicantInfo.additionalSourceOfIncome}`}</Typography>
          <Typography align="left">{`Additional Income Amount: ${applicantInfo.additionalIncomeAmount}`}</Typography>
        
        </Grid>
        <Grid item container direction="column" xs={12} sm={12}>
          
          <Typography align="left" variant="h6" gutterBottom className={classes.title}>Bank details</Typography>
          
          <Typography align="left">{`Bank Routing Number: ${applicantInfo.routingNumber}`}</Typography>
          <Typography align="left">{`Bank Account Number: ${applicantInfo.bankAccountNumber}`}</Typography>
        
        </Grid>
      </Grid>
    </Fragment>
  );
}