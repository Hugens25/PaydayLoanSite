import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import green from '@material-ui/core/colors/green';
import Login from '../UserPages/Login';
import Apply from '../ApplicationProcess/Apply';
import LandingPage from '../LandingPage';
import HomePage from '../UserPages/HomePage';


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
    <Router>
      <div className={classes.root}>
        <ThemeProvider theme={NavbarTheme}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <StyledIconButton edge="start" className={classes.menuButton} aria-label="menu">
                <MenuIcon />
              </StyledIconButton>
              <Typography variant="h6" className={classes.title} >
                <Link style={{ textDecoration: 'none', color: '#e8f5e9' }} to="/">Company Name</Link>
              </Typography>
              <StyledButton ><Link style={{ textDecoration: 'none', color: '#e8f5e9' }} to="/apply">Apply Now!</Link></StyledButton>
              <StyledButton ><Link style={{ textDecoration: 'none', color: '#e8f5e9' }} to="/login">Login</Link></StyledButton>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <Route exact path="/" component={LandingPage} />
        <Route path="/apply" component={Apply}/>
        <Route path="/login" component={Login}/>
        <Route path="/home" component={HomePage}/>
      </div>
    </Router>
  );
}
