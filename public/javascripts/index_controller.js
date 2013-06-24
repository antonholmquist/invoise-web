

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

	$("a#download").click(function(event) {


var opts = {
  lines: 13, // The number of lines to draw
  length: 15, // The length of each line
  width: 4, // The line thickness
  radius: 18, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#eee', // #rgb or #rrggbb
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  top: 100, // Top position relative to parent in px
  left: -50 // Left position relative to parent in px
};
			
		//var spinner = new Spinner(opts).spin();
		//this.appendChild(spinner.el);	
		//$("button#downloadPDF").hide();
		pdfRequest(globalInvoice, function(response) {
			$("a#download").show();
			//spinner.stop();
			window.location.href = response.downloadURL;
			//window.location.href = response.htmlURL;
		});
	});
				
});
