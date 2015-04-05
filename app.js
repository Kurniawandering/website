'use strict';

var app = require('./server');
var routes  = require('./routes/index');

app
	.use('/', routes)
	.use(require('./middleware/404'))
	.use(require('./middleware/error'));

module.exports = app;
