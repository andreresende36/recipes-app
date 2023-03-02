import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import Meals from './pages/Meals';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
// import Header from './components/Header';

function App() {
  return (
    <Switch>
      <Switch>
        <Route path="/meals/:id/in-progress" />
        <Route path="/drinks/:id/in-progress" />
        <Route path="/meals/:id" />
        <Route path="/drinks/:id" />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/" />
      </Switch>
    </Switch>
  );
}

export default App;
