import React from 'react';
import { Component } from 'react';
import Counter from './Counter';
import './App.css';
import axios from 'axios';
import { render } from '@testing-library/react';


function randomizer(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      wins: 0,
      loses: 0,
      chosen: undefined
    };
  }
  
  onRock() {
    let i = randomizer(0, 3);
    if(i > 0) {
      this.setState({loses: this.state.loses+1});
      this.setState({playerWins: false});
    }
    else {
      this.setState({wins: this.state.wins+1});
      this.setState({playerWins: true});
    }
    this.setState({gameRestored: false});
    this.setState({chosen: 0});
  }
  
  onPaper() {
    let i = randomizer(0, 3);
    
    if(i > 1) {
      this.setState({loses: this.state.loses+1});
      this.setState({playerWins: false});
    }
    else {
      this.setState({wins: this.state.wins+1});
      this.setState({playerWins: true});
    }
    this.setState({chosen: 1});
    this.setState({gameRestored: false});
  }

  onScissors() {
    let i = randomizer(0, 3);
    if(i === 0) {
      this.setState({loses: this.state.loses+1});
      this.setState({playerWins: false});
    }
    else {
      this.setState({wins: this.state.wins+1})
      this.setState({playerWins: true});
    }
    this.setState({chosen: 2});
    this.setState({gameRestored: false});
  }

  onSave() {
    axios
      .post('http://localhost:3030/save', 
      { name: 'Bob', wins: this.state.wins, loses: this.state.loses })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onRestore() {
    axios
      .get('http://localhost:3030/restore/Bob')
      .then((response) => {
        this.setState({wins: response.data.wins});
        this.setState({loses: response.data.loses});
        this.setState({gameRestored: true});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="choose-container">
          Choose rock, paper or scissors
          <div>
            <button onClick={this.onRock.bind(this)}>Rock</button>
            <button onClick={this.onPaper.bind(this)}>Paper</button>
            <button onClick={this.onScissors.bind(this)}>Scissors</button>
          </div>
        <div>
          <button onClick={this.onSave.bind(this)}>Save game</button>
          <button onClick={this.onRestore.bind(this)}>Restore game</button>
        </div>
        </div>
        <Counter wins={this.state.wins} loses={this.state.loses} playerWins={this.state.playerWins} gameRestored={this.state.gameRestored}/>
      </div>
    );
  }
}

