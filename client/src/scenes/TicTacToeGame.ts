import Phaser from "phaser";
import Network from "../services/Network";
import { connect } from "react-redux";
import store from "../stores";
import { Room } from "colyseus.js";
import { ItemType } from "../../../types/Items";
import { Cell } from "../../../types/CellValues";

export default class TicTacToeGame extends Phaser.Scene {
  network!: Network;
  private cells: { display: Phaser.GameObjects.Rectangle; value: Cell }[] = [];

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
      const cell = this.add
        .rectangle(x, y, size, size, 0xffffff)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
          this.network.room?.state.tictactoePlayerState.forEach(
            (player, index) => {
              if (
                player.playerId === this.network.mySessionId &&
                player.activePlayer
              ) {
                this.network.playerMakeMoveTicTacToe(idx);
              }
            }
          );
        });

      this.cells.push({
        display: cell,
        value: cellState,
      });
      x += size + 5;
      if ((idx + 1) % 3 === 0) {
        y += size + 5;
        x = width * 0.5 - size;
      }
    });

    this.network.onItemUserAdded(this.handleItemUserAdded, this);
    this.network.onBoardUpdated(this.handleBoardChanged, this);
    this.network.onPlayerTurnChanged(this.handlePlayerChanged, this);
  }

  private handleItemUserAdded(
    playerId: string,
    itemId: string,
    itemType: ItemType
  ) {}

  makeSelection() {}

  private handlePlayerChanged(playerIndex: number) {}

  private handleBoardChanged() {
    const board = store.getState().tictactoe.boardState;
    // console.log(board);

    for (let i = 0; i < board.length; i++) {
      const cell = this.cells[i];

      if (cell.value !== board[i]) {
        console.log(board[i]);
        if (board[i] === 1) {
          this.add
            .star(cell.display.x, cell.display.y, 4, 4, 30, 0xff0000)
            .setAngle(45);
        } else if (board[i] === 2) {
          this.add.circle(cell.display.x, cell.display.y, 30, 0x0000ff);
        }
        this.cells[i].value = board[i];
      }
    }
  }
}
