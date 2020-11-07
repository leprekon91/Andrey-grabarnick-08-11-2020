import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

function MessageCard({ message, type }) {
  const { title, body, sender, received, seen } = message;
  let icon = <AccessTimeIcon color="action" />;
  if (received) {
    icon = <DoneIcon color="secondary" />;
  }
  if (seen) {
    icon = <DoneAllIcon color="primary" />;
  }

  return (
    <div>
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="status" style={{backgroundColor:'#efefef'}}>{icon}</Avatar>}
          title={title}
          subheader={`from: ${sender}`}
        />
        <CardContent>{body}</CardContent>
      </Card>
      {JSON.stringify({ message, type })}
    </div>
  );
}

MessageCard.propTypes = {
  message: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default MessageCard;
