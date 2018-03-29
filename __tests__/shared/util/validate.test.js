const requireEsm = require('esm')(module);
const validate = requireEsm('../../../src/shared/util/validate').default;

describe('isValidRoomType', () => {
  test('should return true for sfu and mesh', () => {
    ['sfu', 'mesh'].forEach(name => {
      const res = validate.isValidRoomType(name);
      expect(res).toBeTruthy();
    });
  });

  test('should return false for others', () => {
    [
      'meshh',
      ' mesh',
      'mesh ',
      'MESH',
      '',
      1,
      true,
      [],
      {},
      null,
      undefined,
    ].forEach(name => {
      const res = validate.isValidRoomType(name);
      expect(res).toBeFalsy();
    });
  });
});

describe('isValidRoomName', () => {
  test('should return true for valid strings', () => {
    [
      'valid',
      'myroom-1',
      'my_room_10',
      'longlongmyroomnamealsovalid',
      '12345678901234567890123456789012',
    ].forEach(name => {
      const res = validate.isValidRoomName(name);
      expect(res).toBeTruthy();
    });
  });

  test('should return false for others', () => {
    [
      'aaa',
      '12345678901234567890123456789012-',
      'abcd@',
      'abcd#',
      'abcd$',
      'abcd%',
      'abcd^',
      'abcd&',
      'abcd*',
      'OURROOM',
    ].forEach(name => {
      const res = validate.isValidRoomName(name);
      expect(res).toBeFalsy();
    });
  });
});
