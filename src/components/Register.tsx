import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import styles from './Auth.module.css';
import axios from '../common/axios';
import { Avatar, Button, CssBaseline, TextField, Paper, Grid, Typography, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

type Param = {
  token: string;
};

export const Register: React.FC = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { token }: Param = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', token: '' });

  const signUp = async () => {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('email', email);
    params.append('password', password);
    params.append('token', token);
    axios.post('/api/register/', params).then((res) => {
      console.log(res.data);
      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        setErrors({ name: '', email: '', password: '', token: '' });
      }
      // user data, をストアに保存する
      // dispatch(
      //   login({
      //     id: 1,
      //     name,
      //     profileImgUrl:
      //       'https://images.unsplash.com/photo-1524638431109-93d95c968f03?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80',
      //   }),
      // );
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
              disabled={!email || password.length < 6 || !name}
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
