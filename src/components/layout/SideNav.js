import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import DescriptionIcon from '@material-ui/icons/Description';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import PhoneIcon from '@material-ui/icons/Phone';
import SettingsIcon from '@material-ui/icons/Settings';
import FolderIcon from '@material-ui/icons/Folder';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Settings from '../UserPages/Settings';
import green from '@material-ui/core/colors/green';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

function NavListItem(props){
    const {item} = props;
    return (
        <Link style={{ textDecoration: 'none', color: green[500] }} to={item.linkTo}>
        <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
        </ListItem>
        </Link>
    )
}

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();

  const {isHambugerMenuOpen, setIsHamburgerMenuOpen, userInfo} = props;

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isHambugerMenuOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => {setIsHamburgerMenuOpen(!isHambugerMenuOpen)}}>
            <ChevronLeftIcon /> <p style={{fontSize: '0.75rem'}}>CLOSE</p>
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
              {text:'Account Summary', icon: <MonetizationOnIcon />, needsLogin:true, linkTo: '/settings'}, 
              {text:'Account Details', icon: <LibraryBooksIcon />, needsLogin:true, linkTo: '/settings'},
              {text:'Messages', icon: <EmailIcon />, needsLogin:true, linkTo: '/settings'}, 
              {text:'Documents', icon:<DescriptionIcon />, needsLogin:true, linkTo: '/settings'}, 
              {text:'Contact Us', icon:<PhoneIcon />, needsLogin:false, linkTo:'/settings'}, 
              {text:'FAQs', icon: <LiveHelpIcon />, needsLogin:false, linkTo:'/settings'}, 
              {text:'Settings', icon:<SettingsIcon />, needsLogin:true, linkTo:'/settings'}
            ].map((item) => (
                item.needsLogin === true ? 
                    userInfo.isLoggedIn === true ?
                        <NavListItem item={item}/>
                    :
                        null
                :
                    <NavListItem item={item}/>
          ))}
        </List>
      </Drawer>
    </div>
  );
}