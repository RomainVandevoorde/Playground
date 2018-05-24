window.onload = () => {
  let pegs = document.getElementsByClassName('peg');

  // for(let i =0; i < pegs.length; i++) {
  //   pegs[i].innerHTML = 'x';
  // }

  let game = new Mastermind();

  let controlButton = document.getElementsByTagName('button')[0];
  controlButton.addEventListener('click', function(){
    game.newGuess();
  })
}

class Mastermind {

  constructor() {
    this.guessNb = 1; // Keeps track of the number of guesses
    this.currentGuess = []; // Will contain user's guesses
    this.pegSet = [];

    this.colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];

    this.generatePegSet();

    this.guessesContainer = document.getElementById('guessesContainer');
  }

  generatePegSet() {
    for(let i = 0; i < 4; i++) {
      let idColor = Math.floor(Math.random()*5);
      this.pegSet.push(idColor);
    }
    console.log('PegSet generated: '+this.pegSet);
  }

  // Returns the number of times a key appears in an array
  arrayKeysAmount(array, key) {
    let amount = 0;
    for(let i = 0; i < array.length; i++) {
      if(array[i] === key) amount++;
    }
    return amount;
  }

  // Called when user validates a new guess
  set newGuess(guess) {
    if(!isValidGuess(guess)) {
      console.log('nope');
      return;
    }
    console.log('newGuess');
    this.currentGuess = guess;
    this.putCurrentGuessInUI();
    this.guessNb++;
  }

  getNewGuess() {
    this.currentGuess = [];
    let pegs = document.getElementById('userGuess').getElementsByTagName('input');
    for(let i = 0; i < pegs.length; i++) {
      let value = parseInt(pegs[i].value);
      if(value >= 0 && value <= 5) this.currentGuess.push(value);
      else {
        console.log('Invalid Input');
        return;
      }
    }
    console.log('Valid user input, currentGuess set to: '+this.currentGuess);
  }

  // Main game loop (triggered when user enters a new guess)
  newGuess() {
    this.getNewGuess();
    this.putCurrentGuessInUI();
    this.guessNb++;
    this.botTips();
  }

  // Generates bot's response (number of black and white pegs)
  botTips() {
    let nbCorrect = 0;
    let nbCorrectColor = 0;

    let pegSet = this.pegSet;
    let correctColors = [];
    let correct = [];

    for (let i = 0; i < 4; i++) {
      let guessVal = this.currentGuess[i];
      console.log('--- guessVal: '+guessVal);

      let nbInCorrectColors = this.arrayKeysAmount(correctColors, guessVal);
      let nbInCorrect = this.arrayKeysAmount(correct, guessVal);
      let nbInPegSet = this.arrayKeysAmount(this.pegSet, guessVal);

      if(this.currentGuess[i] === this.pegSet[i]) {
        nbCorrect++;
        correct.push(guessVal);
        console.log('=> Correct');
      }
      else if(pegSet.indexOf(this.currentGuess[i]) !== -1) {

        console.log('CorrectColor ?');
        console.log('nbInCorrectColors: '+nbInCorrectColors);
        console.log('nbInPegSet: '+nbInPegSet);
        if(nbInCorrectColors+nbInCorrect < nbInPegSet) {
          console.log('=> CorrectColor');
          correctColors.push(guessVal);
          nbCorrectColor++;
        }
      }

      while(nbCorrect+nbCorrectColor > nbInPegSet) {
        console.log('-1 correctColor');
        nbCorrectColor--;
      }
    }

    console.log('Correct: '+nbCorrect+' / correctColor: '+nbCorrectColor);
  }

  // Puts the current guess on the gameboard
  putCurrentGuessInUI() {
    let pegs = this.guessesContainer.getElementsByClassName('row')[this.guessNb-1].getElementsByClassName('peg');
    for(let i = 0; i < pegs.length; i++) {
      pegs[i].innerHTML = this.currentGuess[i];
    }
  }

}
