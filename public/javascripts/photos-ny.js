$(function(){	

  if ( $.cookie("scroll-ny") !== null ) {
	  $(document).scrollTop( $.cookie("scroll-ny") );
	}

	$(window).on('unload', function(){
		$.cookie("scroll-ny", $(document).scrollTop(), { expires: 1 } );
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