import React, { useState, useEffect } from 'react';
import { logout } from '../features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../common/axios';
import { useCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, CssBaseline, TextField, Paper, Grid, BottomNavigation, Container } from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PersonIcon from '@material-ui/icons/Person';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { Timeline } from './Timeline';
import { CreatePost } from './CreatePost';
import { Profile } from './Profile';
import { RouteComponentProps } from 'react-router-dom';

type Props = {
  match: RouteComponentProps['match'];
  location: RouteComponentProps['location'];
  history: RouteComponentProps['history'];
};

export const Feeds: React.VFC<Props> = (props) => {
  const [value, setValue] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);

  const logingout = async () => {
    axios.get('/api/logout/').then((res) => {
      removeCookie('auth');
      props.history.push('');
    });
  };

  return (
    <Grid container component="main" alignItems="center" justifyContent="center">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              BBS
            </Typography>
            <Button
              color="inherit"
              onClick={async () => {
                await logingout();
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer anchor={'left'} open={isDrawerOpen} onClose={() => setIsDrawerOpen(!isDrawerOpen)}>
        <div className={classes.menu}>Nothing</div>
      </Drawer>
      <Grid item xs={12} sm={12} md={12}>
        {
          {
            0: <Timeline />,
            1: <CreatePost />,
            2: <Profile />,
          }[value]
        }
      </Grid>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.bottomMenu}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Post" icon={<PostAddIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </Grid>
  );
};

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
  bottomMenu: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    background: '#f0f0f0',
  },
  menu: {
    width: 200,
  },
}));
