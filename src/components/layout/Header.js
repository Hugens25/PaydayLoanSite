import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { getSessionCookie } from '../../session/session';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import green from '@material-ui/core/colors/green';
import Login from '../UserPages/Login';
import Logout from '../UserPages/Logout';
import Apply from '../ApplicationProcess/ApplicationFlow';
import LandingPage from '../LandingPage';
import HomePage from '../UserPages/home/HomePage';
import Settings from '../UserPages/Settings';
import SideNav from './SideNav';
import NotFound from '../misc/NotFound';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    paddingLeft: '120px'
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

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

  const session = getSessionCookie();

  const keysToRemove = ['ssn']

  const [userInfo, setUserInfo] = useState(session);
  const [maximumLoginAttemptsReached, setMaximumLoginAttemptsReached] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(1);
  const [isHambugerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  if(userInfo.isLoggedIn){
    Object.keys(userInfo)
    .filter((key) => keysToRemove.includes(key))
    .map((key) => {delete userInfo[key]})
  }

  const handleOpenSideNav = () => {
    setIsHamburgerMenuOpen(!isHambugerMenuOpen)
  }

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <StyledIconButton edge="start" className={classes.menuButton} aria-label="menu" onClick={handleOpenSideNav}>
              <MenuIcon />
            </StyledIconButton>
            <Typography variant="h6" className={classes.title} >
              <Link style={{ textDecoration: 'none', color: '#e8f5e9' }} to="/">Company Name</Link>
            </Typography>
            <StyledButton ><Link style={{ textDecoration: 'none', color: '#e8f5e9' }} to="/apply">Apply Now!</Link></StyledButton>
            {!session.isLoggedIn && <StyledButton ><Link style={{ textDecoration: 'none', color: '#e8f5e9' }} to="/login">LOGIN</Link></StyledButton>}
            {session.isLoggedIn && <StyledButton ><Link style={{ textDecoration: 'none', color: '#e8f5e9' }} to="/logout">LOGOUT</Link></StyledButton>}
          </Toolbar>
        </AppBar>
        {isHambugerMenuOpen && <SideNav userInfo={userInfo} isHambugerMenuOpen={isHambugerMenuOpen} setIsHamburgerMenuOpen={setIsHamburgerMenuOpen}/>}
          <Switch>
            <Route exact path="/" render={(props) => <LandingPage userInfo={userInfo} setUserInfo={setUserInfo} />}/>
            <Route path="/login" render={(props) => <Login userInfo={userInfo} setUserInfo={setUserInfo} maximumLoginAttemptsReached={maximumLoginAttemptsReached} setMaximumLoginAttemptsReached={setMaximumLoginAttemptsReached} loginAttempts={loginAttempts} setLoginAttempts={setLoginAttempts}/>}/>
            <Route path="/logout" render={(props) => <Logout userInfo={userInfo} setUserInfo={setUserInfo} setLoginAttempts={setLoginAttempts}/>}/>
            <Route path="/apply" render={(props) => <Apply userInfo={userInfo} setUserInfo={setUserInfo} />}/>
            <Route path="/home" render={(props) => <HomePage userInfo={userInfo} setUserInfo={setUserInfo} />}/>
            <Route path="/settings" render={(props) => <Settings userInfo={userInfo} setUserInfo={setUserInfo} />}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
    </Router>
  );
}
