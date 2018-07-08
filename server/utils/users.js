// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//
//   getUserDescription(){
//     return `${this.name} is ${this.age} years(s) old!`;
//   }
// }
//
//   var me = new Person('Mohit', 21);
//   var desc = me.getUserDescription();
//   console.log(desc);

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, roomname){
    var user = {id, name, roomname};
    this.users.push(user);
    return user;
  }

  removeUser(id){
    var user = this.getUser(id);
    if(user){
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }

  getUser(id){
    var user = this.users.filter((user) => user.id === id)[0];
    return user;
  }

  getUserList(roomname){
    var users = this.users.filter((user) => user.roomname === roomname);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};
