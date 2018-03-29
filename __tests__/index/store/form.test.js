const requireEsm = require('esm')(module);
const FormStore = requireEsm('../../../src/index/store/form').default;

let form;
beforeAll(() => {
  form = new FormStore();
});

describe('@computed isNameValid', () => {
  test('should follow this.name', () => {
    // form.name = '';
    expect(form.isNameValid).toBeFalsy();

    form.name = 'abc';
    expect(form.isNameValid).toBeFalsy();

    form.name = 'room1';
    expect(form.isNameValid).toBeTruthy();
  });
});
