$(function(){	

  if ( $.cookie("scroll-ny") !== null ) {
	  $(document).scrollTop( $.cookie("scroll-ny") );
	}

	$(window).on('unload', function(){
		$.cookie("scroll-ny", $(document).scrollTop(), { expires: 1 } );
	});

});

$(function(){

	$('.add-notebook-form').submit(function(e){
	  var url = "/notebook2"; // the script where you handle the form input.
	  var form = $(this);
	  var noteBtn = form.find('.add-to-nb-btn');
	  
	  noteBtn.attr('disabled','disabled');
	  noteBtn.val('Noted');

	  var notebookText = form.parent().siblings().first().children().first();
	  var notebookHTML = notebookText.html();
	  var notebookCount = parseInt(notebookHTML) + 1;
	  
	  if (notebookHTML.indexOf("0") == 0) {
	  	notebookText.html(notebookCount + " " + "Notebook");
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

// $(function() {
//   $('#photos-pagination-ny').pagination({
//       items: 50,
//       itemsOnPage: 10,
//       cssStyle: 'dark-theme',
//       onPageClick: function(pageNumber){
//       	setPage(pageNumber);
//       },
//       currentPage: $.cookie("currPageNY")
//   });

// 	function setPage(pageNumber) {
// 		var page = "#page-" + pageNumber;
// 		$('.selection').hide()
// 		$(page).show()
//   };

//   var displayPage = "#page-" + $.cookie("currPageNY");
//   $('.selection').hide();
//   $(displayPage).show();

//   $(window).on('unload', function(){
//   	var currPage = $('#photos-pagination-ny').pagination('getCurrentPage');
//   	$.cookie("currPageNY", currPage);
//   });

// });