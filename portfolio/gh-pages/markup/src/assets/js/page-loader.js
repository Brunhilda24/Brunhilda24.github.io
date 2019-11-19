$(document).ready( function() {

    // HOME PAGE HEIGHT
    $(window).on('load', function() {
        // will first fade out the loading animation
        $(".loader").fadeOut();
        // will fade out the whole DIV that covers the website.
        $(".preloader").delay(1000).fadeOut("slow");
    });

    // RESPONSIVE MENU
    $('.nav-icon').click(function(){
        $('body').toggleClass('full-open');
    });

    if ($('.element').length) {
        $('.element').each(function () {
            $(this).typed({
                strings: [$(this).data('text1'), $(this).data('text2'), $(this).data('text3')],
                loop: $(this).data('loop') ? $(this).data('loop') : false ,
                backDelay: $(this).data('backdelay') ? $(this).data('backdelay') : 2000 ,
                typeSpeed: 10,
            });
        });
    }

});


