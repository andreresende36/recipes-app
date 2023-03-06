import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import Meals from './pages/Meals';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import { RecipeDetails } from './pages/RecipeDetails';
import Provider from './context/RecipesProvider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route
          path="/meals/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } /> }
        />
        <Route
          path="/drinks/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } /> }
        />
        <Route
          path="/meals/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          path="/drinks/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          path="/meals"
          render={ (props) => <Meals { ...props } /> }
        />
        <Route
          path="/drinks"
          render={ (props) => <Drinks { ...props } /> }
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
