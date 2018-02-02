function toggleMuteVideoTracks(stream, isMuted) {
  stream.getVideoTracks().forEach(track => (track.enabled = !isMuted));
}
function toggleMuteAudioTracks(stream, isMuted) {
  stream.getAudioTracks().forEach(track => (track.enabled = !isMuted));
}

async function getUserDevices() {
  const userDevices = {
    video: [],
    audio: [],
  };

  const devices = await navigator.mediaDevices.enumerateDevices();
  for (const device of devices) {
    if (device.kind === 'videoinput') {
      userDevices.video.push(device);
    }
    if (device.kind === 'audioinput') {
      userDevices.audio.push(device);
    }
  }

  return userDevices;
}

function getUserMedia({ videoDeviceId, audioDeviceId }) {
  return navigator.mediaDevices.getUserMedia({
    video: { deviceId: videoDeviceId },
    audio: { deviceId: audioDeviceId },
  });
}

export default {
  toggleMuteVideoTracks,
  toggleMuteAudioTracks,
  getUserDevices,
  getUserMedia,
};
