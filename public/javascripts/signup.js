$(function(){
	  
	(function(){
	  $('#landing-signup-form').submit(function() {
	    function failValidation(msg) {
	      alert(msg); // just an alert for now but you can spice this up later
	      return false;
	    };

	    var firstName = $('#signup-first-name-input');
	    if (firstName.val() == "") {
	      return failValidation('Please enter your first name to sign up.');
	    }

	    var lastName = $('#signup-last-name-input');
	    if (lastName.val() == "") {
	      return failValidation('Please enter your last name to sign up.');
	    }

	    var email = $('#signup-email-input');
	    if (email.val() == "") {
	      return failValidation('Please enter your email address to sign up.');
	    }

	    var password = $('#signup-password-input');
	    if (password.val() == "") {
	      return failValidation('Please enter a password to sign up.');
	    }

	    return true;
	    return false; // prevent form submitting anyway - remove this in your environment
	  });
	}).call(this);

});

