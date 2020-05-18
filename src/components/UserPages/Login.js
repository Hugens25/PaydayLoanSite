import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';

const StyledButton = withStyles({
    root: {
      color: green[500]
    }
  })(Button);

const useStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
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
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

export default function Login() {

    const classes = useStyles();
    return(
      <React.Fragment>
        <CssBaseline />
        <div className={classes.layout}>
          <Paper className={classes.paper} elevation={3}>
              <Typography variant="h5" gutterBottom>Account Login</Typography>
              <Box mt={5}>
                  <Grid container spacing={4}>
                      <Grid item xs={12} sm={12}>
                          <TextField required id="email" label="Username / Email" fullWidth autoComplete="email"/>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                          <TextField required id="password" label="Password" fullWidth />
                      </Grid>
                  </Grid>
              </Box>
              <Box className={classes.buttons}>
                  <StyledButton className={classes.button}>Login</StyledButton>
              </Box>
          </Paper>
        </div>
      </React.Fragment>
    );
}