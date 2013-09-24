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
//   $('#photos-pagination').pagination({
//       items: 50,
//       itemsOnPage: 10,
//       cssStyle: 'dark-theme',
//       currentPage: $.cookie("currPageBou"),
//       onPageClick: function(pageNumber){
//       	setPage(pageNumber, function(){
//           $(document).scrollTop(0); // not working
//         });
//       }
//   });

// 	function setPage(pageNumber, callback) {
//     var page = "#page-" + pageNumber;
// 		$('.selection').hide();
// 		$(page).show();
//     callback();
//   };

//   var displayPage = "#page-" + $.cookie("currPageBou");
//   $('.selection').hide();
//   $(displayPage).show();

//   $(window).on('unload', function(){
//   	var currPage = $('#photos-pagination').pagination('getCurrentPage');
//   	$.cookie("currPageBou", currPage);
//   });

// });

