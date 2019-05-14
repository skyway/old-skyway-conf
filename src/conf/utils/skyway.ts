import { Peer } from "./types";

export const initPeer = (): Promise<Peer> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore: import via cdn for auto-update
    const peer = new window.Peer({
      // TODO: dev key
      key: "adbec654-2931-42c3-a073-7450b1c2def1",
      // key: "03ff6219-b58f-4310-9484-e9108e859cdd",
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
