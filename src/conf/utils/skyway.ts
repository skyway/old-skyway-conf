import { Peer } from "./types";

export const initPeer = (): Promise<Peer> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore: import via cdn for auto-update
    const peer = new window.Peer({
      key: "03ff6219-b58f-4310-9484-e9108e859cdd",
      debug: 2
    }) as Peer;

    peer.once("open", () => {
      peer.removeListener("error", reject);
      resolve(peer);
    });
    // for onOpen error
    peer.once("error", reject);
  });
};
