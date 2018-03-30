const requireEsm = require('esm')(module);
const NotificationStore = requireEsm('../../../src/conf/store/notification')
  .default;

let notification;
beforeEach(() => {
  notification = new NotificationStore();
});

describe('_show', () => {
  test('should add and delete items', done => {
    expect(notification.items).toHaveLength(0);

    notification._show('foo');
    expect(notification.items).toHaveLength(1);

    // XXX: jest.useFakeTimers() does not work via esm...
    setTimeout(() => {
      expect(notification.items).toHaveLength(0);
      done();
    }, 1000); // removed after 1000ms
  });
});
