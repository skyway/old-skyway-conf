import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";

interface Props {
  state: "ON" | "OFF";
  onClick: () => void;
}
const SettingsDeviceToggler: FunctionComponent<Props> = ({
  state,
  onClick,
}: Props) => (
  <span css={wrapperStyle}>
    <button onClick={onClick}>{state === "ON" ? "OFF" : "ON"}</button>
  </span>
);

export default SettingsDeviceToggler;

const wrapperStyle = css({
  textAlign: "center",
});
