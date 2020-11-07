import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EditIcon from '@material-ui/icons/Edit';
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';
import LogoutBtn from './LogoutBtn.jsx';

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
  // const [loggedIn, setloggedIn] = React.useState(false);

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
          <Button
            color="inherit"
            component={Link}
            to="/login"
            startIcon={<LockOpenIcon />}
          >
            Signin
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            startIcon={<EditIcon />}
          >
            Signup
          </Button>
          <LogoutBtn loggedIn />
        </Toolbar>
      </AppBar>
    </div>
  );
}
