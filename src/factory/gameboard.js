class Gameboard {
  constructor() {
    this.board = new Array(10).fill("-").map(() => new Array(10).fill("-"));
  }

  display() {
    this.board.forEach((row) => console.log(row.join(" ")));
  }

  isPlaceAvailable(length, row, col, axis) {
    if (axis === "X") {
      for (let i = 0; i < length; i++) {
        if (col + i > 9 || this.board[row][col + i] !== "-") return false;
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (row + i > 9 || this.board[row + i][col] !== "-") return false;
      }
    }
    return true;
  }

  placeShip(row, col, axis, ship) {
    let occupiedCells = [];
    const shipSymbol = ship.name[0];
    const shipLength = ship.length;

    if (axis === "X") {
      for (let i = 0; i < shipLength; i++) {
        this.board[row][col + i] = shipSymbol;
        occupiedCells.push([row, col + i]);
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        this.board[row + i][col] = shipSymbol;
        occupiedCells.push([row + i, col]);
      }
    }

    ship.cellsOccupied = occupiedCells;
  }
}

export default Gameboard;
