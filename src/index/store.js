import FormStore from './store/form';
import UiStore from './store/ui';

class IndexStore {
  constructor() {
    this.formStore = new FormStore();
    this.uiStore = new UiStore();
  }
}

export default IndexStore;
