import RoomStore from '../../../src/conf_mobile/store/room';
import { getFakeMedia } from '../../test-utils';

let room;
beforeEach(() => {
  room = new RoomStore();
});

describe('setLocalStream()', () => {
  it('should set media stream', () => {
    expect(room.localStream instanceof MediaStream).toBeFalsy();

    room.setLocalStream(getFakeMedia({ video: true, audio: true }));
    expect(room.localStream instanceof MediaStream).toBeTruthy();
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

  it('should remove pinnedPeerId', () => {
    const stream = getFakeMedia({ video: true, audio: true });
    room.addRemoteStream(stream);
    room.pinnedPeerId = stream.peerId;

    room.removeRemoteStreamByPeerId(stream.peerId);
    expect(room.pinnedPeerId).toBe('');
  });

  it('should delete syncState', () => {
    const stream = getFakeMedia({ video: true, audio: true });
    room.addRemoteStream(stream);
    room.syncState.set(stream.peerId, {});
    expect(room.syncState.get(stream.peerId)).not.toBeUndefined();

    room.removeRemoteStreamByPeerId(stream.peerId);
    expect(room.syncState.get(stream.peerId)).toBeUndefined();
  });
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
