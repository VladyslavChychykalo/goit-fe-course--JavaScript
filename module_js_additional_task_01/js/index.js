'use strict'

/*
Создайте скрипт турагенства, продающего поездки в 3-х группах: sharm, hurgada и taba.
  Кол-во мест в группах ограничено (создайте переменные для хранения мест в группах): 
    * sharm - 15
    * hurgada - 25
    * taba - 6.
  Когда пользователь посещает страницу, ему необходимо предложить ввести число необходимых мест,
  результат сохранить в переменную.
  Необходимо проверить являются ли введенные данные целым положительным числом. 
  
    - В случае неверного ввода от пользователя, скрипт показывает alert с текстом 
      "Ошибка ввода" и больше ничего не делает.
    - В случае верного ввода, последовательно проверить кол-во мест в группах, 
      и кол-во необходимых мест введенных пользователем.
  Если была найдена группа в которой количество мест больше либо равно необходимому, 
  вывести сообщение через confirm, что есть место в группе такой-то, согласен ли 
  пользоваетель быть в этой группе?
    * Если ответ да, показать alert с текстом 'Приятного путешествия в группе <имя группы>'
    * Если ответ нет, показать alert с текстом 'Нам очень жаль, приходите еще!'
  
  Если мест нигде нет, показать alert с сообщением 'Извините, столько мест нет ни в одной группе!'
*/

const sharm = 15
const hurgada = 25
const taba = 6

const userInput = prompt('Введите число необходимых мест')
const userChoise = Number.parseInt(userInput)

const freeSeatsTaba = 'Есть места в группе taba, вы хотите присоединиться'
const freeSeatsSharm = 'Есть места в группе sharm, вы хотите присоединиться'
const freeSeatsHurgada = 'Есть места в группе hurgada, вы хотите присоединиться'
const confirmTaba = 'Приятного путешествия в группе taba'
const confirmSharm = 'Приятного путешествия в группе sharm'
const confirmHurgada = 'Приятного путешествия в группе hurgada'
const noSeats = 'Извините, столько мест нет ни в одной группе!'

const error = "Ошибка ввода";
const cancel = "Нам очень жаль, приходите еще!";


if (userChoise >= 1 && userChoise <= taba) {
  if(confirm(freeSeatsTaba) === true) {
    alert(confirmTaba)
  } else {
    alert(cancel)
  }

} else if (userChoise > taba && userChoise <= sharm) {
  if(confirm(freeSeatsSharm) === true) {
    alert(confirmSharm)
  } else {
    alert(cancel)
  }

} else if (userChoise > sharm && userChoise <= hurgada) {
  if(confirm(freeSeatsHurgada) === true) {
    alert(confirmHurgada)
  } else {
    alert(cancel)
  }

} else if (userChoise <= 0 || userChoise > 25) {
  alert(noSeats)

} else if (userInput === null) {
  alert(cancel)
} else {
  alert(error)
}