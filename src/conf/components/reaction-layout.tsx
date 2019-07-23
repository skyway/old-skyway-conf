import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { rightMenuTogglerHeight, zIndex } from "../utils/style";

const reactions = ["👍", "👎", "👏", "✋", "🆗", "🆖", "💯", "💩"];

interface Props {
  onClickSend: (reaction: string) => void;
}
const ReactionLayout: FunctionComponent<Props> = ({ onClickSend }: Props) => {
  return (
    <div css={wrapperStyle}>
      {reactions.map(reaction => (
        <button
          key={reaction}
          css={reactionStyle}
          onClick={() => onClickSend(reaction)}
        >
          {reaction}
        </button>
      ))}
    </div>
  );
};

export default ReactionLayout;

const wrapperStyle = css({
  position: "absolute",
  right: rightMenuTogglerHeight,
  top: 0,
  width: rightMenuTogglerHeight,
  zIndex: zIndex.modal,
  backgroundColor: globalColors.gray,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
});

const reactionStyle = css({
  height: rightMenuTogglerHeight,
  fontSize: "1.2rem",
  appearance: "none",
  border: "none",
  background: "none",
  color: "inherit",
  cursor: "pointer",
  borderBottom: `1px solid ${globalColors.white}`
});
