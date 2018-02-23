import React from 'react';

const CamIcon = ({ isMuted = false }) =>
  isMuted ? (
    <i className="material-icons">videocam_off</i>
  ) : (
    <i className="material-icons">videocam</i>
  );

export default CamIcon;
