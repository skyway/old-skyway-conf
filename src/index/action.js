import Action from '../shared/action';
import bom from '../shared/util/bom';

class IndexAction extends Action {
  onSubmitForm() {
    const { name, type } = this.store.form;
    const url = `./conf.html#!/${type}/${name}`;
    bom.setLocationHref(url);
  }
}

export default IndexAction;
