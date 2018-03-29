import React from 'react';
import { observer } from 'mobx-react';

class Video extends React.Component {
  constructor() {
    super();
    this._vRef = null;
    this._aRef = null;
  }

  render() {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[component] Video.render');
    }
    const { muted, isMirror, stream } = this.props;
    // touch it for mobx
    stream;
    return (
      <React.Fragment>
        <video
          className={`Video ${isMirror ? '-reverse' : ''}`}
          ref={ref => {
            this._vRef = ref;
          }}
          muted
          autoPlay
          playsInline
        />
        <audio
          ref={ref => {
            this._aRef = ref;
          }}
          muted={muted}
          autoPlay
        />
      </React.Fragment>
    );
  }

  // for adding stream(e.g. someone joins room)
  componentDidMount() {
    if (this._vRef && this._aRef && this.props.stream instanceof MediaStream) {
      this._vRef.srcObject = this._aRef.srcObject = this.props.stream;
    }
  }

  // for updating stream(e.g. gUM() 1st time, change devices)
  componentWillReact() {
    if (this._vRef && this._aRef && this.props.stream instanceof MediaStream) {
      this._vRef.srcObject = this._aRef.srcObject = this.props.stream;
    }
  }
}

export default observer(Video);
