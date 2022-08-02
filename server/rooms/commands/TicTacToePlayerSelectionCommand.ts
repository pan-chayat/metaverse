import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import { Cell } from "../../../types/CellValues";
import { IOfficeState } from "../../../types/IOfficeState";
import TicTacToeCheckWinnerCommand from "./TicTacToeWinningCommand";

type Payload = {
  client: Client;
  idx: number;
};
export default class TicTacToePlayerSelectionCommand extends Command<IOfficeState> {
  execute(data: Payload) {
    const { client, idx } = data;

    const clientIndex = this.room.clients.findIndex((c) => c.id === client.id);
    const cellValue = clientIndex === 0 ? Cell.X : Cell.O;
    // should change tictactoe state
    // change active player
    const updatedArray = this.room.state.tictactoePlayerState.map(
      (player, idx) => {
        player.activePlayer = !player.activePlayer;
        return player;
      }
    );

    this.room.state.tictactoe[idx] = cellValue;
    return [new TicTacToeCheckWinnerCommand(client)];
  }
}
