import * as React from "react";
import { useRef, useCallback } from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { zIndex } from "../../utils/style";
import Toggler from "./toggler";

interface Props {
  children: ReactNode;
}
const RightMenu: FunctionComponent<Props> = ({ children }) => {
  // use ref to avoid children from re-rendering
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onClickToggler = useCallback(
    (isVisible: boolean) => {
      if (wrapperRef.current === null) {
        return;
      }
      if (isVisible) {
        wrapperRef.current.classList.add(visibleClass);
      } else {
        wrapperRef.current.classList.remove(visibleClass);
      }
    },
    [wrapperRef]
  );

  return (
    <>
      <div css={wrapperStyle} className={visibleClass} ref={wrapperRef}>
        <div css={scrollerStyle}>{children}</div>
        <Toggler defaultVisibility={true} onToggle={onClickToggler} />
      </div>
    </>
  );
};

export default RightMenu;

const visibleClass = "-visible";
const wrapperWidth = 200;
const wrapperStyle = css({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: zIndex.base,
  width: wrapperWidth,
  backgroundColor: "#eee",
  height: "100%",
  transition: ".25s ease transform",
  transform: `translateX(${wrapperWidth}px)`,
  willChange: "transform",

  [`&.${visibleClass}`]: {
    transform: "translateX(0)"
  }
});

const scrollerStyle = css({
  height: "100%",
  overflowY: "scroll"
});
