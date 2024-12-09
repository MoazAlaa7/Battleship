class Gameboard {
  constructor() {
    this.board = new Array(10).fill("-").map(() => new Array(10).fill("-"));
  }

  display() {
    this.board.forEach((row) => console.log(row.join(" ")));
  }
}

export default Gameboard;
