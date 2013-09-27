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
		var dup = false;

		$.each(userPhotos, function(index, object){
			if (object == photoUrl) {
				noteBtn.attr('disabled','disabled');
				noteBtn.val('Noted');
				return false;
			}
		});
	});

	// Refactor - this should go away if it is handled on update

})

// Handle photo modal display on '.photo-img' click
$(function(){
	
	var photoModal = $('#photo-modal');

	$('.photo-img').on('click', function(){
		
		/* Set modal photo and attributes*/
		var displayPhotoURL = this.src;
		var displayPhotoFinder = $(this).attr('finder');
		$('#pm-photo').attr('src', displayPhotoURL);
		$('#pm-photo').attr('finder', displayPhotoFinder);

		/* Set modal "+ Note it" btn  attributes */
		var finder = $(this).attr('finder');
	 	var formID = "#" + finder;
	 	var containerDiv = $(formID);
	 	var noteBtnFind = containerDiv.find('.add-to-nb-btn');

	 	var modalNoteBtn = $('#add-to-nb-btn-pm');
	 	if (noteBtnFind.val() == "Noted") {
			modalNoteBtn.attr('disabled','disabled');
			modalNoteBtn.val('Noted');
		}

		/* Set img url for form input */
		var photoObj = photos[displayPhotoFinder];
		$('#pm-img-url').val(photoObj.url);
		console.log($('#pm-img-url').val());

		/* Set notebook count HTML */
		var notebookHTML = containerDiv.find('.notebook-count').html();
		$('#pm-notebook-count').html(notebookHTML);
		console.log($('#pm-notebook-count').html());

	});

	photoModal.on('shown', function(){
		/* Set style modal css */
		var styles = {
			backgroundColor: "#161616",
			opacity: "1"
		};
		$('.modal-backdrop').css(styles);		
	});

});

