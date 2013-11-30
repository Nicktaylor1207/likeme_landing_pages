/* Allow for bootstrap modal within a modal */
$(function(){
	$.fn.modal.Constructor.prototype.enforceFocus = function () {};
});

$(function(){

	$('#add-to-nb-btn-pm').on('click', function(){
		var photoUrl = $(this).prev('#pm-img-url').val();
		$('#add-photo-url').val(photoUrl);
	})
		
	if (user.notebooks && user.notebooks.length > 0) {
		
		var notebooks = user.notebooks;
		$('#select-notebook').html('<option>' + $(notebooks).last()[0] + '</option>');

		var options = "";

		$.each(notebooks, function(index, notebook){
			options += '<option>' + notebook + '</option>';
			$('#select-notebook-options-ctn').html(options);
		});

	} else {
		
		$('#select-notebook').html('<option>' + 'Create New Notebook' + '</option>');
	
	}
	
	$('#photos-add-photos-modal').on('hidden', function(){
		$('#select-notebook-ctn').hide();
	});

	$('#select-notebook-options-ctn option').on('click', function(){
		$('#select-notebook').html('<option>' + $(this).val() + '</option>');
		$('#select-notebook-ctn').hide();
	});

	$('#create-notebook-btn').on('click', function(){
		if ($('#create-notebook-input').val() != "") {
			$('#select-notebook').html('<option>' + $('#create-notebook-input').val() + '</option>');
		}
		$('#select-notebook-ctn').hide();
	});

});

$(function(){
	/* Handle "Note" form submit from modal */
	$('#ap-modal-form').submit(function(){
	  var url = "/notebook1"; // POST form route
	  var form = $(this);
	  
	  var noteBtn = $('#add-to-nb-btn-pm');
	  noteBtn.attr('disabled', true);
	  noteBtn.val('Noted');

		var nbFinder = parseInt($('#photo-modal').attr('nbFinder'), 10);
		var nbPhotos = notebooks[nbFinder].photoObjects;
		var finder = parseInt($('#pm-photo').attr('finder'), 10);
		var photoObj = nbPhotos[finder];
	  photoObj.noted = true;
	  photoObj.newNote = true;

	  $.ajax({
	    type: "POST",
	    url: url,
	    data: form.serialize(), // serializes the form's elements.
	  });

	  $('#photo-modal').focus();

	  return false; // avoid to execute the actual submit of the form.
	});
});