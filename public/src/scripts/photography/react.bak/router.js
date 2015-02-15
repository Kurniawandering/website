'use strict';

var Backbone = require('backbone');

var Router = Backbone.Router.extend({

	routes : {
		"foo" : "foo",
		"bar" : "bar"
	},

	foo : function() {
		this.current = "foo";
		//console.log("foo");
	},

	bar : function() {
		this.current = "bar";
		//console.log("bar");
	}

});

module.exports = Router;
