import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
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
          <SearchBooks/>
        </Switch>
        <BottomNav/>
      </>
    </Router>
  );
}

export default App;
