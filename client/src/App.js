import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import Navbar from './components/Navbar';
import HomeView from './pages/HomeView';
import MovieView from './pages/MovieView';
import ShowsView from './pages/ShowsView';

import SearchesPage from './pages/SearchesPage';
import BottomNav from './components/BottomNav';
import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const myToken = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: myToken ? `Bearer ${myToken}`: '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <HomeView />
          <Switch>
            <SearchMovies />
          </Switch>

          <BottomNav />
        </>
      </Router>
    </ApolloProvider>

  );
}

export default App;
