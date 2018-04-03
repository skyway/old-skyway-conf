import NotificationStore from '../../../src/conf_mobile/store/notification';

let notification;
beforeEach(() => {
  notification = new NotificationStore();
});

describe('_show()', () => {
  it('should add and delete items', () => {
    jasmine.clock().install();

    expect(notification.items.length).toBe(0);
    notification._show('foo');
    expect(notification.items.length).toBe(1);

    // will remove after 1000ms
    jasmine.clock().tick(1001);
    expect(notification.items.length).toBe(0);

    jasmine.clock().uninstall();
  });
});
