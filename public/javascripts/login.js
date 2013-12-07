$(function(){

	/* Hide navbar */
	if (user.firstName == " ") {
		$('.navbar-fixed-top').hide();
	}

	/* Validation for loginAlts */
	$('#alt-signup-form').on('submit', function(){
		function failValidation(msg) {
		  alert(msg);
		  return false;
		};

		var firstName = $('#signup-first-name-input');
		if (firstName.val() == "") {
		  return failValidation('Please enter your first name.');
		}

		var lastName = $('#signup-last-name-input');
		if (lastName.val() == "") {
		  return failValidation('Please enter your last name.');
		}

		var email = $('#signup-email-input');
		if (email.val() == "") {
		  return failValidation('Please enter your email address.');
		}

		var password = $('#signup-password-input');
		if (password.val() == "") {
		  return failValidation('Please enter a password.');
		}		
	});

	/* Validation for login */
	$('#login-form').on('submit', function(){
		function failValidation(msg) {
		  alert(msg);
		  return false;
		};

		var email = $('#signup-email-input');
		if (email.val() == "") {
		  return failValidation('Please enter your email address.');
		}

		var password = $('#signup-password-input');
		if (password.val() == "") {
		  return failValidation('Please enter a password.');
		}		
	});

});