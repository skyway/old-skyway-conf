const requireEsm = require('esm')(module);
const IndexStore = requireEsm('../../src/index/store').default;
const IndexAction = requireEsm('../../src/index/action').default;
const bom = requireEsm('../../src/shared/util/bom').default;

let action;
let setLocationHrefSpy;
beforeAll(() => {
  const store = new IndexStore();
  action = new IndexAction(store);

  setLocationHrefSpy = jest.spyOn(bom, 'setLocationHref').mockImplementation();
});
afterAll(() => {
  setLocationHrefSpy.mockRestore();
});

describe('onSubmitForm', () => {
  test('should set location.href', () => {
    action.$update('form.name', 'my-room');
    action.$update('form.type', 'mesh');
    action.onSubmitForm();

    expect(setLocationHrefSpy).toHaveBeenCalledWith(
      './conf.html#!/mesh/my-room'
    );
  });
});
