import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import { Cell } from "../../../types/CellValues";
import { IOfficeState } from "../../../types/IOfficeState";
import { TicTacToePlayer } from "../schema/OfficeState";

type Payload = {
  client: Client;
  idx: string;
};
export class TicTacToeUpdateArrayCommand extends Command<IOfficeState> {
  execute(data: Payload) {
    const { client, idx } = data;

    if (this.room.state.tictactoePlayerState.length >= 2) {
      console.log("two people are already playing");
      return;
    }
    const newPlayer = new TicTacToePlayer();
    if (this.room.state.tictactoePlayerState.length === 1) {
      newPlayer.activePlayer = false;
    } else {
      newPlayer.activePlayer = true;
    }
    newPlayer.playerId = idx;
    this.room.state.tictactoePlayerState.push(newPlayer);
  }
}

export class TicTacToeRemoveUsers extends Command<IOfficeState> {
  execute() {
    this.room.state.tictactoePlayerState.pop();
    this.room.state.tictactoePlayerState.pop();
    this.room.state.tictactoeWinningPlayer.playerId = "";
    console.log("removed both?");
  }
}
