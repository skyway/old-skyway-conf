import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { RoomChat } from "../utils/types";

interface Props {
  chat: RoomChat;
}
const ChatMessage: FunctionComponent<Props> = ({ chat }: Props) => (
  <div css={chat.isMine ? [wrapperStyle, mineStyle] : wrapperStyle}>
    <div css={headStyle}>
      {chat.from} at {new Date(chat.time).toLocaleTimeString()}
    </div>
    {chat.text}
  </div>
);

export default ChatMessage;

const wrapperStyle = css({
  boxSizing: "border-box",
  width: "85%",
  padding: "4px 8px",
  marginTop: 8,
  marginBottom: 8,
  wordBreak: "break-word",
  borderRadius: 2,
  border: `1px solid ${globalColors.gray}`,
});

const mineStyle = css({
  marginLeft: "15%",
  backgroundColor: globalColors.gray,
});

const headStyle = css({
  fontSize: ".8rem",
});
