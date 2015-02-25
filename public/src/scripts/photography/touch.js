'use strict';

var $ 		= require('jquery'),
    Hammer  = require('hammerjs');


var kubrickTouch = {};

var targetX = 0;

var mainWidth = $('main').width();


var cachedEl = function(query){

	if (this instanceof cachedEl) {

		this.cache = this.cache || {};
  
		if (!this.cache[query]) {

			//console.log('niet dus');

			this.cache[query] = $(query);
		}

  		return this.cache[query];

	} else {

		return new cachedEl(query);
	} 
};


var dragElement = function(event){

	var currentX = event.deltaX + targetX;

	if (currentX < 0 && currentX > -mainWidth*2) {

		cachedEl('nav').css('transform', 'translateX(' + currentX + 'px)');
	}
};


var swipeElement = function(event){

	cachedEl('nav').css('transform', 'translateX(' + targetX + 'px)');
};


var resetElement = function(event){

	if (Math.abs( event.deltaX )> mainWidth / 2) {

		if (event.deltaX < 0) {

			cachedEl('nav').css('transform', 'translateX(' +  parseFloat(targetX-mainWidth) + 'px)');

			targetX = targetX - mainWidth;

		} else {

			cachedEl('nav').css('transform', 'translateX(' +  parseFloat(targetX + mainWidth) + 'px)');

			targetX = targetX + mainWidth;
		}

	} else {

		cachedEl('nav').css('transform', 'translateX(' + targetX + 'px)');
	}
};


var initTouchListeners = function(element){

	var touchControl = new Hammer(element);

	touchControl.on('pan', dragElement)
				.on('swipe', swipeElement)
				.on('panend', resetElement);
};



kubrickTouch.attachTouch = function(){

	cachedEl('.mainnav li').each(function(){
		initTouchListeners($(this)[0]);
	});
};

module.exports = kubrickTouch;
