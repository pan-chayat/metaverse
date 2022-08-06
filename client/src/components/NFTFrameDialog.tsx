import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch } from "../hooks";
import { closeNFTFrameDialog } from "../stores/NFTFrames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import Adam from "../assets/Adam_login.png";
import Ash from "../assets/Ash_login.png";
import Lucy from "../assets/Lucy_login.png";
import Nancy from "../assets/Nancy_login.png";

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
  padding: 50px;
  color: #eee;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .close {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`;

const LudoWrapper = styled.div`
  border-radius: 25px;
  overflow: hidden;
  margin-right: 50px;
  width: 35%;
`;
const avatars = [
  {
    name: "adam",
    img: "https://bafybeiasy6wuw4qtbnccjc62nwxfwsu3vd3gk3k3qmxcai45uygesio5hu.ipfs.dweb.link/",
  },
  {
    name: "ash",
    img: "https://bafybeigppg3dy2o7hw3vidfcupt5peqc4esdpsrnzp2ypwwcgp6ax5rk7m.ipfs.dweb.link/",
  },
  {
    name: "lucy",
    img: "https://bafybeiasy6wuw4qtbnccjc62nwxfwsu3vd3gk3k3qmxcai45uygesio5hu.ipfs.dweb.link/",
  },
  {
    name: "nancy",
    img: "https://bafybeicanvyvhk6i5vufer6a6imykjnavsh4cxcmezemwowgqz4mui7poa.ipfs.dweb.link/",
  },
];

export default function NFTFrameDialog() {
  const dispatch = useAppDispatch();
  const [avatarIndex, setAvatarIndex] = useState<number>(0);
  useEffect(() => {}, []);

  return (
    <Backdrop>
      <Wrapper>
        <IconButton
          aria-label="close dialog"
          className="close"
          onClick={() => dispatch(closeNFTFrameDialog())}
        >
          <CloseIcon />
        </IconButton>
        <LudoWrapper>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(swiper) => {
              setAvatarIndex(swiper.activeIndex);
            }}
          >
            {avatars.map((avatar) => (
              <SwiperSlide key={avatar.name}>
                <img src={avatar.img} alt={avatar.name} />
              </SwiperSlide>
            ))}
          </Swiper>
        </LudoWrapper>
      </Wrapper>
    </Backdrop>
  );
}
