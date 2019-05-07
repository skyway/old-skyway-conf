import * as React from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { fontSize } from "../../shared/global-style";

interface Props {
  name: string;
}
export const Icon: FunctionComponent<Props> = ({ name }: Props) => (
  <i className="material-icons" css={iconStyle}>
    {name}
  </i>
);

interface ButtonProps extends Props {
  onClick: () => void;
  title?: string;
}
export const IconButton: FunctionComponent<ButtonProps> = ({
  name,
  title,
  onClick
}: ButtonProps) => (
  <button title={title} onClick={onClick} css={buttonStyle}>
    <Icon name={name} />
  </button>
);

const iconStyle = css({
  fontSize
});

const buttonStyle = css({
  padding: "0 1px",
  appearance: "none",
  border: "none",
  background: "none",
  color: "inherit",
  cursor: "pointer"
});
