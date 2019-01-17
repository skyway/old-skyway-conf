import React from 'react';
import { reaction } from 'mobx';

class MemberListScroller extends React.Component {
  constructor() {
    super();
    this._ref = null;
    this._disposer = null;

    this._checkListWidth = this._checkListWidth.bind(this);
  }

  render() {
    return (
      <div className="MemberListScroller">
        <div className="MemberListScroller_Arrow -left">
          <i className="material-icons">chevron_left</i>
        </div>
        <div
          ref={ref => (this._ref = ref)}
          className="MemberListScroller_Content"
        >
          {this.props.children}
        </div>
        <div className="MemberListScroller_Arrow -right">
          <i className="material-icons">chevron_right</i>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { room } = this.props;
    this._disposer = reaction(
      () => room.remoteStreams.length,
      () => this._checkListWidth(),
      // wait until dom rendered
      { fireImmediately: true, delay: 500 }
    );

    window.addEventListener('resize', this._checkListWidth);
  }

  componentWillUnmount() {
    this._disposer();
    window.removeEventListener('resize', this._checkListWidth);
  }

  _checkListWidth() {
    // check inner width overflows or NOT
    const listWidth = parseInt(getComputedStyle(this._ref).width);
    const childrenWidth = Array.from(this._ref.children).reduce(
      (acc, cur) => acc + parseInt(getComputedStyle(cur).width),
      0
    );

    if (listWidth < childrenWidth) {
      this._ref.parentElement.classList.add('-scrollable');
    } else {
      this._ref.parentElement.classList.remove('-scrollable');
    }
  }
}

export default MemberListScroller;
