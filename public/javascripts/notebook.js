$(function(){
	$.each(notebooks, function(indexInArray, notebook){
		var photoUrl = notebook.photoObjects[0].url;
		if ((indexInArray )  % 3 == 1) {
			var notebookDiv = "<div class='nb-notebook-img-container' finder=" + indexInArray + " id='third' style='background-image: url(" + photoUrl + ")'></div>"
		} else {
			var notebookDiv = "<div class='nb-notebook-img-container' finder=" + indexInArray + " style='background-image: url(" + photoUrl + ")'></div>"
		}
		var urlAnchor = "<a class='url' data-toggle='modal' href='#notebook-modal'" + ">" + notebookDiv + "</a>";
		$('div.nb-notebooks-container').append("<div class='nb-notebook-row'>" + urlAnchor + "</div>");
	});
})

$(function(){
	$('#nb-notebooks-modal-form').submit(function(){
		var form = $('#nb-notebooks-modal-input');
		var form_val = form.val();
		if (form_val.match(/\.jpg|\.jpeg|\.png|\.gif/) == null) {
			alert("Oops! Not an image make sure the url is a .jpg, .jpeg, .png or .gif");
			return false;
		}
	});
});