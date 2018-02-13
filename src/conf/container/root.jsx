import React from 'react';
import { observer, inject } from 'mobx-react';

class Root extends React.Component {
  render() {
    const { ui, children } = this.props;

    if (ui.isError) {
      return (
        <div>
          <i className="material-icons">error</i>
        </div>
      );
    }

    if (ui.isAppReady) {
      return children;
    }

    return (
      <div>
        <i className="material-icons">adjust</i>
      </div>
    );
  }

  componentDidCatch(err) {
    this.props.action.$update('ui.isAppError', true);
    console.error(err);
  }
}

export default inject('ui', 'action')(observer(Root));
