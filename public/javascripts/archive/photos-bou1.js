$(function(){	

	if ( $.cookie("scroll-bou") !== null ) {
	  $(document).scrollTop( $.cookie("scroll-bou") );
	}

	$(window).on('unload', function(){
		$.cookie("scroll-bou", $(document).scrollTop(), { expires: 1 } );
	});

});

$(function(){

	$('.add-notebook-form').submit(function(e){
	  var url = "/notebook1"; // the script where you handle the form input.
	  var form = $(this);
	  var noteBtn = form.find('.add-to-nb-btn');
	  
	  noteBtn.attr('disabled','disabled');
	  noteBtn.val('Noted');

	  var notebookText = form.parent().siblings().first().children().first(); // Refactor replace with selector
	  var notebookHTML = notebookText.html();
	  var notebookCount = parseInt(notebookHTML, 10) + 1;

	  if (notebookCount == 1) {
	  	notebookText.html("1 Notebook");
	  } else {
	  	notebookText.html(notebookCount + " " + "Notebooks");
	  }

	  $.ajax({
	    type: "POST",
	    url: url,
	    data: form.serialize(), // serializes the form's elements.
	  });

	  return false; // avoid to execute the actual submit of the form.
	});
	
});

$(function(){

	$('#add-notebook-form-pm').submit(function(){
	  var url = "/notebook1"; // the script where you handle the form input.
	  var form = $(this);
	  var noteBtn = form.find('#add-to-nb-btn-pm');
	  
	  noteBtn.attr('disabled','disabled');
	  noteBtn.val('Noted');

	  var notebookText = form.parents('#photo-modal').find('#pm-notebook-count');
	  var notebookHTML = notebookText.html();
	  var notebookCount = parseInt(notebookHTML, 10) + 1;

	  if (notebookCount == 1) {
	  	notebookText.html("1 Notebook");
	  } else {
	  	notebookText.html(notebookCount + " " + "Notebooks");
	  }

	  $.ajax({
	    type: "POST",
	    url: url,
	    data: form.serialize(), // serializes the form's elements.
	  });

	  return false; // avoid to execute the actual submit of the form.
	});
	
});

$('#add-notebook-form-pm').submit(function(){
	  var finder = $('#pm-photo').attr('finder');
	 	var formID = "#" + finder;
	 	var containerDiv = $(formID);
	 	var noteBtnFind = containerDiv.find('.add-to-nb-btn');

	 	/* Set btn to noted */
		noteBtnFind.attr('disabled','disabled');
	  noteBtnFind.val('Noted');

	  /* Set notebook counter correctly */
	  var notebookText = containerDiv.find('.notebook-count');
	  var notebookHTML = notebookText.html();
	  var notebookCount = parseInt(notebookHTML) + 1;

	  if (notebookCount == 1) {
	  	notebookText.html("1 Notebook");
	  } else {
	  	notebookText.html(notebookCount + " " + "Notebooks");
	  }

	  return false;
	
});

$(function(){
	window.onpopstate = function(e){
		// AJAX get request for noted property
	};
})