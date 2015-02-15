'use strict';

var Photo = require('../models/Photo.js'); 
var https = require('https');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

	res.render('home');

});

router.get('/interactive', function(req, res) {

	res.render('interactive');

});

router.get('/programming', function(req, res) {

	res.render('programming', {
		noRequire: true
	});

});

router.get('/depersgroep', function(req, res) {

	res.render('depersgroep', {
		dePersgroep: true
	});

});

router.get('/photography', function(req, resp){

	//var flickr = Photo.photoSet('food');

	       	resp.render('photography/index', {
				layout: 'mobile'
			});

	// https.get(flickr, function(res) {

	//     var str = '';

 //        res.on('data', function (chunk) {

 //            str += chunk;
 //         });

 //        res.on('end', function () {

 //        	var obj = JSON.parse(str);

 //        	//console.log(obj.photoset);

 //        	var length = obj.photoset.photo.length;
 //        	var flickrData = Photo.collectImages(length, obj);

 //        	resp.render('photography/index', {
	// 			layout: 'mobile',
	// 			flickrData: flickrData
	// 		});
 //        });

	// }).on('error', function(e){

	// 	console.error(e);
	// });
});

router.get('/api/flickr/:category', function(req, resp){

	var flickr = Photo.photoSet(req.param('category'));


	https.get(flickr, function(res) {

	    var str = '';

        res.on('data', function (chunk) {

            str += chunk;
         });

        res.on('end', function () {

        	var obj = JSON.parse(str);

        	var length = obj.photoset.photo.length;
        	var flickrData = Photo.collectImages(length, obj);

        	resp.send(flickrData);

        });

	}).on('error', function(e){

		console.error(e);
	});
});


module.exports = router;
