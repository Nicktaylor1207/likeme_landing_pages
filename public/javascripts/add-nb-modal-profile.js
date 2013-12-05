/* Allow for bootstrap modal within a modal */
$(function(){
	$.fn.modal.Constructor.prototype.enforceFocus = function () {};
});

$(function(){

	$('#add-to-nb-btn-pm').on('click', function(){
		var pmSrc = $('#pm-photo').attr('src');
		if (pmSrc[0] == '/') {
			var photoUrl = pmSrc.slice(1);
		} else {
			var photoUrl = pmSrc;
		}
		var photoFinder = $('#pm-photo').attr('finder');
		$('#add-photo-url').val(photoUrl);
		$('#add-photo-url').attr('finder', photoFinder);
	});
		
	/* Set the heigth of notebooks options in notebook modal */
	var selectNbOptions = $('#select-notebook-options-ctn');
	if (user) {
		if (user.notebooks.length == 0) {
			selectNbOptions.hide();
		} else {
			selectNbOptions.attr('size', user.notebooks.length)
		}
	}

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

/* Handle adding photos and comments to notebooks */
$(function(){

	$('#ap-modal-form').on('submit', function(){
	  $('#select-notebook-options-ctn').show();

	  var url = "/notebook1";
	  var form = $(this);
	  
	  $('#photos-add-photos-modal').modal('hide');

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
		var commentsBox = form.find('.ap-modal-textarea'); 
		var newComment = commentsBox.val();
		
		if (newComment != "") {
			var newCommentHTML = "<div class='comment-text-container'><a href='/pro-profile-view/" + user.email + "'><p class='comments-name'>" + user.firstName + ' ' + user.lastName + "</p></a><p class='comments-text'>" + newComment.replace(/\n/g,'<p>') + "</p></div>";
			$('#pm-comment-container-inner').prepend(newCommentHTML);

			var nbFinder = parseInt($('#photo-modal').attr('nbFinder'), 10);
			var photos = notebooks[nbFinder].photoObjects;
			var finder = parseInt($('#pm-photo').attr('finder'), 10);

			if (photos[finder].newCommentHTML) {
				photos[finder].newCommentHTML = newCommentHTML + photos[finder].newCommentHTML;
			} else {
				photos[finder].newCommentHTML = newCommentHTML;
			};

		}

	  $.ajax({
	    type: "POST",
	    url: url,
	    data: form.serialize(), // serializes the form's elements.
	  })
			.done(function() {
	    	commentsBox.val('');
	    	$('.ap-modal-textarea').val('');
	  	});

	  $('#photo-modal').focus();

	  window.history.pushState({stateObj: 'noted'}, '', '?noted');

	  return false; // avoid executing the actual submit of the form.
	});
	
});