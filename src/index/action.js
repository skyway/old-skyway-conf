function IndexAction({ formStore }) {
  return {
    onSubmitForm() {
      const { name, type } = formStore;
      location.href = `/room.html#!/${type}/${name}`;
    },
  };
}

export default IndexAction;
