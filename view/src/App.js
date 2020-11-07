import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'fontsource-roboto';

import Home from './components/Home.jsx';
import Inbox from './components/Inbox.jsx';
import Sent from './components/Sent.jsx';
import TopBar from './components/TopBar.jsx';
import Authenticated from './components/Authenticated.jsx';
import Login from './components/accounts/Login.jsx';
import Signup from './components/accounts/Signup.jsx';

export default function App() {
  return (
    <Router>
      <div>
        <TopBar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Authenticated path="/inbox" component={() => <Inbox />} />
          <Authenticated path="/sent" component={() => <Sent />} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
