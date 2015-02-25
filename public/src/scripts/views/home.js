'use strict';

define([

    'jquery',
    'underscore',
    'backbone'

], function($, _, Backbone){

    var HomeView = Backbone.View.extend({

        $domEl: {

            body: $('body'),

            introEffectSliced: $('.intro-effect-sliced'),

            name: $('.name'),

            container: $('#container'),

            introHeader: $('.intro-header'),

            intro: $('#intro'),

            programming: $('.programming'),

            interactive: $('.interactive'),

            profile: $('#profile'),

            containerInteractive: $('.container-interactive'),

            mirrorHolder: $('.mirror-holder'),

            containerInner: $('.container-inner'),

            blockQuote: $('blockquote')
        },
        
        el: $('#intro'),

        $window: $(window),

        render: function(){

            var bodyHeight    = this.$domEl.body.height();
            var windowHeight  = this.$window.height();

            if (bodyHeight > windowHeight) {

                this.$domEl.body.height(windowHeight);
            }

            var that = this;

            if ( this.$domEl.introEffectSliced.hasClass('modify')) {

                var y, translateY;

                y = this.$domEl.name.offset().top;

                translateY = y / 300;

                // first the css transformation between two states
                this.$domEl.container.css('width','75%');
                this.$domEl.introHeader.css('width', '50%');
                this.$domEl.intro.css({"transform": "translate(-10px," + translateY + "px ) scale(1)"});

                this.$domEl.name.css('visibility', 'visible');
                this.$domEl.programming.css('visibility', 'visible');
                
                // re set css
                this.$domEl.introEffectSliced.removeClass('modify');
                this.$domEl.interactive.addClass('link-border');
                this.$domEl.containerInteractive.empty();

            } else if ($('.mirror-interactive').length){

                this.$domEl.container.css('width','75%');
                this.$domEl.introHeader.css('width', '50%');
                this.$domEl.name.css('visibility', 'visible');
                this.$domEl.programming.css('visibility', 'visible');
                
                this.$domEl.intro.css('visibility', 'visible');
                this.$domEl.interactive.addClass('link-border');

                this.$domEl.mirrorHolder.empty();
                this.$domEl.containerInteractive.empty();
                this.$domEl.containerInner.remove();

                this.$domEl.intro.hide().fadeIn(900, function(){

                    that.$domEl.introEffectSliced.removeClass('modify');
                    that.$domEl.profile.fadeIn(1000);
                });

            } else {

                this.$domEl.name.css('visibility', 'visible');

                this.$domEl.intro.hide().fadeIn(900, function(){

                    that.$domEl.introEffectSliced.removeClass('modify');
                    that.$domEl.profile.fadeIn(1000);
                });
            }

        this.$domEl.body.height(0);
        this.$domEl.blockQuote.show();
        
        }
    });

    return HomeView;
});