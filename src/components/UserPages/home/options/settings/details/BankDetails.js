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

export default function BankDetails() {
    const classes = useStyles();

    const session = getSessionCookie();

    return (
        <div className={classes.root}>
            <Typography>Account Number: {session.bankAccountNumber}</Typography>
            <Typography>Routing Number: {session.routingNumber}</Typography>
        </div>
    )
}
