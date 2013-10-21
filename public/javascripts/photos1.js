// Set "note it" btns and notebook plural to override HTML on page 
$(function(){
	
	/* Handle notebook count plurals */
	$('.notebook-count').each(function(i, obj){
		if ($(obj).html() == "1 Notebooks") {
			$(obj).html('1 Notebook');
		}	
	});

	/* Disable noted buttons */
	var userPhotos = user.notebook.photos;

	$('.add-notebook-form').each(function(i, form){
		var photoUrl = $(form).find('#img-url').val();
		var noteBtn = $(form).find('.add-to-nb-btn');

		$.each(userPhotos, function(index, object){
			if (object == photoUrl) {
				noteBtn.attr('disabled','disabled');
				noteBtn.val('Noted');
				return false;
			}
		});
	});

});

Handle photo modal display on '.photo-img' click
$(function(){

	$('.photo-img').on('click', function(){
		
		/* Set modal photo and attributes*/
		var displayPhotoURL = this.src;
		var finder = $(this).attr('finder');
		$('#pm-photo').attr('src', photos[finder].url);
		/* This is for photos-bou.js -- refactor */
		$('#pm-photo').attr('finder', finder);

		/* Set modal "+ Note it" btn  attributes */
	 	var formID = "#" + finder;
	 	var containerDiv = $(formID);
	 	var noteBtnFind = containerDiv.find('.add-to-nb-btn');

	 	var modalNoteBtn = $('#add-to-nb-btn-pm');
	 	if (noteBtnFind.val() == "Noted") {
			modalNoteBtn.attr('disabled','disabled');
			modalNoteBtn.val('Noted');
		} else {
			modalNoteBtn.removeAttr('disabled');
			modalNoteBtn.val('+ Note it');
		};

		/* Set img url for form input */
		var photoObj = photos[finder];
		$('#pm-img-url').val(photoObj.url);

		/* Set notebook count HTML */
		var notebookHTML = containerDiv.find('.notebook-count').html();
		$('#pm-notebook-count').html(notebookHTML);

	});

	

});
