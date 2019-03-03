'use strict';
/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const box = document.querySelector('.box');

const bD = {
  allUsers: null,
  btnAllUsers: null,
  resultAllUsers: null,
  usersById: null,
  btnUsersById: null,
  resultUsersById: null,
  addNewUser: null,
  btnAddUser: null,
  resultNewUser: null,
  deleteUser: null,
  btnRemoveUser: null,
  resultRemovedUser: null,
  updUser: null,
  btnUpdUser: null,
  resultUpdUser: null,

  getAllUsers() {
    fetch(`https://test-users-api.herokuapp.com/users/`)
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        this.resultAllUsers.textContent = JSON.stringify(data.data);
      })
      .catch(error => console.log(error));
  },

  getUserById(id) {
    fetch(`https://test-users-api.herokuapp.com/users/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        this.resultUsersById.textContent = JSON.stringify(data.data);
      })
      .catch(error => console.log(error));
  },

  addUser(name, age) {
    fetch('https://test-users-api.herokuapp.com/users/', {
      method: 'POST',
      body: JSON.stringify({ name: name, age: age }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        this.resultNewUser.textContent = JSON.stringify(data.data);
      })
      .catch(error => console.log(error));
  },

  removeUser(id) {
    fetch(`https://test-users-api.herokuapp.com/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        if (data.data === null) {
          this.resultRemovedUser.textContent = '';
        } else {
          this.resultRemovedUser.textContent = JSON.stringify(data.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },

  updateUser(id, user) {
    fetch(`https://test-users-api.herokuapp.com/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        this.resultUpdUser.textContent = JSON.stringify(data.data);
      })
      .catch(error => console.log(error));
  },

  createElement() {
    this.allUsers = document.createElement('p');
    this.allUsers.classList.add('text');
    this.allUsers.textContent = 'Click to show all users';
    this.btnAllUsers = document.createElement('button');
    this.btnAllUsers.textContent = 'Click me';
    this.btnAllUsers.classList.add('btn');
    this.resultAllUsers = document.createElement('p');
    this.resultAllUsers.classList.add('text-result');

    this.usersById = document.createElement('p');
    this.usersById.classList.add('text');
    this.usersById.textContent = 'Click to show user by id';
    this.btnUsersById = document.createElement('button');
    this.btnUsersById.textContent = 'Click me';
    this.btnUsersById.classList.add('btn');
    this.resultUsersById = document.createElement('p');
    this.resultUsersById.classList.add('text-result');

    this.addNewUser = document.createElement('p');
    this.addNewUser.classList.add('text');
    this.addNewUser.textContent = 'Click to show new user';
    this.btnAddUser = document.createElement('button');
    this.btnAddUser.textContent = 'Click me';
    this.btnAddUser.classList.add('btn');
    this.resultNewUser = document.createElement('p');
    this.resultNewUser.classList.add('text-result');

    this.deleteUser = document.createElement('p');
    this.deleteUser.classList.add('text');
    this.deleteUser.textContent = 'Click to show removed user';
    this.btnRemoveUser = document.createElement('button');
    this.btnRemoveUser.textContent = 'Click me';
    this.btnRemoveUser.classList.add('btn');
    this.resultRemovedUser = document.createElement('p');
    this.resultRemovedUser.classList.add('text-result');

    this.updUser = document.createElement('p');
    this.updUser.classList.add('text');
    this.updUser.textContent = 'Click to show update user';
    this.btnUpdUser = document.createElement('button');
    this.btnUpdUser.textContent = 'Click me';
    this.btnUpdUser.classList.add('btn');
    this.resultUpdUser = document.createElement('p');
    this.resultUpdUser.classList.add('text-result');

    box.append(
      this.allUsers,
      this.btnAllUsers,
      this.resultAllUsers,
      this.usersById,
      this.btnUsersById,
      this.resultUsersById,
      this.addNewUser,
      this.btnAddUser,
      this.resultNewUser,
      this.deleteUser,
      this.btnRemoveUser,
      this.resultRemovedUser,
      this.updUser,
      this.btnUpdUser,
      this.resultUpdUser,
    );

    return box;
  },

  initFn() {
    this.btnAllUsers.addEventListener(
      'click',
      function() {
        this.getAllUsers();
      }.bind(this),
    );

    this.btnUsersById.addEventListener(
      'click',
      function() {
        this.getUserById('5c7c17ed5d02f30014ce24cb');
      }.bind(this),
    );

    this.btnAddUser.addEventListener(
      'click',
      function() {
        this.addUser('Johnny Cash', 71);
      }.bind(this),
    );

    this.btnRemoveUser.addEventListener(
      'click',
      function() {
        this.removeUser('5c7c19285d02f30014ce24d1');
      }.bind(this),
    );

    this.btnUpdUser.addEventListener(
      'click',
      function() {
        this.updateUser('5c7c194a5d02f30014ce24d2', { name: 'Debik', age: 12 });
      }.bind(this),
    );
  },
};

bD.createElement();
bD.initFn();
