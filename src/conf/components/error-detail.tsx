import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";

interface Props {
  error: Error;
}
const Error: FunctionComponent<Props> = ({ error }) => (
  <div css={wrapperStyle}>
    <h2 css={headStyle}>{error.message || error.name}</h2>
    <pre css={detailStyle}>
      {error.stack || "Stack trace is not available."}
    </pre>
  </div>
);

export default Error;

const wrapperStyle = css({
  color: globalColors.white,
  margin: 16,
});

const headStyle = css({
  fontWeight: 900,
});

const detailStyle = css({
  whiteSpace: "pre-wrap",
});
