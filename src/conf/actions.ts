import { createLogger } from "../shared/logger";
import { isValidRoomName, isValidRoomType } from "../shared/validate";
import RootStore from "./stores";

const logger = createLogger("conf:action");

class RootAction {
  store: RootStore;

  constructor(store: RootStore) {
    this.store = store;
  }

  onLoad() {
    const { ui } = this.store;
    logger.info("onLoad()");

    const [, roomType, roomName] = location.hash.split("/");
    if (!(isValidRoomType(roomType) && isValidRoomName(roomName))) {
      ui.showError(new Error("Invalid room type and/or room name."));
      return;
    }

    logger.info(`room: ${roomType}/${roomName}`);
  }
}

export default RootAction;
