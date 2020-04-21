import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { ClientBrowser } from "../utils/types";
import { BrowserIcon } from "./icon";

interface Props {
  displayName: string;
  browser: ClientBrowser;
  controllers: ReactNode;
}
const StreamController: FunctionComponent<Props> = ({
  displayName,
  browser,
  controllers,
}: Props) => (
  <div css={wrapperStyle}>
    <div css={rowStyle}>
      <BrowserIcon {...browser} />
      &nbsp;
      {displayName}
    </div>
    <div css={rowStyle}>{controllers}</div>
  </div>
);

export default StreamController;

const wrapperStyle = css({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  padding: 4,
  color: globalColors.white,
  backgroundColor: "rgba(0, 0, 0, .5)",
  fontSize: ".8rem",
});

const rowStyle = css({
  display: "inline-flex",
  alignItems: "center",
});
