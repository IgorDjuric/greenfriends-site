
$(document).ready(function () {
    var divs = $('section');
    var dir = 'up'; // wheel scroll direction
    var div = 0; // current div
    $(document.body).on('DOMMouseScroll mousewheel', function (e) {
        if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
            dir = 'down';
        } else {
            dir = 'up';
        }
        // find currently visible div :
        div = -1;
        divs.each(function(i){
            if (div<0 && ($(this).offset().top >= $(window).scrollTop())) {
                div = i;
            }
        });
        if (dir == 'up' && div > 0) {
            div--;
        }
        if (dir == 'down' && div < divs.length) {
            div++;
        }
        //console.log(div, dir, divs.length);
        $('html,body').stop().animate({
            scrollTop: divs.eq(div).offset().top
        }, 1000);
        return false;
    });
    $(window).resize(function () {
        $('html,body').scrollTop(divs.eq(div).offset().top);
    });


    jQuery('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = jQuery(this.hash);
                target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    jQuery('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var jQuerytarget = jQuery(target);
                        jQuerytarget.focus();
                        if (jQuerytarget.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            jQuerytarget.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            jQuerytarget.focus(); // Set focus again
                        }
                        ;
                    });
                }
            }
        });
});