import * as React from "react";
import { useContext } from "react";
import { FunctionComponent } from "react";
import { Observer } from "mobx-react";
import { css } from "@emotion/core";
import { StoreContext } from "../contexts";
import Video from "../components/video";

const LocalStream: FunctionComponent<{}> = () => {
  const store = useContext(StoreContext);

  console.count("LocalStream.render()");

  const { media } = store;
  return (
    <Observer>
      {() => {
        console.count("LocalStream.Observer.render()");

        return (
          <div css={wrapperStyle}>
            <div css={videoStyle}>
              <Video stream={media.stream} isMine={true} />
            </div>
          </div>
        );
      }}
    </Observer>
  );
};

export default LocalStream;

const wrapperStyle = css({
  // 4:3
  width: 200
});

const videoStyle = css({
  // 4:3
  height: 150
});
