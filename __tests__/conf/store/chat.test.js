const requireEsm = require('esm')(module);
const ChatStore = requireEsm('../../../src/conf/store/chat').default;

let chat;
beforeEach(() => {
  chat = new ChatStore();
});

describe('addMessage', () => {
  test('should add messages', () => {
    expect(chat.messages).toHaveLength(0);
    chat.addMessage({});
    expect(chat.messages).toHaveLength(1);
  });

  test('should set id', () => {
    chat.addMessage({ peerId: 'id', timestamp: 123 });
    expect(chat.messages[0]).toHaveProperty('id', 'id-123');
  });

  test('should set dispDate', () => {
    const timestamp = Date.now();
    chat.addMessage({ timestamp });
    expect(chat.messages[0]).toHaveProperty('dispDate');
    expect(chat.messages[0].dispDate).toHaveLength(5);
    expect(chat.messages[0].dispDate).toMatch(/\d\d:\d\d/);
  });
});

describe('updateBuffer', () => {
  test('should update lastMessage', () => {
    const buffer1 = { id: 1 };
    const buffer2 = { id: 2 };
    chat.updateBuffer(buffer1);
    expect(chat.lastMessage).toBe(buffer1);

    chat.updateBuffer(buffer2);
    expect(chat.lastMessage).not.toBe(buffer1);
  });

  test('should empty bufferText', () => {
    chat.bufferText = 'foo';
    expect(chat.bufferText).toBe('foo');

    chat.updateBuffer({ id: 1 });
    expect(chat.bufferText).toBe('');
  });
});
