$(document).ready(function(){

    // Vertical Pager
    var $pager = $('.pager ul li');

    $pager.each(function(){

        $(this).click(function(event){

            animatingup = true;
            animatingdown = true;

            $pager.each(function(event){

                $(this).removeClass('bullit-selected');
            });

            $(this).addClass('bullit-selected');

            var slideNumber = '.slide-' + $(this).data('val');

            currentSlide = $(this).data('val');
            document.location.hash = 'slide-' + currentSlide;


            if ($(this).data('val') == 1) {

                var scrollTopVal = 0;

            } else {

                var scrollTopVal = $(slideNumber).offset().top;
            }


            $('html, body').animate({
                scrollTop: scrollTopVal
            }, 300, function(){

                setTimeout(function(){

                    // put some timer here!!
                    animatingup = false;
                    animatingdown = false;

                }, 1300);


            });

        });
    });


    // Parallax
    var $container = $(".parallax");

    var $divs = $container.find("div.parallax-background");
    var $subdivs = $container.find("div.subcontent");
    var $slides = $container.find("li");
    var thingBeingScrolled = document.body;
    var liHeight =  $divs.eq(0).closest("li").height();
    var diffHeight = $divs.eq(0).height() -  liHeight;
   
    var i,len,div, subdiv,li,offset,scroll,top;
   
    var render = function() {
           
        //thing we're scrolling
        top = thingBeingScrolled.scrollTop;
       
        //loop through divs
        for(i=0,len=$divs.length;i<len;i++) {
               
                //get one div
                div = $divs[i];
                subdiv = $subdivs[i];
               
                //calculate the offsetTOP of div
                offset = $(div).offset().top;  
               
                //calculate the amount to scroll
                scroll = Math.round(((top - offset) / liHeight) * diffHeight);

               
                //apply the scroll amount
                div.style.webkitTransform = "translate3d(0px,"+scroll+"px,0px)";
                subdiv.style.webkitTransform = "translate3d(0px,"+ (2 * scroll) + "px,0px)";
       
        }           
    };


    // Scroll pagination    
    var slides = 5;
    var currentSlide = 1;

    // Determine the current slide on page reload
    if (document.location.hash) { 
        currentSlide = parseInt(document.location.hash.replace('#slide-', ''));
        $($pager[currentSlide - 1]).addClass('bullit-selected');
    } else {
        $($pager[0]).addClass('bullit-selected');
    }


    var nextSlide = currentSlide + 1; 
    
    if (nextSlide > slides) { 
        nextSlide = slides; 
    }

    var prevSlide = currentSlide - 1; 

    if (prevSlide < 1) { 
        prevSlide = 1; 
    }
    
    var animatingup = false;
    var animatingdown = false;

    var windowObject = $(window);
    var animatedBody = $('html, body');
    var slideTop, windowHeight;


    var framePosition = function(){

        if (animatingup === true) { 
          //  console.log("animating up..."); 
            return; 
        }

        if (animatingdown === true) { 
           // console.log("animating down..."); 
            return; 
        }
        
        nextSlide = currentSlide + 1; 
            
        if (nextSlide > slides) { 
            nextSlide = slides; 
        }

        prevSlide = currentSlide - 1; 

        if (prevSlide < 1) { 
            prevSlide = 1; 
        }
            
        slideTop = thingBeingScrolled.scrollTop;
        windowHeight = windowObject.height();

        if (animatingup === false) {
            if ( slideTop + windowHeight >= $(".slide-"+(nextSlide)).offset().top + 50 ) {
                if (nextSlide > currentSlide) {
                    
                    animatingdown = true;
                    var p2 = $( ".slide-"+(nextSlide) );
                    var slideHeight = p2.position().top;

                    $pager.each(function(event){

                        $(this).removeClass('bullit-selected');
                    });

                    $($pager[currentSlide]).addClass('bullit-selected');
                    
                    animatedBody.animate({ scrollTop: slideHeight }, 500, function() { 
                        currentSlide = nextSlide;
                        animatingdown = false; 
                        document.location.hash = 'slide-' + currentSlide;
                    });

                    return;
                }
            }
        }


        if (animatingdown === false) {
            if ( slideTop <= $(".slide-"+(currentSlide)).offset().top - 50 ) {
                if (prevSlide < currentSlide) {
                    
                    animatingup = true;
                    var p2 = $( ".slide-"+(currentSlide) );
                    var slideHeight = p2.position().top- windowObject.height();

                    $pager.each(function(event){

                        $(this).removeClass('bullit-selected');
                    });


                    $($pager[currentSlide - 2]).addClass('bullit-selected');

                    animatedBody.animate({ scrollTop: slideHeight }, 500, function() { 
                        currentSlide = prevSlide; 
                        animatingup = false; 
                        document.location.hash = 'slide-' + currentSlide;
                    });

                    return;
                }
            }
        }
        
    };
   
    (function loop(){
            requestAnimationFrame(loop);
            render();
            framePosition();
    })();



});