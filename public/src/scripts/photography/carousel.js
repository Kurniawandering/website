'use strict';

var $ 		= require('jquery');


var Carousel = {};

var current         = 1,
    countImgs       = 0;


var cachedEl = function(query){

	if (this instanceof cachedEl) {

		this.cache = this.cache || {};
  
		if (!this.cache[query]) {

			this.cache[query] = $(query);
		}

  		return this.cache[query];

	} else {

		return new cachedEl(query);
	} 
};


var getCurrent = function(direction){
    
    if (direction === 'next') {

        current++;

    } else {

        current--;
    }

    return current;
};


var transition = function(container, direction){

    var unit = direction === 'next' ? '-=' : '+=';

    container.animate({

        'left': unit + '640px'

    }, 10, function(){

  
    });
};

Carousel.init = function(){

	cachedEl('.carousel-nav a').on('click', function(event){

	    var direction   = $(this).data('dir');

	    event.preventDefault();

	    getCurrent(direction);
	    transition(cachedEl('div.carousel > ul'), direction);
	});
}; 


module.exports = Carousel;

