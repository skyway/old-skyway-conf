import React from 'react';
import { observer, inject } from 'mobx-react';

import Popup from '../component/popup';
import Video from '../component/video';
import DeviceSelector from '../component/device-selector';
import NameEdit from '../component/name-edit';

const Setting = ({ peer, ui, action }) =>
  ui.isSetting ? (
    <Popup>
      <div className="L-Setting">
        <div className="L-Setting_Video">
          <Video peer={peer} muted />
        </div>

        <DeviceSelector peer={peer} action={action} />

        <NameEdit />

        <div className="L-Setting_Finish">
          <button onClick={() => action.onClickJoinRoom()}>設定完了</button>
        </div>
      </div>
    </Popup>
  ) : null;

export default inject('peer', 'ui', 'action')(observer(Setting));
