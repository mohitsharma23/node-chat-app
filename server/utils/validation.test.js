const expect = require('expect');

const {isValidString} = require('./validation');

describe('isValidString function', () => {
  it('should reject non-string values', () => {
    var some = 123;
    var str = isValidString(some);
    expect(str).toBe(false);
  });

  it('should reject string with only space', () => {
    var some = '  ';
    var str = isValidString(some);
    expect(str).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var some = 'string';
    var str = isValidString(some);
    expect(str).toBe(true);
  });
});
