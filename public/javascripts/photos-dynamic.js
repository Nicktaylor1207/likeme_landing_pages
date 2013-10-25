$(function(){

	$.each(photos, function(index, photo){
		var photosHtml = "<div class='row-fluid photo-display-container' id=" + index + "><div class='photo-img-container span9'><button class='btn-large btn-primary save-btn hide'>Save</button><form class='add-notebook-form' method='POST' action='/notebook1'><input id='img-url' class='hide' name='image_url' value=" + photo.url + "></input><input class='btn add-to-nb-btn' type='submit' value='Note'></input></form><div><a href='#photo-modal' data-toggle='modal'><img class='photo-img' src=" + photo.url + " finder=" + index + "></img></a></div></div><div class='photo-content-container span3'><p class='notebook-count'>" + photo.liked + " Notebooks</p></div></div>";
		$('.photo-page-container').append(photosHtml);
	});

});