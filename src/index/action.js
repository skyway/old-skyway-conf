function IndexAction({ formStore }) {
  return {
    onSubmitForm() {
      const { name, type } = formStore;
      console.log(`/#!/${type}/${name}`);
    },
  };
}

export default IndexAction;
