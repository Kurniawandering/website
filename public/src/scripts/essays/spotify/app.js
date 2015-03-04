'use strict';


var authenticate    =   require('./authenticate'),
    config  = require('./config'),
    elements        =   require('./elements');

var $ = require('jquery');

(function() {
    

    
    // elements.loginButton.addEventListener('click', function() {
        
    //     authenticate.login(function(accessToken) {

    //         console.log('jolo');

    //         $.ajax({
    //             url: 'https://api.spotify.com/v1/me',
    //             headers: {
    //                'Authorization': 'Bearer ' + accessToken
    //             }
    //         }).done(function(response){
    //             console.log(response);
    //         });

    //     });

    //         // authenticate.getUserData(accessToken).done(function(response) {

    //         //         console.log(response);
    //         //         elements.loginButton.style.display = 'none';
    //         //         //resultsPlaceholder.innerHTML = template(response);
    //         //     });
    //         // });
    // });



})();