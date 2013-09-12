// $(function(){
// 	$('.source').each(function(i, obj){
// 		var $source = $(this).html();
// 		if ($source.length > 30) {
// 			var $newLink = $source.slice(0,29) + "...";
// 			$(this).html($newLink);
// 		} 
// 	});
// });

$(function(){
	$('.add-notebook-form').submit(function(){
		if (navLogin == false) {
			alert("Must be logged in to add photos to Notebook. Please log in.");
			return false;
		}
	});
});
