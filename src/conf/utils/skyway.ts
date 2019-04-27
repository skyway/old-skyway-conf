import { Peer } from "./types";
// do not import via npm for auto-update
// @ts-ignore;
const _Peer = window.Peer;

export const initPeer = (): Promise<Peer> => {
  return new Promise((resolve, reject) => {
    const peer = new _Peer({
      key: "03ff6219-b58f-4310-9484-e9108e859cdd",
      debug: 2
    }) as Peer;

    peer.once("open", () => {
      resolve(peer);
      peer.removeListener("error", reject);
    });
    // for onOpen error
    peer.once("error", reject);
  });
};
