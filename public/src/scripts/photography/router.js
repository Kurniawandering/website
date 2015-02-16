'use strict';

var Backbone 	= require('backbone'),
	$			= require('jquery');

var GalleryView 		= require('./gallery'),
	SlidesCollection	= require('./collection');

var $navPills			= $('nav').find('li'),
	$food				= $('.food'),
	$portrait			= $('.portrait'),
	$walk				= $('.walk'),
	$wall 				= $('.wall');


var Router = Backbone.Router.extend({

	routes : {
		''				: 'home',
		'food'			: 'food',
		'portrait'		: 'portrait',
		'walk'			: 'walk',
		'wall-to-wall'	: 'wall'
	},

  	deselectPills: function(){

    	$navPills.removeClass('active');
  	},

  	selectPill: function(pill){

      	this.deselectPills();
      	$(pill).addClass('active');
  	},

  	home : function(){

  		new GalleryView({ category: 'home' });
  	},

	food : function() {

		new GalleryView({ category: '72157644434743571' });
		this.selectPill($food);
	},

	portrait : function() {
		
		new GalleryView({ category: '72157644492470393' });
		this.selectPill($portrait);
	},

	walk : function() {
		
		new GalleryView({ category: '72157646585032883' });
		this.selectPill($walk);
	},

	wall : function() {
		
		new GalleryView({ category: '72157648902331982' });
		this.selectPill($wall);
	}

});

module.exports = Router;
