$(function(){
	
	/* add line breaks to descriptions */
	var text = user.description;
	text = text.replace(/\r?\n/g, '<br />');
	$('#user-description').html(text);

	/* Description More/Less */
	if ($('#user-description').height() > 160) {
		$('#user-description').readmore({maxHeight: 160, moreLink: '<a href="#">More</a>', lessLink: '<a href="#">Less</a>'})	
	}
	
});