import React from 'react';
import { observer, inject } from 'mobx-react';

import Popup from '../component/popup';
import Video from '../component/video';
import DeviceSelector from '../component/device-selector';
import NameEdit from '../component/name-edit';

const Setting = ({ self, ui, action }) =>
  ui.isSettingOpen ? (
    <Popup>
      <div className="L-Setting">
        <div className="L-Setting_Video">
          <Video store={self} muted />
        </div>

        <DeviceSelector self={self} action={action} />

        <NameEdit />

        <div className="L-Setting_Finish">
          <button onClick={() => action.onClickJoinRoom()}>設定完了</button>
        </div>
      </div>
    </Popup>
  ) : null;

export default inject('self', 'ui', 'action')(observer(Setting));
