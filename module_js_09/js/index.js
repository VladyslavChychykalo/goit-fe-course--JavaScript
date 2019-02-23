'use strict';
const clockface = document.querySelector('.js-time');
const startBtn = document.querySelector('.js-start');
const resetBtn = document.querySelector('.js-reset');

class Timer {
  constructor({ timersParent }) {
    this.parentNode = timersParent;
    this.isAсtive = false;
    this.startTime = null;
    this.deltaTime = null;
    this.currentTime = null;
    this.timerId = null;
    this.lapArr = [];
    this.min = '00';
    this.sec = '00';
    this.ms = '0';
    this.timerWrapper = null;
    this.clockface = null;
    this.startBtn = null;
    this.lapBtn = null;
    this.resetBtn = null;
    this.lapList = null;
  }

  createTimerElement() {
    this.timerWrapper = document.createElement('div');
    this.timerWrapper.classList.add('stopwatch');

    this.clockface = document.createElement('p');
    this.clockface.classList.add('js-time');
    this.clockface.classList.add('time');
    this.clockface.textContent = `${this.min}:${this.sec}.${this.ms}`;

    this.startBtn = document.createElement('button');
    this.startBtn.classList.add('js-start');
    this.startBtn.classList.add('btn');
    this.startBtn.textContent = 'start';

    this.lapBtn = document.createElement('button');
    this.lapBtn.classList.add('js-take-lap');
    this.lapBtn.classList.add('btn');
    this.lapBtn.textContent = 'lap';

    this.resetBtn = document.createElement('button');
    this.resetBtn.classList.add('js-reset');
    this.resetBtn.classList.add('btn');
    this.resetBtn.textContent = 'reset';

    this.lapList = document.createElement('ul');
    this.lapList.classList.add('.js-laps');
    this.lapList.classList.add('laps');

    this.timerWrapper.append(
      this.clockface,
      this.startBtn,
      this.lapBtn,
      this.resetBtn,
      this.lapList,
    );

    return this.timerWrapper;
  }

  startTimer() {
    if (!this.isAсtive) {
      this.startTime = Date.now();
      this.isAсtive = true;
      this.updateTimer();
    } else {
      this.pauseTimer();
    }
  }

  updateTimer() {
    this.startBtn.textContent = 'pause';

    this.timerId = setInterval(() => {
      this.currentTime = Date.now();
      this.deltaTime = this.currentTime - this.startTime;
      const time = new Date(this.deltaTime);
      this.min = time.getMinutes();
      this.sec = time.getSeconds();
      this.ms = Number.parseInt(time.getMilliseconds() / 100);

      if (this.min < 10) this.min = `0${this.min}`;
      if (this.sec < 10) this.sec = `0${this.sec}`;
      this.clockface.textContent = `${this.min}:${this.sec}.${this.ms}`;
    }, 100);
  }

  pauseTimer() {
    this.startBtn.textContent = 'continue';
    clearInterval(this.timerId);
    this.isAсtive = false;
  }

  saveLap() {
    const lap = document.createElement('li');
    lap.classList.add('lap');
    lap.textContent = `${this.min}:${this.sec}.${this.ms}`;
    if (this.ms > 0) {
      this.lapArr.push(lap);
      this.lapArr.forEach(item => this.lapList.appendChild(item));
    }
  }

  resetTimer() {
    this.isAсtive = false;
    this.startTime = null;
    this.deltaTime = null;
    clearInterval(this.timerId);
    this.min = '00';
    this.sec = '00';
    this.ms = '0';
    this.clockface.textContent = `${this.min}:${this.sec}.${this.ms}`;
    this.lapArr = [];
    this.lapList.innerHTML = '';
    this.startBtn.textContent = 'start';
  }

  initTimer() {
    this.parentNode.append(this.createTimerElement());
    this.startBtn.addEventListener('click', this.startTimer.bind(this));
    this.resetBtn.addEventListener('click', this.resetTimer.bind(this));
    this.lapBtn.addEventListener('click', this.saveLap.bind(this));
  }
}

const timersParent = document.querySelector('.timers');
const timerA = new Timer({ timersParent });
timerA.initTimer();
const timerB = new Timer({ timersParent });
timerB.initTimer();
