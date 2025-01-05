import "../styles/startMenu.css";
import { loadSetupPage } from "./fleetSetup.js";
import { createElement } from "./utils.js";

let captainName = "";

function loadStartMenu() {
  const appCont = document.querySelector("#app");
  appCont.classList.add("menu");

  const startMenu = createElement("div", ["start-menu"]);

  const title = createElement("h1", [], "BATTLESHIP");
  startMenu.appendChild(title);

  const nameInput = createElement("input", [], "", {
    type: "text",
    placeholder: "Captain name",
    id: "name-input",
  });
  startMenu.appendChild(nameInput);

  const startBtn = createElement("button", ["start-btn"], "ENTER COMBAT");
  startBtn.addEventListener("click", () => {
    captainName = nameInput.value;
    loadSetupPage();
  });
  startMenu.appendChild(startBtn);

  appCont.appendChild(startMenu);
}

export { loadStartMenu, captainName };
