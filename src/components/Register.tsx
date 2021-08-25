import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import styles from './Auth.module.css';
import axios from '../common/axios';
import { Avatar, Button, CssBaseline, TextField, Paper, Grid, Typography, makeStyles } from '@material-ui/core';
import { useParams, RouteComponentProps } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';

type Param = {
  token: string;
};

type propTypes = {
  match: RouteComponentProps['match'];
  location: RouteComponentProps['location'];
  history: RouteComponentProps['history'];
};

export const Register: React.VFC<propTypes> = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { token }: Param = useParams();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', password: '', token: '' });
  const [cookies, setCookie] = useCookies(['auth']);

  useEffect(() => {
    if (errors.token) {
      Swal.fire({
        title: 'Error!',
        text: errors.token,
        icon: 'error',
        confirmButtonText: 'Register Again',
      }).then((result) => {
        window.location.href = '/';
      });
    }
  }, [errors.token]);

  const signUp = async () => {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('password', password);
    params.append('token', token);
    axios.post('/api/register/', params).then((res) => {
      if (res.data.errors) {
        setErrors(res.data.errors);
        if (res.data.errors.account) {
          Swal.fire({
            title: 'Error!',
            text: res.data.errors.account,
            icon: 'error',
            confirmButtonText: 'Login',
          }).then(() => {
            window.location.href = '/';
          });
        }
      } else {
        setErrors({ name: '', password: '', token: '' });
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
        props.history.push('/home/');
      }
    });
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
            Register
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
            {errors.name && <span className={styles.red}>{`※${errors.name}`}</span>}
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
            {errors.password && (
              <span className={styles.red}>
                {errors.password === 'min' ? '※required at least 6 characters' : `※${errors.password}`}
              </span>
            )}
            <Button
              disabled={password.length < 6 || !name}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={async () => {
                try {
                  await signUp();
                } catch (error) {
                  alert(error.message);
                }
              }}
            >
              Register
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
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
}));

export default Register;
