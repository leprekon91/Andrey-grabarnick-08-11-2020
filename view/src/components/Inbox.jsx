import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Divider, Grid, Paper, List } from '@material-ui/core';
import Axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';

import MessageCard from './MessageCard.jsx';
import NoMessages from './utils/NoMessages.jsx';
import Searchbar from './Searchbar.jsx';

function Inbox() {
  const [messages, setmessages] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  useEffect(() => {
    Axios.get(`/api/getinbox/${page}`)
      .then((res) => {
        const { data: arr } = res.data;
        arr.sort((a, b) => (new Date(a.sentAt) > new Date(b.sentAt) ? 1 : -1));
        setmessages([...arr]);
        setMaxPages(res.data.pages);
      })
      .catch(alert);
  }, [page]);
  if (messages.length === 0) {
    return <NoMessages />;
  }
  return (
    <Box m={1}>
      <Searchbar />
      <Typography variant="h4" color="initial">
        Sent
      </Typography>
      <Divider />
      <br />
      <Paper>
        <List>
          {messages.map((m) => (
            <MessageCard message={m} type="inbox" />
          ))}
        </List>
        <Divider />
        {maxPages > 1 && (
          <Grid container direction="row" justify="center">
            <Pagination
              count={maxPages}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          </Grid>
        )}
      </Paper>

      <br />
    </Box>
  );
}

export default Inbox;
