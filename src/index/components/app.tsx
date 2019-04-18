import * as React from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import RoomCreate from "./room-create";

export default function App() {
  return (
    <div css={wrapperStyle}>
      <h1 css={headStyle}>SkyWay Conference</h1>
      <p css={pStyle}>Video conference on web browser</p>

      <RoomCreate />

      <p css={pStyle}>
        No registration or installs! Just create a room and share the link.
      </p>
      <a
        css={logoStyle}
        href="https://webrtc.ecl.ntt.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="./images/index/icon-skyway.svg" alt="SkyWay" />
      </a>
    </div>
  );
}

const wrapperStyle = css({
  backgroundImage: "url(./images/index/bg.jpg)",
  backgroundSize: "cover",
  height: "100vh",
  position: "relative",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
});

const headStyle = css({
  margin: 0,
  color: globalColors.lightblue,
  fontSize: "3rem"
});

const pStyle = css({
  color: globalColors.lightblue,
  fontSize: "1.2rem"
});

const logoStyle = css({
  position: "absolute",
  bottom: 10,
  right: 10,
  "& > img": {
    height: 40
  }
});
