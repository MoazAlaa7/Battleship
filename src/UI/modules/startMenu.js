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

  const infoBtn = createElement("a", ["info-btn"], "?", {
    href: "https://en.wikipedia.org/wiki/Battleship_(game)",
    target: "_blank",
  });
  startMenu.appendChild(infoBtn);

  const githubBtn = createElement("a", ["github-btn"], "GITHUB", {
    href: "https://github.com/MoazAlaa7/Battleship",
    target: "_blank",
  });

  appCont.appendChild(startMenu);
  appCont.appendChild(githubBtn);
}

export { loadStartMenu, captainName };
