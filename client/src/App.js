import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import Navbar from './components/Navbar';
import HomeView from './pages/HomeView';

import SearchesPage from './pages/SearchesPage';
import BottomNav from './components/BottomNav';


function App() {
  return (
    <Router>
      <>
        <Navbar />
       <HomeView/>
       
        <Switch>
          <SearchMovies/>
        </Switch>
        <BottomNav/>
      </>
    </Router>
  );
}

export default App;
