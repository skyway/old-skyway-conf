import { extendObservable } from 'mobx';

class FormStore {
  constructor() {
    extendObservable(this, {
      name: '',
      type: 'sfu',

      get isNameValid() {
        return /^[0-9a-z_-]{4,32}$/.test(this.name);
      }
    });
  }

  set(key, val) {
    this[key] = val;
  }
}

export default FormStore;
