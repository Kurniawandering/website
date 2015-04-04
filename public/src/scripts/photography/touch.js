'use strict';

var $ 		= require('jquery'),
    Hammer  = require('hammerjs');


var kubrickTouch = {};

var targetX = 0;

var mainWidth = $('.photography-mainwrap').width();


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

	if ( event.deltaY >= Math.abs( event.deltaX )) {

		return;
	}

	if (Math.abs(event.deltaY) >= 20) {

		return;
	}

	if (currentX < 0 && currentX > -mainWidth*2) {

		cachedEl('.photography-navwrap').css({
			
			'transform': 'translateX(' + currentX + 'px)',
			'transition': 'none'
		});
	}
};


var swipeElement = function(event){

	if (Math.abs(event.deltaY) >= 40) {

		return;
	}


	cachedEl('.photography-navwrap').css('transform', 'translateX(' + targetX + 'px)');
};


var resetElement = function(event){

	if (event.deltaX > 0 && targetX === 0) {
		return;
	}

	if ( event.deltaX < 0 && targetX / mainWidth === -2) {

		return;
	}

	// if (Math.abs(event.deltaY) >= 40) {

	// 	return;
	// }


	if (Math.abs( event.deltaX )> mainWidth / 2) {

		if (event.deltaX < 0) {

			cachedEl('.photography-navwrap').css({

				'transform': 'translateX(' +  parseFloat(targetX-mainWidth) + 'px)',
				'transition': '-webkit-transform 300ms cubic-bezier(.17,.67,.69,1.33)'
	 		});

			targetX = targetX - mainWidth;

		} else {

			cachedEl('.photography-navwrap').css({
				
				'transform': 'translateX(' +  parseFloat(targetX + mainWidth) + 'px)',
				'transition': '-webkit-transform 300ms cubic-bezier(.17,.67,.69,1.33)'
			});

			targetX = targetX + mainWidth;
		}

	} else {

		cachedEl('.photography-navwrap').css({
			
			'transform': 'translateX(' + targetX + 'px)',
			'transition': '-webkit-transform 300ms cubic-bezier(.17,.67,.69,1.33)'
		});
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
