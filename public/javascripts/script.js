$(function(){

	if (hide == true) {
		$('#landing-welcome').hide();
		$('#landing-pref-modal').show();
	}

	if (prefs_sent == true) {
		$('#landing-pref-modal').hide();
		$('#thanks-for-sign-up').show();
	}

	if (hide == true || prefs_sent == true) {
		$('#myCarousel').carousel('pause');
	} else {
		// $('#myCarousel').carousel({
  // 		interval: 3000
		// });
	}

	if (sent == true) {
		$('#contact-content').hide();
		$('#message-sent-thanks').show();
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

	    return true;
	    return false; // prevent form submitting anyway - remove this in your environment
	  });
	}).call(this);

	(function(){
	  $('#about-signup-form').submit(function() {
	    function failValidation(msg) {
	      alert(msg); // just an alert for now but you can spice this up later
	      return false;
	    };

	    var email = $('#landing-email-input');
	    if (email.val() == "") {
	      return failValidation('Please enter your email address to sign up.');
	    }

	    return true;
	    return false; // prevent form submitting anyway - remove this in your environment
	  });
	}).call(this);

	(function(){
		$('#about-contact-form').submit(function() {
	    function failValidation(msg) {
	      alert(msg); // just an alert for now but you can spice this up later
	      return false;
	    };

	    var contact_email = $('#contact-email');
	    if (contact_email.val() == "") {
	      return failValidation('Please enter your email address.');
	    }

	    var message = $('#contact-message');
	    if (message.val() == "") {
	      return failValidation('Please enter a message.');
	    }

	    return true;
	    return false; // CHECK -- prevent form submitting anyway - remove this in your environment
	  });
	}).call(this)

	// $('img.landing-bg').on('click', function(){	
	// 	$('#myCarousel').carousel('next');
	// });
	

});