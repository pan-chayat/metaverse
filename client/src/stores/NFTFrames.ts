import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import phaserGame from "../PhaserGame";
import Game from "../scenes/Game";

interface INFTFramesState {
  nftFrameDialogOpen: boolean;
}

const initialState: INFTFramesState = {
  nftFrameDialogOpen: false,
};

export const nftFrameSlice = createSlice({
  name: "nftframes",
  initialState,
  reducers: {
    openNFTFrameDialog: (state) => {
      state.nftFrameDialogOpen = true;
      const game = phaserGame.scene.keys.game as Game;
      game.disableKeys();
    },
    closeNFTFrameDialog: (state) => {
      state.nftFrameDialogOpen = false;
      const game = phaserGame.scene.keys.game as Game;
      game.enableKeys();
    },
  },
});

export const { openNFTFrameDialog, closeNFTFrameDialog } =
  nftFrameSlice.actions;

export default nftFrameSlice.reducer;
