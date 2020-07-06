import React, { useEffect, useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import SettingTabs from './SettingTabs';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '80vw',
      margin: 'auto',
      padding: theme.spacing(3)
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      flexBasis: '50%',
      flexShrink: 0,
      textAlign: 'left',
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      textAlign: 'left',
    },
    paper: {
      width: '80vw',
      height: '90vh',
      margin: 'auto',
      padding: theme.spacing(2),
    },
    settingOption: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }));

export default function ViewSettings(props) {
  const classes = useStyles();

const [panelExpanded, setPanelExpanded] = React.useState(false);
  const [settings, setSettings] = React.useState({
    emailNotifications: true,
  });

  const handleSwitchChange = (event) => {
    setSettings({ ...settings, [event.target.name]: event.target.checked });
  };

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setPanelExpanded(isExpanded ? panel : false);
  };

  return(
    <ExpansionPanel expanded={panelExpanded === 'panel1'} onChange={handlePanelChange('panel1')}>
    <ExpansionPanelSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1bh-content"
    id="panel1bh-header"
    >
    <Typography className={classes.heading}>My Settings</Typography>
    {/* <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography> */}
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
        <Box className={classes.settingOption}>
            <SettingTabs />
        </Box>
    </ExpansionPanelDetails>
</ExpansionPanel>
  )
}