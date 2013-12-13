$(function(){

	/* Set main video */
	var vidFrame = $('#sv-video-frame');
	if (vid) {
		vidFrame.attr('src', vid.url);		
	} else if (vids && vids.length > 0) {
		vidFrame.attr('src', vids[vids.length - 1].url);
	}

	/* Set main vid title */
	if (vid && vid.title != "") {
		$('#sv-title-ctn').html('<p><span class="sv-vid-header">Title: </span>' + vid.title + '</p>')	
	}

	/* Set main vid location */
	if (vid && vid.location) {
		$('#sv-location-ctn').html('<p><span class="sv-vid-header">Location: </span>' + vid.location + '</p>')	
	}

	/* Set main vid date */
	if (vid) {
		var time = parseInt(vid.date);
		var date = new Date(time);
		$('#sv-date-ctn').html('<p><span class="sv-vid-header">Date: </span>' + date.toString() + '</p>')
	}

	/* Set main vid location */
	if (vid && vid.league) {
		$('#sv-league-ctn').html('<p><span class="sv-vid-header">League: </span>' + vid.league + '</p>')	
	}

	// /* Set main vid players */
	// if (vid && vid.userIDs && vid.userIDs.length > 0) {
	// 	var svLeagueCtn = $('#sv-league-ctn');
	// 	svLeagueCtn.append('<p class="sv-vid-header">Players:</p>');
	// 	var players = vid.userIDs;
	// 	$.each(players, function(index, player){
	// 		if ($.type(player) === "string") {
	// 			var playerID = player;
	// 		} else {
	// 			var playerID = player.email;
	// 		}
	// 		var playerDiv = '<p class="sv-player-ID" playerFinder=' + index + '>' + playerID + '</p>'
	// 		svLeagueCtn.append(playerDiv);
	// 	});
	// }	
	
	/* Set other videos */
	if (vids.length > 1) {
		var otherVidCtn = $('#sv-other-vids-ctn');
		$.each(vids, function(index, video){
			if (vid) {
				if (video.imgthumb != vid.imgthumb) {
					var vidImg = '<div class="sv-other-img-div"><a class="sv-other-img-link" href="/sportsvids/' + video._id + '" vidFinder=' + index + '><img class="sv-other-vid-img" src=' + video.imgthumb + ' vidFinder=' + index + '></img></a></div>';
				}
			} else if (vids[index + 1]) {
				var vidImg = '<div class="sv-other-img-div"><a class="sv-other-img-link" href="/sportsvids/' + video._id + '" vidFinder=' + index + '><img class="sv-other-vid-img" src=' + video.imgthumb + ' vidFinder=' + index + '></img></a></div>';
			}
			otherVidCtn.append(vidImg);
		});
	}

	/* Add edit video if applicable */
	// if (vid) {
	// 	$('#sv-add-edit-vid-ctn').append('<p class="sv-edit-video"><a href="/editvid/' + vid._id + '">Edit Video</a></p>')
	// }

	/* Validation: confirm url and no duplicates for addvid */


});