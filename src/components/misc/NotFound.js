import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Spinner from '../misc/Spinner';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { setSessionCookie } from '../../session';

const StyledButton = withStyles({
    root: {
      color: green[500]
    }
  })(Button);

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