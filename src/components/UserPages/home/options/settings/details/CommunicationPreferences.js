import React, { useState } from 'react'
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
                checked={props.settings[props.title]}
                onChange={props.handleSwitchChange}
                name={props.name}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        </div>
    )
}

export default function CommunicationPreferences(props) {
    const classes = useStyles();

    const session = getSessionCookie();

    const [settings, setSettings] = useState({});

    const handleSwitchChange = (event) => {
        setSettings({ ...settings, [event.target.name]: event.target.checked });
    };

    const {userInfo, setUserInfo} = props;

    return (
        <div className={classes.root}>
            <SwitchOption title="Email Notifications" name="emailNotifications" settings={settings} handleSwitchChange={handleSwitchChange} />
            <SwitchOption title="Text/SMS Notifications" name="smsNotifications" settings={settings} handleSwitchChange={handleSwitchChange} />
            <SwitchOption title="Paperless Statements" name="paperlessStatements" settings={settings} handleSwitchChange={handleSwitchChange} />
        </div>
    )
}
