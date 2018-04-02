// do not import via npm for auto-update
const Peer = window.Peer;
const ScreenShare = window.ScreenShare;

function initPeer() {
  return new Promise((resolve, reject) => {
    const peer = new Peer({
      key: '03ff6219-b58f-4310-9484-e9108e859cdd',
      debug: 2,
    });

    peer.once('open', () => {
      resolve(peer);
      peer.removeListener('error', reject);
    });
    // for onOpen error
    peer.once('error', reject);
  });
}

function isScreenShareAvailable() {
  return ScreenShare.create().isScreenShareAvailable();
}

function getScreenStreamTrack() {
  return new Promise((resolve, reject) => {
    ScreenShare.create()
      .start()
      .then(stream => resolve(stream.getTracks()[0]))
      .catch(reject);
  });
}

export default {
  initPeer,
  isScreenShareAvailable,
  getScreenStreamTrack,
};
