import React, { ReactEventHandler, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import styles from './Auth.module.css';
import validateEmail from '../common/validation';
import axios from '../common/axios';
import { Avatar, Button, CssBaseline, TextField, Paper, Grid, Typography, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useCookies } from 'react-cookie';
import { RouteComponentProps } from 'react-router-dom';

type propTypes = {
  match: RouteComponentProps['match'];
  location: RouteComponentProps['location'];
  history: RouteComponentProps['history'];
};

export const Auth: React.VFC<propTypes> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', account: '' });
  const [isOpenErr, setIsOpenErr] = useState(false);

  const signIn = async () => {
    if (!validateEmail(email)) {
      errors.email = 'invalid email format';
      return;
    }
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    setIsSending(true);
    axios.post('/api/login/', params).then((res) => {
      if (res.data.errors) {
        console.log(res.data.errors);

        setErrors(res.data.errors);
        setIsSending(false);
        setIsOpenErr(true);
      } else {
        setErrors({ email: '', password: '', account: '' });
        dispatch(
          login({
            id: res.data.user.ID,
            name: res.data.user.Name,
            token: res.data.token,
          }),
        );
        localStorage.setItem('id', String(res.data.user.ID));
        localStorage.setItem('name', res.data.user.Name);
        localStorage.setItem('token', res.data.token);
        setIsSending(false);
        props.history.push('/home/');
      }
    });
  };

  const signUp = async () => {
    if (!validateEmail(email)) {
      errors.email = 'invalid email format';
      return;
    }

    const params = new URLSearchParams();
    params.append('email', email);
    setIsSending(true);
    axios.post('/api/pre-register/', params).then((res) => {
      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        setErrors({ email: '', password: '', account: '' });
        setIsSent(true);
      }
      setIsSending(false);
    });
  };

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenErr(false);
  };

  return (
    <Grid container component="main" className={classes.root} alignItems="center" justifyContent="center">
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLoggedIn ? 'Login' : 'Pre Register'}
          </Typography>
          <Snackbar
            open={isOpenErr}
            autoHideDuration={5000}
            onClose={handleClose}
            key={'top' + 'center'}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleClose} severity="error">
              {errors.account}
            </Alert>
          </Snackbar>
          {isSent ? (
            <p className={classes.center}>Email was sent</p>
          ) : (
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
              {errors.email && <span className={styles.red}>{`※${errors.email}`}</span>}
              {isLoggedIn && (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                />
              )}
              {errors.password && (
                <span className={styles.red}>
                  {errors.password === 'min' ? '※required at least 6 characters' : `※${errors.password}`}
                </span>
              )}

              <Button
                disabled={isLoggedIn ? !email || password.length < 6 || isSending : !email || isSending}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={
                  isLoggedIn
                    ? async () => {
                        try {
                          await signIn();
                        } catch (error) {
                          alert(error.message);
                        }
                      }
                    : async () => {
                        try {
                          await signUp();
                        } catch (error) {
                          alert(error.message);
                        }
                      }
                }
              >
                {isLoggedIn ? 'Login' : 'Pre Register'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <span onClick={() => setIsLoggedIn(!isLoggedIn)} className={styles.login_toggleMode}>
                    {isLoggedIn ? 'Create new account' : 'Back to Login'}
                  </span>
                </Grid>
              </Grid>
            </form>
          )}
        </div>
      </Grid>
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1619089941305-65d654dde46f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNDl8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  center: {
    textAlign: 'center',
    fontSize: '20px',
  },
}));
export default Auth;
