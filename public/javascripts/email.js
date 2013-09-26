$(function(){

	$('#forgot-password-form').submit(function(){
		
		var emailInput = $('#email-input').val();
		var userEmails = [];
		$.each(users, function(index, user){
			userEmails.push(user.email);
		});

		if (userEmails.indexOf(emailInput) == -1) {
			$('#forgot-pass-err').show();
			$('#forgot-password').hide();
			return false;
		}

	});


})