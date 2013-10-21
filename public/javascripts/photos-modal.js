$(function(){
	$('.photo-img').on('click', function(){
		
		/* Photo attributes should be set with photoObj and finder */
		var finder = parseInt($(this).attr('finder'), 10);
		var photoObj = photos[finder];

		/* Set modal photo */
		$('#pm-photo').attr('src', photoObj.url);

		/* Set modal finder */
		$('#pm-photo').attr('finder', finder);

		/* Set img url for form input */
		$('#pm-img-url').val(photoObj.url);

		/* Set noted property of modal + Note it button */
		var noteBtn = $('#add-to-nb-btn-pm');
		function setNotedBtn(photo) {
			if (photo.noted == true) {
				noteBtn.attr('disabled', true);
				noteBtn.val('Noted');
			} else {
				noteBtn.attr('disabled', false);
				noteBtn.val('+ Note it');
			}
		}
		setNotedBtn(photoObj);

		/* Set notebook count HTML */
		function setNotebookCount(photo){
			if (photo.newNote == true) {
				var notebookCount = photoObj.liked + 1;
			} else {
				var notebookCount = photoObj.liked;
			}
			if (notebookCount == 1) {
				var notebookHTML = notebookCount + " " + "Notebook"
			} else {
				var notebookHTML = notebookCount + " " + "Notebooks"
			}
			$('#pm-notebook-count').html(notebookHTML);
		}
		setNotebookCount(photoObj);

		/* Handle photo modal internal navigation */
		$('.pm-arrow').on('click', function(){
			if (this.id == "pm-arrow-right") {
				if (photos[finder + 1]) {
					finder++
				} else {
					finder = 0;
				}
			} else {
				if (photos[finder - 1]) {
					finder--
				}
			}
			
			photoObj = photos[finder];
			var pmPhoto = $('#pm-photo');
			pmPhoto.attr('src', photoObj.url);
			pmPhoto.attr('finder', finder);
			$('#pm-img-url').val(photoObj.url);
			
			setNotedBtn(photoObj);
			setNotebookCount(photoObj);
			
			return false;
		});

		/* Set modal style and handle history and esc navigation */
		(function(){
			var photoModal = $('#photo-modal');

			photoModal.on('shown', function(){
				/* Set style modal css */
				var styles = {
					backgroundColor: "#161616",
					opacity: "1"
				};
				$('.modal-backdrop').css(styles);	

				/* Set history and modal esc navigation */
				window.history.pushState({path:'pm'},'','pm');

				photoModal.on('hidden', function(){
					if (location.href.indexOf('pm') != -1) {
						window.history.back();
					}
				});

				window.onpopstate = function(e){
					if (JSON.stringify(e.state) == "null") {
						photoModal.modal('hide');
					}
				};

			});
		}).call(this);

		/* Handle "+ Note it" form submit from modal */
		$('#add-notebook-form-pm').submit(function(){
		  var url = "/notebook1"; // the script where you handle the form input.
		  var form = $(this);
		  
		  noteBtn.attr('disabled', true);
		  noteBtn.val('Noted');

		  /* Update notebook count */
		  var notebookText = $('#pm-notebook-count');
		  var notebookHTML = notebookText.html();
		  var notebookCount = parseInt(notebookHTML, 10) + 1;
		  if (notebookCount == 1) {
		  	notebookText.html("1 Notebook");
		  } else {
		  	notebookText.html(notebookCount + " " + "Notebooks");
		  }

		  // photoObj.noted = true;
		  // photoObj.newNote = true;

		  $.ajax({
		    type: "POST",
		    url: url,
		    data: form.serialize(), // serializes the form's elements.
		  });

		  return false; // avoid to execute the actual submit of the form.
		});

	});
});