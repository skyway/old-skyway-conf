import React from 'react';

const MicIcon = ({ isMuted = false }) => (
  <i className={`material-icons ${isMuted && '-muted'}`}>mic_off</i>
);

export default MicIcon;
