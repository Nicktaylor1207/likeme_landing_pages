
// $(function(){

// 	$('.nb-photo-img-container').on('click', function(){
		
// 		/* Photo attributes should be set with photoObj and finder */
// 		var finder = parseInt($(this).attr('finder'), 10);
// 		var photoObj = photos[finder];

// 		/* Set modal photo */
// 		$('#pm-photo').attr('src', photoObj);

// 		/* Set modal finder */
// 		$('#pm-photo').attr('finder', finder);

// 	});

// 	/* Handle photo modal internal navigation */
// 	(function(){

// 		$('.pm-arrow').on('click', function(){
// 			var finder = parseInt($('#pm-photo').attr('finder'), 10);
// 			if (this.id == "pm-arrow-right") {
// 				if (photos[finder + 1]) {
// 					finder++
// 				} else {
// 					finder = 0;
// 				}
// 			} else {
// 				if (photos[finder - 1]) {
// 					finder--
// 				} else {
// 					finder = photos.length - 1;
// 				}
// 			}
			
// 			var photoObj = photos[finder];
// 			$('#pm-photo').attr('src', photoObj);
// 			$('#pm-photo').attr('finder', finder);
			
// 			return false;
// 		});

// 	}).call(this);


// 	/* Navigation on click of photo */
// 	(function(){

// 		$('#pm-left-ctn').on('click', function(e){
// 			if (e.target.id == 'pm-left-ctn' || e.target.id == 'pm-photo') {
// 				var finder = parseInt($('#pm-photo').attr('finder'), 10);
// 				if (photos[finder + 1]) {
// 					finder++
// 				} else {
// 					finder = 0;
// 				}
				
// 				var photoObj = photos[finder];
// 				$('#pm-photo').attr('src', photoObj);
// 				$('#pm-photo').attr('finder', finder);
				
// 				return false;
// 			}
// 		});

// 	}).call(this);

// });

// $(function(){

// 	/* Set modal style and handle history and esc navigation */
// 	(function(){
// 		var photoModal = $('#photo-modal');

// 		photoModal.on('shown', function(){
// 			/* Set style modal css */
// 			var styles = {
// 				backgroundColor: "#161616",
// 				opacity: "1"
// 			};
// 			$('.modal-backdrop').css(styles);	

// 			/* Set history and modal esc navigation */
// 			window.history.pushState({stateObj:'nb-pm'},'','nb-pm');
// 		});

// 		photoModal.on('hidden', function(){
// 			if (location.href.indexOf('nb-pm') != -1) {
// 				window.history.back();
// 			}
// 		});

// 		window.onpopstate = function(e){
// 			if (JSON.stringify(e.state) == "null") {
// 				photoModal.modal('hide');
// 			}
// 		};
// 	}).call(this);

// });