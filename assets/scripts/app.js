'use strict';

const welcome = new Audio('./assets/media/welcome.mp3');
welcome.muted = true;
welcome.type = 'audio/mp3';

const begin = new Audio('./assets/media/begin.mp3');
begin.type = 'audio/mp3';
begin.loop = true;

//query selector
const startBtn = document.querySelector('.start-button')

//event listener
window.addEventListener('click', () => {
    welcome.muted = false;
    welcome.play();
}, {once: true});

startBtn.addEventListener('click', ()=> {
    welcome.pause();
    welcome.currentTime = 0;

    begin.play().catch(error => {
        console.log('Start audio prevented:', error)
    });
})