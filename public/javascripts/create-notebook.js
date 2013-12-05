$(function(){

	$('#create-nb-modal-form').on('submit', function(){
		
		$('#create-nb-add-photos-modal').modal('hide');
		var photoUrl = $('#photo-link').val();
		
		/* Update the photoCounter */
		var photoCounter = $('#photoCounter');
		var count = parseInt(photoCounter.val()) + 1;
		photoCounter.attr('value', count);

		/* Append the photo input */
		var newPhotoInput = "<input class='create-nb-photo-input hide' name='url" + count + "' value=" + photoUrl + "></input>";
		$('#create-nb-add-photos-container').append(newPhotoInput);

		/* Append the photo */
		var newPhotoDiv = "<div class='create-notebook-photo' style='background-image: url(" + photoUrl + ")'></div>";
		$('#create-nb-add-photos-container').append(newPhotoDiv);

		$('#photo-link').val('');
		return false; // avoid executing submit of the form
	});

});

$(function(){

	// $('#create-nb-form').on('submit', function(){
	// 	$('#photoCounter').val(0);
	// });

});