/*** @jsx React.DOM */

'use strict';

var routeMixin 	= require('./mixin'),
		React				=	require('react');


var BarComponent = React.createClass({
	mixins : [routeMixin],
	handle : function() {
		this.props.router.navigate('foo', {
			trigger : true
		});
	},
	render : function() {

		var className = 'animate-leave animate-leave-active';

		if (this.props.router.current === 'bar') {
			className = 'animate-enter animate-enter-active';
		}

		return (
			<div className={className}>
			in bar,
			<a onClick={this.handle}>go to foo</a>
			</div>
		);
	}
});

module.exports = BarComponent;
