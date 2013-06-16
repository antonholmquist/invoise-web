

$(document).ready(function() {
	$("button#generatePDFButton").click(function(event) {

		console.log("globalInvoice: " + globalInvoice.test);
		
		
		var data = globalInvoice;
		
		var request = $.ajax({
			url: '/invoice/generate/pdf',
			type: 'POST',
			data: data
		});

		request.done(function (response, statys, jqXHR) {
			
				//alert(response.url);
				//window.location(response.url);

				window.open(response.url);
		});
				
		
	});
	
	
				
});