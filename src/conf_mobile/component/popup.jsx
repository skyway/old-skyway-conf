import React from 'react';
import { observer } from 'mobx-react';

const Popup = ({ isVisible, noAnim = false, children }) =>
  noAnim ? (
    <NoAnimPopup isVisible={isVisible}>{children}</NoAnimPopup>
  ) : (
    <AnimPopup isVisible={isVisible}>{children}</AnimPopup>
  );

const AnimPopup = ({ isVisible, children }) => (
  <div
    className="Popup"
    style={{
      transform: isVisible
        ? 'translate3d(0, 0, 0)'
        : 'translate3d(0, -100%, 0)',
      visibility: isVisible ? 'visible' : 'hidden',
    }}
  >
    {children}
  </div>
);

const NoAnimPopup = ({ isVisible, children }) =>
  isVisible ? <div className="Popup">{children}</div> : null;

export default observer(Popup);
