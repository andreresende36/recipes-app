import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      {/* Adicionar rotas aqui */}
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
