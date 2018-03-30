import { decorate, observable, computed } from 'mobx';
import validate from '../../shared/util/validate';

class FormStore {
  constructor() {
    this.name = '';
    this.type = 'sfu';
  }

  get isNameValid() {
    return validate.isValidRoomName(this.name);
  }
}

decorate(FormStore, {
  name: observable,
  type: observable,
  isNameValid: computed,
});
export default FormStore;
