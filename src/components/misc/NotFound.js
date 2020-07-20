import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
      minHeight: '80vh',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
  }));

export default function NotFound() {

    const classes = useStyles();

    return(
      <Fragment>
        <CssBaseline />
        <div className={classes.layout}>
          <Paper className={classes.paper} elevation={3}>
              <Typography variant="h2" gutterBottom>404 Not Found</Typography>
          </Paper>
        </div>
      </Fragment>
    );
}