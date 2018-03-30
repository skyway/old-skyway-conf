import { decorate, observable, computed } from 'mobx';

class UiStore {
  constructor() {
    this.isFocusInput = false;
    this.isAppError = false;
  }

  get isError() {
    return this.isAppError;
  }
}

decorate(UiStore, {
  isFocusInput: observable,
  isAppError: observable,
  isError: computed,
});
export default UiStore;
