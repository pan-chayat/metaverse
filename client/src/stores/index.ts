import { enableMapSet } from "immer";
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import userReducer from "./UserStore";
import computerReducer from "./ComputerStore";
import whiteboardReducer from "./WhiteboardStore";
import chatReducer from "./ChatStore";
import roomReducer from "./RoomStore";
import tictactoeReducer from "./TicTacToeStore";
import gatedSeatsReducer from "./GatedSeatsStore";
import nftFramesReducer from "./NFTFrames";

const listenerMiddleware = createListenerMiddleware();
enableMapSet();

const store = configureStore({
  reducer: {
    user: userReducer,
    computer: computerReducer,
    whiteboard: whiteboardReducer,
    chat: chatReducer,
    room: roomReducer,
    tictactoe: tictactoeReducer,
    gatedseats: gatedSeatsReducer,
    nftframes: nftFramesReducer,
  },
  // Temporary disable serialize check for redux as we store MediaStream in ComputerStore.
  // https://stackoverflow.com/a/63244831
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
