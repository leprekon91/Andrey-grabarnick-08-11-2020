/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Route, Redirect } from 'react-router-dom';

function Authenticated({ component, exact, path }) {
  const [authenticated, setAuthetnticated] = React.useState(false);
  const [logginIn, setlogginIn] = React.useState(true);

  React.useEffect(async () => {
    const result = await axios('/api/me');
    setAuthetnticated(result.data.isLoggedIn);
    setlogginIn(!result);
  }, []);

  if (logginIn) {
    return 'loading';
  }

  return (
    <Route
      exact={exact}
      path={path}
      component={(props) =>
        authenticated ? (
          React.createElement(component, { ...props, logginIn, authenticated })
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

Authenticated.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
};

Authenticated.defaultProps = {
  exact: false,
};

export default Authenticated;
