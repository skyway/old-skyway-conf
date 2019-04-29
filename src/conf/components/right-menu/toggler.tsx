import * as React from "react";
import { useState, useCallback } from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import Icon from "../icon";

interface Props {
  defaultVisibility: boolean;
  onToggle: (isVisible: boolean) => void;
}
const RightMenuToggler: FunctionComponent<Props> = ({
  defaultVisibility,
  onToggle
}: Props) => {
  const [isVisible, setVisible] = useState(defaultVisibility);
  const onClickToggler = useCallback(() => {
    setVisible(!isVisible);
    onToggle(!isVisible);
  }, [isVisible, setVisible, onToggle]);

  return (
    <div css={togglerStyle} onClick={onClickToggler}>
      {isVisible ? <Icon name="chevron_right" /> : <Icon name="chevron_left" />}
    </div>
  );
};

export default RightMenuToggler;

const togglerSize = 32;
const togglerStyle = css({
  position: "absolute",
  top: 0,
  left: -togglerSize,
  width: togglerSize,
  height: togglerSize,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "inherit",
  cursor: "pointer"
});
