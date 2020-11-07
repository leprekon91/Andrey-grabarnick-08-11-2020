import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import Login from './Login.jsx';

function LoginBtn({ onLogin }) {
  const [open, setopen] = React.useState(false);
  return (
    <>
      <Button
        color="inherit"
        onClick={() => setopen(true)}
        startIcon={<LockOpenIcon />}
      >
        Sign in
      </Button>
      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogContent>
          <Login onLogin={onLogin} />
        </DialogContent>
      </Dialog>
    </>
  );
}

LoginBtn.propTypes = { onLogin: PropTypes.func.isRequired };

export default LoginBtn;
