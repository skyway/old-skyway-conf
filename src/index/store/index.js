import FormStore from './form';
import UiStore from './ui';

class IndexStore {
  constructor() {
    this.form = new FormStore();
    this.ui = new UiStore();
  }
}

export default IndexStore;
