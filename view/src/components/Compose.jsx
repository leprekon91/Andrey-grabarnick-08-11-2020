import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Axios from 'axios';

function Compose() {
  const [toEmail, settoEmail] = useState('');
  const [body, setbody] = useState('');
  const [title, settitle] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post('/api/send', { toEmail, title, body })
      .then(() => {
        setLoading(false);
        alert('Message sent!');
        settoEmail('');
        settitle('');
        setbody('');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(
          ''
        );
      });
  };
  return (
    <Box m={1}>
      <Card>
        <CardHeader title="New Message" />
        <form onSubmit={onSubmit}>
          <CardContent>
            <Grid container direction="column">
              <TextField
                label="to:"
                type="email"
                fullWidth
                required
                value={toEmail}
                onChange={(e) => settoEmail(e.target.value)}
              />
              <br />
              <TextField
                label="Title"
                fullWidth
                required
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
              <br />
              <TextField
                label="Body"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={10}
                value={body}
                onChange={(e) => setbody(e.target.value)}
              />
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              type="submit"
              color="primary"
              startIcon={<SendIcon />}
              fullWidth
            >
              SEND
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
}

export default Compose;
