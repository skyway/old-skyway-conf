const requireEsm = require('esm')(module);
const NotificationStore = requireEsm('../../../src/conf/store/notification')
  .default;

let notification;
beforeEach(() => {
  notification = new NotificationStore();
});

describe('_show', () => {
  test('should add and delete items', () => {
    jest.useFakeTimers();

    expect(notification.items).toHaveLength(0);

    notification._show('foo');
    expect(notification.items).toHaveLength(1);

    // removed after 1sec
    jest.advanceTimersByTime(1000);

    expect(notification.items).toHaveLength(0);
    jest.useRealTimers();
  });
});
