import Phaser from "phaser";
import Network from "../services/Network";

export default class TicTacToeGame extends Phaser.Scene {
  network!: Network;
  constructor() {
    super("tictactoe");
  }

  preload() {}
  create(data: { network: Network }) {}
}
