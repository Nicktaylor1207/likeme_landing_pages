$(function(){
	$.each(photos, function(indexInArray, valueOfElement){
		alert(valueOfElement);
		var photoUrl = valueOfElement;
		var photoDiv = "<div class='nb-photo-img-container' style='background-image: url('images\/aa\/ny1.jpg')'></div>" 
		var urlAnchor = "<a class='url' href=" + photoUrl + ">" + photoDiv + "</a>";
		$('div.nb-photos-container').append("<div class='nb-photo-row'>" + urlAnchor + "</div>");
	});
})