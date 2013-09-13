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

$(function(){
	$('#nb-photos-modal-form').submit(function(){
		var form = $('#nb-photos-modal-input');
		var form_val = form.val();
		if (form_val.match(/\.jpg|\.jpeg|\.png|\.gif/) == null) {
			alert("Oops! Not an image make sure the url is a .jpg, .jpeg, .png or .gif");
			return false;
		}
	});
});
