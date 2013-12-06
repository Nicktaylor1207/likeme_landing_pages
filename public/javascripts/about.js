$(function(){

	if (user && user.email) {
		$('#email').val(user.email);
	}

	$('#about-contact-form').on('submit', function(){

		function failValidation(msg){
			alert(msg);
			return false;
		}
		
		if ($('#email').val() == "") {
			return failValidation("Please enter your email address.");
		} else if ($('#message').val() == "") {
			return failValidation("Please enter a message.");
		} else {
			alert("Thanks for your message!");
		}

	});
	
})