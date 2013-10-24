// Calls to action for non-user
$(function(){

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

/* Set noted property and handle notebook plurals */
$(function(){

	var userPhotos = user.notebook.photos;

	$.each(userPhotos, function(index, userPhoto){
		$('.add-notebook-form').each(function(index, form){
			var photoUrl = $(form).find('#img-url').val();
			if (photoUrl == userPhoto) {
				var noteBtn = $(form).find('.btn');	  
			  noteBtn.attr('disabled', true);
			  noteBtn.val('Noted');

			  /* Set noted property of photo to true to pass to modals */
			  var photoFinder = $(form).next().find('.photo-img').attr('finder');
			  photos[photoFinder].noted = true;
				return false;
			}
		});
	});

	/* Handle notebook count plurals */
	$('.notebook-count').each(function(i, obj){
		if ($(obj).html() == "1 Notebooks") {
			$(obj).html('1 Notebook');
		}	
	});

});

/* Handle noting photos */
$(function(){

	$('.add-notebook-form').submit(function(){
	  var url = "/notebook1"; // the script where you handle the form input.
	  var form = $(this);
	  var noteBtn = form.find('.btn');
	  
	  noteBtn.attr('disabled', true);
	  noteBtn.val('Noted');

	  /* Set noted property of photo to true to pass to modals */
	  var photoFinder = $(form).next().find('.photo-img').attr('finder');
	  photos[photoFinder].noted = true;
	  photos[photoFinder].newNote = true;
	  
	  var notebookText = form.parent().siblings().first().children().first(); // Refactor replace with selector
	  var notebookHTML = notebookText.html();
	  var notebookCount = parseInt(notebookHTML, 10) + 1;

	  if (notebookCount == 1) {
	  	notebookText.html("1 Notebook");
	  } else {
	  	notebookText.html(notebookCount + " " + "Notebooks");
	  }

	  $.ajax({
	    type: "POST",
	    url: url,
	    data: form.serialize(), // serializes the form's elements.
	  });

	  window.history.pushState({stateObj: 'noted'}, '', '?noted');

	  return false; // avoid executing the actual submit of the form.
	});
	
});