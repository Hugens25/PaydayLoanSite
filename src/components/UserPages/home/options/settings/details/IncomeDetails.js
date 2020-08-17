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

export default function IncomeDetails(props) {
    const classes = useStyles();

    const {userInfo, setUserInfo} = props;

    return (
        <div className={classes.root}>
            <Typography>Employment Status: {userInfo.incomeType}</Typography>
            <Typography>Employer Name: {userInfo.employerName}</Typography>
            <Typography>Paycheck: ${userInfo.recentCheck} {userInfo.payFrequency}</Typography>
            {
            userInfo.additionalSourceOfIncome !== 'N / A' 
            && 
            <div>
              <Typography>Additional Income Source: {userInfo.additionalSourceOfIncome}</Typography>
              <Typography>Additional Income Amount: ${userInfo.additionalIncomeAmount} {userInfo.additionalPayFrequency}</Typography>
            </div>
            }
        </div>
    )
}
