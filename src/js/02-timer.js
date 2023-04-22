import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';



const refs = {
  inputText: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]')
};

refs.startBtn.addEventListener('click', startCountdownn)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};