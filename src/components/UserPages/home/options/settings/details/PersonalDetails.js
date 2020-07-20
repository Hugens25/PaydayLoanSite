import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getSessionCookie } from '../../../../../../session';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  }));

export default function PersonalDetails() {
    const classes = useStyles();

    const session = getSessionCookie();

    return (
        <div className={classes.root}>
            <Typography variant="h6" gutterBottom>First Name: {session.firstName}</Typography>
            <Typography variant="h6" gutterBottom>Last Name: {session.lastName}</Typography>
        </div>
    )
}
