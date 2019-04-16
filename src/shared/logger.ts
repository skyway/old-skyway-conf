import * as debug from 'debug';
import { Debugger } from 'debug';

export default class {
  error: Debugger;
  warn: Debugger;
  info: Debugger;

  constructor(name: string) {
    this.error = debug(`${name}:error`);
    this.warn = debug(`${name}:warn`);
    this.info = debug(`${name}:info`);
  }
}
