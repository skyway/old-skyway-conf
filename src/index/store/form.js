import { extendObservable } from 'mobx';
import { isValidRoomName } from '../../shared/util/validate';

class FormStore {
  constructor() {
    extendObservable(this, {
      name: '',
      type: 'sfu',

      get isNameValid() {
        return isValidRoomName(this.name);
      },
    });
  }
}

export default FormStore;
