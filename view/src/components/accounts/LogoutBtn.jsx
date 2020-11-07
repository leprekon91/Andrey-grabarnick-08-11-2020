import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';

function LogoutBtn({ logout }) {
  const [loggedOut, setloggedOut] = React.useState(false);
  const onClick = (e) => {
    e.preventDefault();
    axios('/api/logout').then(() => {
      setloggedOut(true);
      logout();
    });
  };

  if (loggedOut) {
    return <Redirect to="/" />;
  }
  return (
    <Button color="inherit" onClick={onClick} startIcon={<LockIcon />}>
      Signout
    </Button>
  );
}

LogoutBtn.propTypes = { logout: PropTypes.func.isRequired };

export default LogoutBtn;
