import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import phaserGame from "../PhaserGame";
import Game from "../scenes/Game";

interface LudoState {
  tictactoeDialogOpen: boolean;
  whiteboardId: null | string;
  whiteboardUrl: null | string;
  urls: Map<string, string>;
}

const initialState: LudoState = {
  tictactoeDialogOpen: false,
  whiteboardId: null,
  whiteboardUrl: null,
  urls: new Map(),
};

export const tictactoeSlice = createSlice({
  name: "ludo",
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
  },
});

export const { openTicTacToeDialog, closeTicTacToeDialog } =
  tictactoeSlice.actions;

export default tictactoeSlice.reducer;
