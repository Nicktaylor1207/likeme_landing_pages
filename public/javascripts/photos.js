$(function(){
	$('.source').each(function(i, obj){
		var $source = $(this).html();
		if ($source.length > 30) {
			var $newLink = $source.slice(0,29) + "...";
			$(this).html($newLink);
		} 
	});

});