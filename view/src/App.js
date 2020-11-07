import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import './App.css';
import 'fontsource-roboto';

import Home from './components/Home.jsx';
import Inbox from './components/Inbox.jsx';
import Sent from './components/Sent.jsx';
import TopBar from './components/TopBar.jsx';
import Authenticated from './components/Authenticated.jsx';
import Login from './components/accounts/Login.jsx';
import Signup from './components/accounts/Signup.jsx';
import Compose from './components/Compose.jsx';

export default function App() {
  return (
    <div>
      <Router>
        <div>
          <TopBar />
          <Fab
            variant="extended"
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
            }}
            color="secondary"
            component={Link}
            to="/compose"
          >
            <AddIcon
              style={{
                marginRight: 8,
              }}
            />
            Compose
          </Fab>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Authenticated path="/inbox" component={() => <Inbox />} />
            <Authenticated path="/sent" component={() => <Sent />} />
            <Authenticated path="/compose" component={() => <Compose />} />
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
