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

const bD = {
  btnAllUsers: null,
  resultAllUsers: null,

  resultUsersById: null,
  idForm: null,
  inputId: null,

  resultNewUser: null,
  newUserForm: null,
  inputName: null,
  inputAge: null,

  resultRemovedUser: null,
  removeUserForm: null,
  inputRemoveUser: null,

  resultUpdUser: null,
  updateUserForm: null,
  inputUpdName: null,
  inputUpdAge: null,
  inputUpdId: null,

  getAllUsers(e) {
    e.preventDefault();
    fetch(`https://test-users-api.herokuapp.com/users/`)
      .then(response => response.json())
      .then(data => {
        let body = data.data;
        let result = '';
        for (let obj of body) {
          result += `<tr>
            <td>${obj.name}</td>
            <td>${obj.age}</td>
            <td>${obj.id}</td>
          </tr>`;

          let markup = `<table>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Id</th>
              </tr>
              ${result}
          </table>`;
          this.resultAllUsers.innerHTML = markup;
        }
        // console.log(data.data);
        // this.resultAllUsers.textContent = JSON.stringify(data.data);
      })
      .catch(error => console.log(error));
  },

  getUserById(e) {
    e.preventDefault();
    if (this.inputId.value === '') {
      this.resultUsersById.textContent = "Please, enter users's id!";
    } else
      fetch(`https://test-users-api.herokuapp.com/users/${this.inputId.value}`)
        .then(response => response.json())
        .then(data => {
          if (data.data === undefined) {
            this.resultUsersById.textContent = 'User with this id not found!';
          } else {
            let markup = `<p>User name:${data.data.name}</p>
            <p>User age:${data.data.age}</p>
            <p>User id:${data.data.id}`;

            this.resultUsersById.innerHTML = markup;
            // console.log(data.data);
            // this.resultUsersById.textContent = JSON.stringify(data.data);
          }
        })
        .catch(error => console.log(error));
    this.idForm.reset();
  },

  addUser(e) {
    e.preventDefault();
    if (this.inputName.value === '' || this.inputAge.value === '') {
      this.resultNewUser.textContent =
        'Please, enter all information about user';
    } else if (Number(this.inputName.value)) {
      this.resultNewUser.textContent = 'Name can match only a characters.';
    } else
      fetch('https://test-users-api.herokuapp.com/users/', {
        method: 'POST',
        body: JSON.stringify({
          name: this.inputName.value,
          age: this.inputAge.value,
        }),
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
    this.newUserForm.reset();
  },

  removeUser(e) {
    e.preventDefault();
    if (this.inputRemoveUser.value === '') {
      this.resultRemovedUser.textContent = "Please, enter users's id!";
    } else
      fetch(
        `https://test-users-api.herokuapp.com/users/${
          this.inputRemoveUser.value
        }`,
        {
          method: 'DELETE',
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          if (data.data === undefined) {
            this.resultRemovedUser.textContent = 'User with this id not found!';
          } else {
            this.resultRemovedUser.textContent = JSON.stringify(data.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    this.removeUserForm.reset();
  },

  updateUser(e) {
    e.preventDefault();
    if (Number(this.inputUpdName.value)) {
      this.resultUpdUser.textContent = 'Name can match only a characters.';
    } else if (
      this.inputUpdName.value === '' ||
      this.inputUpdAge.value === '' ||
      this.inputUpdId.value === ''
    ) {
      this.resultUpdUser.textContent =
        'Please, enter all information about user';
    } else
      fetch(
        `https://test-users-api.herokuapp.com/users/${this.inputUpdId.value}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            name: this.inputUpdName.value,
            age: this.inputUpdAge.value,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          if (data.data === undefined) {
            this.resultUpdUser.textContent = 'User with this id not found!';
          } else {
            this.resultUpdUser.textContent = JSON.stringify(data.data);
          }
        })
        .catch(error => console.log(error));
    this.updateUserForm.reset();
  },

  createElement() {
    this.btnAllUsers = document.querySelector('.all-users-btn');
    this.resultAllUsers = document.querySelector('.all-users-result');

    this.resultUsersById = document.querySelector('.result-user-id');
    this.idForm = document.querySelector('#getId');
    this.inputId = document.querySelector('#getId input');

    this.resultNewUser = document.querySelector('.result-new-user');
    this.newUserForm = document.querySelector('#addUser');
    this.inputName = this.newUserForm.children[0];
    this.inputAge = this.newUserForm.children[1];

    this.resultRemovedUser = document.querySelector('.result-removed-user');
    this.removeUserForm = document.querySelector('#removeUser');
    this.inputRemoveUser = document.querySelector('#removeUser input');

    this.resultUpdUser = document.querySelector('.result-update-user');
    this.updateUserForm = document.querySelector('#updateUser');
    this.inputUpdName = this.updateUserForm.children[0];
    this.inputUpdAge = this.updateUserForm.children[1];
    this.inputUpdId = this.updateUserForm.children[2];
  },

  initFn() {
    this.btnAllUsers.addEventListener('click', this.getAllUsers.bind(this));
    this.idForm.addEventListener('submit', this.getUserById.bind(this));
    this.newUserForm.addEventListener('submit', this.addUser.bind(this));
    this.removeUserForm.addEventListener('submit', this.removeUser.bind(this));
    this.updateUserForm.addEventListener('submit', this.updateUser.bind(this));
  },
};

bD.createElement();
bD.initFn();
