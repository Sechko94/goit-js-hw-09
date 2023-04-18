//  Створення об'єкта refs, який містить посилання на елементи DOM.
const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}
const CHANGE_COLOR_DELAY = 1000;
let timerId = null;

// Додавання обробника подій startChangeColor на подію кліку на кнопку з атрибутом data-start.
refs.start.addEventListener('click', startChangeColor),
    // Додавання обробника подій stopChangeColor на подію кліку на кнопку з атрибутом data-stop.
refs.stop.addEventListener('click', stopChangeColor);


// Функція startChangeColor встановлює інтервал зі змінною timerId, який викликає функцію getRandomHexColor що 1 секунду, і змінює кольори фону елементу body за допомогою властивості backgroundColor.
// Під час виконання функції startChangeColor, кнопка з атрибутом data-start заблокована, щоб уникнути збоїв в роботі програми.
function startChangeColor(event) {
   timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor()
   }, CHANGE_COLOR_DELAY);
    refs.start.disabled = true; 
};

// Функція stopChangeColor очищає інтервал зі змінною timerId, встановлює її в null, тобто зупиняє зміну кольорів фону елементу body, та розблоковує кнопку з атрибутом data-start.
function stopChangeColor(event) {
    clearInterval(timerId)
    timerId = null;
    refs.start.disabled = false;
};

// Функція getRandomHexColor генерує випадковий шістнадцятковий колір за допомогою функції Math.random та методів toString та padStart.
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}