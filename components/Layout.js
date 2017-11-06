/* @flow */
import * as React from 'react';

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

type MenuNaviationButtonProps = {label:string, href:string};

class MenuNavigationButton extends React.Component {
  props:MenuNaviationButtonProps;

  navigate() {
    window.location = this.props.href;
  }

  constructor(props:MenuNaviationButtonProps) {
    super();
    this.onClick = this.navigate.bind(this);
  }

  render() {
    const { label } = this.props;

    return (
      <ListItem button onClick={this.onClick}>
        <ListItemText primary={label}/>
      </ListItem>
    );
  }
}

class Layout extends React.Component {
  props:{classes:Object};

  state:{menuOpen:boolean} = {
    menuOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <MenuNavigationButton label="Home" href="/"/>
        <MenuNavigationButton label="About" href="/about"/>
        <MenuNavigationButton label="Map" href="/map"/>
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
              open={this.state.mobileOpen}
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
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

export default withRoot((withTheme()(withStyles(styles)(Layout))));
