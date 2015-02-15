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


    // We put the last image before the first
    imgList.first().before(imgList.last());

    // Binding an event onto out navs
    $('.carousel-nav').find('a').on('click', function(event){

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

        }, 500, function(){

            if (direction === 'next') {

                imageLast.after(imageFirst);

            } else {

                imageFirst.before(imageLast);
                
            }

            container.css({ 'left': '-605px' }); // This is a hack, not very helpful in making the carousel responsive
            
        });
    };

});