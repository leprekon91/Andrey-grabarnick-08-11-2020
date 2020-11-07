import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Divider } from '@material-ui/core';
import Axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';

import MessageCard from './MessageCard.jsx';

function Inbox() {
  const [messages, setmessages] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  useEffect(() => {
    Axios.get(`/api/getsent/${page}`)
      .then((res) => {
        const { data: arr } = res.data;
        setmessages([...arr]);
        setMaxPages(res.data.pages)
      })
      .catch(alert);
  }, [page]);

  return (
    <Box m={1}>
      <Typography variant="h4" color="initial">
        Inbox
      </Typography>
      <Divider />
      <br />
      {messages.map(m=><MessageCard message={m} type="inbox" />)}
      <Pagination count={maxPages} page={page} onChange={(e, v) => setPage(v)} />
    </Box>
  );
}

export default Inbox;
