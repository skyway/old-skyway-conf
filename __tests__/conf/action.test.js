import ConfStore from '../../src/conf/store';
import ConfAction from '../../src/conf/action';
import skyway from '../../src/shared/util/skyway';
import webrtc from '../../src/shared/util/webrtc';
import { getFakeDevices, getFakeMedia } from '../test-utils';

let store;
let action;
beforeEach(() => {
  store = new ConfStore();
  action = new ConfAction(store);

  spyOn(skyway, 'getScreenStreamTrack').and.callFake(() =>
    jasmine.createSpyObj(['addEventListener'])
  );
  spyOn(skyway, 'initPeer').and.callFake(() =>
    Promise.resolve(jasmine.createSpyObj(['on', 'joinRoom']))
  );
  spyOn(webrtc, 'snapVideoStream').and.callFake(() =>
    Promise.resolve(new Blob())
  );
  spyOn(webrtc, 'getUserPermission').and.callFake(() =>
    Promise.resolve(getFakeMedia())
  );
  spyOn(webrtc, 'getDisplayStreamTrack').and.callFake(() =>
    jasmine.createSpyObj(['addEventListener'])
  );
  spyOn(webrtc, 'getUserDevices').and.callFake(() =>
    Promise.resolve(getFakeDevices())
  );
});

describe('onLoad()', () => {
  it('should call user.updateDevices()', async () => {
    const spy = spyOn(store.user, 'updateDevices');

    await action.onLoad({
      roomType: 'mesh',
      roomName: 'valid-room',
      isFirefoxAndScreenShareTriggerNeeded: false,
    });
    expect(spy).toHaveBeenCalled();
  });
});

describe('onClickJoinRoom()', () => {
  it('should call this._onRoomJoin()', async () => {
    const spy = spyOn(action, '_onRoomJoin');

    await action.onClickJoinRoom();
    expect(spy).toHaveBeenCalled();
  });
});

describe('onChatEnterKeyDown()', () => {
  it('should not call chat.addMessage() w/ chat.bufferText is empty', async () => {
    const spy = spyOn(store.chat, 'addMessage');
    store.chat.bufferText = '';

    await action.onChatEnterKeyDown();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not call chat.addMessage() w/ ui.isChatSending = true', async () => {
    const spy = spyOn(store.chat, 'addMessage');
    store.ui.isChatSending = true;

    await action.onChatEnterKeyDown();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call chat.addMessage() w/ chat.bufferText is not empty', async () => {
    const spy1 = spyOn(store.chat, 'addMessage');
    const spy2 = spyOn(store.chat, 'updateBuffer');
    store.chat.bufferText = 'foo';

    await action.onChatEnterKeyDown();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});

describe('startScreenShare()', () => {
  it('should set true to ui.isScreenShareIntroOpen w/o screen share is available', async () => {
    expect(store.ui.isScreenShareIntroOpen).toBeFalsy();
    spyOn(skyway, 'isScreenShareAvailable').and.callFake(() => false);
    spyOn(webrtc, 'isGetDisplayMediaAvailable').and.callFake(() => false);

    await action.startScreenShare();
    expect(store.ui.isScreenShareIntroOpen).toBeTruthy();
  });

  it('should set true to ui.isScreenSharing w/ skyway screen share is available', async () => {
    expect(store.ui.isScreenSharing).toBeFalsy();
    spyOn(skyway, 'isScreenShareAvailable').and.callFake(() => true);
    spyOn(webrtc, 'isGetDisplayMediaAvailable').and.callFake(() => false);
    const spy = spyOn(store.room, 'setScreenStreamTrack');

    await action.startScreenShare();
    expect(spy).toHaveBeenCalled();
    expect(store.ui.isScreenSharing).toBeTruthy();
  });

  it('should set true to ui.isScreenSharing w/ getDisplayMedia is available', async () => {
    expect(store.ui.isScreenSharing).toBeFalsy();
    spyOn(skyway, 'isScreenShareAvailable').and.callFake(() => false);
    spyOn(webrtc, 'isGetDisplayMediaAvailable').and.callFake(() => true);
    const spy = spyOn(store.room, 'setScreenStreamTrack');

    await action.startScreenShare();
    expect(spy).toHaveBeenCalled();
    expect(store.ui.isScreenSharing).toBeTruthy();
  });
});

describe('stopScreenShare()', () => {
  it('should call room.setScreenStreamTrack()', () => {
    const spy = spyOn(store.room, 'setScreenStreamTrack');
    action.stopScreenShare();
    expect(spy).toHaveBeenCalledWith(null);
  });

  it('should set false to ui.isScreenSharing', () => {
    store.ui.isScreenSharing = true;
    spyOn(store.room, 'setScreenStreamTrack');

    action.stopScreenShare();
    expect(store.ui.isScreenSharing).toBeFalsy();
  });
});

describe('_onRoomJoin()', () => {
  it('should call confRoom.on()', () => {
    expect(store.ui.isRoomJoin).toBeFalsy();

    const confRoom = jasmine.createSpyObj(['on']);
    action._onRoomJoin(confRoom);

    expect(confRoom.on).toHaveBeenCalledTimes(4);
    expect(store.ui.isRoomJoin).toBeTruthy();
  });
});

describe('_onRoomAddStream()', () => {
  it('should call room.addRemoteStream()', () => {
    const spy = spyOn(store.room, 'addRemoteStream');
    const confRoom = jasmine.createSpyObj(['send']);

    action._onRoomAddStream({}, confRoom);
    expect(spy).toHaveBeenCalled();
    expect(confRoom.send).toHaveBeenCalled();
  });
});

describe('_onRoomPeerLeave()', () => {
  it('should call room.removeRemoteStreamByPeerId(), notification.showLeave()', () => {
    const spy1 = spyOn(store.room, 'removeRemoteStreamByPeerId');
    const spy2 = spyOn(store.notification, 'showLeave');

    action._onRoomPeerLeave();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});

describe('_onRoomData()', () => {
  it('should handle data type:chat w/o isChatOpen', () => {
    spyOn(store.room.syncState, 'get').and.callFake(() => ({}));
    const spy1 = spyOn(store.chat, 'addMessage');
    const spy2 = spyOn(store.notification, 'showChat');

    action._onRoomData({ data: { type: 'chat', payload: {} } });
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should handle data type:chat w/ isChatOpen', () => {
    store.ui.isChatOpen = true;
    spyOn(store.room.syncState, 'get').and.callFake(() => ({}));
    const spy = spyOn(store.notification, 'showChat');

    action._onRoomData({ data: { type: 'chat', payload: {} } });
    expect(spy).not.toHaveBeenCalled();
  });

  it('should handle data type:sync', () => {
    const spy = spyOn(store.room.syncState, 'set');
    const state = { peerId: 'id', x: 1 };

    action._onRoomData({ data: { type: 'sync', payload: state } });
    expect(spy).toHaveBeenCalledWith('id', state);
  });

  it('should handle data others', () => {
    expect(() => {
      action._onRoomData({ data: { type: 'foo', payload: {} } });
    }).toThrow();
  });
});
