import React from 'react';
import { observer, inject } from 'mobx-react';

import Popup from '../component/popup';
import SettingVideo from '../component/setting-video';
import DeviceSelector from '../component/device-selector';
import NameEdit from '../component/name-edit';

const Setting = ({ device, room, ui, action }) =>
  ui.isSettingOpen ? (
    <Popup>
      <div className="L-Setting">
        <div className="L-Setting_Video">
          <SettingVideo room={room} />
        </div>

        <DeviceSelector device={device} action={action} />

        <NameEdit ui={ui} action={action} />

        <div className="L-Setting_Finish">
          <button
            onClick={() => {
              ui.isRoomJoin
                ? action.$update('ui.isSettingOpen', false)
                : action.onClickJoinRoom();
            }}
          >
            設定完了
          </button>
        </div>
      </div>
    </Popup>
  ) : null;

export default inject('device', 'room', 'ui', 'action')(observer(Setting));
