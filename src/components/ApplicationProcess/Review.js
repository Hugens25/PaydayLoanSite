import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();

  const {applicantInfo, setApplicantInfo} = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Application Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography>{`Applicant Name: ${applicantInfo.firstName} ${applicantInfo.lastName}`}</Typography>
          <Typography>{`Applicant Address: ${applicantInfo.address1} ${applicantInfo.address2 || ''} ${applicantInfo.city}, ${applicantInfo.state} ${applicantInfo.zipCode}`}</Typography>
          <Typography>{`Applicant Email: ${applicantInfo.email}`}</Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Income Details
          </Typography>
          <Typography >{`Employment Type: ${applicantInfo.incomeType}`}</Typography>
          <Typography >{`Employer: ${applicantInfo.employerName}`}</Typography>
          <Typography >{`Income Per Check: ${applicantInfo.recentCheck}`}</Typography>

          <Typography >{`Additional Source of Income: ${applicantInfo.additionalSourceOfIncome}`}</Typography>
          <Typography >{`Additional Income Amount: ${applicantInfo.additionalIncomeAmount}`}</Typography>

        </Grid>
        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Bank details
          </Typography>
          <Typography>{`Bank Routing Number: ${applicantInfo.routingNumber}`}</Typography>
          <Typography>{`Bank Account Number: ${applicantInfo.bankAccountNumber}`}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}