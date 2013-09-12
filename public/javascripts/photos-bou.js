$(function(){	

	if ( $.cookie("scroll-bou") !== null ) {
	  $(document).scrollTop( $.cookie("scroll-bou") );
	}

	$(window).on('unload', function(){
		$.cookie("scroll-bou", $(document).scrollTop(), { expires: 1 } );
	});

});

$(function() {
  $('#photos-pagination').pagination({
      items: 50,
      itemsOnPage: 10,
      cssStyle: 'dark-theme',
      currentPage: $.cookie("currPageBou"),
      onPageClick: function(pageNumber){
      	setPage(pageNumber);
      }
  });

	function setPage(pageNumber, callback) {
    var page = "#page-" + pageNumber;
		$('.selection').hide();
		$(page).show();
    callback();
  };

  var displayPage = "#page-" + $.cookie("currPageBou");
  $('.selection').hide();
  $(displayPage).show();

  $(window).on('unload', function(){
  	var currPage = $('#photos-pagination').pagination('getCurrentPage');
  	$.cookie("currPageBou", currPage);
  });

});