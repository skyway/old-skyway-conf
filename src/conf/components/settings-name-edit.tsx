import * as React from "react";
import { useState } from "react";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";

interface Props {
  defaultDispName: string;
  onChangeDispName: (name: string) => void;
}
const SettingsNameEdit: FunctionComponent<Props> = ({
  defaultDispName,
  onChangeDispName
}: Props) => {
  const [dispName, setDispName] = useState(defaultDispName);

  return (
    <div>
      <input
        type="text"
        value={dispName}
        maxLength={10}
        onChange={ev => {
          // ignore while IME compositing
          if (ev.target.value.length > 10) {
            return;
          }
          const name = ev.target.value;
          setDispName(name);
          onChangeDispName(name);
        }}
        css={nameStyle}
      />
    </div>
  );
};

export default SettingsNameEdit;

const nameStyle = css({
  boxSizing: "border-box",
  width: "100%",
  padding: "4px 8px",
  appearance: "none",
  border: 0,
  borderBottom: `1px solid ${globalColors.gray}`,
  fontSize: "1.1rem",
  "&:focus": {
    borderColor: globalColors.blue
  }
});
