import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import EditIcon from '@material-ui/icons/Edit';
import Signup from './Signup.jsx';

function SignupBtn({ onSignup }) {
  const [open, setopen] = React.useState(false);
  return (
    <>
      <Button
        color="inherit"
        onClick={() => setopen(true)}
        startIcon={<EditIcon />}
      >
        Sign up
      </Button>
      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogContent>
          <Signup onSignup={onSignup} />
        </DialogContent>
      </Dialog>
    </>
  );
}

SignupBtn.propTypes = { onSignup: PropTypes.func.isRequired };

export default SignupBtn;
