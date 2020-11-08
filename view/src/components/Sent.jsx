import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Divider, Grid, List, Paper } from '@material-ui/core';
import Axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import MessageCard from './MessageCard.jsx';
import NoMessages from './utils/NoMessages.jsx';

function Sent() {
  const [messages, setmessages] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  useEffect(() => {
    Axios.get(`/api/getsent/${page}`)
      .then((res) => {
        const { data: arr } = res.data;
        setmessages([...arr]);
        setMaxPages(res.data.pages);
      })
      .catch(alert);
  }, [page, messages.length]);
  if (messages.length === 0) {
    return <NoMessages />;
  }
  return (
    <Box m={1}>
      <Typography variant="h4" color="initial">
        Sent
      </Typography>
      <Divider />
      <br />
      <Paper>
        <List>
          {messages.map((m) => (
            <MessageCard
              key={m.id}
              message={m}
              type="sent"
            />
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

export default Sent;
