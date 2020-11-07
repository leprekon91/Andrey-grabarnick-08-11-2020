import React from 'react';
import Axios from 'axios';
import Landing from './Landing.jsx';

function Home() {
  const [loggedIn, setloggedIn] = React.useState(false);
  React.useEffect(async () => {
    Axios('/api/me').then((res) => setloggedIn(res.data.isLoggedIn));
  });
  if (!loggedIn) {
    return <Landing />;
  }
  return <div>Home- mesasges, unread and received</div>;
}

export default Home;
