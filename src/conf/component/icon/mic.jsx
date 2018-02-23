import React from 'react';

const MicIcon = ({ isMuted = false }) =>
  isMuted ? (
    <i className="material-icons">mic_off</i>
  ) : (
    <i className="material-icons">mic</i>
  );

export default MicIcon;
