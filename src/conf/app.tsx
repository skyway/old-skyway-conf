import * as React from "react";
import Bootstrap from "./containers/bootstrap";
import Settings from "./containers/settings";
import ErrorDetail from "./components/error-detail";

interface State {
  err: Error | null;
}
class App extends React.Component<never, State> {
  constructor(props: never, state: State) {
    super(props, state);
    this.state = { err: null };
  }

  render() {
    if (this.state.err !== null) {
      return <ErrorDetail error={this.state.err} />;
    }

    return (
      <Bootstrap>
        <Settings />
        <div>xxx</div>
      </Bootstrap>
    );
  }

  componentDidCatch(err: Error) {
    this.setState({ err });
  }
}

export default App;
