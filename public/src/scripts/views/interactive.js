'use strict';

define([

    'jquery',
    'underscore',
    'backbone',
    'text!docs/module.html'

], function($, _, Backbone, interactiveTemplate){

    var InteractiveView = Backbone.View.extend({
      
        el: $('.container-interactive'),

        $domEl: {

            intro: $('#intro'),

            introEffectSliced: $('.intro-effect-sliced'),

            mirrorHolder: $('.mirror-holder'),

            container: $('#container'),

            introHeader:  $('.intro-header'),

            interactive: $('.interactive'),

            name: $('.name'),

            programming: $('.programming'),

            blockquote: $('blockquote')
        },

        programmingOffsetTop: function(){

            return this.$domEl.programming.offset().top;
        },

        interactiveOffsetTop: function(){

            return this.$domEl.interactive.offset().top;
        },

        render: function(){

            var data = {};
            var compiledTemplate = _.template( interactiveTemplate, data );
            
            if( this.programmingOffsetTop() !== 0 ){

                var y, translateY;

                y = this.interactiveOffsetTop();

                translateY = y - 150;

                this.$domEl.intro.css({"transform": "translate(50%," + -translateY + "px ) scale(1.7)"});

                this.$domEl.introEffectSliced.addClass('modify');

            } else {

                this.$domEl.mirrorHolder.append("<h3 class='mirror-interactive'>On Interaction</h3>");
                this.$domEl.intro.css('visibility', 'hidden');
            }

            this.$domEl.container.css('width','100%');
            this.$domEl.introHeader.css('width', '40%');


            this.$domEl.interactive.removeClass('link-border');
            this.$domEl.name.css('visibility', 'hidden');
            this.$domEl.programming.css('visibility', 'hidden');


            this.$el.append( compiledTemplate ).hide().fadeIn(1000);

            this.$domEl.blockquote.hide();

            var cinematic = new Kubrick([  

                                $('#prologue'),
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
