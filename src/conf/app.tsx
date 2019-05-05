import * as React from "react";
import Bootstrap from "./containers/bootstrap";
import Settings from "./containers/settings";
import PinnedStream from "./containers/pinned-stream";
import LocalStream from "./containers/local-stream";
import RemoteStreams from "./containers/remote-streams";
import ErrorDetail from "./components/error-detail";
import LeftMenu from "./components/left-menu";
import RightMenu from "./components/right-menu";

interface State {
  err: Error | null;
}
class App extends React.Component<{}, State> {
  constructor(props: {}, state: State) {
    super(props, state);
    this.state = { err: null };
  }

  render() {
    if (this.state.err !== null) {
      return <ErrorDetail error={this.state.err} />;
    }

    return (
      <Bootstrap>
        {/* Base Layer */}
        <PinnedStream />
        <LeftMenu>
          <LocalStream />
        </LeftMenu>
        <RightMenu>
          <RemoteStreams />
        </RightMenu>

        {/* Modal Layer */}
        <Settings />
      </Bootstrap>
    );
  }

  componentDidCatch(err: Error) {
    this.setState({ err });
  }
}

export default App;
