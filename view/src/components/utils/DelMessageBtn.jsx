/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios';

function DelMessageBtn({ msgId, onDelete }) {
  const onClick = () => {
    if (confirm('Are you sure? this can not be undone!'))
      Axios.post('/api/delete', { message_id: msgId }).then(() => {
        alert('Message deleted!');
        onDelete();
      });
  };
  return (
    <IconButton aria-label="delete message" onClick={onClick}>
      <DeleteIcon color="secondary" />
    </IconButton>
  );
}

DelMessageBtn.propTypes = {
  msgId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DelMessageBtn;
