$(function(){
	$.each(photos, function(indexInArray, valueOfElement){
		alert(valueOfElement);
		var photoUrl = valueOfElement;
		var urlAnchor = "<a class='url' href=" + photoUrl + ">link</a>";
		$('div.nb-photos-container').html("<div class='nb-photo-row'></div>");
		$('div.nb-photo-row').html(urlAnchor);
		$('a.url').html("<div class='nb-photo-img-container' style='background-image: url(" + photoUrl + ")'></div>");
	});
})