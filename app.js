var scores, roundSocre, activePlayer, diceDOM, gamePlaying, dice, diceValue;

diceDOM = document.querySelector('.dice');
diceValue = 0;

function initGame() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  diceDOM.style.display = 'none';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');
};

initGame();

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    dice = Math.floor(Math.random() * 6) + 1;
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM.style.display = 'block';

    if (dice !== 1 && dice !== 6) {
      diceValue = 0;
      calculateCurrentScore();
    } else if (dice === 6) {
      diceValue += dice;
      diceValue === 12 ? doubleSix() : calculateCurrentScore();
    } else {
      nextPlayer();
    };
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      diceDOM.style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  diceValue = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', initGame);

function doubleSix() {
  scores[activePlayer] = 0;
  document.getElementById('score-' + activePlayer).textContent = 0;
  nextPlayer();
};

function calculateCurrentScore() {
  roundScore += dice;
  document.getElementById('current-' + activePlayer).textContent = roundScore;
};
