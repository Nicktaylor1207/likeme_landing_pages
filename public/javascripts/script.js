$(function(){
  
	if (hide == true) {
		$('#landing-welcome').hide();
		$('#thanks-for-sign-up').show();
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



	/* Start carousel */
	// !function ($) {
	// 	$(function(){
	// 		// carousel demo
	// 		$('#myCarousel').carousel()
	// 	})
	// }(window.jQuery)

});