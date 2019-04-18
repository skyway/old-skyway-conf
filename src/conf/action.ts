import { createLogger } from "../shared/logger";
import { Store } from "./contexts";

const logger = createLogger("conf:action");

export default class Action {
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  async onLoad(ua: string) {
    logger.info("onLoad()");
    const { user } = this.store;

    user.load(ua);
    console.log(user);
  }
}
