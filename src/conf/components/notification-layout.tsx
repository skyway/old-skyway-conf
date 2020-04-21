import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { zIndex } from "../utils/style";

interface Props {
  children: ReactNode;
}
const NotificationLayout: FunctionComponent<Props> = ({ children }: Props) => (
  <div css={wrapperStyle}>{children}</div>
);

const wrapperStyle = css({
  position: "absolute",
  top: 8,
  left: 8,
  zIndex: zIndex.notification,
});

export default NotificationLayout;
