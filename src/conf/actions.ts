import { createLogger } from "../shared/logger";
import RootStore from "./stores";

const logger = createLogger("conf:action");

class RootAction {
  store: RootStore;

  constructor(store: RootStore) {
    this.store = store;
  }

  onLoad() {
    logger.info("onLoad()");
  }
}

export default RootAction;
