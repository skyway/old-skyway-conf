import Logger from '../shared/logger';
import { Store } from './contexts';

const logger = new Logger('conf:action');

export default class Action {
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  async onLoad(ua: string) {
    logger.info('onLoad()');
    const { user } = this.store;

    user.load(ua);
    console.log(user);
  }
}
