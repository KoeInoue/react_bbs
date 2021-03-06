import React, { useState, useEffect } from 'react';
import { logout } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, BottomNavigation } from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Timeline } from './Timeline';
import { CreatePost } from './CreatePost';
import { Profile } from './Concurrency';
import { RouteComponentProps } from 'react-router-dom';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

type Props = {
  match: RouteComponentProps['match'];
  location: RouteComponentProps['location'];
  history: RouteComponentProps['history'];
  page: number;
};

export const Home: React.VFC<Props> = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    setValue(props.page);
  }, [props.page]);

  const logingout = async () => {
    localStorage.clear();
    dispatch(logout());
  };

  const Content = () => {
    switch (value) {
      case 0:
        return <Timeline />;
        break;
      case 1:
        return <CreatePost props={props} />;
        break;

      default:
        return <Profile />;
        break;
    }
  };

  return (
    <Grid container component="main" alignItems="center" justifyContent="center">
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
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
      <Grid item xs={12} sm={12} md={12} className={classes.contentWrap}>
        <Content />
      </Grid>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          switch (newValue) {
            case 0:
              props.history.push('/home');
              break;
            case 1:
              props.history.push('/post');
              break;
            case 2:
              props.history.push('/concurrency');
              break;

            default:
              break;
          }
        }}
        showLabels
        className={classes.bottomMenu}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Post" icon={<PostAddIcon />} />
        <BottomNavigationAction label="Concurrency" icon={<SwapHorizIcon />} />
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
    position: 'fixed',
    bottom: 0,
    background: '#f0f0f0',
  },
  menu: {
    width: 200,
  },
  contentWrap: {
    marginTop: '56px',
    marginBottom: '56px',
  },
}));
