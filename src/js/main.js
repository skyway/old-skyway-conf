import React from 'react';
import ReactDOM from 'react-dom';
import Peer from 'skyway-js';

class App extends React.Component {
  render() {
    return <div>Hi!</div>;
  }
}

window.p = new Peer({
  key: 'e19d63f2-664b-447f-bd97-7656c925428b',
  debug: 2,
});

ReactDOM.render(<App />, document.getElementById('app'));
