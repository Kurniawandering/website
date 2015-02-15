'use strict';

var Backbone 	= require('backbone'),
 	$ 			= require('jquery'),
 	_			= require('lodash');


var flickrData = require('./collection');

module.exports = Backbone.View.extend({

	el: '.carousel',

	template: _.template($('#galleryTemplate').html()),

	initialize: function(options){

		this.category = options.category;

		this.$el.append('<div class="overlay"></div>');

		this.collection = new flickrData( [], { category: this.category} );

 		_.bindAll(this, 'render');

		this.collection.fetch({

			success: this.render
		
		});
	},

	getResults: function(){


	},

	render: function(){

       	this.$el.html( this.template({ flickr: this.collection.toJSON() }) );

		return this;

	}


});