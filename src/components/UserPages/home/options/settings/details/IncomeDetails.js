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

export default function IncomeDetails() {
    const classes = useStyles();

    const session = getSessionCookie();

    return (
        <div className={classes.root}>
            <Typography>Employment Status: {session.incomeType}</Typography>
            <Typography>Employer Name: {session.employerName}</Typography>
            <Typography>Paycheck: ${session.recentCheck} {session.payFrequency}</Typography>
            {session.additionalSourceOfIncome && <Typography>Additional Income: {session.additionalSourceOfIncome} ${session.additionalIncomeAmount}</Typography>}
    {/* <Typography>{`${JSON.stringify(session)}`}</Typography> */}
        </div>
    )
}
