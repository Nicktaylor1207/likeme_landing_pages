$(function(){
	
	function setNotedBtn(photo) {
		var noteBtn = $('#add-to-nb-btn-pm');
		if (photo.noted == true) {
			noteBtn.attr('disabled', true);
			noteBtn.val('Noted');
		} else {
			noteBtn.attr('disabled', false);
			noteBtn.val('Add to Notebook');
		}
	}

	// function setNotebookCount(photo){
	// 	var finder = parseInt($('#pm-photo').attr('finder'), 10);
	// 	var photoObj = photos[finder];
	// 	if (photo.newNote == true) {
	// 		var notebookCount = photoObj.liked + 1;
	// 	} else {
	// 		var notebookCount = photoObj.liked;
	// 	}
	// 	if (notebookCount == 1) {
	// 		var notebookHTML = notebookCount + " " + "Notebook"
	// 	} else {
	// 		var notebookHTML = notebookCount + " " + "Notebooks"
	// 	}
	// 	$('#pm-notebook-count').html(notebookHTML);
	// }

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

		/* Set noted property of modal Note button */
		setNotedBtn(photoObj);

		/* Set notebook count HTML */
		// setNotebookCount(photoObj);

	});

	/* Handle photo modal internal navigation */
	(function(){

		$('.pm-arrow').on('click', function(){
			var finder = parseInt($('#pm-photo').attr('finder'), 10);
			if (this.id == "pm-arrow-right") {
				if (photos[finder + 1]) {
					finder++
				} else {
					finder = 0;
				}
			} else {
				if (photos[finder - 1]) {
					finder--
				} else {
					finder = photos.length - 1;
				}
			}
			
			var photoObj = photos[finder];
			$('#pm-photo').attr('src', photoObj.url);
			$('#pm-photo').attr('finder', finder);
			$('#pm-img-url').val(photoObj.url);
			
			setNotedBtn(photoObj);
			// setNotebookCount(photoObj);

			setTags();

			// $.cookie("scroll", 6000, { expires: 1 } );
			
			return false;
		});

	}).call(this);

	/* Navigation on click of photo */
	(function(){

		$('#pm-left-ctn').on('click', function(e){
			if (e.target.id == 'pm-left-ctn' || e.target.id == 'pm-photo') {
				var finder = parseInt($('#pm-photo').attr('finder'), 10);
				if (photos[finder + 1]) {
					finder++
				} else {
					finder = 0;
				}
				
				var photoObj = photos[finder];
				$('#pm-photo').attr('src', photoObj.url);
				$('#pm-photo').attr('finder', finder);
				$('#pm-img-url').val(photoObj.url);
				
				setNotedBtn(photoObj);
				// setNotebookCount(photoObj);

				setTags();
				
				return false;
			}
		});

	}).call(this);

});

$(function(){
	/* Handle "Note" form submit from modal */
	$('#add-notebook-form-pm').submit(function(){
	  var url = "/notebook1"; // the script where you handle the form input.
	  var form = $(this);
	  
	  var noteBtn = $('#add-to-nb-btn-pm');
	  noteBtn.attr('disabled', true);
	  noteBtn.val('Noted');

	  /* Update notebook count */
	  // var notebookText = $('#pm-notebook-count');
	  // var notebookHTML = notebookText.html();
	  // var notebookCount = parseInt(notebookHTML, 10) + 1;
	  // if (notebookCount == 1) {
	  // 	notebookText.html("1 Notebook");
	  // } else {
	  // 	notebookText.html(notebookCount + " " + "Notebooks");
	  // }

    /* Set the corresponding button and notebook counts */
    (function(){
	    var formFinder = $('#pm-photo').attr('finder');
	   	var divID = "#" + formFinder;
	   	var containerDiv = $(divID);
	   	var noteBtnFind = containerDiv.find('.add-to-nb-btn');

	   	/* Set btn to noted */
	  	noteBtnFind.attr('disabled','disabled');
	    noteBtnFind.val('Noted');

	    /* Set notebook counter correctly */
	    // var notebookText = containerDiv.find('.notebook-count');
	    // var notebookHTML = notebookText.html();
	    // var notebookCount = parseInt(notebookHTML) + 1;

	    // if (notebookCount == 1) {
	    // 	notebookText.html("1 Notebook");
	    // } else {
	    // 	notebookText.html(notebookCount + " " + "Notebooks");
	    // }
  	}).call(this);

	  var finder = parseInt($('#pm-photo').attr('finder'), 10);
		var photoObj = photos[finder];
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

$(function(){

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
			window.history.pushState({stateObj: 'pm'},'','pm');
		});

		photoModal.on('hidden', function(){
			// if ( $.cookie("scroll") !== null ) {
			//   $(document).scrollTop( $.cookie("scroll"));
			//   console.log("scrollin homies..");
			// }
			if (location.href.indexOf('pm') != -1) {
				window.history.back();
			}
		});

		window.onpopstate = function(e){

			if (JSON.stringify(e.state) == "null") {
				photoModal.modal('hide');

				$('.add-notebook-form').each(function(index, form){
					var noteBtn = $(form).find('.add-to-nb-btn');
				  if (photos[index].noted == true) {
				  	noteBtn.attr('disabled', true);
				  	noteBtn.val('Noted');
				  }
				});

				/* Handle notebook count plurals */
				// $('.notebook-count').each(function(i, obj){
				// 	if ($(obj).html() == "1 Notebooks") {
				// 		$(obj).html('1 Notebook');
				// 	}	
				// });
			}
		};
	}).call(this);

});

