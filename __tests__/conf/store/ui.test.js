import UiStore from '../../../src/conf/store/ui';

let ui;
beforeEach(() => {
  ui = new UiStore();
});

describe('setRoom()', () => {
  it('should set room', () => {
    ui.setRoom({
      roomType: 'mesh',
      roomName: 'valid-room',
    });

    expect(ui.roomType).toBe('mesh');
    expect(ui.roomName).toBe('valid-room');
  });

  it('should not set invalid room', () => {
    ui.setRoom({
      roomType: 'foo',
      roomName: 'invalid-room',
    });

    expect(ui.roomType).toBe('');
    expect(ui.roomName).toBe('');
    expect(ui.isUserError).toBeTruthy();
  });
});

describe('handleGetUserMediaError()', () => {
  it('should handle OverconstrainedError as app error', () => {
    const err = new Error();
    err.name = 'OverconstrainedError';
    ui.handleGetUserMediaError(err);

    expect(ui.isAppError).toBeTruthy();
    expect(ui.isUserError).toBeFalsy();
  });

  it('should handle NotFoundError as app error', () => {
    const err = new Error();
    err.name = 'NotFoundError';
    ui.handleGetUserMediaError(err);

    expect(ui.isAppError).toBeTruthy();
    expect(ui.isUserError).toBeFalsy();
  });

  it('should handle other errors as user error', () => {
    const err = new Error();
    ui.handleGetUserMediaError(err);

    expect(ui.isAppError).toBeFalsy();
    expect(ui.isUserError).toBeTruthy();
  });
});

describe('@computed confUrl', () => {
  it('should follow this.roomType and roomName', () => {
    ui.setRoom({
      roomType: 'mesh',
      roomName: 'valid-room',
    });
    expect(ui.confUrl.split('#')[1]).toBe('!/mesh/valid-room');
  });
});

describe('@computed isError', () => {
  it('should follow this.isAppError || isUserError', () => {
    ui.isAppError = true;
    ui.isUserError = true;
    expect(ui.isError).toBeTruthy();

    ui.isAppError = false;
    ui.isUserError = true;
    expect(ui.isError).toBeTruthy();

    ui.isAppError = true;
    ui.isUserError = false;
    expect(ui.isError).toBeTruthy();

    ui.isAppError = false;
    ui.isUserError = false;
    expect(ui.isError).toBeFalsy();
  });
});
