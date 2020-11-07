import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import Copyright from '../Copyright.jsx';
import useAuthStyles from '../utils/useAuthStyles.jsx';

export default function Login({ onLogin }) {
  const classes = useAuthStyles();
  const [loading, setLoading] = useState(false);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [loggedIn, setloggedIn] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post('/api/login', { username, password })
      .then(() => {
        setLoading(false);
        setloggedIn(true);
        onLogin();
      })
      .catch(() => {
        setLoading(false);
        seterrorMessage('Login failed!');
      });
    // DONE
  };
  if (loggedIn) {
    return <Redirect to="/inbox" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            autoFocus
          />
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
            onChange={(e) => setpassword(e.target.value)}
          />
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading ? (
              <>
                <CircularProgress size={24} color="inherit" />
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

Login.propTypes = { onLogin: PropTypes.func };
Login.defaultProps = { onLogin: () => {} };
