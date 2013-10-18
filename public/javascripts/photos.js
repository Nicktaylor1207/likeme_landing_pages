// Calls to action for non-user
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

	var photoModal = $('#photo-modal');

	photoModal.on('shown', function(){
		/* Set style modal css */
		var styles = {
			backgroundColor: "#161616",
			opacity: "1"
		};
		$('.modal-backdrop').css(styles);	

		/* Set history and modal esc navigation */
		window.history.pushState({path:'pm'},'','pm');

		photoModal.on('hidden', function(){
			if (location.href.indexOf('pm') != -1) {
				window.history.back();	
			}
		});

		window.onpopstate = function(e){
			if (JSON.stringify(e.state) == "null") {
				photoModal.modal('hide');
			}
		};

	});

})