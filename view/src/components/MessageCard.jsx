import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { colors } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Axios from 'axios';

import DelMessageBtn from './utils/DelMessageBtn.jsx';

function MessageCard({ message, type, onUpdate }) {
  const [open, setOpen] = useState(false);
  const { id, title, sender, receiver, received, seen, body, sentAt } = message;
  React.useEffect(() => {
    if (!received && type === 'inbox') {
      Axios.post('/api/receive', { message_id: id });
    }
  }, []);
  let icon = <AccessTimeIcon color="action" />;
  if (received) {
    icon = <DoneIcon color="secondary" />;
  }
  if (seen) {
    icon = <DoneAllIcon color="primary" />;
  }
  const seeMessage = () => {
    if (type === 'inbox') {
      Axios.post('/api/see', { message_id: id }).catch(alert);
    }
  };
  return (
    <>
      <ListItem
        style={{
          borderLeft: `5px solid ${
            colors[type === 'inbox' ? 'red' : 'blue'][500]
          }`,
        }}
        button
        onClick={() => {
          setOpen(true);
          seeMessage();
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={title}
          secondary={type === 'inbox' ? `from:${sender}` : `to:${receiver}`}
        />
      </ListItem>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="">
        <DialogTitle id="">
          {title} - {new Date(sentAt).toLocaleString()}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {type === 'inbox' ? `from:${sender}` : `to:${receiver}`}
            <br />
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {type === 'inbox' && (
            <DelMessageBtn
              msgId={id}
              onDelete={() => {
                setOpen(false);
                onUpdate();
              }}
            />
          )}
          <Button onClick={() => setOpen(false)} color="default">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

MessageCard.propTypes = {
  message: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
};
MessageCard.defaultProps = { onUpdate: () => {} };

export default MessageCard;
