'use strict';

var Backbone 	= require('backbone'),
 	$ 			= require('jquery'),
 	_			= require('lodash');


var flickrData = require('./collection');

module.exports = Backbone.View.extend({

	$container: null,

	current: 1,

	collectionLength: 0,

	template: _.template($('#galleryTemplate').html()),

	initialize: function(options){

		this.$container = $('.carousel');

		if (options.category === 'home') {

			return this.viewHome();
		}

		this.category = options.category;

		this.$container.append('<div class="overlay"></div>');

		this.collection = new flickrData( [], { category: this.category} );

 		_.bindAll(this, 'render');

		this.collection.fetch({

			success: this.render
		});
	},

	events: {

		'click .carousel-nav a': 'navigateCarousel'
	},

	navigateCarousel: function(event){

		event.preventDefault();

		var direction = $(event.currentTarget).data('dir');

		var container =	this.$el.find('ul');

		this.getCurrent(direction);

		if (this.current > 1) {

			$('.prev').css('visibility', 'visible');

		} else {

			$('.prev').css('visibility', 'hidden');
		}


		if (this.current === this.collectionLength) {

			$('.next').css('visibility', 'hidden');

		} else {

			$('.next').css('visibility', 'visible');
		}

		this.transition(container, direction);
	},

	getCurrent: function(direction){
    
    	if (direction === 'next') {

	        this.current++;

	    } else {

	        this.current--;
	    }

	    return this.current;
	},

	transition: function(container, direction){

    	var unit = direction === 'next' ? '-=' : '+=';

	    $(container).animate({

	        'left': unit + '640px'
	    }, 10);
	},

	viewHome: function(){

		this.$container.html('<img src="http://farm3.static.flickr.com/2925/14069945181_4c655b084a_z.jpg">');
	},


	render: function(){

		this.collectionLength = this.collection.length;

       	this.$el.html( this.template({ flickr: this.collection.toJSON() }) );

       	var self = this;

       	setTimeout(function(){

       		self.$container.empty().append(self.$el);

       	}, 200);

		return this;

	}


});