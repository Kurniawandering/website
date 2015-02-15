/*** @jsx React.DOM */

'use strict';

var React 				= require('react'),
	routeMixin 			= require('./mixin'),
	GalleryComponent 	= require('./gallery'),
	BarComponent 		= require('./bar');

var InterfaceComponent = React.createClass({
	
	mixins : [routeMixin],

	render : function() {

		var router = this.props.router;

		//console.log(router);

		return (
	
				<GalleryComponent router={router} />
		);
	}
});

module.exports = InterfaceComponent;
