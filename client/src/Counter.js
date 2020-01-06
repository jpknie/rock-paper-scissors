import React from 'react';
import { Component } from 'react';

export default class Counter extends Component {
  
  render() {
    let container = "";
    var counters = 
    <div>
      <p>Wins: {this.props.wins}</p>
      <p>Loses: {this.props.loses}</p>
    </div>;
    
    if(this.props.wins === 0 && this.props.loses === 0) {
      container = <p>Let's play!</p>;
      counters = "";
    } else {
      if(!this.props.gameRestored) { 
        if(this.props.playerWins) {
          container = <p>Player wins!</p>;
        }
        if(!this.props.playerWins) {
          container = <p>Computer wins!</p>;
        }
      } else {
        container = <p>Game restored!</p>;
      }
    }
    return(
      <div>
          {container}
          {counters}
      </div>
    );
  }

}