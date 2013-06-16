

$(document).ready(function() {
	$("button#generatePDFButton").click(function(event) {

		console.log("globalInvoice: " + globalInvoice.test);
		
		alert("hej");
		var title = $("#input_title").val();
		var description = $("#input_description").val();
		var url = $("#input_url").val();
		var thumbnail = $("#input_thumbnail").val();
		
		console.log("ok:" + title);
		
		var data = {
			title: title,
			description: description,
			url: url,
			thumbnail: thumbnail
		};
		
		var request = $.ajax({
			url: "/api/video/create/",
			type: "POST",
			data: data
		});

		request.done(function (response, statys, jqXHR) {
				setTimeout(function(){
					location.reload();
				}, 500);
				
		});
				
		
	});
	
	
				
});