define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!docs/module.html'
], function($, _, Backbone, interactiveTemplate){

    var InteractiveView = Backbone.View.extend({
      
      el: $('.container'),

      initialize: function(){

      },


      render: function(){

        // Using Underscore we can compile our template with data
        var data = {};
        var compiledTemplate = _.template( interactiveTemplate, data );
        
        if( $('.programming').offset().top !== 0 ){

          var y, translateY;

        console.log($('.interactive').offset().top);

          y = $('.interactive').offset().top; //- $('.intro-header').offset().top;

          translateY = y + 50;

          $('.interactive').css({"transform": "translate(40px," + -translateY + "px ) scale(1.7)"});

          $('.intro-effect-sliced').addClass('modify');

        } else {

            $('.mirror-holder').append("<p class='mirror-interactive'>On Interaction</p>");
            $('#intro').css('visibility', 'hidden');

        }

        $('.intro-title').removeClass('link-border');
        $('.name').css('visibility', 'hidden');
        $('.programming').css('visibility', 'hidden');


        this.$el.append( compiledTemplate ).hide().fadeIn(1000);

        $('blockquote').hide();

         var cinematic = new Kubrick([  $('#prologue'),
                            $('#byline-scene2'),
                            $('#gember'),
                            $('#outro')                                       
                        ]);

          cinematic.init();           


      }
    });
    // Our module now returns our view
    return InteractiveView;
});
