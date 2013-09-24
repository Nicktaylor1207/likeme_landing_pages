$(function(){

	$('#about-star').on('click', function(){
		alert("Thanks for your encouragement! It means a lot to us.");
	});

	$('#about-contact-form').on('submit', function(){

		function failValidation(msg){
			alert(msg);
			return false;
		}

		if ($('#email').val() == "") {
			return failValidation("Please enter your email address.");
		}

		if ($('#message').val() == "") {
			return failValidation("Please enter a message.");
		}

	});
	
})