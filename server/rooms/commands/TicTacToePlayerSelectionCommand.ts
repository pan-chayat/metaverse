import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import { Cell } from "../../../types/CellValues";
import { IOfficeState } from "../../../types/IOfficeState";

type Payload = {
  client: Client;
  idx: number;
};
export default class TicTacToePlayerSelectionCommand extends Command<IOfficeState> {
  execute(data: Payload) {
    const { client, idx } = data;

    const clientIndex = this.room.clients.findIndex((c) => c.id === client.id);
    const cellValue = clientIndex === 0 ? Cell.X : Cell.O;

    this.room.state.tictactoe[idx] = cellValue;
  }
}
