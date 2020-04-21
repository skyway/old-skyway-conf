import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { rightMenuTogglerHeight, zIndex } from "../utils/style";

const reactions = ["👍", "👎", "👏", "✋", "🆗", "🆖", "🆒", "💯", "💩", "😭"];

interface Props {
  onClickSend: (reaction: string) => void;
}
const ReactionLayout: FunctionComponent<Props> = ({ onClickSend }: Props) => {
  return (
    <div css={wrapperStyle}>
      {reactions.map((reaction) => (
        <div key={reaction} css={boxStyle}>
          <button css={reactionStyle} onClick={() => onClickSend(reaction)}>
            <i css={emojiStyle}>{reaction}</i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReactionLayout;

const wrapperStyle = css({
  position: "absolute",
  top: 0,
  right: rightMenuTogglerHeight,
  zIndex: zIndex.modal,
});

const boxStyle = css({
  height: rightMenuTogglerHeight,
  width: rightMenuTogglerHeight,
  boxSizing: "border-box",
  backgroundColor: globalColors.gray,
  borderBottom: `1px solid ${globalColors.white}`,
});

const reactionStyle = css({
  width: "100%",
  height: "100%",
  padding: "0 1",
  appearance: "none",
  border: "none",
  background: "none",
  color: "inherit",
  cursor: "pointer",
});

const emojiStyle = css({
  fontSize: "1.0rem",
  fontStyle: "normal",
});
