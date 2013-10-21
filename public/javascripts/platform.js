$(function(){

	$('#platform-img').attr('src', photos[0].url);

	window.scrollTo(0, 0);

	var urlCounter = 0;

	$('div#eval').on('click', function(e){
		
		/* Flip to next photo */
		urlCounter += 1;
		var currPhoto = photos[urlCounter - 1];
		var newPhoto = photos[urlCounter];
		var newURL = newPhoto.url;
		$('#platform-img').attr('src', newURL);
		
		/* Set state variables handle navigation */
		var stateObj = { imgState: newURL, urlCount: urlCounter };
		window.history.pushState(stateObj, '', 'platform?' + urlCounter)

		/* Record votes */
		var eval = e.target.id;
		var formData = {photoURL: currPhoto.url};
		if (eval == "eval-no" || eval == "eval-yes") {
			if (eval == "eval-no") {
				var url = '/platform1';
			} else if (eval == "eval-yes") {
				var url = '/platform2';
			}
			$.ajax({
				type: "POST",
				url: url,
				data: formData,
				success: function(){
		   		console.log("SUCCESS!");
			  }
			});	
			return false; // avoid executing actual submit of form
		}
	});

	/* Handle back button navigation */
	window.onpopstate = function(event) {
		window.scrollTo(0, 0);
		if (window.history.state != null) {
			$('#platform-img').attr('src', window.history.state.imgState);
			urlCounter = window.history.state.urlCount;
			// setting the url counter to handle form submit after back btn
		} else {
			$('#platform-img').attr('src', photos[0].url);
		}
	}

});