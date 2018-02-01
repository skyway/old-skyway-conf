import Action from '../shared/action';

class IndexAction extends Action {
  onSubmitForm() {
    const { name, type } = this.store.form;
    location.href = `/room.html#!/${type}/${name}`;
  }
}

export default IndexAction;
