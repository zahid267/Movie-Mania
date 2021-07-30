import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import HomeView from './pages/HomeView';
import MovieView from './pages/MovieView';
import ShowsView from './pages/ShowsView';

import SearchesPage from './pages/SearchesPage';
import BottomNav from './components/BottomNav';


function App() {
  return (
    <Router>
      <>
        <Navbar />
       <HomeView/>
       
        <Switch>
          <Route path="/" exact></Route>
          <SearchBooks/>
        </Switch>

        <Switch>
          <Route path="/movies" exact></Route>
          <MovieView/>
        </Switch>

        {/* <Switch>
          <Route path="/shows" exact></Route>
          <ShowsView/>
        </Switch> */}

        <BottomNav/>
      </>
    </Router>
  );
}

export default App;
