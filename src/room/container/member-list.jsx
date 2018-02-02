import React from 'react';
import { observer, inject } from 'mobx-react';

import Video from '../component/video';

const MemberList = ({ peer }) => (
  <div className="L-MemberList">
    <div className="L-MemberList_Video">
      <Video peer={peer} muted />
    </div>
  </div>
);

export default inject('peer', 'ui', 'action')(observer(MemberList));
