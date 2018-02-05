import React from 'react';
import { observer } from 'mobx-react';

import Video from './video';

class ScreenVideo extends React.Component {
  constructor() {
    super();
    this._outerRef = null;
    this._innerRef = null;

    this._handleResize = () => {
      const outerStyle = getComputedStyle(this._outerRef);
      // these are changed flexibly by CSS
      const outerHeight = parseInt(outerStyle.height);
      const outerWidth = parseInt(outerStyle.width);

      // use this as max width of inner
      const widthByHeight = 16 / 9 * outerHeight;
      if (outerWidth < widthByHeight) {
        this._innerRef.style.width = '100%';
      } else {
        this._innerRef.style.width = `${widthByHeight}px`;
      }
    };
  }

  render() {
    const { room } = this.props;
    return (
      <div className="ScreenVideo" ref={ref => (this._outerRef = ref)}>
        <div
          className="ScreenVideo_Display"
          ref={ref => (this._innerRef = ref)}
        >
          <Video stream={room.pinnedStream} muted />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this._handleResize();
    window.addEventListener('resize', this._handleResize, false);
  }

  componentDidUnmout() {
    window.removeEventListener('resize', this._handleResize, false);
  }
}

export default observer(ScreenVideo);
