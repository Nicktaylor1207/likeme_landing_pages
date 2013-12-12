$(function(){

	/* Fill in existing vid attributes */
	if (vid.url) {
		$('#av-vid-url').attr('value', vid.url);
	}
	if (vid.title) {
		$('#av-vid-title').attr('value', vid.title);
	}
	if (vid.location) {
		$('#av-vid-location').attr('value', vid.location);
	}
	if (vid.league) {
		$('#av-vid-league').attr('value', vid.league);
	}
	if (vid.date) {
		$('#av-vid-date').attr('value', vid.date);
	}
	if (vid.players) {
		$('#av-vid-players').attr('value', vid.players);
	}

});