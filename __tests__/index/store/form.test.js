import FormStore from '../../../src/index/store/form';

let form;
beforeEach(() => {
  form = new FormStore();
});

describe('@computed isNameValid', () => {
  it('should follow this.name', () => {
    // form.name = '';
    expect(form.isNameValid).toBeFalsy();

    form.name = 'abc';
    expect(form.isNameValid).toBeFalsy();

    form.name = 'room1';
    expect(form.isNameValid).toBeTruthy();
  });
});
