import { extendObservable } from 'mobx';

class UiStore {
  constructor() {
    extendObservable(this, {
      isFocusInput: false,
    });
  }

  set(key, val) {
    this[key] = val;
  }
}

export default UiStore;
