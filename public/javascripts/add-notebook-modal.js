/* Allow for bootstrap modal within a modal */
$(function(){
	$.fn.modal.Constructor.prototype.enforceFocus = function () {};
});

/* Set add-notebook-modal */
$(function(){

	$('.add-to-nb-btn').on('click', function(){
		var photoUrl = $(this).prev('#img-url').val();
		var photoFinder = $(this).prev('#img-url').attr('finder');
		$('#add-photo-url').val(photoUrl);
		$('#add-photo-url').attr('finder', photoFinder);
	})

	$('#add-to-nb-btn-pm').on('click', function(){
		var photoUrl = $('#pm-photo').attr('src');
		var photoFinder = $('#pm-photo').attr('finder');
		$('#add-photo-url').val(photoUrl);
		$('#add-photo-url').attr('finder', photoFinder);
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

/* Handle adding photos to notebooks */
$(function(){

	$('#ap-modal-form').submit(function(){
	  var url = "/notebook1"; // the script where you handle the form input.
	  var form = $(this);
	  
	  $('#photos-add-photos-modal').modal('hide');

	  /* Update comments on photos page */
	  var commentsBox = form.find('.ap-modal-textarea'); 
		var newComment = commentsBox.val();

		/* Handle comments for the photos page */
		var finder = parseInt($('#add-photo-url').attr('finder'), 10);
		var containerDiv = $('#' + finder);
		var newCommentHTML = "<div class='comment-text-container'><p class='comments-name'>" + user.firstName + ' ' + user.lastName + "</p><p class='comments-text'>" + newComment.replace(/\n/g,'<p>') + "</p></div>";
		containerDiv.find('.comments-content-container').prepend(newCommentHTML);

		/* Handle creating a notebook */
		var newNotebook = $('#select-notebook option').val();

		function checkNotebook(notebook){
			if (notebook == newNotebook) {
				return true;
			} else {
				return false;
			}
		}

		/* If the notebook does not already exist, then add it to options */
		if (user.notebooks.some(checkNotebook) == false) {
			$('#select-notebook-options-ctn').append('<option>' + newNotebook + '</option>');
			$('#create-notebook-input').val("");
		}

		// /* Handle comments in photos modal view */
		if (photos[finder].newCommentHTML) {
			photos[finder].newCommentHTML = "<div class='comment-text-container'><p class='comments-name'>" + user.firstName + ' ' + user.lastName + "</p><p class='comments-text'>" + newComment.replace(/\n/g,'<p>') + "</p></div>" + photos[finder].newCommentHTML;
		} else {
			photos[finder].newCommentHTML = "<div class='comment-text-container'><p class='comments-name'>" + user.firstName + ' ' + user.lastName + "</p><p class='comments-text'>" + newComment.replace(/\n/g,'<p>') + "</p></div>";	
		};

	  $.ajax({
	    type: "POST",
	    url: url,
	    data: form.serialize(), // serializes the form's elements.
	  })
			.done(function() {
	    	commentsBox.val('');
	  	});

	  window.history.pushState({stateObj: 'noted'}, '', '?noted');

	  return false; // avoid executing the actual submit of the form.
	});
	
});