window.onload = () => {

  // Make pegs in the box draggable
  let draggablePegs = document.getElementById('pegBox').getElementsByClassName('peg');

  for (let i = 0; i < draggablePegs.length; i++) {
    draggablePegs[i].draggable = true;
    draggablePegs[i].addEventListener('dragstart', function(e){drag(e);});
  }

  // Enable dropping in the peg choice zones
  let dropZone = document.getElementById('user-guess').getElementsByClassName('peg');

  for (let i = 0; i < dropZone.length; i++) {
    dropZone[i].addEventListener('dragover', function(e){allowDrop(e);});
    dropZone[i].addEventListener('drop', function(e){drop(e);});
  }

  let game = new Mastermind();

  //

  let guessButton = document.getElementById('user-guess').getElementsByTagName('button')[0];
  let messageBox = document.getElementById('messageBox').getElementsByTagName('p')[0];

  guessButton.addEventListener('click', function(){
    let pegsGuess = [];
    for (let i = 0; i < dropZone.length; i++) {
      pegsGuess.push(parseInt(dropZone[i].classList.item(1).substring(8))-1);
    }
    console.log(pegsGuess);
    let res = game.mainLoop(pegsGuess);
    if (res[0]) {
      if (res[1]) messageBox.innerHTML = 'You won !';
      else {
        messageBox.innerHTML = 'You lost ! The answer was '+game.pegSet.toString()+"<br>";
        for (let i = 0; i < 4; i++) {
          messageBox.innerHTML += '<div class="peg pegColor'+(game.pegSet[i]+1)+'"></div>';
        }
      }
    }
  });

  // let controlButton = document.getElementsByTagName('button')[0];
  // controlButton.addEventListener('click', function(){
  //   try {
  //     // Invalid input, do nothing
  //     // if(!validInput(game.colors.length-1)) return;
  //
  //     let res = game.newGuess();
  //     console.log(res);
  //     // Game has ended
  //     if (res[0]) {
  //       if (res[1]) document.getElementById('messageBox').getElementsByTagName('p')[0].innerHTML = 'You won !';
  //       else document.getElementById('messageBox').getElementsByTagName('p')[0].innerHTML = 'You lost ! The answer was '+game.pegSet.toString();
  //     }
  //   } catch (e) {
  //     document.getElementById('messageBox').getElementsByTagName('p')[0].innerHTML = e;
  //   }
  // });
};

// Functions to manage the Drag & Drop UI

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("classes", ev.target.className);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("classes");
    ev.target.className = data;
}

// Validating function

const validInput = (upperLimit) => {
  let pegs = document.getElementById('userGuess').getElementsByTagName('input');
  for(let i = 0; i < pegs.length; i++) {

    // Check if input is a valid integer
    let value = parseInt(pegs[i].value);
    if(!Number.isInteger(value)) return false;

    // Check if integer is within limits
    if(value >= 0 && value <= upperLimit) this.currentGuess.push(value);
    else return false;

  }
};

// Game Object

class Mastermind {

  constructor() {
    this.guessNb = 1; // Keeps track of the number of guesses
    this.currentGuess = []; // Will contain user's guesses
    this.pegSet = [];

    this.colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];

    this.generatePegSet();

    this.guessesContainer = document.getElementById('guesses');
  }

  generatePegSet() {
    for(let i = 0; i < 4; i++) {
      let idColor = Math.floor(Math.random()*6);
      this.pegSet.push(idColor);
    }
    console.log('PegSet generated: '+this.pegSet);
  }

  getNewGuess() {
    this.currentGuess = [];
    let pegs = document.getElementById('userGuess').getElementsByTagName('input');
    for(let i = 0; i < pegs.length; i++) {
      let value = parseInt(pegs[i].value);
      if(value >= 0 && value <= 5) this.currentGuess.push(value);
      else {
        console.log('Invalid Input');
        throw "Exception: Invalid Input";
        // return;
      }
    }
    console.log('Valid user input, currentGuess set to: '+this.currentGuess);
  }

  // Main game loop (triggered when user enters a new guess)
  // Returns an array: [game ended, game won]
  newGuess() {
    document.getElementById('messageBox').getElementsByTagName('p')[0].innerHTML = "";
    this.getNewGuess();
    this.putCurrentGuessInUI();
    let botTips = this.getBotTips();
    this.putTipsInUI(botTips);

    if(botTips[0] === 4) return [true, true];
    if(this.guessNb >= 10) return [true, false];

    this.guessNb++;

    return [false, false];
  }

  mainLoop(guess) {
    // Check data validity
    for (let i = 0; i < guess.length; i++) {
      if(!Number.isInteger(guess[i])) return [];
    }

    // Fill UI with new guess
    this.currentGuess = guess;
    this.putCurrentGuessInUI();

    // Calculate bot tips and put them in the UI
    let botTips = this.getBotTips();
    this.putTipsInUI(botTips);

    if(botTips[0] === 4) return [true, true];
    if(this.guessNb >= 10) return [true, false];

    this.guessNb++;

    return [false, false];
  }

  getBotTips () {
    let nbCorrect = 0;
    let nbCorrectColor = 0;

    let treatedSet = {0:false,1:false,2:false,3:false};
    let treatedGuess = {0:false,1:false,2:false,3:false};

    // Find perfect matches
    for (let i = 0; i < 4; i++) {
      // console.log('-1- guessVal: '+this.currentGuess[i]);
      if(this.currentGuess[i] === this.pegSet[i]) {
        nbCorrect++;
        treatedSet[i] = true;
        treatedGuess[i] = true;
        // console.log('=> Correct');
      }
    }

    // Find partial matches

    for (let i = 0; i < 4; i++) {
      if(treatedGuess[i]) continue; // If treated, this guess was a perfect match => go to next loop

      for (let j = 0; j < 4; j++) {
        if(treatedSet[j]) continue; // If this element in the pegSet has been treated, don't treat it again
        if(this.currentGuess[i] === this.pegSet[j]) {
          nbCorrectColor++;
          treatedSet[j] = true;
          treatedGuess[i] = true;
          break; // We found a match, go to next userGuess item
        }
      }
    }

    console.log('Correct: '+nbCorrect+' / correctColor: '+nbCorrectColor);
    return [nbCorrect, nbCorrectColor];

  }

  // Puts the current guess on the gameboard
  putCurrentGuessInUI() {
    console.log('putCurrentGuessInUI');
    let pegs = this.guessesContainer.getElementsByClassName('row')[this.guessNb-1].getElementsByClassName('peg');
    for(let i = 0; i < pegs.length; i++) {
      pegs[i].className = "peg pegColor"+(this.currentGuess[i]+1);
    }
  }

  putTipsInUI(tips) {

    let nbMatch = tips[0];
    let nbPartial = tips[1];

    let row = this.guessesContainer.getElementsByClassName('row')[this.guessNb-1];
    let tipPegs = row.getElementsByClassName('tip');

    for (let i = 0; i < tipPegs.length; i++) {
      if(nbMatch > 0) {
        tipPegs[i].className = "tip tip-match";
        nbMatch--;
      }
      else if (nbPartial > 0) {
        tipPegs[i].className = "tip tip-partial";
        nbPartial--;
      }
    }
  }

}
