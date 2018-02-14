import React from 'react';
import { observer, inject } from 'mobx-react';

import Loader from '../component/loader';

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

    return <Loader />;
  }

  componentDidCatch(err) {
    this.props.action.$update('ui.isAppError', true);
    console.error(err);
  }
}

export default inject('ui', 'action')(observer(Root));
