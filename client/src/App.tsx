import { useState } from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import { useAppSelector } from "./hooks";

const Backdrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

import RoomSelectionDialog from "./components/RoomSelectionDialog";
import LoginDialog from "./components/LoginDialog";
import ComputerDialog from "./components/ComputerDialog";
import WhiteboardDialog from "./components/WhiteboardDialog";
import VideoConnectionDialog from "./components/VideoConnectionDialog";
import Chat from "./components/Chat";
import HelperButtonGroup from "./components/HelperButtonGroup";
import LudoDialog from "./components/LudoDialog";

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const computerDialogOpen = useAppSelector(
    (state) => state.computer.computerDialogOpen
  );
  const whiteboardDialogOpen = useAppSelector(
    (state) => state.whiteboard.whiteboardDialogOpen
  );
  const ludoboardDialogOpen = useAppSelector(
    (state) => state.ludo.ludoDialogOpen
  );
  const videoConnected = useAppSelector((state) => state.user.videoConnected);
  const roomJoined = useAppSelector((state) => state.room.roomJoined);
  // const ludoDialogOpen = useAppSelector((state) => state.ludo.ludoDialogOpen);

  let ui: JSX.Element;
  if (loggedIn) {
    if (computerDialogOpen) {
      /* Render ComputerDialog if user is using a computer. */
      ui = <ComputerDialog />;
    } else if (ludoboardDialogOpen) {
      ui = <LudoDialog />;
    } else if (whiteboardDialogOpen) {
      /* Render WhiteboardDialog if user is using a whiteboard. */
      ui = <WhiteboardDialog />;
    } else {
      ui = (
        /* Render Chat or VideoConnectionDialog if no dialogs are opened. */
        <>
          <Chat />
          {/* Render VideoConnectionDialog if user is not connected to a webcam. */}
          {!videoConnected && <VideoConnectionDialog />}
        </>
      );
    }
  } else if (roomJoined) {
    /* Render LoginDialog if not logged in but selected a room. */
    ui = <LoginDialog />;
  } else {
    /* Render RoomSelectionDialog if yet selected a room. */
    ui = <RoomSelectionDialog />;
  }

  return (
    <Backdrop>
      {ui}
      {/* Render HelperButtonGroup if no dialogs are opened. */}
      {!computerDialogOpen && !whiteboardDialogOpen && <HelperButtonGroup />}
    </Backdrop>
  );
}

export default App;
