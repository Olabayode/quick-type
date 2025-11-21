'use strict';

import { select, listen, getElement, selectAll } from "./utils.js";

const welcome = new Audio('./assets/media/welcome.mp3');
welcome.muted = true;
welcome.type = 'audio/mp3';

const begin = new Audio('./assets/media/begin.mp3');
begin.type = 'audio/mp3';
begin.loop = true;

//query selector
const startBtn = select('.start-button')

//event listener
listen('click', window, () => {
    welcome.muted = false;
    welcome.play();
}, {once: true});

listen('click', startBtn, ()=> {
    welcome.pause();
    welcome.currentTime = 0;

    begin.play().catch(error => {
        console.log('Start audio prevented:', error)
    });
})