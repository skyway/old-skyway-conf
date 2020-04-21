import * as React from "react";
import { FunctionComponent, SyntheticEvent } from "react";
import { css } from "@emotion/core";
import { fontSize, globalColors } from "../../shared/global-style";
import { ClientBrowser } from "../utils/types";

interface Props {
  name: string;
  showEdge?: boolean;
}
export const Icon: FunctionComponent<Props> = ({ name, showEdge }: Props) => (
  <i
    className="material-icons"
    css={showEdge ? [iconStyle, edgedStyle] : iconStyle}
  >
    {name}
  </i>
);

export const BrowserIcon: FunctionComponent<ClientBrowser> = ({
  name,
  version,
}: ClientBrowser) => {
  let src = null;
  switch (name) {
    case "Chrome":
    case "Firefox":
    case "Safari":
      src = `./images/conf/icon-${name.toLowerCase()}.svg`;
      break;
    case "Microsoft Edge":
      src = "./images/conf/icon-edge.svg";
      break;
  }

  const title = `${name} v${version}`;

  return src !== null ? (
    <img css={imgStyle} src={src} alt={title} title={title} />
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
  showEdge,
  title,
  disabled,
  onClick,
}: ButtonProps) => (
  <button
    disabled={disabled}
    onClick={onClick}
    title={title}
    css={disabled ? [buttonStyle, disabledStyle] : buttonStyle}
  >
    <Icon name={name} showEdge={showEdge} />
  </button>
);

const iconStyle = css({
  fontSize,
});

const edgedStyle = css({
  textShadow: `0 0 1px ${globalColors.black}`,
});

const imgStyle = css({
  height: fontSize,
});

const buttonStyle = css({
  padding: "0 1px",
  height: fontSize,
  appearance: "none",
  border: "none",
  background: "none",
  color: "inherit",
  cursor: "pointer",
});

const disabledStyle = css({
  opacity: 0.6,
  cursor: "not-allowed",
});
