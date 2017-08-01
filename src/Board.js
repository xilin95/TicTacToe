import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function Square(props) {
  return (
    <button
      className="square btn btn-secondary"
      type="button"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null)
    };
  }

  createSquare(num) {
    return (
      <Square
        value={this.props.gameBoard[num]}
        onClick={() => this.props.onClick(num)}
      />
    );
  }

  render() {
    return (
      <div>

        <div
          className="btn-toolbar"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div
            className="row mr-2"
            role="group"
            aria-label="First group"
          >
            {this.createSquare(0)}
            {this.createSquare(1)}
            {this.createSquare(2)}
          </div>
        </div>
        <div
          className="btn-toolbar"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div
            className="row mr-2"
            role="group"
            aria-label="Second group"
          >
            {this.createSquare(3)}
            {this.createSquare(4)}
            {this.createSquare(5)}
          </div>
        </div>
        <div
          className="btn-toolbar"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div
            className="row mr-2"
            role="group"
            aria-label="Third group"
          >
            {this.createSquare(6)}
            {this.createSquare(7)}
            {this.createSquare(8)}
          </div>
        </div>
      </div>
    );
  }
}
