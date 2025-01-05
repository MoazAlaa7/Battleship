import "../styles/fleetSetup.css";
import { captainName } from "./startMenu.js";
import loadBattlePage from "./battle.js";

import Player from "../../factory/player.js";
import Ship from "../../factory/ship.js";
import { generateRandNum } from "../../factory/utils.js";
import { createElement } from "./utils.js";

import destroyerImg from "../../assets/images/destroyer.svg";
import battleshipImg from "../../assets/images/battleship.svg";
import carrierImg from "../../assets/images/carrier.svg";
import cruiserImg from "../../assets/images/cruiser.svg";
import submarineImg from "../../assets/images/submarine.svg";

const boardCont = createElement("div", ["board-container"]);
const boardContComp = createElement("div", ["board-container"]);
const fleetCont = createElement("div", ["fleet-container"]);
const confirmBtn = createElement(
  "button",
  ["confirm-btn", "disabled"],
  "Confirm"
);

const FLEET = [
  { image: destroyerImg, name: "Destroyer", length: 2 },
  { image: battleshipImg, name: "Battleship", length: 4 },
  { image: carrierImg, name: "Carrier", length: 5 },
  { image: cruiserImg, name: "Cruiser", length: 3 },
  { image: submarineImg, name: "Submarine", length: 3 },
];
let player = null;
let computer = null;
let axis = "X";
let fleetDropCount = 0;
let currShipLength;

function loadSetupPage() {
  player = new Player(captainName);
  computer = new Player("computer");

  const appCont = document.querySelector("#app");
  appCont.classList.remove("menu");
  appCont.classList.add("setup");
  appCont.innerHTML = "";

  const setupWrapper = createElement("div", ["setup-wrapper"]);
  appCont.appendChild(setupWrapper);

  const headerCont = createElement("div", ["header-container"]);
  const header = createElement(
    "h2",
    ["header"],
    `Welcome abroad Captain ${captainName}!`
  );
  headerCont.appendChild(header);

  const descriptionCont = createElement(
    "p",
    ["description"],
    "Plan your fleet positions by dragging and dropping ships on the board."
  );
  headerCont.appendChild(descriptionCont);

  setupWrapper.appendChild(headerCont);

  const setupCont = createElement("div", ["setup-container"]);
  setupWrapper.appendChild(setupCont);

  const axisCont = createElement("div", ["axis-container"]);

  const axisX = createElement("button", ["axis-btn", "active"], "X-axis");
  axisX.addEventListener("click", () => {
    axis = "X";
    axisX.classList.toggle("active");
    axisY.classList.toggle("active");
  });
  axisCont.appendChild(axisX);

  const axisY = createElement("button", ["axis-btn"], "Y-axis");
  axisY.addEventListener("click", () => {
    axis = "Y";
    axisX.classList.toggle("active");
    axisY.classList.toggle("active");
  });
  axisCont.appendChild(axisY);
  setupCont.appendChild(axisCont);

  const boardFleetCont = createElement("div", ["board-fleet-container"]);
  setupCont.appendChild(boardFleetCont);

  boardFleetCont.appendChild(boardCont);
  createBoard(boardCont, player.gameboard.board);
  createBoard(boardContComp, computer.gameboard.board);

  fillFleetCont(fleetCont);
  boardFleetCont.appendChild(fleetCont);

  confirmBtn.addEventListener("click", () => {
    if (fleetDropCount === FLEET.length) {
      placeCompShips();
      loadBattlePage();
    }
  });

  const confirmCont = createElement("div", ["confirm-container"]);
  confirmCont.appendChild(confirmBtn);
  setupWrapper.appendChild(confirmCont);
}

function createBoard(container, board) {
  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const cell = createElement("div", ["cell"]);
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;
      container.appendChild(cell);
    });
  });
}

function createShipCard(imageSrc, name, length) {
  const shipCard = createElement("div", ["ship-card"]);
  shipCard.dataset.name = name;
  shipCard.dataset.shipLength = length;
  shipCard.draggable = true;

  shipCard.addEventListener("dragstart", (event) => {
    const imgId = shipCard.querySelector("img").id;
    event.dataTransfer.setData("ship-img", imgId);
    event.dataTransfer.setData("ship-length", shipCard.dataset.shipLength);
    currShipLength = shipCard.dataset.shipLength;
  });

  const shipImg = createElement("img", ["ship-img"], "", {
    id: name,
    src: imageSrc,
  });

  const shipText = createElement(
    "p",
    ["ship-text"],
    `${name} (${length} cells)`
  );

  shipCard.appendChild(shipImg);
  shipCard.appendChild(shipText);

  return shipCard;
}

function fillFleetCont() {
  FLEET.forEach((ship) => {
    const shipCard = createShipCard(ship.image, ship.name, ship.length);
    fleetCont.appendChild(shipCard);
  });
}

