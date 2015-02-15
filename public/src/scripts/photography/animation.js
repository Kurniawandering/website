'use strict';

var $ = require('jquery');

var animations = {};


var contentSwitch 	= $('.content-switch'),
	$nav 			= $('nav'),
	$main 			= $('main'),
	$subNav 		= $('.subnav'),
	$mainNav 		= $('.mainnav').find('li');

var subnavState = 'in';

animations.init = function(){


	contentSwitch.click(function(event){

		event.preventDefault();

		$nav.css('transform', 'translateY(-100%');

		$main.css('overflow-y', 'scroll');
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
