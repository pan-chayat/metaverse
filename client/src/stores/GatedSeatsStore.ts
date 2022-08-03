import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import phaserGame from "../PhaserGame";
import Game from "../scenes/Game";

interface TicTacToeState {
  gatedSeatsDialogOpen: boolean;
}

const initialState: TicTacToeState = {
  gatedSeatsDialogOpen: false,
};

export const gatedSeatsSlice = createSlice({
  name: "gatedseats",
  initialState,
  reducers: {
    openGatedSeatsDialog: (state) => {
      console.log("should open dialog");
      state.gatedSeatsDialogOpen = true;
      const game = phaserGame.scene.keys.game as Game;
      game.disableKeys();
    },
    closeGatedSeatsDialog: (state) => {
      state.gatedSeatsDialogOpen = false;
      const game = phaserGame.scene.keys.game as Game;
      game.enableKeys();
    },
  },
});

export const { openGatedSeatsDialog, closeGatedSeatsDialog } =
  gatedSeatsSlice.actions;

export default gatedSeatsSlice.reducer;
