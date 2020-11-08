import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';
import LogoutBtn from './accounts/LogoutBtn.jsx';
import LoginBtn from './accounts/LoginBtn.jsx';
import SignupBtn from './accounts/SignupBtn.jsx';
import DefaultAvatar from './utils/DefaultAvatar.jsx';

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
}));

export default function TopBar() {
  const classes = useStyles();
  const [loggedIn, setloggedIn] = React.useState(false);
  const [username, setusername] = React.useState('');

  React.useEffect(async () => {
    Axios('/api/me').then((res) => {
      setloggedIn(res.data.isLoggedIn);
      if (res.data.isLoggedIn) {
        setusername(res.data.username);
      }
    });
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            component={Link}
            to="/"
            color="inherit"
            aria-label="menu"
          >
            <img src="/icons/chicken.png" alt="logo" height={30} width={30} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Gaggle
          </Typography>
          {loggedIn ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/inbox"
                startIcon={<InboxIcon />}
              >
                Inbox
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/sent"
                startIcon={<SendIcon />}
              >
                Sent
              </Button>
              {username && <DefaultAvatar name={username} />}
              <LogoutBtn
                logout={() => {
                  setloggedIn(false);
                }}
              />
            </>
          ) : (
            <>
              <LoginBtn onLogin={() => setloggedIn(true)} />
              <SignupBtn onSignup={() => setloggedIn(true)} />
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
