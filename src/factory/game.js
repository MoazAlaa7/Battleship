class GameController {
  constructor(player, computer) {
    this.player = player;
    this.computer = computer;
    this.isGameOver = false;
    this.activePlayer = this.player;
  }

  switchTurn = () => {
    this.activePlayer =
      this.activePlayer === this.player ? this.computer : this.player;
    return this.activePlayer;
  };
}

export default GameController;
