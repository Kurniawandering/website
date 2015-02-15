define([

    'jquery',     // lib/jquery/jquery
    'underscore', // lib/underscore/underscore
    'backbone',    // lib/backbone/backbone
    'router',
    'kubrick'
], function($, _, Backbone, Router, Kubrick){
  
    var init = function(){
        
        Router.init();
    };

    return {

    	   init: init
    };
});
