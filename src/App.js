import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Board} from './Board.js';

export class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      userFigure: "X",
      gameBoard: Array(9).fill(null),
      maxPlayer: "X",
      minPlayer: "O",
      winner: null,
      showModal: true,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    const gameBoard = Array(9).fill(null);
    this.setState({
      showModal: true,
      gameBoard: gameBoard,
      userFigure: "X",
      maxPlayer: "X",
      minPlayer: "O",
      winner: null,
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }


  setUserChoice(figure) {
    let aiFigure;
    if(figure == "X") {
      aiFigure = "O";
    } else {
      aiFigure = "X";
    }

    this.setState({
      userFigure: figure,
      minPlayer: aiFigure,
      maxPlayer: figure,
    });
  }

  startNewGame() {
    const gameBoard = Array(9).fill(null);
    this.setState({
      gameBoard: gameBoard,
      userFigure: null,
      maxPlayer: null,
      minPlayer: null,
      winner: null,
    })
  }



//   handleClick(num) {
//     const gameBoard = this.state.gameBoard.slice();

//     if (calculateWinner(gameBoard) || gameBoard[num]) {
//       return;
//     }
//     gameBoard[num] = this.state.xIsNext ? "X" : "O";
//     this.setState({
//       gameBoard: gameBoard,
//       xIsNext: !this.state.xIsNext
//     });
//   }

  // check if the spot in the board is empty,
  // if not, mark it
  validMove(move, player, gameBoard) {
    var gameBoard = gameBoard.slice();
    if (this.state.winner !== null || gameBoard[move]) {
      return null;
    } else {
      gameBoard[move] = player;
      return gameBoard;
    }
  }

  findAiMove(gameBoard) {
    var bestMoveScore = 100;
    // the maximizing player is the human player
    // the minimizing player is the AI
    let move = null;
    // test all possible move if game not over
    if (checkIfFull(gameBoard) || calculateWinner(gameBoard)) {
      return null;
    }

    for (var i = 0; i < gameBoard.length; i++) {
      // check every possible move that AI can make and see if it is valid. If valid, return a board and call the function
      let newBoard = this.validMove(i, this.state.minPlayer, gameBoard);
      if(newBoard) {
        // test scores in the player's perspective, try to minimize it
        var moveScore = this.maxScore(newBoard);
        if(moveScore < bestMoveScore) {
          bestMoveScore = moveScore; // b/c AI is the minimizing player, the lower the moveScore the better
          move = i;
        }
      }
    }

    return move;
  }

  minScore(gameBoard) {
    if (calculateWinner(gameBoard) == this.state.maxPlayer) {
      return 10;
    } else if(calculateWinner(gameBoard) == this.state.minPlayer) {
      return -10;
    } else if(checkIfFull(gameBoard)) {
      return 0;
    } else {
      var bestMoveValue = 100;
      for(var i = 0; i < gameBoard.length; i++) {
        var newBoard = this.validMove(i, this.state.minPlayer, gameBoard);
        if(newBoard) {
          var predictedMoveValue = this.maxScore(newBoard);
          if(predictedMoveValue < bestMoveValue) {
            bestMoveValue = predictedMoveValue;

          }
        }
      }
    }
    return bestMoveValue;
  }

    maxScore(gameBoard) {
    if (calculateWinner(gameBoard) == this.state.maxPlayer) {
      return 10;
    } else if(calculateWinner(gameBoard) == this.state.minPlayer) {
      return -10;
    } else if(checkIfFull(gameBoard)) {
      return 0;
    } else {
      var bestMoveValue = -100;
      for(var i = 0; i < gameBoard.length; i++) {
        var newBoard = this.validMove(i, this.state.maxPlayer, gameBoard);
        if(newBoard) {
          var predictedMoveValue = this.minScore(newBoard);
          if(predictedMoveValue > bestMoveValue) {
            bestMoveValue = predictedMoveValue;
          }
        }
      }
    }
    return bestMoveValue;
  }

  gameLoop(move) {

    let player = this.state.maxPlayer;
    let currentGameBoard = this.validMove(move, player, this.state.gameBoard);
    if(currentGameBoard == null) {
      return;
    }
    if(calculateWinner(currentGameBoard) == player) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: player,
      })
      return;
    }
    if(checkIfFull(currentGameBoard)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: 'draw',
      })
      return;
    }
    player = this.state.minPlayer; // let AI take a turn
    debugger;
    currentGameBoard = this.validMove(this.findAiMove(currentGameBoard), player, currentGameBoard);
    if(currentGameBoard == null) {
      return;
    }
    if(calculateWinner(currentGameBoard) == player) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: player,
      });
      return;
    }

    if (checkIfFull(currentGameBoard)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: 'd',
      })
      return;
    }

    this.setState({
      gameBoard: currentGameBoard,
    })
  }




  render() {
    //const winner = calculateWinner(this.state.gameBoard);
    let status;
    if(this.state.winner !== null) {
      if(this.state.winner !== "draw") {
        status = "Winner: " + this.state.winner;
      } else {
        status = "It's a Tie";
      }
    }

    // if (checkIfFull(this.state.gameBoard)) {
    //   status = "It's a Tie";
    // } else if (winner) {
    //   this.setState({winner: winner});
    //   status = "Winner: " + winner;
    // } else {
    //   status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
    // }

    const modalStyle = {
      content : {
        top                   : '40%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    var statusStyle={
      fontFamily: "Lobster, cursive"
    };

    const styles = {
      baseText: {
        fontFamily: "Cochin"
      },
      titleText: {
        fontSize: 20,
        fontWeight: "bold"
      }
    };

    return (
      <div className="game">

        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          contentLabel="Pick Figure"
          shouldCloseOnOverlayClick={false}
          style={modalStyle}
        >
          <p style={styles.titleText}>Do you want to be X or O ?</p>
            <button
              className="modalButton"
              onClick={this.setUserChoice.bind(this, "X")}
            >
              X
            </button>
            <button
              className="modalButton"
              onClick={this.setUserChoice.bind(this, "O")}
            >
              O
            </button>

            <p style={styles.titleText}>Have Fun & Good Luck:</p>
            <button className="modalButton" onClick={this.handleCloseModal}>
              Start Game!
            </button>
        </Modal>

        <button className="modalButton" onClick={this.handleOpenModal}>
          <i className="fa fa-gamepad" aria-hidden="true"></i>  New Game
        </button>



        <h1 style={statusStyle}>{status}</h1>
        <div className="board">
          <Board
            gameBoard={this.state.gameBoard}
            onClick={this.gameLoop.bind(this)}
          />

        </div>

      </div>
    );
  }

}



function calculateWinner(gameBoard) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return gameBoard[a];
    }
  }

  return null;
}

function checkIfFull(gameBoard) {
  var count = 0;
  for (var i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] !== null) {
      count++;
    }
  }

  if (count === 9) {
    return true;
  } else {
    return false;
  }
}
