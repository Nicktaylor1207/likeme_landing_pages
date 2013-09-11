$(function(){	

	if ( $.cookie("scroll-bou") !== null ) {
	  $(document).scrollTop( $.cookie("scroll-bou") );
	}

	$(window).on('unload', function(){
		$.cookie("scroll-bou", $(document).scrollTop(), { expires: 1 } );
	});

})