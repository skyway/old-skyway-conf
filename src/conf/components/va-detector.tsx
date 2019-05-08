import * as React from "react";
import { useState, useEffect, memo } from "react";
import { FunctionComponent } from "react";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hark = require("hark") as Hark;
import { Hark } from "../utils/types";
import { Icon } from "./icon";

interface Props {
  stream: MediaStream;
}
const VADetector: FunctionComponent<Props> = ({ stream }) => {
  const [isSpeaking, setSpeaking] = useState(false);
  useEffect(() => {
    const harker = hark(stream);
    harker.on("speaking", () => setSpeaking(true));
    harker.on("stopped_speaking", () => setSpeaking(false));
    return () => harker.stop();
  }, [stream]);

  return <Icon name={isSpeaking ? "volume_up" : "volume_mute"} />;
};

export default memo(VADetector);
