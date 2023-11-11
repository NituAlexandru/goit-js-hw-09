// selecteaza butoanele si elementul body
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

// initializeaza o variabila pentru a stoca referinta la interval
let colorInterval = null;

// functia pentru generarea culorii aleatorii
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startButton.addEventListener('click', () => {
  startButton.disabled = true; // dezactiveaza butonul start
  stopButton.disabled = false; // activam butonul stop

  // seteaza intervalul pentru schimbarea culorii
  colorInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener('click', () => {
  startButton.disabled = false; // activam butonul start

  stopButton.disabled = true; // dezactivam butonul stop

  clearInterval(colorInterval); // opreste schimbarea culorii
});

//  The global clearInterval() method cancels a timed, repeating action
//  which was previously established by a call to setInterval().If the
//  parameter provided does not identify a previously established action,
//  this method does nothing.
