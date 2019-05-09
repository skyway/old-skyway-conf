import * as React from "react";
import Bootstrap from "./observers/bootstrap";
import Settings from "./observers/settings";
import Notification from "./observers/notification";
import { ChatOpener, Chat } from "./observers/chat";
import PinnedStream from "./observers/pinned-stream";
import LocalStream from "./observers/local-stream";
import RemoteStreams from "./observers/remote-streams";
import Layout from "./components/layout";
import ErrorDetail from "./components/error-detail";
import Main from "./components/main";
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
      return (
        <Layout>
          <ErrorDetail error={this.state.err} />
        </Layout>
      );
    }

    return (
      <Layout>
        <Bootstrap>
          {/* Base Layer */}
          <Main>
            <PinnedStream />
          </Main>
          <LeftMenu top={<Notification />} bottom={<LocalStream />} />
          <RightMenu openers={[<ChatOpener key="chat" />]}>
            <RemoteStreams />
          </RightMenu>

          {/* Modal Layer */}
          <Settings />
          <Chat />
        </Bootstrap>
      </Layout>
    );
  }

  componentDidCatch(err: Error) {
    this.setState({ err });
  }
}

export default App;
