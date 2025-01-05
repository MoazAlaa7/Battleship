import "../styles/battle.css";
import {
  boardCont as playerBoard,
  boardContComp as computerBoard,
  player,
  computer,
} from "./fleetSetup";
import GameController from "../../factory/game";
import { generateRandNum } from "../../factory/utils";
import { createElement } from "./utils.js";

let gameController = null;

const resultModal = createElement("dialog", ["result-modal"]);
const playAgainBtn = createElement("button", [], "PLAY AGAIN");

function loadBattlePage() {
  if (!gameController) {
    gameController = new GameController(player, computer);
  }

  const appCont = document.querySelector("#app");
  appCont.classList.remove("setup");
  appCont.classList.add("battle");
  appCont.innerHTML = "";

  const battleCont = createElement("div", ["battle-container"]);
  appCont.appendChild(battleCont);

  // Player-board setup
  const playerBoardCont = createElement("div", ["player-board-container"]);

  const friendlyBoardTitle = createElement(
    "h3",
    ["board-title", "friendly-title"],
    "Friendly Waters"
  );
  playerBoardCont.appendChild(friendlyBoardTitle);

  playerBoard.classList.add("player-board");
  playerBoardCont.appendChild(playerBoard);
  battleCont.appendChild(playerBoardCont);

  // Computer-board setup
  const computerBoardCont = createElement("div", ["player-board-container"]);

  const enemyBoardTitle = createElement(
    "h3",
    ["board-title", "enemy-title"],
    "Enemy Waters"
  );
  computerBoardCont.appendChild(enemyBoardTitle);

  computerBoard.classList.add("computer-board");
  computerBoardCont.appendChild(computerBoard);
  battleCont.appendChild(computerBoardCont);
  computerBoard.addEventListener("click", handlePlayerTurn);
}

function handlePlayerTurn(event) {
  if (gameController.activePlayer !== player) return;

  const target = event.target;
  if (target.dataset.row && target.dataset.col) {
    const targetRow = parseInt(target.dataset.row);
    const targetCol = parseInt(target.dataset.col);

    const isShotHit = computer.receiveShotAt(targetRow, targetCol);
    gameController.isGameOver = computer.isLoser();

    markShot(target, isShotHit);

    if (gameController.isGameOver) {
      endGame();
      return;
    }

    if (!isShotHit) {
      gameController.switchTurn();
      handleComputerTurn();
    }
  }
}

function handleComputerTurn() {
  if (gameController.activePlayer !== computer) return;

  // Delay computer's move by 1s to mimic thinking
  setTimeout(() => {
    let targetRow = generateRandNum(9);
    let targetCol = generateRandNum(9);
    let target = document.querySelector(
      `[data-row="${targetRow}"][data-col="${targetCol}"]`
    );

    while (
      target.classList.contains("hit") ||
      target.classList.contains("miss")
    ) {
      targetRow = generateRandNum(9);
      targetCol = generateRandNum(9);
      target = document.querySelector(
        `[data-row="${targetRow}"][data-col="${targetCol}"]`
      );
    }

    const isShotHit = player.receiveShotAt(targetRow, targetCol);
    gameController.isGameOver = player.isLoser();

    markShot(target, isShotHit, true);

    if (gameController.isGameOver) {
      endGame();
      return;
    }

    if (!isShotHit) {
      gameController.switchTurn();
    } else {
      handleComputerTurn();
    }
  }, 1000);
}

function markShot(target, isHit, isComputer = false) {
  const markClass = isHit ? "hit" : "miss";
  const markElement = createElement("div", [`${markClass}-mark`]);
  if (isComputer) markElement.classList.add("computer");
  target.classList.add(markClass);
  target.appendChild(markElement);
  // Disable event listeners for cells that are already shot
  target.style.pointerEvents = "none";
}

function endGame() {
  const result = document.createElement("h1");
  if (gameController.activePlayer === player) {
    result.textContent = "VICTORY";
    resultModal.classList.add("victory");
  } else {
    result.textContent = "DEFEAT";
    resultModal.classList.add("defeat");
  }

  resultModal.appendChild(result);
  resultModal.appendChild(playAgainBtn);

  document.body.appendChild(resultModal);
  resultModal.showModal();
}

playAgainBtn.addEventListener("click", () => {
  resultModal.style.display = "none";
  resultModal.close();
  window.location.reload();
});

export default loadBattlePage;
