import React from 'react';

const CamIcon = ({ isMuted = false }) => (
  <i className={`material-icons ${isMuted && '-muted'}`}>videocam_off</i>
);

export default CamIcon;
