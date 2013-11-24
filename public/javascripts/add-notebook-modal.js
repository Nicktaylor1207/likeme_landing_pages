// $(function(){

// 	$('.add-notebook-form').submit(function(){
// 		var form = $(this);
// 		var photoFinder = $(form).next().find('.photo-img').attr('finder');
// 	});

// });

$(function(){

	var notebooks = user.notebooks;
	$('#select-notebook').html('<option>' + $(notebooks).last()[0] + '</option>');
	
	var options = "";

	$.each(notebooks, function(index, notebook){
		options += '<option>' + notebook + '</option>';
		$('#select-notebook-options-ctn').html(options);
	});

	$('#photos-add-photos-modal').on('hidden', function(){
		$('#select-notebook-ctn').hide();
	});

	$('#select-notebook-options-ctn option').on('click', function(){
		$('#select-notebook').html('<option>' + $(this).val() + '</option>');
		$('#select-notebook-ctn').hide();
	});

	$('#create-notebook-btn').on('click', function(){
		if ($('#create-notebook-input').val() != "") {
			$('#select-notebook').html('<option>' + $('#create-notebook-input').val() + '</option>');
		}
		$('#select-notebook-ctn').hide();
	});

});