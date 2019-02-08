import UserStore from '../../../src/conf/store/user';
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
    expect(user.videoDeviceId).toBe('default');
    expect(user.audioDeviceId).toBe('default');

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
