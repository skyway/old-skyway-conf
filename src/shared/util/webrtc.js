function setMuteVideoTracks(stream, isMuted) {
  stream.getVideoTracks().forEach(track => (track.enabled = !isMuted));
}
function setMuteAudioTracks(stream, isMuted) {
  stream.getAudioTracks().forEach(track => (track.enabled = !isMuted));
}
function setMuteTrack(track, isMuted) {
  track.enabled = !isMuted;
}

function stopStream(stream) {
  stream.getTracks().forEach(track => track.stop());
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

function getUserPermission() {
  return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
}

function getUserMedia({ videoDeviceId, audioDeviceId }, facingMode) {
  const constraints = {
    video: { deviceId: { exact: videoDeviceId } },
    audio: { deviceId: { exact: audioDeviceId } },
  };

  if (videoDeviceId === '') {
    constraints.video = false;
  }
  if (audioDeviceId === '') {
    constraints.audio = false;
  }

  if (['user', 'environment'].includes(facingMode)) {
    constraints.video.facingMode = facingMode;
  }

  return navigator.mediaDevices.getUserMedia(constraints);
}

function isGetDisplayMediaAvailable() {
  return typeof navigator.mediaDevices.getDisplayMedia === 'function';
}

function getDisplayStreamTrack() {
  return navigator.mediaDevices
    .getDisplayMedia({ video: true })
    .then(stream => stream.getTracks()[0]);
}

function snapVideoStream(stream, mimeType = 'image/jpeg', qualityArgument = 1) {
  return new Promise(async (resolve, reject) => {
    let $video = document.createElement('video');

    // Firefox can't load media without this
    $video.muted = $video.playsInline = true;
    $video.srcObject = stream;
    await $video.play().catch(reject);

    let $canvas = document.createElement('canvas');
    $canvas.width = $video.videoWidth;
    $canvas.height = $video.videoHeight;

    // copy same size
    const ctx = $canvas.getContext('2d');
    ctx.drawImage($video, 0, 0);

    // then compress
    $canvas.toBlob(
      blob => {
        $video.pause();
        $video.srcObject = null;
        $video = $canvas = null;

        resolve(blob);
      },
      mimeType,
      qualityArgument
    );
  });
}

function getFakeStream(ctx) {
  const $canvas = document.createElement('canvas');
  $canvas.width = $canvas.height = 1;
  $canvas.getContext('2d');
  const vStream = $canvas.captureStream();
  const aStream = ctx.createMediaStreamDestination().stream;

  const [vTrack] = vStream.getVideoTracks();
  const [aTrack] = aStream.getAudioTracks();

  return new MediaStream([vTrack, aTrack]);
}

export default {
  setMuteVideoTracks,
  setMuteAudioTracks,
  setMuteTrack,
  stopStream,
  getUserPermission,
  getUserDevices,
  getUserMedia,
  isGetDisplayMediaAvailable,
  getDisplayStreamTrack,
  snapVideoStream,
  getFakeStream,
};
