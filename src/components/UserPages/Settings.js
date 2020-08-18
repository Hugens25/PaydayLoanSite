import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import { getSessionCookie } from '../../session/session';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80vw',
    margin: 'auto',
    padding: theme.spacing(3)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
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

export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const session = getSessionCookie();
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

  return (
    <div className={classes.root}>
      {!session.isLoggedIn && <Redirect to="/login"/>}
        <Typography variant="h5" gutterBottom>Settings</Typography>
        <ExpansionPanel expanded={panelExpanded === 'panel1'} onChange={handlePanelChange('panel1')}>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
            <Typography className={classes.heading}>General settings</Typography>
            <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Box className={classes.settingOption}>
                    <Typography>
                        Email Notifications
                    </Typography>
                    <Switch 
                        checked={settings.emailNotifications}
                        onChange={handleSwitchChange}
                        name="emailNotifications"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                </Box>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={panelExpanded === 'panel2'} onChange={handlePanelChange('panel2')}>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            >
            <Typography className={classes.heading}>Users</Typography>
            <Typography className={classes.secondaryHeading}>
                You are currently not an owner
            </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={panelExpanded === 'panel3'} onChange={handlePanelChange('panel3')}>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
            >
            <Typography className={classes.heading}>Advanced settings</Typography>
            <Typography className={classes.secondaryHeading}>
                Filtering has been entirely disabled for whole web server
            </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                vitae egestas augue. Duis vel est augue.
            </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={panelExpanded === 'panel4'} onChange={handlePanelChange('panel4')}>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
            >
            <Typography className={classes.heading}>Personal data</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                vitae egestas augue. Duis vel est augue.
            </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
  );
}
