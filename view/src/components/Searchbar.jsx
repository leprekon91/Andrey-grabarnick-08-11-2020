import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

function Searchbar({ query, setQuery }) {
  return (
    <TextField
      id="query"
      label="Search by E-mail (Sender or Receiver)"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      variant="outlined"
      color="primary"
      fullWidth
      size="medium"
      autoFocus
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="inherit" />
          </InputAdornment>
        ),
      }}
    />
  );
}

Searchbar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default Searchbar;
