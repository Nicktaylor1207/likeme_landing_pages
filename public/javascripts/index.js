$(function(){

	$('#myCarousel').carousel({
		interval: 4000,
		// pause: "false"
	});

	$('img.landing-bg').on('click', function(){	
		$('#myCarousel').carousel('next');
	});

});