import { Grid } from '@material-ui/core';
import React from 'react';
import Typography from '@material-ui/core/Typography';

function NoMessages() {
  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="stretch"
    >
      <Typography variant="h1" color="primary">
        No Messages Here!
      </Typography>
      <Typography variant="h4" color="default">
        Send a messsage through the <i>Compose</i> button on the bottom!
      </Typography>
    </Grid>
  );
}

export default NoMessages;
