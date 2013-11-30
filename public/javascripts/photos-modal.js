$(function(){	

	$('.photo-img').on('click', function(){
		
		/* Photo attributes should be set with photoObj and finder */
		var finder = parseInt($(this).attr('finder'), 10);
		var photoObj = photos[finder];

		/* Set modal photo */
		$('#pm-photo').attr('src', photoObj.url);

		/* Set modal finder */
		$('#pm-photo').attr('finder', finder);

		/* Set img url for form input -- NEED??? */
		// $('#pm-img-url').attr('value', photoObj.url);

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
			
			setTags();
			setComments();

			$('#pm-add-comment-form').hide()
			
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
				
				// setNotebookCount(photoObj);
				setTags();
				setComments();

				$('#pm-add-comment-form').hide()
				
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
			
			if (location.href.indexOf('pm') != -1) {
				window.history.back();
			}

			$('#pm-add-comment-form').hide()
		});

		window.onpopstate = function(e){
			if (JSON.stringify(e.state) == "null") {
				photoModal.modal('hide');
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

/* Set comments in modal */
function setComments(){
	
	var finder = parseInt($('#pm-photo').attr('finder'), 10);
	var photoObj = photos[finder];
	
	$('#pm-user').attr('value', user.email);
	$('#pm-userFirst').attr('value', user.firstName);
	$('#pm-userLast').attr('value', user.lastName);
	$('#pm-photoUrl').attr('value', photoObj.url);

	var photoComments = photoObj.comments;
	var commentsDynamic = "";

	for (var i = photoComments.length - 1; i > -1; i--) {
		var commentText = photoComments[i];
		var comment = allComments.filter(function(commentFilter) {return commentFilter.text == commentText})[0];
		commentsDynamic += "<div class='comment-text-container'><p class='comments-name'>" + comment.firstName + ' ' + comment.lastName + "</p><p class='comments-text'>" + comment.text.replace(/\n/g,'<p>') + "</p></div>";
	}

	if (photoObj.newCommentHTML) {
		commentsDynamic = photoObj.newCommentHTML + commentsDynamic;
	}

	$('#pm-comment-container-inner').html(commentsDynamic)
};

$(function(){
	
	$('#photo-modal').on('shown', function(){
		setTags();
		setComments();
	});

});

/* Handle comments in modal */
$('#pm-add-comment-form').on('submit', function(){
	var form = $(this);

	var newComment = $('#pm-comments-box').val();

	/* Handle the new view for the modal */
	$('#pm-add-comment-form').toggle()
	var newCommentHTML = "<div class='comment-text-container'><p class='comments-name'>" + user.firstName + ' ' + user.lastName + "</p><p class='comments-text'>" + newComment.replace(/\n/g,'<p>') + "</p></div>";
	$('#pm-comment-container-inner').prepend(newCommentHTML);

	/* Handle the photos page view */
	var formFinder = $('#pm-photo').attr('finder');
	var containerDiv = $("#" + formFinder);
	containerDiv.find('.comments-content-container').prepend(newCommentHTML);

	/* Handle nav in modal */
	if (photos[formFinder].newCommentHTML) {
		photos[formFinder].newCommentHTML = "<div class='comment-text-container'><p class='comments-name'>" + user.firstName + ' ' + user.lastName + "</p><p class='comments-text'>" + newComment.replace(/\n/g,'<p>') + "</p></div>" + photos[formFinder].newCommentHTML;
	} else {
		photos[formFinder].newCommentHTML = "<div class='comment-text-container'><p class='comments-name'>" + user.firstName + ' ' + user.lastName + "</p><p class='comments-text'>" + newComment.replace(/\n/g,'<p>') + "</p></div>";	
	};

	$.ajax({
	  type: "POST",
	  url: 'comment',
	  data: form.serialize()
	})
		.done(function() {
    	$('#pm-comments-box').val('');
  	});

	$('#photo-modal').focus();

	return false; // avoid to execute the actual submit of the form.
});