function allowDrop(ev) {
  ev.preventDefault();
}

boardCont.addEventListener("drop", (event) => {
  event.preventDefault();

  const shipImgId = event.dataTransfer.getData("ship-img");
  const shipLength = Number(event.dataTransfer.getData("ship-length"));
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  if (player.gameboard.isPlaceAvailable(shipLength, row, col, axis)) {
    fleetDropCount++;
    if (fleetDropCount === FLEET.length) {
      confirmBtn.classList.remove("disabled");
      fleetCont.style.display = "none";
    }

    const ship = new Ship(shipImgId, shipLength);
    player.gameboard.placeShip(row, col, axis, ship);
    player.ships.push(ship);

    const shipImg = document.getElementById(shipImgId);
    const shipCard = shipImg.parentElement;
    shipImg.style.pointerEvents = "none";
    shipCard.style.display = "none";

    const targetCell = event.target;
    removeDragoverEffect(targetCell);
    displayShip(targetCell, shipImgId, shipLength, row, col);
  }
});

boardCont.addEventListener("dragover", (event) => {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  displayDragoverEffect(event, row, col);
});

boardCont.addEventListener("dragleave", (event) => {
  removeDragoverEffect(event.target);
});

function displayDragoverEffect(event, row, col) {
  let currCell = "";

  if (player.gameboard.isPlaceAvailable(currShipLength, row, col, axis)) {
    allowDrop(event);
    if (axis === "X") {
      for (let i = 0; i < currShipLength; i++) {
        currCell = document.querySelector(
          `[data-row="${row}"][data-col="${col + i}"]`
        );
        currCell.classList.add("available");
        currCell.classList.remove("occupied");
      }
    } else {
      for (let i = 0; i < currShipLength; i++) {
        currCell = document.querySelector(
          `[data-row="${row + i}"][data-col="${col}"]`
        );
        currCell.classList.add("available");
        currCell.classList.remove("occupied");
      }
    }
  } else {
    if (axis === "X") {
      for (let i = 0; i < currShipLength; i++) {
        if (col + i <= 9) {
          currCell = document.querySelector(
            `[data-row="${row}"][data-col="${col + i}"]`
          );
          currCell.classList.remove("available");
          currCell.classList.add("occupied");
        }
      }
    } else {
      for (let i = 0; i < currShipLength; i++) {
        if (row + i <= 9) {
          currCell = document.querySelector(
            `[data-row="${row + i}"][data-col="${col}"]`
          );
          currCell.classList.remove("available");
          currCell.classList.add("occupied");
        }
      }
    }
  }
}

function removeDragoverEffect(target) {
  let currCell = target;
  const row = parseInt(target.dataset.row);
  const col = parseInt(target.dataset.col);

  if (axis === "X") {
    for (let i = 0; i < currShipLength; i++) {
      if (col + i <= 9) {
        currCell = document.querySelector(
          `[data-row="${row}"][data-col="${col + i}"]`
        );
        currCell.classList.remove("available");
        currCell.classList.remove("occupied");
      }
    }
  } else {
    for (let i = 0; i < currShipLength; i++) {
      if (row + i <= 9) {
        currCell = document.querySelector(
          `[data-row="${row + i}"][data-col="${col}"]`
        );
        currCell.classList.remove("available");
        currCell.classList.remove("occupied");
      }
    }
  }
}

function displayShip(cell, shipImgId, shipLength) {
  const img = document.getElementById(shipImgId);
  cell.appendChild(img);

  if (axis === "X") {
    img.style.width = `${cell.clientWidth * shipLength}px`;
    img.style.height = `90%`;
  } else if (axis === "Y") {
    img.style.width = `${cell.clientWidth * shipLength}px`;
    img.style.height = `80%`;
    img.style.transformOrigin = "top left";
    img.style.transform = `rotate(90deg) translate(0, -125%)`;
  }

  resetAnimations();
}

function resetAnimations() {
  const images = boardCont.querySelectorAll(".ship-img");

  images.forEach((img) => {
    img.style.animation = "none";

    setTimeout(() => {
      img.style.animation = "";
      img.classList.add("flashing-animation");
    }, 10); // A very short delay (for the browser to register the change)
  });
}

function placeCompShips() {
  FLEET.forEach(({ name, length }) => {
    let row = null,
      col = null,
      axis = null;
    while (!computer.gameboard.isPlaceAvailable(length, row, col, axis)) {
      row = generateRandNum(9 - length + 1);
      col = generateRandNum(9 - length + 1);
      axis = generateRandNum(1) ? "X" : "Y";
    }

    const ship = new Ship(name, length);
    computer.gameboard.placeShip(row, col, axis, ship);
    computer.ships.push(ship);
  });
}

export { loadSetupPage, boardCont, boardContComp, player, computer };
