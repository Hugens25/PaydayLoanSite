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
            <Typography>Name: {session.firstName} {session.lastName}</Typography>
            <Typography >
              {`Address: ${session.address1}\n${session.address2 ? session.address2 : ''}\n${session.city}, ${session.state} ${session.zipCode}`}
            </Typography>
            <Typography>Email: {session.email}</Typography>
        </div>
    )
}
