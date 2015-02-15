define([
  'jquery',
  'underscore',
  'backbone',
  'text!docs/intro.html'
], function($, _, Backbone, homeTemplate){

    var HomeView = Backbone.View.extend({
      el: $('#intro'),
      $body: $('body'),
      $window: $(window),


      render: function(){


        var bodyHeight    = this.$body.height();
        var windowHeight  = this.$window.height();

        if (bodyHeight > windowHeight) {

            this.$body.height(windowHeight);

        }

        var data = {};
        var compiledTemplate = _.template( homeTemplate, data );

        // if ($('#intro').css('visibility', 'hidden')) {

        //     $('#intro').css('visibility', 'visible');
        // }

        if ( $('.intro-effect-sliced').hasClass('modify')) {

          console.log('nasdsda');

          var y, translateY;

          y = $('.name').offset().top; //- $('.intro-header').offset().top;

          translateY = y / 300;

          $('.interactive').css({"transform": "translate(-20px," + translateY + "px ) scale(1)"});

            $('.name').css('visibility', 'visible');
            $('.programming').css('visibility', 'visible');
            $('blockquote').show();
            $('.intro-effect-sliced').removeClass('modify');
            $('.intro-title').addClass('link-border');
            $('.container').empty();

        } else if ($('.mirror-interactive').length){

            $('.name').css('visibility', 'visible');
            $('.programming').css('visibility', 'visible');
            $('blockquote').show();
            $('#intro').css('visibility', 'visible');

            $('.mirror-interactive').hide();
            $('.container-inner').remove();

            this.$el.append( compiledTemplate ).hide().fadeIn(900, function(){

                $('.intro-effect-sliced').removeClass('modify');
                $('#profile').fadeIn(1000);
            });

        } else {

            $('.name').css('visibility', 'visible');
            
            this.$el.append( compiledTemplate ).hide().fadeIn(900, function(){

                $('.intro-effect-sliced').removeClass('modify');
                $('#profile').fadeIn(1000);
            });
        }

        $('blockquote').show();
        
      }
    });

    return HomeView;
});
