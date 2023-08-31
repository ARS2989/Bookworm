import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Profile from './components/Profile';

const client = new ApolloClient({
  uri: 'http://localhost:4000', // Your Apollo Server URL
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;


export default App;

import { useQuery } from '@apollo/client';
import { GET_ME } from './queries';

function Profile() {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.me;

  return (
    <div>
      <h2>My Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Book Count: {user.bookCount}</p>
      {/* Render saved books */}
    </div>
  );
}

export default Profile;

