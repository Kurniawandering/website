requirejs.config({

    waitSeconds: 20,

    paths: {

        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
        'kubrick': 'lib/kubrick-jquery',
        "backbone": "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",
        "underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min",
        "docs" : "../docs",
        "text": "lib/text",
        "domReady": "lib/domReady"
    },

    shim: {

        'kubrick': [ 'jquery' ]
    }
});

require([
    
    'domReady',
    'app'
], function(domReady, App){

    domReady(App.init);
});
