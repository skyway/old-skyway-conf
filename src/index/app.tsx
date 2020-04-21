import * as React from "react";
import { FunctionComponent } from "react";
import { RoomInit } from "./utils/types";
import Layout from "./components/layout";
import RoomCreate from "./components/room-create";

const App: FunctionComponent<{}> = () => {
  const effects = {
    enterConference(room: RoomInit) {
      location.href = `conf.html#!/${room.mode}/${room.id}`;
    },
  };

  return (
    <Layout>
      <RoomCreate onSubmit={(room) => effects.enterConference(room)} />
    </Layout>
  );
};

export default App;
