import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { zIndex } from "../utils/style";

interface Props {
  children: ReactNode;
}
const Modal: FunctionComponent<Props> = ({ children }: Props) => (
  <div css={wrapperStyle}>{children}</div>
);

const wrapperStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  zIndex: zIndex.modal
});

export default Modal;
