'use strict';

var express 		= require('express'),
	path 			= require('path'),
	logger 			= require('morgan'),
	cookieParser 	= require('cookie-parser'),
	bodyParser 		= require('body-parser'),
	hbs 			= require('express-handlebars');

var app = express();

app
	.set('view engine', 'handlebars')
	.set('views', process.cwd()+ '/views')
	.engine('handlebars', 
	    hbs({
	        
	        defaultLayout: 'main'
	    })
	)
	.use(logger('dev'))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded( {extended: true} ))
	.use(cookieParser())
	.use(express.static(path.join(process.cwd(), 'public')));

module.exports = app;