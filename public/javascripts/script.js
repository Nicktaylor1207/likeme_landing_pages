$(function(){

	if (hide == true) {
		$('#landing-welcome').hide();
		$('#thanks-for-sign-up').show();
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



	/* Start carousel */
	// !function ($) {
	// 	$(function(){
	// 		// carousel demo
	// 		$('#myCarousel').carousel()
	// 	})
	// }(window.jQuery)

});