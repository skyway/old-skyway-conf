import * as React from "react";
import { FunctionComponent } from "react";

interface Props {
  name: string;
}
const Icon: FunctionComponent<Props> = ({ name }: Props) => (
  <i className="material-icons">{name}</i>
);

export default Icon;
