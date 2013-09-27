/* PHOTOS.JS */

		// $(function(){
		// 	$('.source').each(function(i, obj){
		// 		var $source = $(this).html();
		// 		if ($source.length > 30) {
		// 			var $newLink = $source.slice(0,29) + "...";
		// 			$(this).html($newLink);
		// 		} 
		// 	});
		// });

		// $(function(){

		// 	$('.add-to-nb-btn').on('click', function(){
		// 		$(this).val('Noted');
		// 	})

		// })

		// $(function(){
		// 	$('.add-notebook-form').submit(function(){
		// 		var photoUrl = $(this).find('#img-url').val();
		// 		var userPhotos = user.notebook.photos;
		// 		var dup = false;

		// 		function checkDup(){
		// 			$.each(userPhotos, function(index, object){
		// 				if (object == photoUrl) {
		// 					dup = true;
		// 					return false;
		// 				}
		// 			});
		// 		}

		// 		checkDup();
		// 		if (dup == true) {
		// 			return false;	
		// 		}

		// 	});
		// });

		// $('.add-notebook-form').submit(function(){
			// 	if (navLogin == false) {
			// 		alert("Must be logged in to add photos to Notebook. Please log in.");
			// 		return false;
			// 	}
			// });

/* END PHOTOS.JS */

/* Photos-bou pagination */

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

/* END Photos-bou pagination */

/* Photo modal photos.js */

		// $(function(){
	
		// 	$('.photo-img').on('click', function(){	
		// 		// var finder = $(this).attr("finder");
		// 		// var photoObj = photos[finder];
				
		// 		// /* set modal photo */
		// 		// $('#pm-photo').attr('src', photoObj.url);

		// 		/* set form input url property and Notebooks count*/
		// 		$('#pm-img-url').val(photoObj.url);

		// 		(function(){
		// 			var nbCount = $('#pm-notebook-count');
		// 			if (photoObj.liked == 1) {
		// 				nbCount.html(photoObj.liked + " " + "Notebook");
		// 			} else {
		// 				nbCount.html(photoObj.liked + " " + "Notebooks");
		// 			}
		// 		}).call(this);

		// 	});

		// });

/* END Photo modal photos.js */

