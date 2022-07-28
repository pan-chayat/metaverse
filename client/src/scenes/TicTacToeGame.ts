import Phaser from "phaser";
import Network from "../services/Network";
import { connect } from "react-redux";
import store from "../stores";

export default class TicTacToeGame extends Phaser.Scene {
  network!: Network;
  boardState!: Array<number>;
  constructor() {
    super("tictactoe");
  }

  preload() {}
  create(data: { network: Network }) {
    if (!data.network) {
      throw new Error("server instance missing");
    } else {
      this.network = data.network;
    }

    const { width, height } = this.scale;
    const size = 128;
    let x = width * 0.5 - size;
    let y = height * 0.5 - size;

    const val = store.getState();
    val.tictactoe.boardState.forEach((cellState, idx) => {
      this.add.rectangle(x, y, size, size, 0xffffff);
      x += size + 5;
      if ((idx + 1) % 3 === 0) {
        y += size + 5;
        x = width * 0.5 - size;
      }
    });
  }

  update(t: number, dt: number) {
    const val = store.getState();
    this.boardState = val.tictactoe.boardState;
  }
}
