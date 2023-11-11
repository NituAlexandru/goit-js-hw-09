// Descris în documentație
import flatpickr from 'flatpickr';
// Import suplimentar de stil
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

startButton.disabled = true; // dezactiveaza butonul start la inceput

let selectedDate = null; // pt a stoca data selectata
let countdownInterval = null; // pt a stoca intervalul de numaratoare inversa

// initializeaza flatpickr
flatpickr(datetimePicker, {
  enableTime: true, // permite selectare ora, nu doar data
  time_24hr: true, 
  defaultDate: new Date(), // data implicita la data si ora curenta
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] <= currentDate) {
      window.alert('Please choose a date in the future');
    } else {
      selectedDate = selectedDates[0];
      startButton.disabled = false;
    }
  },
});

// functia care converteste un nr de milisec intr un obiect care contine
// zile, ore, minute, sec 
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// functia pentru adaugarea zerourilor la inceput
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

// actualizeaza cronometrul
function updateTimer({ days, hours, minutes, seconds }) {
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
}

// dezactiveaza btn dde start
startButton.addEventListener('click', () => {
    startButton.disabled = true;

    countdownInterval = setInterval(() => {
        const currentTime = new Date();
        const deltaTime = selectedDate - currentTime;
        const time = convertMs(deltaTime);

        updateTimer(time);

        if (deltaTime <= 0) {
            clearInterval(countdownInterval);
            updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    }, 1000);

});