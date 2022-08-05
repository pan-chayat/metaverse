import { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";

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
import TicTacToeDialog from "./components/TicTacToeDialog";
import GatedSeatsDialog from "./components/GatedSeatsDialog";
import { Alert, Snackbar } from "@mui/material";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ErrorToast from "./components/ErrorToast";
import { setOwnNFTs, setWalletAddress } from "./stores/UserStore";
import { ethers } from "ethers";
import { ABI } from "./smartContractInterface/abi";
import isHolder from "./smartContractInterface/fetchNFTState";
// import isHolder from "./smartContractInterface/fetchNFTState";

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const computerDialogOpen = useAppSelector(
    (state) => state.computer.computerDialogOpen
  );
  const whiteboardDialogOpen = useAppSelector(
    (state) => state.whiteboard.whiteboardDialogOpen
  );
  const ludoboardDialogOpen = useAppSelector(
    (state) => state.tictactoe.tictactoeDialogOpen
  );
  const gatedSeatsDialogOpen = useAppSelector(
    (state) => state.gatedseats.gatedSeatsDialogOpen
  );
  const videoConnected = useAppSelector((state) => state.user.videoConnected);
  const roomJoined = useAppSelector((state) => state.room.roomJoined);
  // const ludoDialogOpen = useAppSelector((state) => state.ludo.ludoDialogOpen);
  const [open, setOpen] = useState<boolean>(false);
  const { address, connector, isConnected } = useAccount();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const ContractAddress = "0xe0af15141ABd0B31Fb15e250971936Fe8837230a";
    const values = async (address: string) => {
      dispatch(setOwnNFTs(await isHolder(address)));
    };
    if (address) {
      dispatch(setWalletAddress(address));
      values(address);
      // dispatch(setOwnNFTs(await isHolder(address)));
    }
    if (!isConnected) {
      dispatch(setWalletAddress(""));
    }
  }, [address]);

  let ui: JSX.Element;
  if (loggedIn) {
    if (computerDialogOpen) {
      /* Render ComputerDialog if user is using a computer. */
      ui = <ComputerDialog />;
    } else if (ludoboardDialogOpen) {
      ui = <TicTacToeDialog />;
    } else if (whiteboardDialogOpen) {
      /* Render WhiteboardDialog if user is using a whiteboard. */
      ui = <WhiteboardDialog />;
    } else if (gatedSeatsDialogOpen) {
      ui = <GatedSeatsDialog />;
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
    ui = <LoginDialog setOpen={setOpen} open={open} />;
  } else {
    /* Render RoomSelectionDialog if yet selected a room. */
    ui = <RoomSelectionDialog setOpen={setOpen} open={open} />;
  }

  return (
    <Backdrop>
      <ErrorToast open={open} setOpen={setOpen} />
      {ui}
      <ConnectButton />
      {/* Render HelperButtonGroup if no dialogs are opened. */}
      {!computerDialogOpen && !whiteboardDialogOpen && <HelperButtonGroup />}
    </Backdrop>
  );
}

export default App;
