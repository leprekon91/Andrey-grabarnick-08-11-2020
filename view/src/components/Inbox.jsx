import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Divider } from '@material-ui/core';
import Axios from 'axios';

import MessageCard from './MessageCard.jsx';

function Inbox() {
  React.useEffect(() => {
    Axios.get('/api/getsent/1').then(console.log);
  }, []);

  const dummyMessage = {
    id: 1,
    title: 'This is a Title',
    body: 'This is a body.',
    sender: 'sender@email.com',
    receiver: 'receiver@email.com',
    received: false,
    seen: false,
  };
  return (
    <Box m={1}>
      <Typography variant="h4" color="initial">
        Inbox
      </Typography>
      <Divider />
      <br />
      <MessageCard message={dummyMessage} type="inbox" />
    </Box>
  );
}

export default Inbox;
