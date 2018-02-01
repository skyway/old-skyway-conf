import { extendObservable } from 'mobx';
import util from '../../shared/util';

class FormStore {
  constructor() {
    extendObservable(this, {
      name: '',
      type: 'sfu',

      get isNameValid() {
        return util.isValidRoomName(this.name);
      },
    });
  }
}

export default FormStore;
