'use strict';

import { select, listen, getElement, selectAll, randomWords, Score, getDate, getArray, setArray } from "./utils.js";

const welcome = new Audio('./assets/media/welcome.mp3');
welcome.muted = true;
welcome.type = 'audio/mp3';

const begin = new Audio('./assets/media/begin.mp3');
begin.type = 'audio/mp3';
begin.loop = true;

const startClick = new Audio('./assets/media/startClick.mp3');
startClick.type = 'audio/mp3';

const startCountdown = new Audio('./assets/media/countdown.mp3');
startCountdown.type = 'audio/mp3';

const fail = new Audio('./assets/media/fail.mp3');
fail.type = 'audio/mp3';

const victory = new Audio('./assets/media/victory.mp3');
victory.type = 'audio/mp3';


//query selector
const startBtn = select('.start-button');
const gameBox = select('.game-container');
const startCount = select('.start-countdown');
const userInput = getElement('user-input');
const randomDisplay = getElement('random-word');
const score = getElement('score');
const scoreboard = getElement('scoreboard');
const gameOverBox = getElement('game-over-container');
const endScore = getElement('game-over-score');
const resetBtn = getElement('reset-button');
const gameStatus = getElement('game-over-status');
const wordsRemainDisplay = getElement('words-remaining');


// TIMER elements
const timerDisplay = getElement('time-remaining');
let timeLeft = 30;   // we can change it to whatever time we want, also need to change in the reset function
let timerInterval = null;

// words to win
const wordsToWin = 15; //we can change the words to win here
wordsRemainDisplay.innerText = wordsToWin;


// event listener
let welcomePlayed = false;
listen('click', window, (event) => {
    if (!welcomePlayed && !startBtn.contains(event.target)) {
        welcome.muted = false;
        welcome.play();
        welcomePlayed = true;
    }
}, { once: true });

listen('click', startBtn, () => {
    startClick.play();
    setTimeout(() => {
        startCountdown.play()
    }, 1000);
    welcome.pause();
    welcome.currentTime = 0;
    getScores();
    openGame();
    begin.muted = true;
    begin.play();
    setTimeout(() => {
      begin.muted = false; 
    }, 4500)
    
})

listen('input', userInput, () => {
    const typed = userInput.value.trim().toUpperCase();
    matchWords(typed);
})



//start function 
let currentWord = '';
let scoreCount = 0;
let wordsRemaining;
let createdWordsList = getRandomWord(randomWords);
let currentIndex = 1;

function openGame() {
    startBtn.style.visibility = 'hidden';
    startBtn.style.opacity = '0';
    currentWord = createdWordsList[0].toString();
    currentWord = createdWordsList[0].toString();
    randomDisplay.innerText = currentWord;
    // startMainTimer();
    countdownInterval = setInterval(countdown, 1000);
    setTimeout(() => {
        gameBox.style.visibility = 'visible';
        gameBox.style.opacity = '1';
    }, 4000);
    setTimeout(() => {
        userInput.focus();
    }, 4100);
}

let counter = 3;
let countdownInterval;

function countdown() {
    if (counter === 0) {
        clearInterval(countdownInterval);

        startCount.style.visibility = 'hidden';
        startCount.style.opacity = '0';
        startMainTimer();

    } else {
        startCount.style.visibility = 'visible';
        startCount.style.opacity = '1';
        startCount.innerHTML = `<h2>${counter}</h2>`;
    }
    if (counter >= 1) {
        counter--;
    }
}


// main timer

function startMainTimer() {
    timerDisplay.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (scoreCount === wordsToWin) {
            clearInterval(timerInterval);
            gameWin();
        }

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}


// gameOver function
let scoresArray = [];
// let now = new Date();

const saved = localStorage.getItem('scores');
if (saved) {
  const parsed = JSON.parse(saved);
  scoresArray = parsed.map(score => new Score(score.date, score.hits, score.percentage));
  displayScores(scoresArray);
} 

function gameOver() {
    begin.pause();
    fail.play();
    let wordsGottenPercent = Math.round((scoreCount / wordsToWin) * 100);
    // scoresArray.push(new Score(now.toDateString(), scoreCount, wordsGottenPercent));
     scoresArray.push({
        date: new Date().toDateString(),
        hits: scoreCount,
        percentage: wordsGottenPercent
    });
    sortScores(scoresArray);
    setArray(scoresArray, 'scores');
    getArray('scores');
    gameStatus.innerHTML = 'GAME&nbsp;OVER🤕';
    gameBox.style.visibility = 'hidden';
    gameBox.style.opacity = '0';
    endScore.innerText = scoreCount;
    gameOverBox.style.visibility = 'visible';
    gameOverBox.style.opacity = '1';
    displayScores(scoresArray);
    localStorage.setItem('scores', JSON.stringify(scoresArray));
    listen('click', resetBtn, resetGame);
}

