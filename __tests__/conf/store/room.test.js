import RoomStore from '../../../src/conf/store/room';
import { getFakeMedia } from '../../test-utils';

let room;
beforeEach(() => {
  room = new RoomStore();
});

describe('setLocalStream()', () => {
  it('should set media stream', () => {
    expect(room.localVideoStreamTrack instanceof MediaStreamTrack).toBeFalsy();
    expect(room.localAudioStreamTrack instanceof MediaStreamTrack).toBeFalsy();

    room.setLocalStream(getFakeMedia({ video: true, audio: true }));
    expect(room.localVideoStreamTrack instanceof MediaStreamTrack).toBeTruthy();
    expect(room.localAudioStreamTrack instanceof MediaStreamTrack).toBeTruthy();
  });

  it('should set media stream(video only)', () => {
    expect(room.localVideoStreamTrack instanceof MediaStreamTrack).toBeFalsy();
    expect(room.localAudioStreamTrack instanceof MediaStreamTrack).toBeFalsy();

    room.setLocalStream(getFakeMedia({ video: true }));
    expect(room.localVideoStreamTrack instanceof MediaStreamTrack).toBeTruthy();
    expect(room.localAudioStreamTrack instanceof MediaStreamTrack).toBeFalsy();
  });

  it('should set media stream(audio only)', () => {
    expect(room.localVideoStreamTrack instanceof MediaStreamTrack).toBeFalsy();
    expect(room.localAudioStreamTrack instanceof MediaStreamTrack).toBeFalsy();

    room.setLocalStream(getFakeMedia({ audio: true }));
    expect(room.localVideoStreamTrack instanceof MediaStreamTrack).toBeFalsy();
    expect(room.localAudioStreamTrack instanceof MediaStreamTrack).toBeTruthy();
  });
});

describe('setScreenStreamTrack()', () => {
  it('should set screen stream track', () => {
    expect(room.localScreenStreamTrack instanceof MediaStreamTrack).toBeFalsy();

    const [vTrack] = getFakeMedia({ video: true }).getVideoTracks();
    room.setScreenStreamTrack(vTrack);

    expect(
      room.localScreenStreamTrack instanceof MediaStreamTrack
    ).toBeTruthy();
  });

  it('should remove screen stream track', () => {
    expect(room.localScreenStreamTrack instanceof MediaStreamTrack).toBeFalsy();

    const [vTrack] = getFakeMedia({ video: true }).getVideoTracks();
    room.setScreenStreamTrack(vTrack);

    expect(
      room.localScreenStreamTrack instanceof MediaStreamTrack
    ).toBeTruthy();

    room.setScreenStreamTrack(null);
    expect(room.localScreenStreamTrack instanceof MediaStreamTrack).toBeFalsy();
  });
});

describe('addRemoteStream()', () => {
  it('should add remote stream', () => {
    expect(room.remoteStreams.length).toBe(0);
    room.addRemoteStream(getFakeMedia({ video: true, audio: true }));
    expect(room.remoteStreams.length).toBe(1);
  });

  it('should not add same stream', () => {
    const stream = getFakeMedia({ video: true, audio: true });
    room.addRemoteStream(stream);
    // will ignore same
    room.addRemoteStream(stream);
    expect(room.remoteStreams.length).toBe(1);
  });
});

describe('removeRemoteStreamByPeerId()', () => {
  it('should remove stream', () => {
    const stream = getFakeMedia({ video: true, audio: true });
    room.addRemoteStream(stream);
    expect(room.remoteStreams.length).toBe(1);

    room.removeRemoteStreamByPeerId(stream.peerId);
    expect(room.remoteStreams.length).toBe(0);
  });

  it('should remove pinnedPeerId');
  it('should delete syncState');
});

describe('removeRemoteStream()', () => {
  it('should remove stream', () => {
    const stream = getFakeMedia({ video: true, audio: true });
    room.addRemoteStream(stream);
    expect(room.remoteStreams.length).toBe(1);

    room.removeRemoteStream(stream);
    expect(room.remoteStreams.length).toBe(0);
  });
});

describe('@computed localStream', () => {
  it('should add media stream track', () => {
    room.setLocalStream(getFakeMedia({ video: true }));
    expect(room.localStream.getTracks().length).toBe(1);

    room.setLocalStream(getFakeMedia({ video: true, audio: true }));
    expect(room.localStream.getTracks().length).toBe(2);
  });
});

describe('@computed pinnedPeerIdDisp', () => {
  it('should return empty string by default', () => {
    expect(room.pinnedPeerIdDisp).toBe('');
  });

  it('should return pinnedPeerId', () => {
    room.pinnedPeerId = 'str';
    expect(room.pinnedPeerIdDisp).toBe('str');
  });

  it('should return remote peerId', () => {
    const stream = getFakeMedia({ video: true, audio: true });
    room.addRemoteStream(stream);
    expect(room.pinnedPeerIdDisp).toBe(stream.peerId);
  });
});

describe('@computed pinnedStream', () => {
  it('should return null by default', () => {
    expect(room.pinnedStream).toBeNull();
  });

  it('should return pinned remote stream', () => {
    const stream = getFakeMedia({ video: true, audio: true });
    room.addRemoteStream(stream);

    room.pinnedPeerId = stream.peerId;
    expect(room.pinnedStream).toBe(stream);
  });
});
