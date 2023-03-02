import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      {/* Adicionar rotas aqui */}
      <Route exact path="/" />
    </Switch>
  );
}

export default App;
