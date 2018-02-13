import { extendObservable } from 'mobx';

class UiStore {
  constructor() {
    extendObservable(this, {
      isFocusInput: false,
      isAppError: false,
      get isError() {
        return this.isAppError;
      },
    });
  }
}

export default UiStore;
