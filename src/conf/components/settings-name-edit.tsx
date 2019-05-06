import * as React from "react";
import { useState } from "react";
import { FunctionComponent } from "react";

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
      />
    </div>
  );
};

export default SettingsNameEdit;
