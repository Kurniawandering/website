'use strict';


module.exports = function( req, res, next ){

	res.locals.test = req.path;

	next();

};