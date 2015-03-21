'use strict';

var Photo = require('../models/Photo.js'); 
var https = require('https');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

	res.render('home', {
        useRequire: true
    });

});

router.get('/interactive', function(req, res) {

	res.render('interactive');

});

router.get('/essays', function(req, res) {

	res.render('essays');

});


router.get('/essays/on-photography', function(req, resp){

   	resp.render('photography/index', {
		layout: 'mobile'
	});
});


router.get('/essays/spotify', function(req, resp){

    resp.render('essays/spotify', {
        layout: 'essays'
    });
});


router.get('/essays/profile-image', function(req, resp){

    resp.render('essays/profile-image', {
        layout: 'essays'
    });
});


router.get('/essays/button', function(req, resp){

    resp.render('essays/button', {
        layout: 'essays'
    });
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

        res.on('error', function(e){

        	console.error(e);
        });

	});
});


router.get('/services/api/spotify', function( req, res ){


    console.log(res.locals.test);

    res.send('hello');

});


module.exports = router;
