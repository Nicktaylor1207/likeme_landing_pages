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
			if (video.title.length > 38) {
				var vidLabel = video.title.slice(0, 38) + "...";
			} else {
				var vidLabel = video.title;
			}
			if (vid) {
				/* Exclude the video that's playing */
				if (video.imgthumb != vid.imgthumb) {
					var vidImg = '<a class="sv-other-img-link" href="/sportsvids/' + video._id + '" vidFinder=' + index + '><div class="sv-other-img-div" style="background-image: url(' + video.imgthumb + ')"><div class="sv-other-vid-label-ctn"><p class="sv-other-vid-label">' + vidLabel + '</p></div><img class="sv-other-vid-img hide" src=' + video.imgthumb + ' vidFinder=' + index + '></img></div></a>';
				}
			/* Conditional for sportsvids page without :id */
			} else if (vids[index + 1]) {
				var vidImg =   '<a class="sv-other-img-link" href="/sportsvids/' + video._id + '" vidFinder=' + index + '><div class="sv-other-img-div" style="background-image: url(' + video.imgthumb + ')"><div class="sv-other-vid-label-ctn"><p class="sv-other-vid-label">' + vidLabel + '</p></div><img class="sv-other-vid-img hide" src=' + video.imgthumb + ' vidFinder=' + index + '></img></div></a>';
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

