import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Axios from 'axios';
import { Redirect } from 'react-router-dom';

import { colors } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';

import { strengthColor, strengthIndicator, strengthLabel } from '../utils/pwdStr.js';
import Copyright from '../Copyright.jsx';
import useAuthStyles from '../utils/useAuthStyles.jsx';

function Signup({ onSignup }) {
  const classes = useAuthStyles();
  const [loading, setLoading] = useState(false);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [confirm, setconfirm] = useState('');
  const [email, setemail] = useState('');
  const [loggedIn, setloggedIn] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post('/api/signup', { username, password, email })
      .then(() => {
        setLoading(false);
        setloggedIn(true);
        onSignup();
      })
      .catch(() => {
        setLoading(false);
        seterrorMessage('Signup failed. You probably already have a user with that email...');
      });
  };

  if (loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
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
            inputProps={{
              minLength: 3,
              maxLength: 25,
              pattern: '[a-zA-Z0-9]+',
            }}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
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
            inputProps={{
              minLength: 7,
              maxLength: 15,
            }}
          />
          {password.length > 0 && (
            <>
              <Skeleton
                variant='rect'
                animation={false}
                height={8}
                style={{
                  backgroundColor:
                    colors[strengthColor(strengthIndicator(password))]['500'],
                  borderRadius: 15,
                }}
              />
              <Typography
                variant='body2'
                style={{
                  color:
                    colors[strengthColor(strengthIndicator(password))]['500'],
                }}
              >
                {strengthLabel(strengthIndicator(password))}
              </Typography>
            </>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm"
            label="Confirm Password"
            type="password"
            id="confirm"
            autoComplete="current-password"
            value={confirm}
            onChange={(e) => setconfirm(e.target.value)}
            inputProps={{
              minLength: 7,
              maxLength: 15,
            }}
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
              'Sign Up'
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

Signup.propTypes = { onSignup: PropTypes.func };
Signup.defaultProps = { onSignup: () => {} };

export default Signup;
