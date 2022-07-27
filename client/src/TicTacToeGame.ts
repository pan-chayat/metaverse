import Phaser from "phaser";
import TicTacToeGame from "./scenes/TicTacToeGame";
// import Game from "./scenes/Game";
// import Background from "./scenes/Background";
// import Bootstrap from "./scenes/Bootstrap";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "tictactoe-container",
  //   backgroundColor: "#111111",
  pixelArt: true, // Prevent pixel art from becoming blurred when scaled.
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  autoFocus: true,
  scene: [TicTacToeGame],
};

// const tictactoeGame = new Phaser.Game(config);

// (window as any).tictactoe = tictactoeGame;

export default config;
