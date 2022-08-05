import Phaser, { Game } from "phaser";
import phaserGame from "../PhaserGame";
import Network from "../services/Network";

interface IGameOverSceneData {
  winner: boolean;
}

interface IGameSceneData {
  network: Network;
  onGameOver: (data: IGameOverSceneData) => void;
}
export default class TicTacToeBootstrap extends Phaser.Scene {
  network!: Network;

  constructor() {
    super("bootstrap");
  }

  preload() {}

  init(data: IGameSceneData) {
    // this.network = phaserGame.scene.keys.bootstrap.network as Network;
    this.network = data.network;
  }

  create() {
    this.scene.launch("tictactoe", {
      network: this.network,
      onGameOver: (data: IGameOverSceneData) => {
        console.log(data);
        this.scene.stop("tictactoe");
        this.scene.launch("game-over", data);
      },
    });
  }

  //   launchGame() {}
}
