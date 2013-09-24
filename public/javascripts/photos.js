// $(function(){
// 	$('.source').each(function(i, obj){
// 		var $source = $(this).html();
// 		if ($source.length > 30) {
// 			var $newLink = $source.slice(0,29) + "...";
// 			$(this).html($newLink);
// 		} 
// 	});
// });

$(function(){
	
	// $('.add-notebook-form').submit(function(){
	// 	if (navLogin == false) {
	// 		alert("Must be logged in to add photos to Notebook. Please log in.");
	// 		return false;
	// 	}
	// });

	if (navLogin == false) { 

		$(window).scroll(function(){
			$('#signup-cta-modal-2').animate({top: "44"}, 600);
		});

		$('.photo-img-container').hover(
			function(){
				$(this).find('.save-btn').show();
				$(this).find('.photo-img').addClass("photo-img-hover");
			}, function(){
				$(this).find('.save-btn').hide()
				$(this).find('.photo-img').removeClass("photo-img-hover");
		});

		$('.add-to-nb-btn').on('click', function(){
			$('#signup-modal').modal();
			$('#signup-cta-modal-2').hide();
			return false;
		});

		$('.save-btn').on('click', function(){
			$('#signup-modal').modal();
			$('#signup-cta-modal-2').hide();
			return false;
		});

		$('.photo-img').on('click', function(){
			$('#signup-modal').modal();
			$('#signup-cta-modal-2').hide();
			return false;
		});

		$('#signup-modal').on('hidden', function () {
    	$('#signup-cta-modal-2').show();
		})

	}

});

$(function(){
	
	$('.notebook-count').each(function(i, obj){
		if ($(obj).html() == "1 Notebooks") {
			$(obj).html('1 Notebook');
		}	
	})

})

// $(function(){

// 	$('.add-to-nb-btn').on('click', function(){
// 		$(this).val('Noted');
// 	})

// })