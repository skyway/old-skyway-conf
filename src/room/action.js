import Peer from 'skyway-js';

function RoomAction({ uiStore, peerStore }) {
  console.log(uiStore);

  return {
    onLoad() {
      Promise.all([_initPeer(), _initUserMedia()])
        .then(([peer, stream]) => {
          peerStore.set('peer', peer);
          peerStore.set('stream', stream);
          peerStore.set('isOpen', true);
        })
        .catch(err => {
          console.error(err);
          uiStore.set('hasError', err);
        });

      function _initUserMedia() {
        return navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
      }

      function _initPeer() {
        return new Promise((resolve, reject) => {
          const peer = new Peer({
            key: '03ff6219-b58f-4310-9484-e9108e859cdd',
            debug: 2,
          });

          peer.on('open', () => {
            resolve(peer);
          });
          // for onOpen error
          peer.on('error', err => {
            reject(err);
          });

          window.peer = peer;
        });
      }
    },
  };
}

export default RoomAction;
