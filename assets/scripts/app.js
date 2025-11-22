'use strict';

import { select, listen, getElement, selectAll } from "./utils.js";

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

//event listener
listen('click', window, () => {
    welcome.muted = false;
    welcome.play();
}, {once: true});

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
    setInterval(countdown, 1000);
    setTimeout(() => {
        gameBox.style.visibility = 'visible';
        gameBox.style.opacity = '1';
        userInput.focus();
    }, 4000);
}

let counter = 3;

function countdown() {
    if (counter === 0) {
        startCount.style.visibility = 'hidden';
        startCount.style.opacity = '0';
    } else {
        startCount.style.visibility = 'visible';
        startCount.style.opacity = '1';
        startCount.innerHTML = `<h2>${counter}</h2>`;
    }
    if (counter >= 1) {
        counter--;
    }
}