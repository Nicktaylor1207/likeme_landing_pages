$(function(){
	
	/* Add line breaks to descriptions */
	if (user.description) {
		var text = user.description;
		text = text.replace(/\r?\n/g, '<br />');
		$('#user-description').html(text);
	}

	/* Description More/Less */
	if ($('#user-description').height() > 160) {
		$('#user-description').readmore({maxHeight: 160, moreLink: '<a href="#">More</a>', lessLink: '<a href="#">Less</a>'})	
	}

});

/* Create pro profile */

$(function(){
	
	/* Set values of textareas in create/edit profile */
	if (user.description) {
		$('#description-ta').val(user.description);
		$('#address-ta').val(user.address);
	}

	/* Set profile pic */
	function setPhoto(){
		$('#create-profile-photo-container-empty').hide();
		$('#create-profile-photo-container').show();
	};

	if (user.profilePic) {
		setPhoto()
	}

	$('#choose-file-input').on('change', function(){
		setPhoto()
	});

});