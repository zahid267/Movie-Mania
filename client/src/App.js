import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import Navbar from './components/Navbar';
import HomeView from './pages/HomeView';
import MovieView from './pages/MovieView';
import ShowsView from './pages/ShowsView';
import Dashboard from './pages/Dashboard';

import SearchesPage from './pages/SearchesPage';
import BottomNav from './components/BottomNav';
import Watched from './pages/Watched';
import Wishlist from './pages/Wishlist';


function App() {
  return (
    <Router>
      <>
        <Navbar />
       <HomeView/>
       
        <Switch>

          <Route path="/" exact>
       
          <Dashboard />
          </Route>

          <Route path="/movies" exact>
          <SearchMovies />
          </Route>

          <Route path="/watched" exact>
          <Watched />
          </Route>

          <Route path="/wishlist" exact>
          <Wishlist />
          </Route>
        </Switch>

        

        <BottomNav/>
      </>
    </Router>
  );
}

export default App;
