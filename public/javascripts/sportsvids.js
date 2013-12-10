$(function(){

	/* Set main video */
	var vidFrame = $('#sv-video-frame');
	if (vid) {
		vidFrame.attr('src', vid.url);		
	} else if (vids && vids.length > 0) {
		vidFrame.attr('src', vids[vids.length - 1].url);
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
	
	/* Set other videos */
	if (vids.length > 1) {
		var otherVidCtn = $('#sv-other-vids-ctn');
		$.each(vids, function(index, video){
			if (vid) {
				console.log("imgthumb: " + video.imgthumb);
				if (video.imgthumb != vid.imgthumb) {
					var vidImg = '<div class="sv-other-img-div"><a class="sv-other-img-link" href="/sportsvids/' + video._id + '" vidFinder=' + index + '><img class="sv-other-vid-img" src=' + video.imgthumb + ' vidFinder=' + index + '></img></a></div>';
				}
			} else if (vids[index + 1]) {
				var vidImg = '<div class="sv-other-img-div"><a class="sv-other-img-link" href="/sportsvids/' + video._id + '" vidFinder=' + index + '><img class="sv-other-vid-img" src=' + video.imgthumb + ' vidFinder=' + index + '></img></a></div>';
			}
			otherVidCtn.append(vidImg);
		});
	}

});