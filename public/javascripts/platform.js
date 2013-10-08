$(function(){

	$('#platform-img').attr('src', 'images/aa/ny59.jpg');

	var urlCounter = 0;

	$('div#eval').on('click', function(e){
		var eval = e.target.id;
		urlCounter += 1;
		var newURL = "images/aa/bou" + urlCounter + ".jpg";
		$('#platform-img').attr('src', newURL);
		var stateObj = { imgState: newURL };
		window.history.pushState(stateObj, '', urlCounter)
		window.onpopstate = function(event) {
			console.log(event);
			if (window.history.state != null) {
				$('#platform-img').attr('src', window.history.state.imgState);
			} else {
				$('#platform-img').attr('src', 'images/aa/ny59.jpg')
			}
		}
	});

});

// $('div#eval').on('click', function(e){
// 	var eval = e.target.id;
// 	var photoSRC = $('#platform').css('background-image');
// 	var photoURL = photoSRC.slice(photoSRC.indexOf("/images"), -1)
// 	urlCounter += 1;
// 	var newURL = "url('/images/aa/bou" + urlCounter + ".jpg')"
// 	$('#platform').addClass('.no-flick');
// 	$('#platform').css("background", newURL + " no-repeat center center");
// });