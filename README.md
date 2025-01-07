# 🚢 Battleship
Battleship game web-app with Vanilla JavaScript

## ⚙️ Installation for Developers

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/MoazAlaa7/Battleship.git
2. **Navigate to the Project Directory**
   ```bash
   cd Battleship
3. **Install Dependencies**
   ```bash
   npm install
4. **Start Development Server**
   ```bash
   npm run dev
This will:
- Start the server on http://localhost:8085.
- Automatically open the game in your default browser.

> [!NOTE]
> **Webpack Configuration:**  
  The project uses `webpack.common.js`, `webpack.dev.js`, and `webpack.prod.js` for modular and environment-specific configurations.
> 
> **Babel Support:**  
  The project is configured with Babel to transpile modern JavaScript for browser compatibility.
> 
> **Static Assets:**  
  Assets are stored in the `src/assets/` directory and processed via Webpack's `asset/resource` module.

## 🎯 Todo/Contribution
- Implement a more intellegent algorithm for computer moves (by having it try adjacent slots after getting a 'hit').
- Create a PvP (2-player) mode.
- Improve responsiveness and a11y for mobile, keyboard, and screen readers.
- Add sound effects (some sounds asset are provided in `src/assets/` directory).
- Code refactoring and organization.
