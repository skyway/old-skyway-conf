import React from 'react';
import { observer } from 'mobx-react';

import Video from './video';

const Prepare = ({ peer }) => (
  <div>
    <Video peer={peer} />
    <div>
      <select name="video">
        <option value="">xxx</option>
      </select>
      <select name="audio">
        <option value="">xxx</option>
      </select>
    </div>
    <div>
      <button>カメラミュート</button>
      <button>マイクミュート</button>
    </div>
    <button>参加する</button>
  </div>
);

export default observer(Prepare);
