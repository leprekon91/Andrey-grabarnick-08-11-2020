import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {
  Box,
  Divider,
  Grid,
  Paper,
  List,
  LinearProgress,
  Typography
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import Landing from './Landing.jsx';
import Searchbar from './Searchbar.jsx';
import MessageCard from './MessageCard.jsx';
import NoMessages from './utils/NoMessages.jsx';

function Home() {
  const [loggedIn, setloggedIn] = useState(false);
  const [loading, setloading] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setmessages] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [email, setemail] = useState('');

  useEffect(async () => {
    setloading(true);
    Axios('/api/me')
      .then((res) => {
        setloading(false);
        setloggedIn(res.data.isLoggedIn);
        if (res.data.isLoggedIn) {
          setemail(res.data.email);
        }
      })
      .catch();
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      Axios.get(`/api/getall/${page}/${query === '' ? 'none' : query}`)
        .then((res) => {
          const { data: arr } = res.data;
          arr.sort((a, b) =>
            new Date(a.sentAt) > new Date(b.sentAt) ? 1 : -1
          );
          setmessages([...arr]);
          setMaxPages(res.data.pages);
        })
        .catch(alert);
    }
  }, [query, loggedIn]);
  if (loading) {
    return <LinearProgress />;
  }
  if (!loggedIn) {
    return <Landing />;
  }
  if (messages.length === 0 && query === '') {
    return <NoMessages />;
  }
  return (
    <Box m={1}>
      <Searchbar query={query} setQuery={setQuery} />
      <Paper>
        {messages.length > 0 ? (
          <>
            <List>
              {messages.map((m) => (
                <MessageCard
                  key={m.id}
                  message={m}
                  type={m.receiver === email ? 'inbox' : 'sent'}
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
          </>
        ) : (
          <Typography variant="h6" color="initial">No Messages Found...</Typography>
        )}
      </Paper>
    </Box>
  );
}
export default Home;
