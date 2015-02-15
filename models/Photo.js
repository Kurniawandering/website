'use strict';

var API_KEY = 'ca7be92a617331261eccb389ea01e014';


var buildUrl = function(methodName, photoSet){

    var url = 'https://api.flickr.com/services/rest/?nojsoncallback=1&api_key=' + API_KEY + '&format=json&method=' + methodName  + '&photoset_id=' + photoSet;

    return url;
};


exports.collectImages = function(length, obj){

	var flickrData = [];

    for (var i=0; i<length; i++) {

    	var dataObject = {
			image: '',
			title: ''
		};

        var photoURL = 'http://farm' + obj.photoset.photo[i].farm + '.' + 'static.flickr.com/' + obj.photoset.photo[i].server + '/' + obj.photoset.photo[i].id + '_' + obj.photoset.photo[i].secret +'_z.jpg';
        var originalUrl = 'http://farm' + obj.photoset.photo[i].farm + '.' + 'static.flickr.com/' + obj.photoset.photo[i].server + '/' + obj.photoset.photo[i].id + '_' + obj.photoset.photo[i].secret +'_z.jpg';
        
        dataObject.image = photoURL;
        dataObject.original = originalUrl;
        dataObject.title = obj.photoset.photo[i].title;

        flickrData[i] = dataObject;
    }

    return flickrData;   
};

exports.photoSet = function(category){

    if (!category) {

        console.log('no category found');
        return;
    }

    return buildUrl('flickr.photosets.getPhotos', category);        
};
