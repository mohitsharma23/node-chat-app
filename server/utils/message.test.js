const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage function', () => {
  it('should generate correct location object', () => {
    var from = 'Jack';
    var lat = 10;
    var lng = 20;
    var url = 'https://www.google.com/maps?q=10,20';
    var message = generateLocationMessage(from, lat, lng);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      url
    })
  });
});
