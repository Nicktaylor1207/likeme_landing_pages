$(function(){

	$('#create-nb-modal-form').on('submit', function(){
		
		$('#create-nb-add-photos-modal').modal('hide');
		var photoUrl = $('#photo-link').val();
		
		/* Update the photoCounter */
		var photoCounter = $('#photoCounter');
		var count = parseInt(photoCounter.val()) + 1;
		
		/* 11 photo max */
		if (count > 10) {
			alert("You've reached the max for uploading photos. Please create the notebook.");
			$('#create-nb-add-photo-cta').hide();
		}

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

/* Front-end photo validation */
// $(function(){
// 	$('#nb-notebooks-modal-form').submit(function(){
// 		var form = $('#nb-notebooks-modal-input');
// 		var form_val = form.val();
// 		if (form_val.match(/\.jpg|\.jpeg|\.png|\.gif/) == null) {
// 			alert("Oops! Not an image make sure the url is a .jpg, .jpeg, .png or .gif");
// 			return false;
// 		}
// 	});
// });