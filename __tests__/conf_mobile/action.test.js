import ConfStore from '../../src/conf_mobile/store';
import ConfAction from '../../src/conf_mobile/action';
import skyway from '../../src/shared/util/skyway';
import webrtc from '../../src/shared/util/webrtc';
import { getFakeDevices } from '../test-utils';

let store;
let action;
beforeEach(() => {
  store = new ConfStore();
  action = new ConfAction(store);

  spyOn(skyway, 'initPeer').and.callFake(() =>
    Promise.resolve(jasmine.createSpyObj(['on', 'joinRoom']))
  );
  spyOn(webrtc, 'snapVideoStream').and.callFake(() =>
    Promise.resolve(new Blob())
  );
  spyOn(webrtc, 'getUserDevices').and.callFake(() =>
    Promise.resolve(getFakeDevices())
  );
});

describe('onLoad()', () => {
  it('should call user.updateDevices()', async () => {
    const spy = spyOn(store.user, 'updateDevices');

    await action.onLoad({ roomType: 'mesh', roomName: 'valid-room' });
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

describe('onClickSendChat()', () => {
  it('should call chat.addMessage()', async () => {
    const spy1 = spyOn(store.chat, 'addMessage');
    const spy2 = spyOn(store.chat, 'updateBuffer');
    store.chat.bufferText = 'foo';

    await action.onClickSendChat();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
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

describe('_onRoomRemoveStream()', () => {
  it('should call room.removeRemoteStream()', () => {
    const spy = spyOn(store.room, 'removeRemoteStream');

    action._onRoomRemoveStream();
    expect(spy).toHaveBeenCalled();
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

  xit('should handle data type:chat w/ isChatOpen', () => {
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
