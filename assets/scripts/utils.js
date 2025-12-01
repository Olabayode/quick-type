'use strict';

// utility functions
// get HTML element by ID
export function getElement(selector, scope = document) { return scope.getElementById(selector); }
// select HTML element 
export function select(selector, scope = document) { return scope.querySelector(selector); }
// select a list of HTML elements as an array
export function selectAll(selector, scope = document) { return [...scope.querySelectorAll(selector)]; }
// adding event listener
export function listen(event, selector, callback) { return selector.addEventListener(event, callback); }

export const randomWords = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution', 'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow', 'keyboard', 'window'];

export class Score {
	#date;
	#hits;
	#percentage;

	constructor(date, hits, percentage) {
		this.#date = date;
		this.#hits = hits;
		this.#percentage = percentage;
	}

	get date() { return this.#date }
	get hits() { return this.#hits }
	get percentage() { return this.#percentage }
}

export function getDate() {
	const options = {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	}
	return new Date().toLocaleString('en-ca', options);
}

export function setArray(arr, arrName) {
  	localStorage.setItem(`${arrName}`, JSON.stringify(arr));
}

export function getArray(arrName) {
	return JSON.parse(localStorage.getItem(`${arrName}`));
}