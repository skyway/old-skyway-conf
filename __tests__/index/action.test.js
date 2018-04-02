import IndexStore from '../../src/index/store';
import IndexAction from '../../src/index/action';
import bom from '../../src/shared/util/bom';

let action;
let setLocationHrefSpy;
beforeAll(() => {
  const store = new IndexStore();
  action = new IndexAction(store);

  setLocationHrefSpy = spyOn(bom, 'setLocationHref');
});

describe('onSubmitForm()', () => {
  it('should set location.href', () => {
    action.$update('form.name', 'my-room');
    action.$update('form.type', 'mesh');
    action.onSubmitForm();

    expect(setLocationHrefSpy).toHaveBeenCalledWith(
      './conf.html#!/mesh/my-room'
    );
  });
});
