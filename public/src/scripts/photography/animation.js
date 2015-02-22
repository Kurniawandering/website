'use strict';

var $ = require('jquery');

var animations = {};


var contentSwitchMore 	= $('.content-switch.more'),
	contentSwitchBack = $('.content-switch.back'),
	$nav 			= $('nav'),
	$main 			= $('main'),
	$subNav 		= $('.subnav'),
	$mainNav 		= $('.mainnav').find('li');

var subnavState = 'in';

animations.init = function(){


	contentSwitchMore.click(function(event){

		setTimeout(function(){

			// first transition
			$nav.css('transform', 'translateY(-100%)');

			$main.css('overflow-y', 'scroll');

			// second stage of ui
			$('.content-switch.back').show();

			$('.content-switch.back').css('position', 'fixed');

			//$nav.css('position', 'fixed');


		}, 100);

	});


	contentSwitchBack.click(function(event){

		var mainWidth = $('main').width();

		var currentHash = $(location).attr('hash');

		var currentSlide = 0;

		switch(currentHash) {

			case '#food': 

				currentSlide = 0;

			break;

			case '#portrait':

				currentSlide = 1;

			break;

			default:

				currentSlide = 0;
		}

		var transformX = -1024 * currentSlide;		

	 	$('.content-switch.back').hide();


	 	$nav.css({
	 		'transform': 'translate(' + transformX + 'px, -90%)',
	 		'transition': 'none'
	 	});

	 	setTimeout(function(){

	 		$nav.css({
	 			'transform': 'translate(' + transformX + 'px, 0)',
	 			'transition': '-webkit-transform 300ms cubic-bezier(.17,.67,.69,1.33)'
	 		});

	 				$('main')[0].scrollTop = 0;

	 	}, 400);

	 	$main.css('overflow-y', 'hidden');


	});

	$mainNav.each(function(){

		$(this).click(function(event){

			if ($(this).hasClass('personal')) {

				event.preventDefault();

				subnavState = 'out';

				$subNav.show(100, function(){

					$(this).css('transform', 'translateX(-110px)');
				});
			
			} else {

				if (subnavState === 'out') {

					$subNav.css('transform', 'translateX(0px)').fadeOut(200);

					subnavState = 'in';
				}
			}
		});
	});

};

module.exports = animations;
