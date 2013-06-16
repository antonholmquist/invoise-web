

$(document).ready(function() {

	function pdfRequest(invoice, callback) {
		var data = invoice;
		
		var request = $.ajax({
			url: '/invoice/generate/pdf',
			type: 'POST',
			data: data
		});

		request.done(function (response, statys, jqXHR) {
			callback(response);
		});
	};

	$("button#viewPDF").click(function(event) {		
		pdfRequest(globalInvoice, function(response) {
			window.open(response.viewURL);
		});
	});

	$("button#downloadPDF").click(function(event) {		
		pdfRequest(globalInvoice, function(response) {
			window.location.href = response.downloadURL;
		});
	});
				
});