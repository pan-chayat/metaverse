import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useAppSelector, useAppDispatch } from "../hooks";
import { closeTicTacToeDialog } from "../stores/TicTacToeStore";
import { closeGatedSeatsDialog } from "../stores/GatedSeatsStore";
import { HuddleIframe, IframeConfig } from "@huddle01/huddle01-iframe";

const iframeConfig: IframeConfig = {
  roomUrl: "http://localhost:3000",
  height: "600px",
  width: "80%",
  noBorder: false, // false by default
};

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

export default function GatedSeatsDialog() {
  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  return (
    <Backdrop>
      <Wrapper>
        <IconButton
          aria-label="close dialog"
          className="close"
          onClick={() => dispatch(closeGatedSeatsDialog())}
        >
          <CloseIcon />
        </IconButton>
        <HuddleIframe config={iframeConfig} />
        <div id="tictactoe-container"></div>
      </Wrapper>
    </Backdrop>
  );
}
