import Phaser from "phaser";
import TicTacToeBootstrap from "./scenes/TicTacToeBootstrap";
import TicTacToeGame from "./scenes/TicTacToeGame";
import GameOver from "./scenes/TicTacToeGameOver";

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
  scene: [TicTacToeBootstrap, TicTacToeGame, GameOver],
};

export default config;
