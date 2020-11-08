import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

function Searchbar({ query, setQuery }) {
  return (
    <TextField
      id="query"
      label="Search by e-mail"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      variant="outlined"
      fullWidth
      size="medium"
    />
  );
}

Searchbar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default Searchbar;
