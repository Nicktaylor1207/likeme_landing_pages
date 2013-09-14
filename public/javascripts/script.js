$(function(){

	if (hide == true) {
		$('#landing-welcome').hide();
		$('#thanks-for-sign-up-no-pref').show();
	}

	(function(){
	  $('#landing-signup-form').submit(function() {
	    function failValidation(msg) {
	      alert(msg); // just an alert for now but you can spice this up later
	      return false;
	    };

	    var email = $('#landing-email-input');
	    if (email.val() == "") {
	      return failValidation('Please enter your email address to sign up.');
	    }

	    var password = $('#landing-password-input');
	    if (password.val() == "") {
	      return failValidation('Please enter a password to sign up.');
	    }

	    return true;
	    return false; // prevent form submitting anyway - remove this in your environment
	  });
	}).call(this);

	$('#about-star').on('click', function(){
		alert("Thanks for your encouragement! It means a lot to us.");
	});

	// $('img.landing-bg').on('click', function(){	
	// 	$('#myCarousel').carousel('next');
	// });

});