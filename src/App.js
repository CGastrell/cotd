import React, { Component } from 'react';
import { default as creeds } from './creeds.json';
import './App.css';
import CreedCard from './components/CreedCard'

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      creed: 0,
    }
    this.creeds = creeds
    this.randomCreed = this.randomCreed.bind( this );
  }
  randomCreed( event ) {
    let newCreed = this.state.creed;
    while ( newCreed === this.state.creed ) {
      newCreed = Math.floor( Math.random() * this.creeds.length );
    }
    this.setState({
      creed: newCreed
    });
  }

  render() {
    let creedIndex = this.state.creed
    return (
      <div className="App">
        <CreedCard onClick={ this.randomCreed } creed={ this.creeds[ creedIndex ] } />
      </div>
    );
  }
}

export default App;
