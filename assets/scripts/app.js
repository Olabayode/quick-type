'use strict';

import { select, listen, getElement, selectAll, randomWords } from "./utils.js";

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


// TIMER elements
const timerDisplay = getElement('time-remaining');
let timeLeft = 30;   // we can change it to whatever time we want
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

//start function 


function openGame() {
    startBtn.style.visibility = 'hidden';
    startBtn.style.opacity = '0';
    randomDisplay.innerText = getRandomWord(randomWords);
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
function gameOver() {
    begin.pause();
    alert("Time’s up! Game Over!");
}

// Select random word from array

function getRandomWord(arr) {
    let randIndex = Math.floor(Math.random() * (arr.length - 1));
    return arr[randIndex];
}