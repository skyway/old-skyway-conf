export function getFakeMedia(constraints = { audio: true, video: true }) {
  const $canvas = document.createElement('canvas');
  const [vTrack] = $canvas.captureStream().getVideoTracks();
  const [
    aTrack,
  ] = new AudioContext().createMediaStreamDestination().stream.getAudioTracks();

  const ms = new MediaStream();
  ms.peerId = Date.now();

  if (constraints.video) {
    ms.addTrack(vTrack);
  }
  if (constraints.audio) {
    ms.addTrack(aTrack);
  }

  return ms;
}
