import * as React from "react";
import { useRef, useCallback } from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";
import { zIndex } from "../utils/style";

interface Props {
  children: ReactNode;
}
const RightMenu: FunctionComponent<Props> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onClickToggler = useCallback(() => {
    if (wrapperRef.current === null) {
      return;
    }
    wrapperRef.current.classList.toggle("-visible");
  }, [wrapperRef]);

  console.count("RightMenu.render()");
  return (
    <div css={wrapperStyle} ref={wrapperRef}>
      <div onClick={onClickToggler}>o/x</div>
      {children}
    </div>
  );
};

export default RightMenu;

const wrapperStyle = css({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: zIndex.base,
  backgroundColor: "#eee",
  height: "100vh",
  overflowY: "scroll"
});
