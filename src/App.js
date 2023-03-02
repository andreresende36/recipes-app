import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
// import Header from './components/Header';

function App() {
  return (
    <Switch>
      <Switch>
        <Route path="/meals/:id/in-progress" />
        <Route path="/drinks/:id/in-progress" />
        <Route path="/meals/:id" component={ Recipes } />
        <Route path="/drinks/:id" component={ Recipes } />
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/profile" />
        <Route path="/done-recipes" />
        <Route path="/favorite-recipes" />
        <Route exact path="/" />
      </Switch>
    </Switch>
  );
}

export default App;
