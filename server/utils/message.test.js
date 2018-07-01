const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage function', () => {
  it('should generate the correct message object', () => {
    var from = 'Jack';
    var text = 'some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    });
  });
});
