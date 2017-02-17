import * as React from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';
import GamesPage from './components/gamesPage';
import GameForm from './components/gameForm';

// const logo = require('./logo.svg');

class App extends React.Component<null, null> {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <Link className="item" to="/">Home</Link>
          <Link className="item" to="/games">Games</Link>
          <Link className="item" to="/games/new">Add New Game</Link>
        </div>

        <Route exact path="/games" component={GamesPage} />
        <Route exact path="/games/new" component={GameForm} />
        <Route exact path="/game/:_id" component={GameForm} />
      </div>
    );
  }
}

export default App;
