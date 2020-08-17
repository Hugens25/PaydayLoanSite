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

  const {userInfo} = props;

  return (
    <Fragment>
      <Typography align="left" variant="h6" gutterBottom>Application Summary</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography align="left">{`Applicant Name: ${userInfo.firstName} ${userInfo.lastName}`}</Typography>
          <Typography align="left">{`Applicant Address: ${userInfo.address1} ${userInfo.address2 || ''} ${userInfo.city}, ${userInfo.state} ${userInfo.zipCode}`}</Typography>
          <Typography align="left">{`Applicant Email: ${userInfo.email}`}</Typography>
        </Grid>
        <Grid item xs={12} sm={12}>

          <Typography align="left" variant="h6" gutterBottom className={classes.title}>Income Details</Typography>
          
          <Typography align="left">{`Employment Type: ${userInfo.incomeType}`}</Typography>
          <Typography align="left">{`Employer: ${userInfo.employerName}`}</Typography>
          <Typography align="left">{`Income Per Check: ${userInfo.recentCheck}`}</Typography>
          {userInfo.additionalSourceOfIncome !== 'N / A' &&
            <div>
                <Typography align="left">{`Additional Source of Income: ${userInfo.additionalSourceOfIncome}`}</Typography>
                <Typography align="left">{`Additional Income Amount: ${userInfo.additionalIncomeAmount}`}</Typography>
            </div>
          }
          
        </Grid>
        <Grid item container direction="column" xs={12} sm={12}>
          
          <Typography align="left" variant="h6" gutterBottom className={classes.title}>Bank details</Typography>
          
          <Typography align="left">{`Bank Routing Number: ${userInfo.routingNumber}`}</Typography>
          <Typography align="left">{`Bank Account Number: ${userInfo.bankAccountNumber}`}</Typography>
        
        </Grid>
      </Grid>
    </Fragment>
  );
}