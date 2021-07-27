import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import HomeView from './pages/HomeView';
import ContactMe from './components/ContactUs';
import SearchesPage from './pages/SearchesPage';


function App() {
  return (
    <Router>
      <>
        <Navbar />
       <HomeView/>
       
        <Switch>
          <SearchesPage/>
        </Switch>
        
      </>
    </Router>
  );
}

export default App;
