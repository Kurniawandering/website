/*** @jsx React.DOM */

'use strict';

var React = require('react');

var Router = require('./router');

var $ = require('jquery');
var Backbone = require('backbone');
var InterfaceComponent = require('./interface');

Backbone.$ = $;

var router = new Router();


React.renderComponent(
  	<InterfaceComponent router={router} />,
  	$('.carousel-wrapper')[0]
);

Backbone.history.start();