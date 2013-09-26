$(function(){

	$('#photo-modal').modal();

	// $(document).keyup(function(e) {
	// 	if (e.keyCode == 27) {   				// esc
	// 		$('#photo-modal').modal('hide');
	// 	}
	// });

	$('#photo-modal').on('hidden', function(){
		window.history.back()
	});	

	$('#photo-modal').on('click', function(){
		$('#photo-modal').modal('hide');
	}).children().on('click', function(){
		return false;
	})

});