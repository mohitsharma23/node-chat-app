const expect = require('expect');

const {Users} = require('./users');

describe('Users Class', () => {

var users;
beforeEach(() => {
  users = new Users();
  users.users = [{
    id: '1',
    name: 'Jack',
    roomname: 'NodeJS'
  }, {
    id: '2',
    name: 'Jen',
    roomname: 'ReactJS'
  }, {
    id: '3',
    name: 'Jill',
    roomname: 'NodeJS'
  }];
});


  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123abc',
      name: 'Mohit',
      roomname: 'Yo people'
    };
    var responseUser = users.addUser(user.id, user.name, user.roomname);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var user = users.removeUser('2');

    expect(user.name).toEqual('Jen');
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var user = users.removeUser('0');

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should get a user', () => {
    var user = users.getUser('1');

    expect(user.name).toEqual('Jack');
  });

  it('should not get a user', () => {
    var user = users.getUser('0');

    expect(user).toBeFalsy();
  });

  it('should return names for NodeJS room', () => {
    var userList = users.getUserList('NodeJS');

    expect(userList).toEqual(['Jack', 'Jill']);
  });

  it('should return names for ReactJS room', () => {
    var userList = users.getUserList('ReactJS');

    expect(userList).toEqual(['Jen']);
  });
});
