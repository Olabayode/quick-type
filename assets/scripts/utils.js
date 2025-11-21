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