import React from 'react';

const CamIcon = ({ isMuted = false, isSelf = false }) => (
  <i className={`material-icons ${isSelf && isMuted ? '-muted' : ''}`}>
    {isMuted ? 'videocam_off' : 'videocam'}
  </i>
);

export default CamIcon;