function gameWin() {
    begin.pause();
    victory.play();
    // scoresArray.push(new Score(now.toDateString(), scoreCount, 100));
    scoresArray.push({
        date: new Date().toDateString(),
        hits: scoreCount,
        percentage: 100
    });
    sortScores(scoresArray);
    setArray(scoresArray, 'scores');
    getArray('scores');
    gameStatus.innerHTML = 'YOU&nbsp;WIN🎉';
    gameBox.style.visibility = 'hidden';
    gameBox.style.opacity = '0';
    endScore.innerText = scoreCount;
    gameOverBox.style.visibility = 'visible';
    gameOverBox.style.opacity = '1';

    displayScores(scoresArray);
    localStorage.setItem('scores', JSON.stringify(scoresArray));
    listen('click', resetBtn, resetGame);
}

// Add to scoreboard

function addToScoreboard(percent) {
    scoreboard.innerHTML += `
        <div class="top-score">
            <div class="score-element">
                <p>Time Left: <span>${timeLeft}</span></p>
            </div>
            <div class="score-element">
                <p>Date: <span>${getDate()}</span></p>
            </div>
            <div class="score-element">
                <p><span>${percent}</span>%</p>
            </div>
        </div>
    `;
}

function getScores() {
    if (localStorage.length > 0) {
        let returnArray = getArray('scores');
        for (let elem of returnArray) {
            console.log(elem);
        }
        return returnArray;
    } else {
        console.log('Nothing in storage.');
        return null;
    }
}

function sortScores(arr) {
    arr.sort((a, b) => b.hits - a.hits);
    if (arr.length >= 10) {
        arr.pop();
    }
    return arr;
}

function displayScores(arr) {
    scoreboard.innerHTML = '';
    for (let elem of arr) {
        scoreboard.innerHTML += `
        <div class="top-score">
            <div class="score-element">
                <p>Hits: <span>${elem.hits}</span></p>
            </div>
            <div class="score-element">
                <p>Date: <span>${elem.date.toLocaleString('en-ca', {
                                                                        year: 'numeric',
                                                                        month: 'short',
                                                                        day: '2-digit',
                                                                    }
                                                        )}</span></p>
            </div>
            <div class="score-element">
                <p><span>${elem.percentage}</span>%</p>
            </div>
        </div>
        `;
    }
}

// Select random word from array

function getRandomWord(arr) {
    let randomizedList = [];
    for (let i = 0; i < 16; i++) {
        let randIndex = Math.floor(Math.random() * (arr.length - 1));
        let foundIndex = arr.splice(randIndex, 1);
        randomizedList.push(foundIndex);
    }
    return randomizedList;
}

function matchWords(typed) {
    let currentString;
    if (typed === currentWord.toUpperCase()){
        userInput.value = "";
        currentString = createdWordsList[currentIndex].toString();
        currentIndex++;
        currentWord = currentString;
        randomDisplay.innerText = currentWord;
        scoreCount++;
        score.innerText = scoreCount;
        wordsRemaining = wordsToWin - scoreCount;
        wordsRemainDisplay.innerText = wordsRemaining;
    }
}


function resetGame() {
    timeLeft = 30;
    scoreCount = 0;
    currentWord = '';
    counter = 3;
    currentIndex = 1;
    for (let word of createdWordsList) {
        randomWords.push(word.toString());
    }
    createdWordsList = getRandomWord(randomWords);


    startBtn.style.visibility = 'visible';
    startBtn.style.opacity = '1';
    gameOverBox.style.visibility = 'hidden';
    gameOverBox.style.opacity = '0';
    startCount.style.visibility = 'hidden';
    startCount.style.opacity = '0';

    userInput.value = '';
    randomDisplay.innerText = '';
    score.innerText = scoreCount;
    timerDisplay.textContent = timeLeft;
    wordsRemainDisplay.innerText = wordsToWin;

    
    if (timerInterval) clearInterval(timerInterval);
    if (countdownInterval) clearInterval(countdownInterval);

    // Reset audio and flags
    welcome.pause();
    welcome.currentTime = 0;
    welcome.muted = true;
    begin.pause();
    begin.currentTime = 0;
    welcomePlayed = false;
}