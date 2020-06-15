import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import green from '@material-ui/core/colors/green';
import Login from '../UserPages/Login';
import Logout from '../UserPages/Logout';
import Apply from '../ApplicationProcess/Apply';
import LandingPage from '../LandingPage';
import HomePage from '../UserPages/HomePage';
import Settings from '../UserPages/Settings';
import SideNav from './SideNav';

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

  const [userInfo, setUserInfo] = useState({'isLoggedIn':false});
  const [applicantInfo, setApplicantInfo] = useState({});
  const [isHambugerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

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
            {!userInfo.isLoggedIn && <StyledButton ><Link style={{ textDecoration: 'none', color: '#e8f5e9' }} to="/login">LOGIN</Link></StyledButton>}
            {userInfo.isLoggedIn && <StyledButton ><Link style={{ textDecoration: 'none', color: '#e8f5e9' }} to="/logout">LOGOUT</Link></StyledButton>}
          </Toolbar>
        </AppBar>
        {isHambugerMenuOpen && <SideNav isHambugerMenuOpen={isHambugerMenuOpen} setIsHamburgerMenuOpen={setIsHamburgerMenuOpen}/>}
          <Route exact path="/" render={(props) => <LandingPage userInfo={userInfo} setUserInfo={setUserInfo} applicantInfo={applicantInfo} setApplicantInfo={setApplicantInfo} />}/>
          <Route path="/apply" render={(props) => <Apply userInfo={userInfo} setUserInfo={setUserInfo} applicantInfo={applicantInfo} setApplicantInfo={setApplicantInfo} />}/>
          <Route path="/login" render={(props) => <Login userInfo={userInfo} setUserInfo={setUserInfo} />}/>
          <Route path="/logout" render={(props) => <Logout userInfo={userInfo} setUserInfo={setUserInfo} applicantInfo={applicantInfo} setApplicantInfo={setApplicantInfo} />}/>
          <Route path="/home" render={(props) => <HomePage userInfo={userInfo} setUserInfo={setUserInfo} />}/>
          <Route path="/settings" render={(props) => <Settings userInfo={userInfo} setUserInfo={setUserInfo} />}/>
      </div>
    </Router>
  );
}
