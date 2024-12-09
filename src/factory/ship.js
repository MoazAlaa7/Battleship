class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.isSunk = false;
    this.cellsOccupied = [];
  }
}

export default Ship;
