import React from 'react';
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import green from '@material-ui/core/colors/green';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavbarTheme = createMuiTheme({
    palette: {
      primary: {
        main: green[500],
        contrastText: green[50],
      },
    },
  });

const StyledButton = withStyles({
  root: {
    color: green[50]
  }
})(Button);

const StyledIconButton = withStyles({
  root: {
    color: green[50]
  }
})(IconButton);

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={NavbarTheme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <StyledIconButton edge="start" className={classes.menuButton} aria-label="menu">
              <MenuIcon />
            </StyledIconButton>
            <Typography variant="h6" className={classes.title} >
              Company Name
            </Typography>
            <StyledButton >Apply Now!</StyledButton>
            <StyledButton >Login</StyledButton>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
