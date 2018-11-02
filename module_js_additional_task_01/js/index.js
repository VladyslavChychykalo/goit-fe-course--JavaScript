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
const freeSeats = Number.parseInt(prompt('Введите число свободных мест от 1 до 25'))


if (freeSeats >= 0) {

  if (freeSeats <= taba) {
    if(confirm('Есть места в группе taba. Вы согласны присоединиться к этой группе ?') == true) {
      alert('Приятного путешествия в группе taba');
    } else {
      alert('Нам очень жаль, приходите еще!');
    }
  }

  if (freeSeats > taba && freeSeats <= sharm) {
    if(confirm('Есть места в группе sharm. Вы согласны присоединиться к этой группе ?') == true) {
      alert('Приятного путешествия в группе sharm');
    } else {
      alert('Нам очень жаль, приходите еще!');
    }
  }

  if (freeSeats > sharm && freeSeats <= hurgada) {
    if(confirm('Есть места в группе hurgada. Вы согласны присоединиться к этой группе ?') == true) {
      alert('Приятного путешествия в группе hurgada');
    } else {
      alert('Нам очень жаль, приходите еще!');
    }
  }

} else {
  alert('Ошибка ввода!');
}