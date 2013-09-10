$(function(){
	$('.source').each(function(i, obj){
		var $source = $(this).html();
		if ($source.length > 30) {
			var $newLink = $source.slice(0,29) + "...";
			$(this).html($newLink);
		} 
	});
});

$(function() {
    $('#photos-pagination').pagination({
        items: 50,
        itemsOnPage: 10,
        cssStyle: 'light-theme',
        onPageClick: function(pageNumber){
        	test(pageNumber);
        }
    });

		function test(pageNumber) {
			var page = "#page-"+pageNumber;
			$('.selection').hide()
			$(page).show()
    }
});

$(function(){
	$('#add-notebook-form').submit(function(){
		if (navLogin == false) {
			alert("Must be logged in to add photos to Notebook. Please log in.");
			return false;
		}
	});
});