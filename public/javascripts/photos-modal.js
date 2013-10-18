$(function(){
	$('.photo-img').on('click', function(){
		
		/* Photo attributes should be set with photoObj and finder */
		var finder = parseInt($(this).attr('finder'), 10);
		var photoObj = photos[finder];
		
		/* Set modal photo */
		$('#pm-photo').attr('src', photoObj.url);

		/* Handle photo modal internal navigation */
		$('.pm-arrow').on('click', function(){
			if (this.id == "pm-arrow-right") {
				if (photos[finder + 1]) {
					finder++
				} else {
					finder = 0;
				}
			} else {
				if (photos[finder - 1]) {
					finder--
				}
			}
			photoObj = photos[finder];
			$('#pm-photo').attr('src', photoObj.url);
			return false;
		});

		
	
	});
});