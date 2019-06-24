import Peer from "skyway-js";

export const initPeer = (): Promise<Peer> => {
  return new Promise((resolve, reject) => {
    const peer = new Peer({
      key: "03ff6219-b58f-4310-9484-e9108e859cdd",
      debug: 2
    });

    peer.once("open", () => {
      peer.removeListener("error", reject);
      resolve(peer);
    });
    // for onOpen error
    peer.once("error", reject);
  });
};
