'use strict';

var Backbone = require('backbone');

var Slide = Backbone.Model.extend();

module.exports =  Backbone.Collection.extend({

	initialize: function(models, options){

		this.category = options.category;
	},

	url: function(){

		return 'api/flickr/' + this.category;
	},

	model: Slide,

});
