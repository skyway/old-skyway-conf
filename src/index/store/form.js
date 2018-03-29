import { extendObservable } from 'mobx';
import validate from '../../shared/util/validate';

class FormStore {
  constructor() {
    extendObservable(this, {
      name: '',
      type: 'sfu',

      get isNameValid() {
        return validate.isValidRoomName(this.name);
      },
    });
  }
}

export default FormStore;
