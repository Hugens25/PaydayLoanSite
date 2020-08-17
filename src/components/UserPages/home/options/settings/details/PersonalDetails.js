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

export default function PersonalDetails(props) {
    const classes = useStyles();

    const {userInfo, setUserInfo} = props;

    return (
        <div className={classes.root}>
            <Typography>Name: {userInfo.firstName} {userInfo.lastName}</Typography>
            <Typography >
              {`Address: ${userInfo.address1}\n${userInfo.address2 ? userInfo.address2 : ''}\n${userInfo.city}, ${userInfo.state} ${userInfo.zipCode}`}
            </Typography>
            <Typography>Email: {userInfo.email}</Typography>
        </div>
    )
}
