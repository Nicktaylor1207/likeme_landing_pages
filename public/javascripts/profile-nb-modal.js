$(function(){	

	$('.profile-nb-photo-img-container').on('click', function(){
		
		/* Find notebook via nbFinder attribute */
		var nbFinder = parseInt($(this).attr('nbFinder'), 10);
		$('#photo-modal').attr('nbFinder', nbFinder);
		var photoObj = notebooks[nbFinder].photoObjects[0];

		var urlStart = photoObj.url;
		if (urlStart.slice(0,6) == "images") {
			var photoObjUrl = "/" + urlStart;
		} else {
			var photoObjUrl = urlStart;
		}

		/* Set modal photo */
		$('#pm-photo').attr('src', photoObjUrl);

		/* Set modal photo finder attr */
		$('#pm-photo').attr('finder', 0);		

		/* Set img url for form input */
		$('#pm-img-url').val(photoObj.url);

	});

	/* Handle photo modal internal navigation */
	(function(){

		var nbPhotoIndex = 0;

		$('.pm-arrow').on('click', function(){
			var nbFinder = parseInt($('#photo-modal').attr('nbFinder'), 10);
			var nbPhotos = notebooks[nbFinder].photoObjects;
			/* Assumes that the cover photo is the first photo in photoObjects */
			if (this.id == "pm-arrow-right") {
				if (nbPhotos[nbPhotoIndex + 1]) {
					nbPhotoIndex++
				} else {
					nbPhotoIndex = 0;
				}
			} else {
				if (nbPhotoIndex == 0) {
					nbPhotoIndex = nbPhotos.length - 1;
				} else {
					nbPhotoIndex--
				}
			}
			
			var photoObj = nbPhotos[nbPhotoIndex];
			var urlStart = photoObj.url;
			if (urlStart.slice(0,6) == "images") {
				var photoObjUrl = "/" + urlStart;
			} else {
				var photoObjUrl = urlStart;
			}
			$('#pm-photo').attr('src', photoObjUrl);
			$('#pm-photo').attr('finder', nbPhotoIndex);
			$('#pm-img-url').val(photoObj.url);

			setTags();
			setComments();

			$('#pm-add-comment-form').hide()
			
			return false;
		});

		/* Navigation on click of photo */
		$('#pm-left-ctn').on('click', function(e){
			if (e.target.id == 'pm-left-ctn' || e.target.id == 'pm-photo') {
				var nbFinder = parseInt($('#photo-modal').attr('nbFinder'), 10);
				var nbPhotos = notebooks[nbFinder].photoObjects;
				
				if (nbPhotos[nbPhotoIndex + 1]) {
					nbPhotoIndex++
				} else {
					nbPhotoIndex = 0;
				}
				
				var photoObj = nbPhotos[nbPhotoIndex];
				var urlStart = photoObj.url;
				if (urlStart.slice(0,6) == "images") {
					var photoObjUrl = "/" + urlStart;
				} else {
					var photoObjUrl = urlStart;
				}
				$('#pm-photo').attr('src', photoObjUrl);
				$('#pm-photo').attr('finder', nbPhotoIndex);
				$('#pm-img-url').val(photoObj.url);
				
				setTags();
				setComments();

				$('#pm-add-comment-form').hide()
				
				return false;
			}
		});

	}).call(this);

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
			window.history.pushState({stateObj: 'nb-pm'},'','nb-pm');
		});

		photoModal.on('hidden', function(){
			
			if (location.href.indexOf('nb-pm') != -1) {
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

	var nbFinder = parseInt($('#photo-modal').attr('nbFinder'), 10);
	var photos = notebooks[nbFinder].photoObjects;
	var finder = parseInt($('#pm-photo').attr('finder'), 10);
	var photoObj = photos[finder];
		
	/* Set style tags */
	var photoStyle = photoObj.style;
	if (photoStyle != "") {
		if (photoStyle.length > 1) {
			var styleTagString = "<a href='photos-" + photoStyle[0] + "'>" + styles[photoStyle[0]] + "</a>";
			for (var i = 1; i < photoStyle.length; i++) {
				styleTagString += ", <a href='photos-" + photoStyle[i] + "'>" + styles[photoStyle[i]] + "</a>";
			}
		} else {
			styleTagString = "<a href='photos-" + photoStyle[0] + "'>" + styles[photoStyle[0]] + "</a>";
		}
		var styleTag = "<p class='photo-right-content'>Style: " + styleTagString + "</p>";
	} else var styleTag = "<p class='photo-right-content'>Style: no tag</p>";
	
	/* Set type tags */
	var photoType = photoObj.type;
	if (photoType  != "") {
		if (photoType.length > 1) {
			var typeTagString = "<a href='photos-" + photoType[0] + "'>" + types[photoType[0]] + "</a>";
			for (var i = 1; i < photoType.length; i++) {
				typeTagString += ", <a href='photos-" + photoType[i] + "'>" + types[photoType[i]] + "</a>";
			}
		} else {
			typeTagString = "<a href='photos-" + photoType[0] + "'>" + types[photoType[0]] + "</a>";
		}
		var typeTag = "<p class='photo-right-content'>Type: " + typeTagString + "</p>";
	} else var typeTag = "<p class='photo-right-content'>Type: no tag</p>";

	var contentRight = styleTag + typeTag;
	
	var photoUrl = photoObj.url;
	var photosHtml = contentRight;
	$('#pm-right-ctn-inner').html(photosHtml);

};

/* Set comments in modal */
function setComments(){
	
	var nbFinder = parseInt($('#photo-modal').attr('nbFinder'), 10);
	var photos = notebooks[nbFinder].photoObjects;
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
		commentsDynamic += "<div class='comment-text-container'><a href='/pro-profile-view/" + user.email + "'><p class='comments-name'>" + comment.firstName + ' ' + comment.lastName + "</p></a><p class='comments-text'>" + comment.text.replace(/\n/g,'<p>') + "</p></div>";
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
	var newCommentHTML = "<div class='comment-text-container'><a href='/pro-profile-view/" + user.email + "'><p class='comments-name'>" + user.firstName + ' ' + user.lastName + "</p></a><p class='comments-text'>" + newComment.replace(/\n/g,'<p>') + "</p></div>";
	$('#pm-comment-container-inner').prepend(newCommentHTML);

	/* Handle nav in modal */
	var nbFinder = parseInt($('#photo-modal').attr('nbFinder'), 10);
	var photos = notebooks[nbFinder].photoObjects;
	var finder = parseInt($('#pm-photo').attr('finder'), 10);

	if (photos[finder].newCommentHTML) {
		photos[finder].newCommentHTML = newCommentHTML + photos[finder].newCommentHTML;
	} else {
		photos[finder].newCommentHTML = newCommentHTML;
	};

	$.ajax({
	  type: "POST",
	  url: '/comment',
	  data: form.serialize()
	})
		.done(function() {
    	$('#pm-comments-box').val('');
  	});

	$('#photo-modal').focus();

	return false; // avoid executing submit of the form
});

$(function(){
	$('#pm-add-comment-header').on('click', function(){
		$(this).next('#pm-add-comment-form').toggle();
	});
});