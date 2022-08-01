import { ItemType } from "../../../types/Items";
import store from "../stores";
import Item from "./Item";
import Network from "../services/Network";
import { openTicTacToeDialog } from "../stores/TicTacToeStore";

export default class TicTacToeBoard extends Item {
  id?: string;
  currentUsers = new Set<string>();

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    this.itemType = ItemType.LUDOBOARD;
  }

  private updateStatus() {
    if (!this.currentUsers) return;
    const numberOfUsers = this.currentUsers.size;
    this.clearStatusBox();
    if (numberOfUsers === 1) {
      this.setStatusBox(`${numberOfUsers} user`);
    } else if (numberOfUsers > 1) {
      this.setStatusBox(`${numberOfUsers} users`);
    }
  }

  onOverlapDialog() {
    if (this.currentUsers.size === 0) {
      this.setDialogBox("Press R to start game");
    } else {
      this.setDialogBox("Press R join");
    }
  }

  addCurrentUser(userId: string) {
    if (!this.currentUsers || this.currentUsers.has(userId)) return;
    this.currentUsers.add(userId);
    this.updateStatus();
  }

  removeCurrentUser(userId: string) {
    if (!this.currentUsers || !this.currentUsers.has(userId)) return;
    this.currentUsers.delete(userId);
    this.updateStatus();
  }

  openDialog(network: Network) {
    console.log("clicked R");
    if (!this.id) {
      return;
    }
    console.log(network.mySessionId);
    store.dispatch(openTicTacToeDialog(this.id));
    network.connectToTicTacToe(network.mySessionId);
    // store.dispatch(openWhiteboardDialog(this.id));
    // network.connectToWhiteboard(this.id);
  }
}
