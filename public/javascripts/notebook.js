$(function(){
	$.each(photos, function(indexInArray, photoUrl){
		if ((indexInArray + 1)  % 3 == 0) {
			var photoDiv = "<div class='nb-photo-img-container' id='third' style='background-image: url(" + photoUrl + ")'></div>"
		} else {
			var photoDiv = "<div class='nb-photo-img-container' style='background-image: url(" + photoUrl + ")'></div>"
		}
		var urlAnchor = "<a class='url' href=" + photoUrl + ">" + photoDiv + "</a>";
		$('div.nb-photos-container').append("<div class='nb-photo-row'>" + urlAnchor + "</div>");
	});
})