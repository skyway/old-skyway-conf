import * as React from "react";
import { useState } from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import Modal from "../components/modal";
import { IconButton } from "../components/icon";

interface Props {
  onClickSend: (text: string) => void;
  onClickCloser: () => void;
}
const SettingsLayout: FunctionComponent<Props> = ({
  onClickCloser,
  onClickSend
}: Props) => {
  const [buffer, setBuffer] = useState("");

  return (
    <Modal>
      <div css={wrapperStyle}>
        <div css={headStyle}>
          <IconButton name="close" onClick={onClickCloser} />
        </div>
        <div css={scrollerStyle}>
          <div style={{ height: "1000px" }}>contnet</div>
        </div>
        <div css={editorStyle}>
          <input
            type="text"
            value={buffer}
            onChange={ev => setBuffer(ev.target.value)}
            css={inputStyle}
          />
          <IconButton name="send" onClick={() => onClickSend(buffer)} />
        </div>
      </div>
    </Modal>
  );
};

export default SettingsLayout;

const wrapperStyle = css({
  display: "grid",
  gridTemplateRows: "20px 1fr 20px",
  width: 300,
  height: "80%",
  margin: "10% auto 0",
  padding: 8,
  backgroundColor: globalColors.white
});

const headStyle = css({
  textAlign: "right"
});

const scrollerStyle = css({
  overflowY: "scroll"
});

const editorStyle = css({
  display: "flex",
  alignItems: "center"
});

const inputStyle = css({
  flex: "1 1 auto",
  marginRight: 8
});
