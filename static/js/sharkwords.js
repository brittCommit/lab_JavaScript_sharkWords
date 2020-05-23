alert("it worked")
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry', 'orange', 'apple', 'banana', 'pineapple', 'kiwi',
  'peach', 'pecan', 'eggplant', 'durian', 'peanut', 'chocolate'
];


let numWrong = 0;


// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {

  for (const char of word){
    $('#word-container').append(`
    <div class='letter-box ${char}'></div>
    `);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  for (const char of ALPHABET) {
    $('#letter-buttons').append(`
      <button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  
  const button = $(buttonEl);
  button.attr('disabled', true);
};


const isLetterInWord = (letter) => {
  return $(`div.${letter}`)[0] !== undefined;
};


const handleCorrectGuess = (letter) => {
  $(`div.${letter}`).html(letter);
  };


// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  numWrong += 1;

  $('#shark-img img').attr('src', `/static/images/guess${numWrong}.png`);

  if (numWrong ===5) {
    $('button').attr('disabled', true);
    $('#play-again').css('display', '');
  }
}

// Reset game state. Called before restarting the game.
//
const resetGame = () => {
  numWrong = 0

  $('#shark-img img').attr('src', `/static/images/guess${numWrong}.png`);
  $('#play-again').hide(); 
  // $('#play-again').css('display', 'none'); 
  $('#word-container').empty();
  $('#letter-buttons').empty();
};


// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  $('button').on('click', (evt) => {
    const clickedBtn = $(evt.target);
    disableLetterButton(clickedBtn);

    const letter = clickedBtn.html();

    if (isLetterInWord(letter)) {
      handleCorrectGuess(letter);
    } else {
      handleWrongGuess(letter);
    }
  });

  $('#play-again').on('click', () => {
    resetGame();
    startGame();
  });
})();
