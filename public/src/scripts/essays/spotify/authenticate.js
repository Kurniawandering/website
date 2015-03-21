'use strict';

var config 	= require('./config'),
	$		= require('jquery');

var w;

var authenticate = {

	login: function(callback){
         
        var url = this.getLoginURL([ 'user-read-email' ]);

        this.listenToCallback(callback);
        this.openAuthWindow(url);

        setInterval(function(){

            if (w.location.hash) {

                var popupHash = w.location.hash.substr(1);

                window.postMessage(popupHash, '*');
            }

        }, 200);
	},

	getLoginURL: function(scopes){
            
        return 'https://accounts.spotify.com/authorize?client_id=' + config.CLIENT_ID +
            '&redirect_uri=' + encodeURIComponent( config.REDIRECT_URI ) +
            '&scope=' + encodeURIComponent(scopes.join(' ')) +
            '&response_type=token';
	},

    getWindowSpecs: function(){

        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

        return 'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left;
    },

    openAuthWindow: function(url){

        var windowSpecs = this.getWindowSpecs();
        
        w = window.open(

            url, 
            'Spotify',
            windowSpecs
        );
    },

    getUserData: function(accessToken){

        return $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
               'Authorization': 'Bearer ' + accessToken
            }
        });
    },

    listenToCallback: function(callback){
        
        window.addEventListener('message', function(event) {

            if (event.data) {

                var hash = JSON.parse('{"' + decodeURI(event.data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
        
                if (hash.token_type === 'Bearer') {

                    callback(hash.access_token);
                }                            
            }

            w.close();

        }, false);
    }
};

module.exports = authenticate;
