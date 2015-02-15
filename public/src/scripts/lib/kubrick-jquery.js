(function(window, $){

    /*  Globals
    -------------------------------------------------- */
    var PROPERTIES =               ['translateX', 'translateY', 'opacity', 'rotate', 'scale'],
        $window =                  $(window),
        $body =                    $('body'),
        wrappers =                 [],
        currentWrapper =           null,
        scrollTimeoutID =          0,
        bodyHeight =               0,
        windowHeight =             0,
        windowWidth =              0,
        prevKeyframesDurations =   0,
        scrollTop =                0,
        relativeScrollTop =        0,
        currentKeyframe =          0,

        keyframes = [];


  var Kubrick = function(elem, options){

           if (keyframes.length > 0) {
            console.log(keyframes);
          return;
        } else {


      this.options = options;

      this.elem = elem;

      this.$elem = $(elem);

      //this.options = $.extend({}, defaults, options);

      var i = 0;

      var self = this;

      for ( i = 0; i < this.elem.length; i++) {

          var metadata = {};

          var oneElem = self.$elem[i];

          // Set the first object in keyframes array
          var idElem = oneElem.attr('id');


          metadata.wrapper = '#' + idElem;
          metadata.duration = oneElem.data('kubrick-duration');


          // Set second order object in keyframes array
          metadata.animations = [];


          var actorsTranslate = oneElem.find( '[data-kubrick-scene=' + i + ']' );

          actorsTranslate.each(function(index){

              var selectorClass = $(this).attr('class');

              metadata.animations.push({

                  //'scale': $(this).data('kubrick-scale'),
                  'translateY': $(this).data('kubrick-translate-y'),
                  'selector':  '.' + selectorClass,
                  'opacity':  $(this).data('kubrick-opacity'),
                  'callback': $(this).data('kubrick-callback-scene'),
                  'callbackElem': $(this).data('kubrick-callbackelem')

              });

          });

          keyframes.push(metadata);
      }

    console.log(keyframes);

  }

    };




    Kubrick.prototype = {


        /*  Construction
        -------------------------------------------------- */
        init: function() {

            this.config = $.extend({}, this.defaults, this.options, this.metadata);

            scrollIntervalID = setInterval(this.updatePage.bind(this), 10);




            this.setupValues();

    

          // $window.resize(this.throwError())
          // if(this.isTouchDevice()) {
          //   $window.resize(this.throwError())
          // }
        },

        setupValues: function() {

            scrollTop = $window.scrollTop();

            windowHeight = $window.height();

            windowWidth = $window.width();

            this.convertAllPropsToPx();

            this.buildPage();
          
        },

        /**
         *
         *    This one is calling all the starting methods per request frame
         *
         *    The main task is:
         *
         *    Filling up the the keyframes array with calculated animations and properties
         *
         *
         */
        buildPage: function() {

            bodyHeight = 0;

            var i, j, k;

            var self = this;

            for( i = 0;  i < keyframes.length;  i++ ) { // loop keyframes

                bodyHeight += keyframes[i].duration;  // why and what ?? --> total bodyHeight is important

                if($.inArray(keyframes[i].wrapper, wrappers) == -1) {

                  wrappers.push(keyframes[i].wrapper);
                }

                for( j = 0; j < keyframes[i].animations.length; j++ ) { // loop animations

                    Object.keys(keyframes[i].animations[j]).forEach(function(key) { // loop properties

                        value = keyframes[i].animations[j][key];

                        if(key !== 'selector' && value instanceof Array === false) {

                            if (key !== 'callback' && key !== 'callbackelem') {

                                var valueSet = [];

                                valueSet.push(self.getDefaultPropertyValue(key), value);

                                value = valueSet;
                            }  
                        }

                        keyframes[i].animations[j][key] = value;    // why and what ??

                  });
                }

            }

            $body.height(bodyHeight);

            $window.scroll(0);

            currentWrapper = wrappers[0];

            $(currentWrapper).show();
        },

        convertAllPropsToPx: function() {

            var i, j, k;

            var self = this;

            for(i=0;i<keyframes.length;i++) { 
            
                // loop duration 
                keyframes[i].duration = self.convertPercentToPx(keyframes[i].duration, 'y');
            
                for(j=0;j<keyframes[i].animations.length;j++) { 
                
                    // loop animations
                    Object.keys(keyframes[i].animations[j]).forEach(function(key) { 

                        // loop properties
                        value = keyframes[i].animations[j][key];

                        if(key !== 'selector') {

                            if(value instanceof Array) { // if its an array

                                for(k=0;k<value.length;k++) { // if value in array is %
                              
                                    if(typeof value[k] === "string") {
                                        
                                        if(key === 'translateY') {
                                            
                                            value[k] = self.convertPercentToPx(value[k], 'y');

                                        } else {
                                            
                                            value[k] = self.convertPercentToPx(value[k], 'x');
                                        }
                                    }
                                }
                            } else {
                                
                                if(typeof value === "string") { 

                                    // if single value is a %
                                    if(key === 'translateY') {

                                        value = self.convertPercentToPx(value, 'y');

                                    } else {
                                        
                                        value = self.convertPercentToPx(value, 'x');
                                    }
                                }
                            }
                            
                            keyframes[i].animations[j][key] = value;
                        } 
                    });
                }
            }
        },

        getDefaultPropertyValue: function(property) {
          switch (property) {
            case 'translateX':
              return 0;
            case 'translateY':
              return 0;
            case 'scale':
              return 1;
            case 'rotate':
              return 0;
            case 'opacity':
              return 1;
            default:
              return null;
          }
        },

        /*  Animation/Scrolling
        -------------------------------------------------- */
        updatePage: function() {

          var self = this;

          window.requestAnimationFrame(function() {

            self.setScrollTops();

            if(scrollTop > 0 && scrollTop <= (bodyHeight - windowHeight)) {

              self.animateElements();
              self.setKeyframe();
            }
          });
        },

        setScrollTops: function() {
          scrollTop = $window.scrollTop();
          relativeScrollTop = scrollTop - prevKeyframesDurations;
        },

        animateElements: function() {



            var animation, translateY, translateX, scale, rotate, opacity;

          
            for( var i=0; i<keyframes[currentKeyframe].animations.length; i++ ) {

                animation   = keyframes[currentKeyframe].animations[i];

                if (animation.callback) {

                    var referredKeyframe = animation.callback[0];

                    var callbackElem = animation.callback[1];

                    var $elem = '.' + animation.callbackElem[1];

                    var opacityCallback = this.calcPropValue( animation.opacity, 'opacity');                    

                    var startVal = keyframes[referredKeyframe].animations[callbackElem].translateY[1];

                    translateY  = this.easeInOutQuad(relativeScrollTop, startVal, -1200, keyframes[currentKeyframe].duration);

                    $($elem).css({'transform': 'translateY(' + translateY + 'px)',
                                  'opacity' : opacityCallback
                    });

                } else {

                    translateY  = this.calcPropValue(animation, 'translateY');                    


                    translateX  = this.calcPropValue(animation, 'translateX');
                    scale       = this.calcPropValue(animation, 'scale');
                    rotate      = this.calcPropValue(animation, 'rotate');
                    opacity     = this.calcPropValue(animation, 'opacity');

                    $(animation.selector).css({

                        'transform':    'translate3d(' + translateX +'px, ' + translateY + 'px, 0) scale('+ scale +') rotate('+ rotate +'deg)',
                        'opacity' : opacity
                    });

              }
            }
        },

        calcPropValue: function(animation, property) {
          var value = animation[property];

         // console.log(value);
          if(value) {
            value = this.easeInOutQuad(relativeScrollTop, value[0], (value[1]-value[0]), keyframes[currentKeyframe].duration);
          } else {

           // console.log('default');
            value = this.getDefaultPropertyValue(property);
          }
          // value = +value.toFixed(2)
          // TEMPORARILY REMOVED CAUSE SCALE DOESN'T WORK WITHA AGRESSIVE ROUNDING LIKE THIS
          return value;
        },

        easeInOutQuad: function (t, b, c, d) {
          //sinusoadial in and out
          return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },

        setKeyframe: function() {
          if(scrollTop > (keyframes[currentKeyframe].duration + prevKeyframesDurations)) {

              //console.log(prevKeyframesDurations);

              prevKeyframesDurations += keyframes[currentKeyframe].duration;
              currentKeyframe++;
              //console.log(scrollTop);
              //console.log(currentKeyframe);
              this.showCurrentWrappers();
          } else if(scrollTop < prevKeyframesDurations) {
              currentKeyframe--;
              prevKeyframesDurations -= keyframes[currentKeyframe].duration;
              this.showCurrentWrappers();
          }
        },

        showCurrentWrappers: function() {

          // console.log(currentWrapper);
          // console.log(currentKeyframe);

          var i;

          //console.log(bodyHeight);
          console.log(keyframes.length);

          if(keyframes[currentKeyframe].wrapper != currentWrapper) {
          //  $(currentWrapper).hide();
            $(keyframes[currentKeyframe].wrapper).show();
            currentWrapper = keyframes[currentKeyframe].wrapper;

          //  console.log(currentWrapper);
          }
        },

        /*  Helpers
        -------------------------------------------------- */

        convertPercentToPx: function(value, axis) {
          if(typeof value === "string" && value.match(/%/g)) {
            if(axis === 'y') value = (parseFloat(value) / 100) * windowHeight;
            if(axis === 'x') value = (parseFloat(value) / 100) * windowWidth;
          }
          return value;
        },

        throwError: function() {
          $body.addClass('page-error');
        },

        isTouchDevice: function() {
          return 'ontouchstart' in window || 'onmsgesturechange' in window; // works on ie10
        }

  };

  Kubrick.defaults = Kubrick.prototype.defaults; // now used as the default set, but must be for other purposes

  // $.fn.kubrick = function(options) {
  //   return this.each(function() {
  //     //console.log(options);
  //     //new Kubrick(this, options).init();
  //   });
  // };

  window.Kubrick = Kubrick;
})(window, jQuery);
