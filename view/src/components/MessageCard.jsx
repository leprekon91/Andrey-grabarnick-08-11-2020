import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Typography from '@material-ui/core/Typography';

function MessageCard({ message, type }) {
  const {
    title,
    body,
    sender,
    receiver,
    received,
    seen,
    sentAt,
  } = message;
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
          avatar={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Avatar aria-label="status" style={{ backgroundColor: '#efefef' }}>
              {icon}
            </Avatar>
          }
          title={title}
          subheader={type === 'inbox' ? `from:${sender}` : `to:${receiver}`}
        />
        <CardContent>
          <Typography variant="subtitle2" color="initial">
            Sent at {sentAt&&new Date(sentAt).toLocaleString()}
          </Typography>
          {body}
        </CardContent>
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
