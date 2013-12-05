$(function(){
	$.each(notebooks, function(index, notebook){
		var urlStart = notebook.photoObjects[0].url;
		if (urlStart.slice(0,6) == "images") {
			var photoUrl = "/" + notebook.photoObjects[0].url;
		} else {
			var photoUrl = notebook.photoObjects[0].url;
		}
		if ((index )  % 3 == 1) {
			var notebookDiv = "<div class='nb-notebook-img-container' nbFinder=" + index + " id='third' style='background-image: url(" + photoUrl + ")'><div class='create-nb-album-label-container'><div class='create-nb-album-label'><p class='create-nb-search-pic-name'>" + notebook.name + "</p></div></div></div>"
		} else {
			var notebookDiv = "<div class='nb-notebook-img-container' nbFinder=" + index + " style='background-image: url(" + photoUrl + ")'><div class='create-nb-album-label-container'><div class='create-nb-album-label'><p class='create-nb-search-pic-name'>" + notebook.name + "</p></div></div></div>"
		}
		var urlAnchor = "<a class='url' data-toggle='modal' href='#notebook-modal'" + ">" + notebookDiv + "</a>";
		$('#nb-notebooks-container').append("<div class='nb-notebook-row'>" + urlAnchor + "</div>");
	});
})

// $(function(){
// 	$.each(notebooks, function(index, notebook){
// 		var urlStart = notebook.photoObjects[0].url;
// 		if (urlStart.slice(0,6) == "images") {
// 			var photoUrl = "/" + notebook.photoObjects[0].url;
// 		} else {
// 			var photoUrl = notebook.photoObjects[0].url;
// 		}
// 		if ((index + 1)  % 3 == 0) {
// 			var photoDiv = "<div class='profile-nb-photo-img-container' nbFinder=" + index + " id='third' style='background-image: url(" + photoUrl + ")'><div class='profile-album-label-container'><div class='profile-album-label'><p class='profile-search-pic-name'>" + notebook.name + "</p></div></div></div>"
// 		} else {
// 			var photoDiv = "<div class='profile-nb-photo-img-container' nbFinder=" + index + " style='background-image: url(" + photoUrl + ")'><div class='profile-album-label-container'><div class='profile-album-label'><p class='profile-search-pic-name'>" + notebook.name + "</p></div></div></div>"
// 		}
// 		var urlAnchor = "<a class='url' data-toggle='modal' href='#photo-modal'" + ">" + photoDiv + "</a>";
// 		$('#profile-nb-photos-container').append("<div class='profile-nb-photo-row'>" + urlAnchor + "</div>");
// 	});
// });