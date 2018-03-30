import Action from '../../src/shared/action';

describe('constructor', () => {
  it('should assign store', () => {
    const store = {};
    const a = new Action(store);

    expect(a.store).toBe(store);
  });

  it('should inherit', () => {
    const store = {};
    class A extends Action {}
    const a = new A(store);

    expect(a.store).toBe(store);
  });
});

describe('$update', () => {
  let a;
  beforeAll(() => {
    const xStore = {
      p: 1,
      q: 2,
    };
    a = new Action({ x: xStore });
  });

  it('should update if store exists', () => {
    a.$update('x.p', 2);
    expect(a.store.x.p).toBe(2);

    const d = new Date();
    a.$update('x.q', d);
    expect(a.store.x.q).toBe(d);
  });

  it('should throw if store exists but props not exists', () => {
    expect(() => {
      a.$update('x.r', 3);
    }).toThrow();
    expect('r' in a.store.x).toBeFalsy();
  });

  it('should throw if store not exists', () => {
    expect(() => {
      a.$update('y.p', 2);
    }).toThrow();
    expect('y' in a.store).toBeFalsy();
  });
});
