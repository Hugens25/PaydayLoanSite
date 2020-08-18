import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import Switch from '@material-ui/core/Switch';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getSessionCookie } from '../../../../../../session/session';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    settingOption: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
  }));

function SwitchOption(props) {
    const classes = useStyles();
    return (
        <div className={classes.settingOption}>
            <Typography>{props.title}</Typography>
            <Switch 
                checked={props.checked}
                onChange={props.handleSwitchChange}
                name={props.name}
            />
        </div>
    )
}

export default function CommunicationPreferences(props) {
    const classes = useStyles();

    const session = getSessionCookie();

    const {userInfo, setUserInfo} = props;

    const [settings, setSettings] = useState({
        'emailNotifications':userInfo.emailNotifications, 
        'smsNotifications': userInfo.smsNotifications, 
        'paperlessStatements':userInfo.paperlessStatements
    });

    const handleSwitchChange = (event) => {
        setSettings({ ...settings, [event.target.name]: event.target.checked });
    };

    async function setUserCommunicationPreferences() {
        let url = 'https://8e7wggf57e.execute-api.us-east-1.amazonaws.com/default/update-user'
        let payload = {"email": session.email, ...settings}
        let data = await (await fetch(url, {method: 'POST', body: JSON.stringify(payload)})).json()
        return data
      }

    useEffect(() => {
        setUserCommunicationPreferences()
    }, [settings])

    return (
        <div className={classes.root}>
            <SwitchOption title="Email Notifications" name="emailNotifications" checked={settings.emailNotifications} handleSwitchChange={handleSwitchChange} />
            <SwitchOption title="Text/SMS Notifications" name="smsNotifications" checked={settings.smsNotifications} handleSwitchChange={handleSwitchChange} />
            <SwitchOption title="Paperless Statements" name="paperlessStatements" checked={settings.paperlessStatements} handleSwitchChange={handleSwitchChange} />
        </div>
    )
}
