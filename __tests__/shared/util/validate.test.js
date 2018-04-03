import validate from '../../../src/shared/util/validate';

describe('isValidRoomType()', () => {
  it('should return true for sfu and mesh', () => {
    ['sfu', 'mesh'].forEach(name => {
      const res = validate.isValidRoomType(name);
      expect(res).toBeTruthy();
    });
  });

  it('should return false for others', () => {
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

describe('isValidRoomName()', () => {
  it('should return true for valid strings', () => {
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

  it('should return false for others', () => {
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
