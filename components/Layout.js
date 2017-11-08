/* @flow */
import * as React from 'react';

import Link from 'next/link';
import Router from 'next/router';

import { withStyles, withTheme } from 'material-ui/styles';
import { createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { ListItem, /*ListItemIcon,*/ ListItemText } from 'material-ui/List';

import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';

import withRoot from '../components/withRoot';

import Login from './Login';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100vh',
  },
  appBar: {
    position: 'absolute',
    zIndex: 2000,
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc( 100% - ${drawerWidth}px )`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    paddingTop: 56,
    height: 'calc( 100vh - 56px )',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
      height: 'calc( 100vh - 64px )',
    },
    width: drawerWidth + 10,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: 'calc( 100vh - 56px )',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc( 100vh - 64px )',
      marginTop: 64,
    },
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

type MenuNaviationButtonProps = {
  label:string, 
  href:string, 
  onClick?:Function
};

class MenuNavigationButton extends React.Component<MenuNaviationButtonProps> {
  
  constructor(props:MenuNaviationButtonProps) {
    super();
  }

  render() {
    const { label, href } = this.props;

    return (
      <Link href={href} prefetch>
        <ListItem button>
          <ListItemText primary={label}/>
        </ListItem>
      </Link>
    );
  }
}

type LayoutProps = {classes:Object, theme:Object, children:any};
type LayoutState = {menuOpen:boolean, userCredentials:?Object};

class Layout extends React.Component<LayoutProps, LayoutState> {
  state:LayoutState = {
    menuOpen: false,
    userCredentials:{},
  };

  handleDrawerToggle = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };
  
  closeDrawer = () => {
    this.setState({ menuOpen: false });
  }
  
  constructor(props) {
    super();
    Router.onRouteChangeStart = (url) => {
      this.closeDrawer();
    }    
  }

  render() {
    const { classes, theme } = this.props;
    const { userCredentials } = this.state;

    const drawer = (
      <div>
        <MenuNavigationButton label="Home" href="/" />
        <MenuNavigationButton label="About" href="/about" />
        <MenuNavigationButton label="Map" href="/map" />
      </div>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                Responsive drawer
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              type="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.menuOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onRequestClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="css">
            <Drawer
              type="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <Login 
              visible={!(userCredentials && userCredentials.google)} 
              onSuccess={(credentials) => {
                console.log("credentials", credentials);
                this.setState({userCredentials: {google: credentials}});
              }}
              onFailure={(message) => {
                console.log("message", message);
              }}
            /> 
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

export default withRoot((withTheme()(withStyles(styles)(Layout))));
