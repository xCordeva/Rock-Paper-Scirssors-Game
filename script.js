let autoPlayer = true;
let intervalId;
let results = '';
// Function to activate auto play
function autoPlay(){
    if(autoPlayer){
        intervalId = setInterval(function(){
            
        playGame(pickComputerMove())
        },1000);
        document.querySelector('.auto-button').innerHTML = 'Stop Playing';
        autoPlayer = false;
    } else {
        clearInterval(intervalId);
        document.querySelector('.auto-button').innerHTML = 'Auto Play';
        autoPlayer = true
    }
}
// Function to play using the keyboard
document.body.addEventListener('keydown', (event) =>{
    if(event.key ==='a'){
        autoPlay()
    }else if(event.key ==='Backspace'){
        askReset()
    }
})
// Event listeners to use instead of onclick
document.querySelector('.auto-button').addEventListener('click', autoPlay)
document.querySelector('.reset-button').addEventListener('click', askReset)


let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}


// Function to randomly pick computer move
function pickComputerMove() {
    let computerMove = Math.random();
    if (computerMove >= 0 && computerMove < 1/3) {
        computerMove = 'rock';
    } else if (computerMove >= 1/3 && computerMove < 2/3) {
        computerMove = 'paper';
    } else if (computerMove >= 2/3 && computerMove < 1) {
        computerMove = 'scissors';
    }
    return computerMove;
}

// Function to play the game based on player's move
function playGame(playerMove) {
    let computerMove = pickComputerMove();
    hideIntroMessage();
    
    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            results = 'You Lose.';
        } else if (computerMove === 'paper') {
            results = 'You Win.';
        } else if (computerMove === 'scissors') {
            results = 'Tie.';
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            results = 'You Win.';
        } else if (computerMove === 'paper') {
            results = 'Tie.';
        } else if (computerMove === 'scissors') {
            results = 'You Lose.';
        }
    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            results = 'Tie.';
        } else if (computerMove === 'paper') {
            results = 'You Lose.';
        } else if (computerMove === 'scissors') {
            results = 'You Win.';
        }
    }
    
    if (results === 'You Win.') {
        score.wins++;
    } else if (results === 'You Lose.') {
        score.losses++;
    } else if (results === 'Tie.') {
        score.ties++;
    }
    
    updateScore();
    document.querySelector('.js-moves').innerHTML = `You picked <img src="./${playerMove}-emoji.png" class="js-img"> - Computer Picked <img src="./${computerMove}-emoji.png" class="js-img"> `;
    document.querySelector('.js-results').innerHTML = results;
    localStorage.setItem('score', JSON.stringify(score));
    localStorage.setItem('result', results);
}

// Function to update the score display
function updateScore() {
    document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}

// Function to show the intro message based on the previous game's result
function showIntroMessage() {
    const lastResult = localStorage.getItem('result');
    if (lastResult === 'You Lose.') {
        document.querySelector('.js-intro').innerHTML = `Welcome again! In the last game, the results were:<span class="span-lose"> ${lastResult}</span>`;
    } else if (lastResult === 'Tie.') {
        document.querySelector('.js-intro').innerHTML = `Welcome again! In the last game, the results were:<span class="span-tie"> ${lastResult}</span>`;
    } else if (lastResult === 'You Win.') {
        document.querySelector('.js-intro').innerHTML = `Welcome again! In the last game, the results were:<span class="span-win"> ${lastResult}</span>`;
    }
}

// Function to hide the intro message
function hideIntroMessage() {
    document.querySelector('.js-intro').innerHTML = '';
}

// Function to ask before reseting the score
function askReset() {
    if(document.querySelector('.js-ask-container').style.display === 'block'){
        document.querySelector('.js-ask-container').style.display = 'none'
    }else if (document.querySelector('.js-ask-container').style.display === 'none'){
        document.querySelector('.js-ask-container').style.display= 'block';
        document.querySelector('.js-ask-yes').addEventListener('click', ()=>{
            resetScore();
            document.querySelector('.js-ask-container').style.display = 'none'
        })
        document.querySelector('.js-ask-no').addEventListener('click', ()=>{
        document.querySelector('.js-ask-container').style.display= 'none';
    })
    }
    }

// Function to reset the score
function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
}

updateScore();
showIntroMessage();