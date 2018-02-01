class IndexAction {
  constructor(store) {
    this.store = store;
  }

  $update(path, value) {
    const [name, key] = path.split('.');
    if (!(name && key && name in this.store && key in this.store[name])) {
      throw new Error(`${name}.${key} is not defined!`);
    }

    this.store[name][key] = value;
  }

  onSubmitForm() {
    const { name, type } = this.store.form;
    location.href = `/room.html#!/${type}/${name}`;
  }
}

export default IndexAction;
