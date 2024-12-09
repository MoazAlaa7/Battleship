import Player from "./player.js";
import { generateRandNum } from "./utils.js";

class GameController {
  constructor() {
    console.log("Welcome to the Battleship game!");

    this.playerName = prompt("Enter your Name: ");
    this.player = new Player(this.playerName);
    this.computer = new Player("computer");

    this.isGameOver = false;
    this.activePlayer = this.player;
  }

  startGame() {
    this.player.placeShips();
    this.computer.placeShips();
    while (!this.isGameOver) {
      this.displayBoards();
      console.log(`${this.activePlayer.name}'s turn.`);

      const [row, col] = this.getShotCoordinates();

      this.switchTurn();

      const isShotHit = this.activePlayer.receiveShot(row, col);
      this.isGameOver = this.activePlayer.isLoser();

      if (isShotHit || this.isGameOver) this.switchTurn();
      if (this.isGameOver) console.log(`${this.activePlayer.name} Has Won!`);
    }
  }

  switchTurn = () => {
    this.activePlayer =
      this.activePlayer === this.player ? this.computer : this.player;
    return this.activePlayer;
  };

  displayBoards() {
    console.log("Your Board:");
    this.player.gameboard.display();

    console.log("Computer Board:");
    this.hideComputerShips();
  }

  getShotCoordinates() {
    let row, col;
    let inactivePlayer =
      this.activePlayer === this.player ? this.computer : this.player;

    while (true) {
      if (this.activePlayer === this.player) {
        [row, col] = prompt("Enter shot's row & col separated by space:")
          .split(" ")
          .map(Number);
      } else {
        [row, col] = [generateRandNum(9), generateRandNum(9)];
      }

      // Ensure the target cell is not already shot
      const targetCell = inactivePlayer.gameboard.board[row][col];
      if (targetCell !== "H" && targetCell !== "M") {
        break;
      }
    }

    return [row, col];
  }

  hideComputerShips() {
    this.computer.gameboard.board.forEach((row) => {
      console.log(
        row
          .map((cell) => {
            if (cell !== "H" && cell !== "M") {
              return "-"; // Hide ship locations when displaying computer's board
            } else {
              return cell;
            }
          })
          .join(" ")
      );
    });
  }
}

export default GameController;
