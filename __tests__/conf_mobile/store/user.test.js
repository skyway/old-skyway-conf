import UserStore from '../../../src/conf_mobile/store/user';
import { getFakeDevices } from '../../test-utils';

let user;
beforeEach(() => {
  user = new UserStore();
});

describe('updateDevices()', () => {
  it('should update devices', () => {
    expect(user.videoDevices.length).toBe(0);
    expect(user.audioDevices.length).toBe(0);
    const devices = getFakeDevices();
    user.updateDevices(devices);

    expect(user.videoDevices.length).toBe(devices.video.length);
    expect(user.audioDevices.length).toBe(devices.audio.length);
  });

  it('should call _setDefaultDeviceIfNeeded()', () => {
    const spy = spyOn(user, '_setDefaultDeviceIfNeeded');
    user.updateDevices(getFakeDevices());

    expect(spy).toHaveBeenCalled();
  });
});

describe('_setDefaultDeviceIfNeeded()', () => {
  it('should set deviceId', () => {
    expect(user.videoDeviceId).toBe('');
    expect(user.audioDeviceId).toBe('');

    const devices = getFakeDevices();
    user.updateDevices(devices);
    expect(user.videoDeviceId).toBe(devices.video[0].deviceId);
    expect(user.audioDeviceId).toBe(devices.audio[0].deviceId);
  });

  it('should not set if deviceId has already defined', () => {
    user.videoDeviceId = 'v2';

    const devices = getFakeDevices();
    user.updateDevices(devices);
    expect(user.videoDeviceId).toBe('v2');
  });
});

describe('@computed facingMode', () => {
  it('should return environment if only 1 camera detected', () => {
    const devices = getFakeDevices();
    devices.video.length = 1;
    user.updateDevices(devices);
    expect(user.facingMode).toBe('environment');
  });

  it('should return environment if not selected', () => {
    const devices = getFakeDevices();
    user.updateDevices(devices);
    expect(user.facingMode).toBe('environment');
  });

  it('should return user if selected', () => {
    const devices = getFakeDevices();
    user.updateDevices(devices);
    user.videoDeviceId = devices.video[1].deviceId;
    expect(user.facingMode).toBe('user');
  });
});

describe('@computed syncState', () => {
  it('should follow this.xxx', () => {
    [
      'peerId',
      'dispName',
      'isVideoMuted',
      'isAudioMuted',
      'isSpeaking',
    ].forEach(prop => {
      expect(prop in user.syncState).toBeTruthy();
      expect(user[prop]).toBe(user.syncState[prop]);
    });
  });
});

describe('@computed isNoVideoDevices', () => {
  it('should follow this.videoDevices', () => {
    expect(user.isNoVideoDevices).toBeTruthy();

    user.updateDevices(getFakeDevices());
    expect(user.isNoVideoDevices).toBeFalsy();
  });
});
describe('@computed isNoAudioDevices', () => {
  it('should follow this.audioDevices', () => {
    expect(user.isNoAudioDevices).toBeTruthy();

    user.updateDevices(getFakeDevices());
    expect(user.isNoAudioDevices).toBeFalsy();
  });
});
