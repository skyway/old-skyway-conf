import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";

const BlankVideo: FunctionComponent<{}> = () => <div css={wrapperStyle} />;

export default BlankVideo;

const wrapperStyle = css({
  width: "100%",
  height: "100%",
  backgroundColor: globalColors.black
});
