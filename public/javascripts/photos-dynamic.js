// $(function(){

// 	$.each(photos, function(index, photo){
// 		var photoUrl = photo.url
// 		var photosHtml = "<div class='row-fluid photo-display-container' id=" + index + "><div class='photo-img-container span9'><button class='btn-large btn-primary save-btn hide'>Save</button><form class='add-notebook-form' method='POST' action='/notebook1'><input id='img-url' class='hide' name='image_url' value=" + photoUrl + "></input><input class='btn add-to-nb-btn' type='submit' value='Add to Notebook'></input></form><div><a href='#photo-modal' data-toggle='modal'><div class='center-cropped' style='background-image: url(" + photoUrl + ")'><img class='photo-img' src=" + photoUrl + " finder=" + index + "></img></div></a></div></div><div class='photo-content-container span3'><p class='notebook-count'>" + photo.liked + " Notebooks</p></div></div>";
// 		$('.photo-page-container').append(photosHtml);
// 	});

// });

$(function(){

	var styles = {'cont': 'Contemporary', 'ecce': 'Eccentric', 'indu': 'Industrial', 'mini': 'Minimalist', 'rust': 'Rustic', 'trad': 'Traditional'};
	var types = {'disp': 'Displays', 'full': 'Full Store', 'ligh': 'Lighting', 'merc': 'Merchandising', 'mann': 'Mannequin', 'shac': 'Shoes & Accesories', 'fron': 'Store Front'};

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

		// if (photo.type || photo.diy) {
		// 		var typeTag = "<p class='photo-right-content'>Type: <a href='photos-" + photo.type + "'>" + photo.type + "</a></p>";
		// } else var typeTag = "";
		var contentRight = styleTag + typeTag;
		
		var photoUrl = photo.url;
		var photosHtml = "<div class='row-fluid photo-display-container' id=" + index + "><div class='photo-img-container span9'><button class='btn-large btn-primary save-btn hide'>Save</button><form class='add-notebook-form' method='POST' action='/notebook1'><input id='img-url' class='hide' name='image_url' value=" + photoUrl + "></input><input class='btn add-to-nb-btn' type='submit' value='Add to Notebook'></input></form><div><a href='#photo-modal' data-toggle='modal'><div class='center-cropped' style='background-image: url(" + photoUrl + ")'><img class='photo-img' src=" + photoUrl + " finder=" + index + "></img></div></a></div></div><div class='photo-content-container span3'>" + contentRight + "</div></div>";
		$('.photo-page-container').append(photosHtml);
	});

});