/* Handle full screen mode */
$(function(){

	var pmRightCtn = $('#pm-right-ctn');
	var photoModal = $('#photo-modal');
	var pmLeftCtn = $('#pm-left-ctn');
	var fullScreen = $('#fullscreen');
	var fullModalClose = $('#full-photo-modal-close');
	var arrowBg = $('#arrow-bg');
	var fullArrowBg = $('#full-arrow-bg');

	$('#fullscreen').on('click', function(){
		pmRightCtn.hide();
		photoModal.addClass('full-photo-modal');
		pmLeftCtn.addClass('full-pm-left-ctn');
		fullScreen.hide();
		fullModalClose.show();
		arrowBg.hide()
		fullArrowBg.show()
		photoModal.on('hide', function(e){
			pmRightCtn.show();
			photoModal.removeClass('full-photo-modal');
			pmLeftCtn.removeClass('full-pm-left-ctn');
			fullScreen.show();
			fullModalClose.hide();
			arrowBg.show()
			fullArrowBg.hide()
			e.preventDefault();
			photoModal.off('hide');
		});
	});

});

/* Set tags in modal */
function setTags(){

	var styles = {'cont': 'Contemporary', 'ecce': 'Eccentric', 'indu': 'Industrial', 'mini': 'Minimalist', 'rust': 'Rustic', 'trad': 'Traditional'};
	var types = {'disp': 'Displays', 'full': 'Full Store', 'ligh': 'Lighting', 'merc': 'Merchandising', 'mann': 'Mannequin', 'shac': 'Shoes & Accesories', 'fron': 'Store Front', 'diy': 'DIY'};

	var finder = parseInt($('#pm-photo').attr('finder'), 10);
	var photoObj = photos[finder];
		
	/* Set style tags */
	var photoStyle = photoObj.style;
	if (photoStyle) {
		if (photoStyle.length > 1) {
			var styleTagString = "<a href='photos-" + photoStyle[0] + "'>" + styles[photoStyle[0]] + "</a>";
			for (var i = 1; i < photoStyle.length; i++) {
				styleTagString += ", <a href='photos-" + photoStyle[i] + "'>" + styles[photoStyle[i]] + "</a>";
			}
		} else {
			styleTagString = "<a href='photos-" + photoStyle[0] + "'>" + styles[photoStyle[0]] + "</a>";
		}
		var styleTag = "<p class='photo-right-content'>Style: " + styleTagString + "</p>";
	} else var styleTag = "";
	
	/* Set type tags */
	var photoType = photoObj.type;
	if (photoType) {
		if (photoType.length > 1) {
			var typeTagString = "<a href='photos-" + photoType[0] + "'>" + types[photoType[0]] + "</a>";
			for (var i = 1; i < photoType.length; i++) {
				typeTagString += ", <a href='photos-" + photoType[i] + "'>" + types[photoType[i]] + "</a>";
			}
		} else {
			typeTagString = "<a href='photos-" + photoType[0] + "'>" + types[photoType[0]] + "</a>";
		}
		var typeTag = "<p class='photo-right-content'>Type: " + typeTagString + "</p>";
	} else var typeTag = "";

	var contentRight = styleTag + typeTag;
	
	var photoUrl = photoObj.url;
	var photosHtml = contentRight;
	$('#pm-right-ctn-inner').html(photosHtml);
};

$(function(){
	
	$('#photo-modal').on('shown', function(){
		setTags();
	});

});
