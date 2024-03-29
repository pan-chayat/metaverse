import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Phaser from "phaser";

import { useAppSelector, useAppDispatch } from "../hooks";
import { closeTicTacToeDialog } from "../stores/TicTacToeStore";
import config from "../TicTacToeGame";
import TicTacToeBootstrap from "../scenes/TicTacToeBootstrap";
import { Event, phaserEvents } from "../events/EventCenter";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 16px 180px 16px 16px;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #222639;
  border-radius: 16px;
  padding: 16px;
  color: #eee;
  position: relative;
  display: flex;
  flex-direction: column;

  .close {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`;

const LudoWrapper = styled.div`
  flex: 1;
  border-radius: 25px;
  overflow: hidden;
  margin-right: 50px;
  iframe {
    width: 100%;
    height: 100%;
  }
`;

let tictactoeGame: Phaser.Game;
let tictactoeBootstrap: Phaser.Scene;

export default function TicTacToeDialog() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    tictactoeGame = new Phaser.Game(config);
    (window as any).tictactoe = tictactoeGame;
  }, []);

  return (
    <Backdrop>
      <Wrapper>
        <IconButton
          aria-label="close dialog"
          className="close"
          onClick={() => dispatch(closeTicTacToeDialog())}
        >
          <CloseIcon />
        </IconButton>
        <LudoWrapper>
          <div id="tictactoe-container"></div>
        </LudoWrapper>
      </Wrapper>
    </Backdrop>
  );
}

export { tictactoeGame };
