$(window).load(function() {
    $("#preloader-wrapper").fadeOut("slow");
	var menuItems = document.querySelectorAll("#top-nav li");
	menuItems.forEach(
		function( currentValue, currentIndex ){
			currentValue.style.transitionDelay = (currentIndex*0.025) + 0.045 + "s";
		},
	);
});

$(document).ready(function(){


     
    //animated header class
    $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
     //console.log(scroll);
    if (scroll > 200) {
        //console.log('a');
        $(".navigation").addClass("animated");
    } else {
        //console.log('a');
        $(".navigation").removeClass("animated");
    }});



    $(".gallery-slider").owlCarousel(
        {
        pagination : true,
        autoPlay : 5000,
        itemsDesktop  :  [1500,4],
        itemsDesktopSmall :  [979,3]
        }
    );

    // Gallery Popup
    $('.image-popup').magnificPopup({type:'image'});



});







