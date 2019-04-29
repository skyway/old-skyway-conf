import * as React from "react";
import { useRef, useCallback } from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { zIndex } from "../../utils/style";
import Icon from "../icon";

interface Props {
  children: ReactNode;
}
const RightMenu: FunctionComponent<Props> = ({ children }) => {
  // use ref to avoid children from re-rendering
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onClickToggler = useCallback(() => {
    if (wrapperRef.current === null) {
      return;
    }
    wrapperRef.current.classList.toggle("-visible");
  }, [wrapperRef]);

  console.count("RightMenu.render()");
  return (
    <>
      <div css={wrapperStyle} className="-visible" ref={wrapperRef}>
        {children}
        <div css={togglerStyle} onClick={onClickToggler}>
          <Icon name="chevron_left" />
        </div>
      </div>
    </>
  );
};

export default RightMenu;

const wrapperWidth = 300;
const wrapperStyle = css({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: zIndex.base,
  width: wrapperWidth,
  backgroundColor: "#eee",
  height: "100vh",
  transition: ".25s ease transform",
  transform: `translateX(${wrapperWidth}px)`,

  "&.-visible": {
    transform: "translateX(0)"
  }
});

const togglerStyle = css({
  position: "absolute",
  top: 0,
  left: -40,
  width: 40,
  height: 40,
  backgroundColor: "#ddd",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer"
});
