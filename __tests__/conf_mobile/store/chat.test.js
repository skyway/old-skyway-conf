import ChatStore from '../../../src/conf_mobile/store/chat';

let chat;
beforeEach(() => {
  chat = new ChatStore();
});

describe('addMessage()', () => {
  it('should add messages', () => {
    expect(chat.messages.length).toBe(0);
    chat.addMessage({});
    expect(chat.messages.length).toBe(1);
  });

  it('should set id', () => {
    chat.addMessage({ peerId: 'id', timestamp: 123 });
    expect(chat.messages[0].id).toBe('id-123');
  });

  it('should set dispDate', () => {
    const timestamp = 1522376045002;
    chat.addMessage({ timestamp });
    expect('dispDate' in chat.messages[0]).toBeTruthy();
    expect(chat.messages[0].dispDate.length).toBe(5);
    expect(chat.messages[0].dispDate).toMatch(/\d\d:\d\d/);
  });
});

describe('updateBuffer()', () => {
  it('should update lastMessage', () => {
    const buffer1 = { id: 1 };
    const buffer2 = { id: 2 };
    chat.updateBuffer(buffer1);
    expect(chat.lastMessage).toBe(buffer1);

    chat.updateBuffer(buffer2);
    expect(chat.lastMessage).not.toBe(buffer1);
  });

  it('should empty bufferText', () => {
    chat.bufferText = 'foo';
    expect(chat.bufferText).toBe('foo');

    chat.updateBuffer({ id: 1 });
    expect(chat.bufferText).toBe('');
  });
});
