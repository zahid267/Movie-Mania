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


function App() {
  return (
    <Router>
      <>
        <Navbar />
       <HomeView/>
       
        <Switch>

          <Route path="" exact>
          <SearchMovies />
          </Route>

          <Route path="/movies" exact>
          <Dashboard />
          </Route>
         
        </Switch>

        

        <BottomNav/>
      </>
    </Router>
  );
}

export default App;
