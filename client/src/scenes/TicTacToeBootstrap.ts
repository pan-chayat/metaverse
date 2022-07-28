import Phaser, { Game } from "phaser";
import phaserGame from "../PhaserGame";
import Network from "../services/Network";

export default class TicTacToeBootstrap extends Phaser.Scene {
  network!: Network;

  constructor() {
    super("bootstrap");
  }

  preload() {}

  init() {
    this.network = phaserGame.scene.keys.bootstrap.network as Network;
  }

  create() {
    this.scene.launch("tictactoe", {
      network: this.network,
    });
  }

  //   launchGame() {}
}
