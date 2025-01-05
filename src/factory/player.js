import Gameboard from "./gameboard.js";

class Player {
  constructor(name) {
    this.name = name;
    this.ships = [];
    this.gameboard = new Gameboard();
  }

  receiveShotAt(row, col) {
    // Validate the shot and update the board accordingly
    if (this.gameboard.board[row][col] === "-") {
      this.gameboard.board[row][col] = "M";
      return false;
    }

    this.gameboard.board[row][col] = "H";
    this.updateShipStatus(row, col);
    return true;
  }

  updateShipStatus(row, col) {
    this.ships.forEach((ship) => {
      ship.cellsOccupied.some((cell) => {
        if (cell[0] === row && cell[1] === col) {
          ship.hits++;
          if (ship.hits === ship.length) {
            ship.isSunk = true;
          }
          return true;
        }
      });
      return false;
    });
  }

  isLoser() {
    return this.ships.every((ship) => ship.isSunk === true);
  }
}

export default Player;
