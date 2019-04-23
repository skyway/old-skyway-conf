import * as React from "react";
import { FunctionComponent } from "react";
import Bootstrap from "./containers/bootstrap";
import Settings from "./containers/settings";

const App: FunctionComponent<{}> = () => {
  return (
    <Bootstrap>
      <Settings />
      <div>xxx</div>
    </Bootstrap>
  );
};

export default App;
