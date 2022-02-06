import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
const daysRef = document.querySelector('.value[data-days]');
const hoursRef = document.querySelector('.value[data-hours]');
const minutesRef = document.querySelector('.value[data-minutes]');
const secondsRef = document.querySelector('.value[data-seconds]');
let selectedDate;
let timerId = null;

btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= Date.now()) {
            Notiflix.Report.failure('Error','Please choose a date in the future', 'OK');
        }
        else {
            btnStart.removeAttribute('disabled');
            selectedDate = selectedDates[0];
        };
  },
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', handleStartClick);

function handleStartClick() { 
    timerId = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(selectedDate - Date.now());
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) { 
            clearInterval(timerId);
        };
        daysRef.textContent = addLeadingZero(days);
        hoursRef.textContent = addLeadingZero(hours);
        minutesRef.textContent = addLeadingZero(minutes);
        secondsRef.textContent = addLeadingZero(seconds);
  }, 1000);
};

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
};

function addLeadingZero(value) { 
    return String(value).padStart(2, '0');
};
