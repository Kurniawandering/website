'use strict';


var authenticate    =   require('./authenticate'),
    elements        =   require('./elements');

var $       = require('jquery');


(function() {
    
    elements.loginButton.addEventListener('click', function() {

        elements.spotifyContent.style.paddingTop = '100px';
        elements.spotifyContent.style.paddingBottom = '100px';        
        
        authenticate.login(function(accessToken) {

            authenticate.getUserData(accessToken).done(function(response) {

                var template = '<img src="' + response.images[0].url  + '" class="clip-circle" />';
                    template += '<p>' + response.display_name + '</p>';

                elements.loginButton.style.display = 'none';
                elements.userPlaceholder.innerHTML = template;


                $.ajax({

                    url: 'https://api.spotify.com/v1/users/' + response.id + '/playlists',
                    
                    headers: {

                       'Authorization': 'Bearer ' + accessToken
                    }

                }).done(function(res){

                    var albumId;

                    var albumWrapper = elements.albumImages;

                    res.items.every(function(el){

                        if (el.owner.id === response.id) {

                            albumId = el.id;

                            elements.polygonProfile.setAttribute('xlink:href', el.images[0].url);

                            elements.polygonProfileInner.setAttribute('xlink:href', el.images[0].url);

                            elements.canvasWrapper.style.display = 'block';

                            elements.spotifyContent.style.height = 'auto';

                            return false;
                        }
                    });

                    $.ajax({

                        url: 'https://api.spotify.com/v1/users/' + response.id + '/playlists/' + albumId + '/tracks',

                        headers: {
                            'Authorization': 'Bearer ' + accessToken   
                        }
                    }).done(function(lastres){

                        lastres.items.forEach(function(obj){                            

                            var img = document.createElement('img');
                            img.src = obj.track.album.images[0].url;

                            albumWrapper.appendChild(img);

                            var audio = new Audio(obj.track.preview_url);

                            img.addEventListener('click', function(event){

                                if (event.target.classList.contains('play-album')) {

                                    audio.pause();

                                } else {

                                    audio.play();   
                                }

                                event.target.classList.toggle('play-album');

                            }, false);

                        });
                    });
                });
            });
        });
    });
})();