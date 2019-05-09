import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import Modal from "../components/modal";
import { IconButton } from "../components/icon";

interface Props {
  onClickCloser: () => void;
}
const SettingsLayout: FunctionComponent<Props> = ({ onClickCloser }: Props) => (
  <Modal>
    <div css={wrapperStyle}>
      <IconButton name="close" onClick={onClickCloser} />
    </div>
  </Modal>
);

export default SettingsLayout;

const wrapperStyle = css({
  width: 480,
  margin: "100px auto 0",
  backgroundColor: globalColors.white
});
