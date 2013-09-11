$(function(){	

	if ( $.cookie("scroll-ny") !== null ) {
	  $(document).scrollTop( $.cookie("scroll-ny") );
	}

	$(window).on('unload', function(){
		$.cookie("scroll-ny", $(document).scrollTop(), { expires: 1 } );
	});

});