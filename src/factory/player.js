import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import { generateRandNum } from "./utils.js";

const FLEET = [
  { name: "Submarine", length: 3 },
  { name: "Cruiser", length: 3 },
  { name: "Carrier", length: 5 },
  { name: "Battleship", length: 4 },
  { name: "Destroyer", length: 2 },
];

class Player {
  constructor(name) {
    this.name = name;
    this.ships = [];
    this.gameboard = new Gameboard();
  }

  placeShips() {
    FLEET.forEach(({ name, length }) => {
      let row = null,
        col = null,
        axis = null;
      while (!this.isPlaceAvailable(length, row, col, axis)) {
        if (this.name === "computer") {
          // Ensuring ship doesn't exceed board length
          row = generateRandNum(9 - length + 1);
          col = generateRandNum(9 - length + 1);
          axis = generateRandNum(2) === 0 ? "X" : "Y";
        } else {
          [row, col] = prompt(
            `Enter ${name}'s coordinates (row|col) separated by space:`
          )
            .split(" ")
            .map(Number);
          axis = prompt(`Enter the axis (X or Y):`);
        }
      }

      const ship = new Ship(name, length);

      for (let i = 0; i < length; i++) {
        if (axis === "X") {
          ship.cellsOccupied.push([row, col + i]);
          this.gameboard.board[row][col + i] = name[0];
        } else {
          ship.cellsOccupied.push([row + i, col]);
          this.gameboard.board[row + i][col] = name[0];
        }
      }
      this.ships.push(ship);
    });
  }

  isPlaceAvailable(length, row, col, axis) {
    if (axis === "X") {
      for (let i = 0; i < length; i++) {
        if (this.gameboard.board[row][col + i] !== "-") return false;
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (this.gameboard.board[row + i][col] !== "-") return false;
      }
    }
    return true;
  }

  receiveShot(row, col) {
    // Validate the shot and update the board accordingly
    if (this.gameboard.board[row][col] === "-") {
      this.gameboard.board[row][col] = "M";
      console.log(`Shot at row:${row} col:${col}, Is a Miss. ❌`);
      return false;
    }

    this.gameboard.board[row][col] = "H";
    console.log(`Shot at row:${row} col:${col}, Is a Hit! ✅`);
    this.updateShipStatus(row, col);
    return true;
  }

  updateShipStatus(row, col) {
    this.ships.forEach((ship) => {
      ship.cellsOccupied.some((cell) => {
        if (cell[0] === row && cell[1] === col) {
          ship.hits++;
          if (ship.hits === ship.length) {
            console.log(`${ship.name} is sunk!`);
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
