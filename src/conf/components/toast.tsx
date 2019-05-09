import * as React from "react";
import { FunctionComponent } from "react";
import { css, keyframes } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { Icon } from "../components/icon";

interface Props {
  type: string;
  text: string;
}
const Toast: FunctionComponent<Props> = ({ type, text }: Props) => (
  <div css={wrapperStyle}>
    <Icon name={type} />
    <span css={textStyle}>{text}</span>
  </div>
);

export default Toast;

const wrapperStyle = css({
  display: "flex",
  alignItems: "center",
  minWidth: 200,
  padding: "4px 8px",
  marginBottom: 4,
  whiteSpace: "nowrap",
  fontSize: ".8rem",
  borderRadius: 2,
  backgroundColor: globalColors.white,
  willChange: "transform",
  animation: `${keyframes`from { transform: translateX(-200%); }`} .2s ease`
});

const textStyle = css({
  textIndent: 4
});
