import { Command } from "@colyseus/command";
import { Cell } from "../../../types/CellValues";
import { IOfficeState } from "../../../types/IOfficeState";
import TicTacToePlayerSelectionCommand from "./TicTacToePlayerSelectionCommand";

interface Payload {}

const wins = [
  [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ],
  [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
  ],
  [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
    { row: 2, col: 0 },
  ],
  [
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 2, col: 1 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 2, col: 0 },
  ],
];
const getValueAt = (board: number[], row: number, col: number) => {
  const idx = row * 3 + col;
  return board[idx];
};

export default class TicTacToeCheckWinnerCommand extends Command<
  IOfficeState,
  Payload
> {
  execute() {
    const win = this.determineWin();
    console.log(win);
    if (win) {
      console.log(`winner`);
    } else {
    }
  }

  private determineWin() {
    let hasWinner = false;
    for (let i = 0; i < wins.length; i++) {
      const win = wins[i];
      // win[0] win[1] win[2]
      const point1 = getValueAt(this.state.tictactoe, win[0].row, win[0].col);
      const point2 = getValueAt(this.state.tictactoe, win[1].row, win[1].col);
      const point3 = getValueAt(this.state.tictactoe, win[2].row, win[2].col);
      console.log(point1, point2, point3);
      if (point1 === point2 && point2 === point3 && point1 !== Cell.Empty) {
        hasWinner = true;
      }
    }
    return hasWinner;
  }
}
