import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/meals/:id/in-progress" />
        <Route path="/drinks/:id/in-progress" />
        <Route path="/meals/:id" />
        <Route path="/drinks/:id" />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/profile" />
        <Route path="/done-recipes" />
        <Route path="/favorite-recipes" />
        <Route exact path="/" />
      </Switch>
    </Provider>
  );
}

export default App;
