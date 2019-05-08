import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import Modal from "../components/modal";

interface Props {
  video: ReactNode;
  client: ReactNode;
  media: ReactNode;
  onClickCloser: () => void;
}
const SettingsLayout: FunctionComponent<Props> = ({
  video,
  client,
  media,
  onClickCloser
}: Props) => (
  <Modal>
    <div css={wrapperStyle}>
      <div css={videoStyle}>{video}</div>
      {client}
      {media}
      <button onClick={() => onClickCloser()}>OK</button>
    </div>
  </Modal>
);

export default SettingsLayout;

const wrapperStyle = css({
  width: 480,
  margin: "100px auto 0",
  backgroundColor: globalColors.white
});

const videoStyle = css({
  width: "100%",
  height: 360
});
