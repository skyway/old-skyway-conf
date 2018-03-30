const requireEsm = require('esm')(module);
const ChatStore = requireEsm('../../../src/conf/store/chat').default;

let chat;
beforeAll(() => {
  chat = new ChatStore();
});

describe('addMessage', () => {
  test('', () => {
    chat.addMessage;
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
