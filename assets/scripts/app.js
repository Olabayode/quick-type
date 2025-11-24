'use strict';

import { select, listen, getElement, selectAll, randomWords, Score } from "./utils.js";

const welcome = new Audio('./assets/media/welcome.mp3');
welcome.muted = true;
welcome.type = 'audio/mp3';

const begin = new Audio('./assets/media/begin.mp3');
begin.type = 'audio/mp3';
begin.loop = true;


//query selector
const startBtn = select('.start-button');
const gameBox = select('.game-container');
const startCount = select('.start-countdown');
const userInput = getElement('user-input');
const randomDisplay = getElement('random-word');
const score = getElement('score');


// TIMER elements
const timerDisplay = getElement('time-remaining');
let timeLeft = 999;   // we can change it to whatever time we want
let timerInterval = null;

//event listener
let welcomePlayed = false;
listen('click', window, (event) => {
    if (!welcomePlayed && !startBtn.contains(event.target)) {
        welcome.muted = false;
        welcome.play();
        welcomePlayed = true;
    }
}, { once: true });

listen('click', startBtn, () => {
    welcome.pause();
    welcome.currentTime = 0;
    openGame();
    begin.play().catch(error => {
        console.log('Start audio prevented:', error)
    });
})

listen('input', userInput, () => {
    const typed = userInput.value.trim();
    matchWords(typed);
})

//start function 
let currentWord = '';
let scoreCount = 0;

function openGame() {
    startBtn.style.visibility = 'hidden';
    startBtn.style.opacity = '0';
    currentWord = getRandomWord(randomWords);
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

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}


// Placeholder gameOver function
let scoresArray = [];

function gameOver() {
    begin.pause();
    let now = new Date();
    scoresArray.push(new Score(now, scoreCount, 100));
    alert("Time’s up! Game Over!");
    resetGame();
}

// Select random word from array

function getRandomWord(arr) {
    let randIndex = Math.floor(Math.random() * (arr.length - 1));
    return arr[randIndex];
}

function matchWords(typed){
    if (typed === currentWord){
        userInput.value = "";
        currentWord = getRandomWord(randomWords);
        randomDisplay.innerText = currentWord;
        scoreCount++;
        score.innerText = scoreCount;
    }
}


function resetGame() {
    timeLeft = 30;
    scoreCount = 0;
    currentWord = '';
    counter = 3;

    startBtn.style.visibility = 'visible';
    startBtn.style.opacity = '1';
    gameBox.style.visibility = 'hidden';
    gameBox.style.opacity = '0';
    startCount.style.visibility = 'hidden';
    startCount.style.opacity = '0';

    userInput.value = '';
    randomDisplay.innerText = '';
    score.innerText = scoreCount;
    timerDisplay.textContent = timeLeft;

    
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