$(document).ready(function($){

    'use strict';

    // Caching the DOM and setting some variables
    var carouselUl      = $('.carousel').children('ul'),
        imgList         = carouselUl.find('li'),
        navButtons      =  $('.carousel-nav').find('a'),
        imgs            = carouselUl.find('img'),
        imgWidth        = imgs.first().width(),
        imgsLength      = imgs.length,
        current         = 1,
        totalImgsWidth  = imgWidth * imgsLength,
        countImgs       = 0;


    // Binding an event onto out navs
    navButtons.click(function(event){

        var direction   = $(this).data('dir'),
            location    = imgWidth;

        event.preventDefault();

        getCurrent(direction);
        transition(carouselUl, location, direction);
    });


    // Keeping track the current slide. 
    // It is not used, but can be useful 
    var getCurrent = function(direction){
        
        if (direction === 'next') {

            current++;

        } else {

            current--;
        }

        return current;
    };

    // A common configuration for slide transition,
    // while making sure the carousel is circular
    var transition = function(container, location, direction){

        var images = container.find('li'),
            imageFirst = images.first(),
            imageLast = images.last();

        var unit = direction === 'next' ? '-=' : '+=';

        container.animate({

            'left': unit + location + 'px'

        }, 10, function(){

            if (direction === 'next') {

                imageLast.after(imageFirst);

            } else {

                imageFirst.before(imageLast);
                
            }            
        });
    };



    // Photoswipe

    var galleryElements = $('.gallery-container li');


    var openPhotoSwipe = function(index) {

        var pswpElement = $('.pswp')[0];

        var items = [];

        var item;

        galleryElements.each(function(el){

            //console.log(el);

            var linkEl = $(this).find('a').attr('href');

            item = {
                src: linkEl,
                w: 640,
                h: 427
            };

            items.push(item);
        });

        // define options (if needed)
        var options = {
         
            history: false,
            focus: false,
            index: index,

            showAnimationDuration: 0,
            hideAnimationDuration: 0
            
        };
        
        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

        gallery.init();

        var currentIndex = gallery.getCurrentIndex();


        event.preventDefault();

        //getCurrent(direction);
        //
        var location = (currentIndex - current - 1) * imgWidth;
        transition(carouselUl, location, 'next');

        console.log(currentIndex);

        console.log(current);

    };



    galleryElements.each(function(index){

        $(this).click(function(e){

            e.preventDefault();

            openPhotoSwipe(index);
        });
    });

});