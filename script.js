function generateWinningNumber(){
	return Math.floor(Math.random() * 100) + 1;
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function Game(){
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
	//how far/close the playersGuess is to the winningNumber
	return Math.abs(this.playersGuess - this.winningNumber)
};


Game.prototype.isLower = function() {
	//checks if playersGuess number is above or below the winningNumber
	return this.playersGuess < this.winningNumber? true: false;
};

Game.prototype.playersGuessSubmission = function(num){
	if(num < 1 || num > 100 || typeof num !== 'number'){
		throw 'That is an invalid guess.';
	}
	this.playersGuess = num;
	return this.checkGuess();
}


Game.prototype.checkGuess = function() {
	if(this.playersGuess === this.winningNumber){
		return 'You Win!';
	} 

	else if(this.pastGuesses.includes(this.playersGuess)){
		return 'You have already guessed that number.';
	}
	else if(this.pastGuesses.indexOf(this.playersGuess) < 1){
		this.pastGuesses.push(this.playersGuess);
	}
	
	if(this.pastGuesses.length === 5){
		return 'You Lose.';
	}

	if (this.difference() < 10){
		return 'You\'re burning up!';
	}else if(this.difference() < 25){
		return 'You\'re lukewarm.';
	}else if(this.difference() < 50){
		return 'You\'re a bit chilly.';
	}else if(this.difference() < 100){
		return 'You\'re ice cold!';
	}else{
		return '';
	}


	
	
};


function newGame(){
	return new Game;
}

Game.prototype.provideHint = function() {
	let array = [];
	array.push(this.winningNumber, generateWinningNumber(), generateWinningNumber());
	return shuffle(array);
};






////////////////////////jQuery Functionality///////////////////////////////////




$(document).ready(function(){
   	
    $('#button').click(function(){
        $('#startMenu').slideUp();
    })


    var game = new Game();

    
    
    
    function submitInput(e) {

    	//GET INPUT VALUE AND DISPLAY STRING ON THE PAGE'S HEADING
   		var input = $('input[type=text]').val(); 
        $('input[type=text]').val(''); 
        
		var output = game.playersGuessSubmission(+input) 
		console.log(input, output);
		$('h1').text(output); 

		//RESET H2 AFTER EACH CLICK: PREVENT HINT FROM REMAINING ON PAGE
		$('h2').text('Guess a number between 1-100'); 
        
		//CHANGE THE LIST ITEMS TO ITS CORRESPONDING INPUT NUMBER
		var listItems = $('#guesses li') 
		for (var i = 0; i < listItems.length; i++) {
			if($(listItems[i]).text() === '-' && !output.includes('already')){
				$(listItems[i]).text(input);
				break;
			}
		}
        
        
        if(output.includes('Win') || output.includes('Lose')){
           setTimeout(function takeAWhile(){
                game = new Game;

            var listItems = $('#guesses li') 
            for (var i = 0; i < listItems.length; i++) {
                $(listItems[i]).delay(800).text('-');
            }

            $('h1').delay(800).text('Play the Guessing Game!');
            $('h2').delay(800).text('Guess a number between 1-100');   
           }, 4000)
        }
    }
    
    
    
    //SUBMIT BUTTON
    $('input[type=submit]').click(submitInput);

    
    //HINT BUTTON
    $('#menu-btns button:last').click(function(e) {
    	var possibleNums = game.provideHint();
   	    $('h2').text('The number could be ' + possibleNums.join(', ') + '.');
    });

    
    //RESET BUTTON
    $('#menu-btns button:first').click(function(e) {
    	game = new Game;

    	var listItems = $('#guesses li') 
		for (var i = 0; i < listItems.length; i++) {
			$(listItems[i]).text('-');
		}
        
		$('h1').text('Play the Guessing Game!');
		$('h2').text('Guess a number between 1-100');
    });


    //SUBMIT BUTTON WITH THE PRESS OF THE ENTER KEY
    $('input[type=text]').keypress(function(event) {
        if ( event.which == 13 ) {
            var input = $('input[type=text]').val(); 
	        $('input[type=text]').val(''); 
	    
			var output = game.playersGuessSubmission(+input) 
			console.log(input, output);
			$('h1').text(output);
        }

		$('h2').text('Guess a number between 1-100'); 

		var listItems = $('#guesses li') 
		for (var i = 0; i < listItems.length; i++) {
			if($(listItems[i]).text() === '-' && !output.includes('already')){
				$(listItems[i]).text(input);
				break;
			}
		}
        
        
         if(output.includes('Win') || output.includes('Lose')){
           setTimeout(function takeAWhile(){
                game = new Game;

            var listItems = $('#guesses li') 
            for (var i = 0; i < listItems.length; i++) {
                $(listItems[i]).delay(800).text('-');
            }

            $('h1').delay(800).text('Play the Guessing Game!');
            $('h2').delay(800).text('Guess a number between 1-100');   
           }, 4000)
        }
    })

})


















