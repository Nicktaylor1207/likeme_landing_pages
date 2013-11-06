$(function(){

	var styles = {'cont': 'Contemporary', 'ecce': 'Eccentric', 'indu': 'Industrial', 'mini': 'Minimalist', 'rust': 'Rustic', 'trad': 'Traditional'};
	var types = {'disp': 'Displays', 'full': 'Full Store', 'ligh': 'Lighting', 'merc': 'Merchandising', 'mann': 'Mannequin', 'shac': 'Shoes & Accesories', 'fron': 'Store Front', 'diy': "DIY"};

	$.each(photos, function(index, photo){
		/* Set style tags */
		var photoStyle = photo.style;
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
		var photoType = photo.type;
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

		var photoUrl = photo.url;

		var commentsDynamic = "";

		var photoComments = photo.comments;

		/* Refactor */
		for (var i = photoComments.length - 1; i > -1; i--) {
			var commentText = photoComments[i];
			var comment = allComments.filter(function(commentFilter) {return commentFilter.text == commentText})[0];
			commentsDynamic += "<div class='comment-text-container'><p class='comments-name'>" + comment.firstName + ' ' + comment.lastName + "</p><p class='comments-text'>" + comment.text.replace(/\n/g,'<p>') + "</p></div>";
		}

		var commentsContent = "<div class='comment-container'><p class='add-comment-header'><a>Add Comment</a></p><form class='add-comment-form hide' method='POST' action='/comment'><input class='hide' name='user' value=" + user.email + "><input class='hide' name='firstName' value=" + user.firstName + "><input class='hide' name='lastName' value=" + user.lastName + "><input class='hide' name='photoUrl' value=" + photoUrl + "><textarea class='comments-box' rows='4' name='text'></textarea><input class='btn btn-primary add-comment-btn' type='submit' value='Submit'></form>" + commentsDynamic + "</div>";
		var contentRight = styleTag + typeTag + commentsContent;

		// <div class='comment-container'>
		// 	<p class='add-comment-header'><a href='#'>Add Comment</a></p>
		// 	<form class='add-comment-form hide' method='POST' action='/comment'>
		// 		<input class='hide' name='user' value="zach@sevenalbums.com">
		// 		<input class='hide' name='userName' value="Zach Taylor">
		// 		<input class='hide' name='photoUrl' value="images/merc/18.jpg">
		// 		<textarea class='comments-box' rows='4' name='comment'></textarea>
		// 		<input class='btn btn-primary add-comment-btn' type='submit' value='Submit'>
		// 	</form>
		// <div class='comment-display-container'>
		// 	<div class-'comment-text-container'>
		// 		<p class='comments-name'>Zach Taylor</p>
		// 		<p class='comments-text'>This is a terrific display! What is the item in the top middle compartment and where is it from? I love it.</p>
		// 	</div>
		// </div>
		// </div>
		
		var photosHtml = "<div class='row-fluid photo-display-container' id=" + index + "><div class='photo-img-container span9'><button class='btn-large btn-primary save-btn hide'>Save</button><form class='add-notebook-form' method='POST' action='/notebook1'><input id='img-url' class='hide' name='image_url' value=" + photoUrl + "><input class='btn add-to-nb-btn' type='submit' value='Add to Notebook'></form><div><a href='#photo-modal' data-toggle='modal'><div class='center-cropped' style='background-image: url(" + photoUrl + ")'><img class='photo-img' src=" + photoUrl + " finder=" + index + "></img></div></a></div></div><div class='photo-content-container span3'>" + contentRight + "</div></div>";
		$('.photo-page-container').append(photosHtml);
	});

});

/* Comment Handling */
$(function(){

	$('.add-comment-header').on('click', function(){
		$(this).next('.add-comment-form').toggle();
	});

});