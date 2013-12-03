$(function(){
	$.each(notebooks, function(index, notebook){
		var photoUrl = notebook.photoObjects[0].url;
		if ((index + 1)  % 3 == 0) {
			var photoDiv = "<div class='profile-nb-photo-img-container' nbFinder=" + index + " id='third' style='background-image: url(/" + photoUrl + ")'><div class='profile-album-label-container'><div class='profile-album-label'><p class='profile-search-pic-name'>" + notebook.name + "</p></div></div></div>"
		} else {
			var photoDiv = "<div class='profile-nb-photo-img-container' nbFinder=" + index + " style='background-image: url(/" + photoUrl + ")'><div class='profile-album-label-container'><div class='profile-album-label'><p class='profile-search-pic-name'>" + notebook.name + "</p></div></div></div>"
		}
		var urlAnchor = "<a class='url' data-toggle='modal' href='#photo-modal'" + ">" + photoDiv + "</a>";
		$('#profile-nb-photos-container').append("<div class='profile-nb-photo-row'>" + urlAnchor + "</div>");
	});
});

// $(function(){
// 	$('#nb-photos-modal-form').submit(function(){
// 		var form = $('#nb-photos-modal-input');
// 		var form_val = form.val();
// 		if (form_val.match(/\.jpg|\.jpeg|\.png|\.gif/) == null) {
// 			alert("Oops! Not an image make sure the url is a .jpg, .jpeg, .png or .gif");
// 			return false;
// 		}
// 	});
// });