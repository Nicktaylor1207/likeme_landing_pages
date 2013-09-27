$(function(){

	if (navLogin == false) { 

		$(window).scroll(function(){
			$('#signup-cta-modal-2').animate({top: "44"}, 600);
		});

		$('.photo-img-container').hover(
			function(){
				$(this).find('.save-btn').show();
				$(this).find('.photo-img').addClass("photo-img-hover");
			}, function(){
				$(this).find('.save-btn').hide()
				$(this).find('.photo-img').removeClass("photo-img-hover");
		});

		$('.add-to-nb-btn').on('click', function(){
			$('#signup-modal').modal();
			$('#signup-cta-modal-2').hide();
			return false;
		});

		$('.save-btn').on('click', function(){
			$('#signup-modal').modal();
			$('#signup-cta-modal-2').hide();
			return false;
		});

		$('.photo-img').on('click', function(){
			$('#signup-modal').modal();
			$('#signup-cta-modal-2').hide();
			return false;
		});

		$('#signup-modal').on('hidden', function () {
    	$('#signup-cta-modal-2').show();
		})

	}

});

$(function(){
	
	$('.notebook-count').each(function(i, obj){
		if ($(obj).html() == "1 Notebooks") {
			$(obj).html('1 Notebook');
		}	
	})

})

$(function(){
	
	var userPhotos = user.notebook.photos;

	$('.add-notebook-form').each(function(i, form){
		var photoUrl = $(form).find('#img-url').val();
		var noteBtn = $(form).find('.add-to-nb-btn');
		var dup = false;

		$.each(userPhotos, function(index, object){
			if (object == photoUrl) {
				noteBtn.attr('disabled','disabled');
				noteBtn.val('Noted');
				return false;
			}
		});
	});

});

$(function(){
	
	var photoModal = $('#photo-modal');

	$('.photo-img').on('click', function(){
		/* set modal photo */

		var displayPhotoURL = this.src;
		var displayPhotoFinder = $(this).attr('finder');
		$('#pm-photo').attr('src', displayPhotoURL);
		$('#pm-photo').attr('finder', displayPhotoFinder);

		/* Set attr of "+ Note it" btn */
		var userPhotos = user.notebook.photos;
		$.each(userPhotos, function(index, object){
			if (displayPhotoURL.indexOf(object) != -1) {
				$('#add-to-nb-btn-pm').attr('disabled','disabled');
				$('#add-to-nb-btn-pm').val('Noted');
				return false;
			} else {
				$('#add-to-nb-btn-pm').removeAttr('disabled');
				$('#add-to-nb-btn-pm').val('+ Note it');
			}
		})


	});

	photoModal.on('shown', function(){
		/* Set style modal css */
		var styles = {
			backgroundColor: "#161616",
			opacity: "1"
		};
		$('.modal-backdrop').css(styles);		

	});

});

$(function(){
	
	$('.photo-img').on('click', function(){	
		var finder = $(this).attr("finder");
		var photoObj = photos[finder];
		
		/* set modal photo */
		$('#pm-photo').attr('src', photoObj.url);
		
		/* set attr of "+ Note it" btn */
		var userPhotos = user.notebook.photos;
		$.each(userPhotos, function(i, obj){
			if (photoObj.url == obj) {
				$('#add-to-nb-btn-pm').attr('disabled','disabled');
				$('#add-to-nb-btn-pm').val('Noted');
				return false;
			} else {
				$('#add-to-nb-btn-pm').removeAttr('disabled');
				$('#add-to-nb-btn-pm').val('+ Note it');
			}
		});

		/* set form input url property and Notebooks count*/
		$('#pm-img-url').val(photoObj.url);

		(function(){
			var nbCount = $('#pm-notebook-count');
			if (photoObj.liked == 1) {
				nbCount.html(photoObj.liked + " " + "Notebook");
			} else {
				nbCount.html(photoObj.liked + " " + "Notebooks");
			}
		}).call(this);

	});

});