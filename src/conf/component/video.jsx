import React from 'react';
import { observer } from 'mobx-react';

class Video extends React.Component {
  constructor() {
    super();
    this._ref = null;
  }

  render() {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[component] Video.render');
    }
    // touch it for mobx
    this.props.stream;
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

  // for adding stream(e.g. someone joins room)
  componentDidMount() {
    if (this._ref && this.props.stream instanceof MediaStream) {
      this._ref.srcObject = this.props.stream;
    }
  }

  // for updating stream(e.g. gUM() 1st time, change devices)
  componentWillReact() {
    if (this._ref && this.props.stream instanceof MediaStream) {
      this._ref.srcObject = this.props.stream;
    }
  }
}

export default observer(Video);
