import React from 'react';
import ReactDOM from 'react-dom';
import Peer from 'skyway-js';

class App extends React.Component {
  render() {
    return <div>Hi!</div>;
  }
}

window.p = new Peer({
  key: '03ff6219-b58f-4310-9484-e9108e859cdd',
  debug: 2,
});

ReactDOM.render(<App />, document.getElementById('app'));
