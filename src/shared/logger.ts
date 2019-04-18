import * as debug from 'debug';
import { Debugger } from 'debug';

interface Logger {
  error: Debugger;
  warn: Debugger;
  info: Debugger;
}
export function createLogger(name: string): Logger {
  return {
    error: debug(`${name}:error`),
    warn: debug(`${name}:warn`),
    info: debug(`${name}:info`),
  };
}
