import React from 'react';
import { observer, inject } from 'mobx-react';

import Video from '../component/video';

const MemberList = ({ self }) => (
  <div className="L-MemberList">
    <div className="L-MemberList_Video">
      <Video self={self} muted />
    </div>
  </div>
);

export default inject('self', 'ui', 'action')(observer(MemberList));
