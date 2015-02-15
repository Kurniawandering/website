'use strict';

var $ 			= require('jquery'),
	Backbone 	= require('backbone'),
	_ 			= require('lodash');

var Router             	= require('./router'),
    Carousel           	= require('./carousel'),
    kubrickTouch       	= require('./touch'),
    animations		    = require('./animation');

window.$ = $;
Backbone.$ = $;

$(document).ready(function(){

	new Router();

	Backbone.history.start();

    Carousel.init();

    //kubrickTouch.attachTouch();

    animations.init();

});