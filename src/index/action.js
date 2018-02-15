import Action from '../shared/action';

class IndexAction extends Action {
  onSubmitForm() {
    const { name, type } = this.store.form;
    location.href = `./conf.html#!/${type}/${name}`;
  }
}

export default IndexAction;
