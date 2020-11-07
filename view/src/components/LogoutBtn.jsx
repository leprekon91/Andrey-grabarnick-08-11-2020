import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';

function LogoutBtn({ loggedIn }) {
  const [loggedOut, setloggedOut] = React.useState(false);
  const onClick = (e) => {
    e.preventDefault();
    axios('/api/logout').then(() => setloggedOut(true));
  };
  if (!loggedIn) return null;
  if (loggedOut) {
    return <Redirect to="/" />;
  }
  return (
    <Button color="inherit" onClick={onClick} startIcon={<LockIcon />}>
      Signout
    </Button>
  );
}

LogoutBtn.propTypes = { loggedIn: PropTypes.bool.isRequired };

export default LogoutBtn;
