import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";

interface Props {
  displayName: string;
  controllers: ReactNode;
}
const StreamController: FunctionComponent<Props> = ({
  displayName,
  controllers
}: Props) => (
  <div css={wrapperStyle}>
    <div>{displayName}</div>
    <div css={buttonStyle}>{controllers}</div>
  </div>
);

export default StreamController;

const wrapperStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  padding: 4,
  color: globalColors.white,
  backgroundColor: "rgba(0, 0, 0, .5)",
  fontSize: ".8rem"
});

const buttonStyle = css({
  display: "inline-flex"
});
