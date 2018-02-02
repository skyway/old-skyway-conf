import Peer from 'skyway-js';

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

export default {
  initPeer,
};
