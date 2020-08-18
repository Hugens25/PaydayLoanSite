import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getSessionCookie } from '../../../../../../session/session';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  }));

export default function IncompleteApplications(props) {
    const classes = useStyles();

    const session = getSessionCookie();

    const [retrievedApplications, setRetrievedApplications] = useState(false);
    const [userApplications, setUserApplications] = useState();

    const {userInfo, setUserInfo} = props;

    async function getIncompleteApplications() {
      let url = 'https://8e7wggf57e.execute-api.us-east-1.amazonaws.com/default/get-applications'
      let payload = {"email": session.email, "searchCriteria": {"attribute":"applicationComplete", "value":"false"}}
      let data = await (await fetch(url, {method: 'POST', body: JSON.stringify(payload)})).json()
      setRetrievedApplications(true)
      return data
    }
    
    useEffect(() => {
      if(!retrievedApplications){
        getIncompleteApplications().then((data) => {setUserApplications(data)})
      }
    }, [retrievedApplications, userApplications])
    
    return (
        <div className={classes.root}>
            {
            userApplications ? userApplications.applications.map((application) => 
              <Typography>Date: {application.date}</Typography>
            ) : ''
            }
        </div>
    )
}
