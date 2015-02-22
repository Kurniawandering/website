'use strict';

define([

    'jquery',     
    'underscore', 
    'backbone',   
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
