import React from 'react';
import { observer } from 'mobx-react';

class Video extends React.Component {
  constructor() {
    super();
    this._ref = null;
  }

  render() {
    // touch it for mobx
    this.props.store.stream;
    return (
      <div className="Video">
        <video
          className="Video_Content"
          ref={ref => {
            this._ref = ref;
          }}
          muted={this.props.muted}
          autoPlay
        />
      </div>
    );
  }

  componentDidMount() {
    // for adding stream(e.g. someone joins room)
    if (this._ref && this.props.store.stream instanceof MediaStream) {
      this._ref.srcObject = this.props.store.stream;
    }
  }

  componentWillReact() {
    // for updating stream(e.g. device change)
    if (this._ref && this.props.store.stream instanceof MediaStream) {
      this._ref.srcObject = this.props.store.stream;
    }
  }
}

export default observer(Video);
