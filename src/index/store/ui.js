import { extendObservable } from 'mobx';

class UiStore {
  constructor() {
    extendObservable(this, {
      isFocusInput: false,
    });
  }
}

export default UiStore;
