import React from 'react';
import { observer, inject } from 'mobx-react';

import Popup from '../component/popup';
import SettingVideo from '../component/setting-video';
import DeviceSelector from '../component/device-selector';
import NameEdit from '../component/name-edit';

const Setting = ({ room, ui, user, action }) => (
  <Popup isVisible={ui.isSettingOpen}>
    <div className="L-Setting">
      <div className="L-Setting_Video">
        <SettingVideo ui={ui} room={room} />
      </div>

      <DeviceSelector user={user} action={action} />

      <NameEdit user={user} action={action} />

      <div className="L-Setting_Finish">
        <button
          onClick={ev => {
            ui.isRoomJoin
              ? action.$update('ui.isSettingOpen', false)
              : (ev.target.disabled = true) && action.onClickJoinRoom();
          }}
        >
          OK
        </button>
      </div>
    </div>
  </Popup>
);

export default inject('room', 'ui', 'user', 'action')(observer(Setting));
