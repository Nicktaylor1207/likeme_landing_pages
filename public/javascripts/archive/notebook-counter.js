$(function(){

	$('#add-notebook-form').submit(function(e){
	  var url = "http://localhost:3000/"; // the script where you handle the form input.
	  
		alert("yo")

	  $.ajax({
	    type: "POST",
	    url: url,
	    data: $("#add-notebook-form").serialize(), // serializes the form's elements.
	    success: function(data)
	    {
	      alert(data); // show response from the php script.
	    }
	  });

	  return false; // avoid to execute the actual submit of the form.
	});
	
});
