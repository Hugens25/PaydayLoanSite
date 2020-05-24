import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: '90vw',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(3),
      },
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

export default function LandingPage() {

    const classes = useStyles();
    return(
        <Fragment>
            <CssBaseline />
            <div className={classes.layout}>
              <Grid container spacing={1}>
                <Grid item xs={8} sm={8}>
                  <Paper className={classes.paper} elevation={3}>
                      <Typography variant="h5" gutterBottom>Company Name</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Paper className={classes.paper} elevation={3}>
                      <Typography variant="h6" gutterBottom>Start Your Application!</Typography>
                      <Typography align="left">{`Applicant Name: `}</Typography>
                      <Typography align="left">{`Applicant Address: `}</Typography>
                      <Typography align="left">{`Applicant Email: `}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </div>
        </Fragment>        
    );
}