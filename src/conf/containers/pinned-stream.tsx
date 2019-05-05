import * as React from "react";
import { useContext } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import { StoreContext } from "../contexts";
import Video from "../components/video";

const PinnedStream: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  const { room } = store;
  return (
    <Observer>
      {() => (
        <div css={wrapperStyle}>
          {room.pinnedStream === null ? (
            <div css={blankStyle} />
          ) : (
            <Video stream={room.pinnedStream} isMine={false} />
          )}
        </div>
      )}
    </Observer>
  );
};

export default PinnedStream;

const wrapperStyle = css({
  width: "100%",
  height: "100%"
});

const blankStyle = css({
  width: "100%",
  height: "100%",
  backgroundColor: globalColors.black
});
