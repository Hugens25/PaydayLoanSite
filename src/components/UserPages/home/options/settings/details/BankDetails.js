import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  }));

export default function BankDetails(props) {
    const classes = useStyles();

    const {userInfo, setUserInfo} = props;

    return (
        <div className={classes.root}>
            <Typography>Account Number: {userInfo.bankAccountNumber}</Typography>
            <Typography>Routing Number: {userInfo.routingNumber}</Typography>
        </div>
    )
}
