import React from 'react';

const MicIcon = ({ isMuted = false, isSelf = false }) => (
  <i className={`material-icons ${isSelf && isMuted ? '-muted' : ''}`}>
    {isMuted ? 'mic_off' : 'mic'}
  </i>
);

export default MicIcon;
