'use strict';
//selecting element
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const dicEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//starting conditions
let total = [];
let currentScore;
let activePlayer;
let playing;
score0El.textContent = 0;
score1El.textContent = 0;
dicEl.classList.add('hidden');

const reset = function () {
  total = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  dicEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

reset();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
//rolling dice functionality

btnRoll.addEventListener('click', function () {
  //generating random dice roll
  if (playing) {
    let diceRandomNumber = Math.trunc(Math.random() * 6 + 1);
    //display the dice
    dicEl.classList.remove('hidden');
    dicEl.src = `dice-${diceRandomNumber}.png`;

    //check for role one if it is true switch a player
    if (diceRandomNumber != 1) {
      currentScore += diceRandomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    total[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      total[activePlayer];
    if (total[activePlayer] >= 50) {
      playing = false;
      dicEl.classList.add('hidden');
      console.log('sdsad');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-avtive');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', reset);
