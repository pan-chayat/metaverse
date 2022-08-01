import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import phaserGame from "../PhaserGame";
import Game from "../scenes/Game";

interface TicTacToeState {
  tictactoeDialogOpen: boolean;
  boardState: Array<number>;
}

const initialState: TicTacToeState = {
  tictactoeDialogOpen: false,
  boardState: new Array(9).fill(0),
};

export const tictactoeSlice = createSlice({
  name: "tictactoe",
  initialState,
  reducers: {
    openTicTacToeDialog: (state, action: PayloadAction<string>) => {
      console.log("should open dialog");
      state.tictactoeDialogOpen = true;
      const game = phaserGame.scene.keys.game as Game;
      game.disableKeys();
    },
    closeTicTacToeDialog: (state) => {
      state.tictactoeDialogOpen = false;
      const game = phaserGame.scene.keys.game as Game;
      game.enableKeys();
    },
    setUpdatedBoardState: (
      state,
      action: PayloadAction<{ changedValue: number; changedIndex: number }>
    ) => {
      // state.boardState = action.payload;
      state.boardState[action.payload.changedIndex] =
        action.payload.changedValue;
      console.log(`state updated now`, state.boardState);
    },
  },
});

export const {
  openTicTacToeDialog,
  closeTicTacToeDialog,
  setUpdatedBoardState,
} = tictactoeSlice.actions;

export default tictactoeSlice.reducer;
