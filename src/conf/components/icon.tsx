import * as React from "react";
import { FunctionComponent, SyntheticEvent } from "react";
import { css } from "@emotion/core";
import { fontSize, base64Image } from "../../shared/global-style";
import { ClientBrowser } from "../utils/types";

interface Props {
  name: string;
}
export const Icon: FunctionComponent<Props> = ({ name }: Props) => (
  <i className="material-icons" css={iconStyle}>
    {name}
  </i>
);

export const BrowserIcon: FunctionComponent<ClientBrowser> = ({
  name,
  version
}: ClientBrowser) => {
  let src = null;
  if (name === "Chrome") {
    src = base64Image.chrome;
  }
  if (name === "Firefox") {
    src = base64Image.firefox;
  }
  if (name === "Safari") {
    src = base64Image.safari;
  }

  const title = `${name} v${version}`;

  return src !== null ? (
    <img css={iconStyle} src={src} alt={title} title={title} />
  ) : (
    <Icon name="info" />
  );
};

interface ButtonProps extends Props {
  onClick: (ev: SyntheticEvent<HTMLButtonElement>) => void;
  title?: string;
  disabled?: boolean;
}
export const IconButton: FunctionComponent<ButtonProps> = ({
  name,
  title,
  disabled,
  onClick
}: ButtonProps) => (
  <button
    disabled={disabled}
    onClick={onClick}
    title={title}
    css={disabled ? [buttonStyle, disabledStyle] : buttonStyle}
  >
    <Icon name={name} />
  </button>
);

const iconStyle = css({
  fontSize
});

const buttonStyle = css({
  padding: "0 1px",
  height: fontSize,
  appearance: "none",
  border: "none",
  background: "none",
  color: "inherit",
  cursor: "pointer"
});

const disabledStyle = css({
  opacity: 0.6,
  cursor: "not-allowed"
});
