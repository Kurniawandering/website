define([
    
    'jquery',
    'underscore',
    'backbone',
    'src/scripts/views/home.js',
    'src/scripts/views/interactive.js'
], function($, _, Backbone, HomeView, InteractiveView ){
    
    var AppRouter = Backbone.Router.extend({
      
        routes: {

            '': 'home',
            'interactive': 'showInteractive',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var init = function(){

      var app_router = new AppRouter();

      app_router.on('route:home', function(){

        var homeView = new HomeView();
        homeView.render();
      });

      app_router.on('route:showInteractive', function(){

          // Call render on the module we loaded in via the dependency array
          // 'views/projects/list'
          var interactiveView = new InteractiveView();
          interactiveView.render();
      });


      app_router.on('route:defaultAction', function(actions){
        // We have no matching route, lets just log what the URL was

        console.log('No route:', actions);
        var homeView = new HomeView();
        homeView.render();
      });

      Backbone.history.start();
    };

  return {
    init: init
  };
});
