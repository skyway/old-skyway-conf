import * as bowser from 'bowser';
import { Parser } from 'bowser';

export default class User {
  ua: Parser.ParsedResult | null;

  constructor() {
    this.ua = null;
  }

  load(ua: string) {
    this.ua = bowser.parse(ua);
  }
}
