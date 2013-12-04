$(function(){

	$('#create-nb-modal-form').on('submit', function(){
		
		$('#create-nb-add-photos-modal').modal('hide');
		
		/* append the photo */
		var newPhoto = "<div class='create-notebook-photo' style='background-image: url(images/store_fronts/10.jpg)'></div>"
		$('#create-nb-add-photos-container').append(newPhoto);

		return false; // avoid executing submit of the form
	});



});