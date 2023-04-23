import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';


Report.info(
  '👋  Вітаю ',
  'Це таймер зворотньго відліку. Оберіть дату',
  'Почати'
);

const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;


const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]')
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', startCountdownn);

let remainingTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateCheck(selectedDates);
  },
};

flatpickr(refs.inputDate, options);

// Перевіряємо дату

function onDateCheck(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();

  if (selectedDate > currentDate) {
    refs.startBtn.disabled = false;
    Report.success(
      'Молодець😃',
      'Чудова робота',
      'Почати'
    );
    return;
  }
  Report.failure(
    'Ооойойь, щось пішло не так☹️',
    'Будь ласка, виберіть дату в майбутньому!',
    'Почати'
  );
}

function startCountdownn() {
  intervalId = setInterval(() => {
    currentDate = new Date().getTime();
    if (selectedDate - currentDate <= 1000) {
      clearInterval(intervalId);
      refs.startBtn.disabled = true;
      refs.inputDate.disabled = false;
      return;
    } else {
      refs.startBtn.disabled = false;
      refs.inputDate.disabled = false;
      currentDate += 1000;
      remainingTime = Math.floor(selectedDate - currentDate);
      convertMs(remainingTime);
    }
  }, TIMER_DELAY);
}

function createMarkup({ days, hours, minutes, seconds }) {
  refs.daysValue.textContent = days;
  refs.hoursValue.textContent = hours;
  refs.minutesValue.textContent = minutes;
  refs.secondsValue.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));;
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  createMarkup({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
};

