import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import Meals from './pages/Meals';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Provider from './context/RecipesProvider';
// import Header from './components/Header';

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/meals/:id/in-progress" />
        <Route path="/drinks/:id/in-progress" />
        <Route path="/meals/:id" />
        <Route path="/drinks/:id" />
        <Route
          path="/meals"
          render={ (props) => <Meals { ...props } /> }
        />

        <Route
          path="/drinks"
          component={ Drinks }
          render={ (props) => <Meals { ...props } /> }
        />
        <Route
          path="/profile"
          render={ (props) => <Profile { ...props } /> }
        />
        <Route
          path="/done-recipes"
          render={ (props) => <DoneRecipes { ...props } /> }
        />
        <Route
          path="/favorite-recipes"
          render={ (props) => <FavoriteRecipes { ...props } /> }
        />
        <Route exact path="/" component={ Login } />
      </Switch>
    </Provider>
  );
}

export default App;
