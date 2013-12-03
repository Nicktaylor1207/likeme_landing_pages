$(function(){
	
	/* Add line breaks to descriptions */
	if (id.description) {
		var text = id.description;
		text = text.replace(/\r?\n/g, '<p></p>');
		$('#user-description').html(text);
	}

	/* Description More/Less */
	if ($('#user-description').height() > 120) {
		$('#user-description').readmore({maxHeight: 120, moreLink: '<a id="profile-more" href="#">More</a>', lessLink: '<a id="profile-less" href="#">Less</a>'})	
	}

});

/* Create pro profile */
$(function(){
	
	/* Set values of textareas in create/edit profile */
	if (id.description) {
		$('#description-ta').val(id.description);
		$('#address-ta').val(id.address);
	}

	/* Set header */
	if (user.profilePic != "" || user.title != "" || user.website != "" || user.description != "" || user.number != "" || user.address != "") {
		$('#create-profile-header').html("Edit Profile");
	}

	/* Set profile pic */
	if (!id.profilePic) {
		$('#create-profile-photo-container-empty').show();
		$('#create-profile-photo-container').hide();
	}

	// function setPhoto(){
	// 	$('#create-profile-photo-container-empty').hide();
	// 	$('#create-profile-photo-container').show();
	// };

	// if (user.profilePic) {
	// 	setPhoto()
	// }

	// $('#choose-file-input').on('change', function(){
	// 	var newPhoto = $('#choose-file-input').val();
	// 	$('#create-profile-photo-container').attr('style', 'background-image: url(' + newPhoto + ')')
	// 	setPhoto();
	// });

	// setPhoto();

	function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#create-profile-photo-container').attr('style', 'background-image: url(' + e.target.result + ')')
        $('#create-profile-photo-container-empty').hide();
      }

      reader.readAsDataURL(input.files[0]);
    }
	};

	$("#choose-file-input").on('change', function(){
	  readURL(this);
	});

});