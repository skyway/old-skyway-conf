import React from 'react';

const VaIcon = ({ isSpeaking = false }) => (
  <i className={`material-icons ${isSpeaking ? '-speaking' : '-not_speaking'}`}>
    equalizer
  </i>
);

export default VaIcon;
