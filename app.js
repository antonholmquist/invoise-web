
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'), path = require('path'),
	phantom = require('phantom'),
	fs = require('fs')
;

var routes = require('./routes');
;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/temp', express.static(path.join(__dirname, 'temp')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

function generateRandomFilename(ext) {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
	};
	
	var random = s4();

	var timestamp = new Date().getTime();

	return timestamp + '-' + random + '.' + ext;

};

app.get('/', routes.index);
app.get('/invoice', routes.invoice);

// 1. We have invoice data, generate HTML. Needs to be passed with jQuery call.
// 2. When the HTML is generated

// Get invoice data and returns link to PDF
app.post('/invoice/generate/pdf', function(req, res) {
	console.log("generate pdf, body: " + JSON.stringify(req.body));
	//res.send(req.body);

	// Use res to render, but don't use reponse

	var invoice = (req.body);

	res.render('invoice/static', {'invoice': JSON.stringify(invoice), 'static' : true}, function(err, html) {
  		console.log("html generated: " + html);

  		// Write it to temp 
  		var directory = './temp/';
  		

		// Check if path exists
		fs.lstat(directory, function(err, stats) {

			// Create directory if neccessary
			if (err) {
				fs.mkdirSync(directory);
			}

			var filename = generateRandomFilename('html');
			var filePath = directory + filename;

			fs.writeFile(filePath, html, function (err) {
				console.log('It\'s saved!');

				var url = req.protocol + '://' + req.host + ':' + app.get('port') + '/temp/' + filename;

				res.json({'url': url});
			});
		});
		
	});

});

// Fetches the invoice and removes from disk
app.get('/invoice/download/id', function(req, res) {

});

app.get('/test', function(req, res) {
	//res.send('<html ng-app><head><title>invoise</title><script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script></head><body style="background-color: red;">test</body></html>')
});

app.get('/render', function (req, res) {

	//res.send("test");
	phantom.create(function(ph) {
		ph.createPage(function(page) {

			var url = req.protocol + '://' + req.host + ':' + app.get('port') + '/invoice';

			//var url = 'https://www.google.se/search?q=phantomjs+text+color&oq=phantomjs+text+color&aqs=chrome.0.57j62l2.3128j0&sourceid=chrome&ie=UTF-8#sclient=psy-ab&q=phantomjs+color&oq=phantomjs+color&gs_l=serp.3..0i7j0j0i7i30j0i30.17531.17531.0.17715.1.1.0.0.0.0.68.68.1.1.0...0.0.0..1c.1.17.psy-ab.nGyQH9GRcYk&pbx=1&bav=on.2,or.r_cp.r_qf.&bvm=bv.47883778,d.bGE&fp=693ac66bf07dbf5c&biw=1201&bih=806';
			//url = 'http://feber.se';
			//url = 'http://uggedal.com/journal/phantomjs-default-background-color/';
			//url = 'http://nooday.com/shop/umbrella-bootstrap-theme/?utm_source=builtwithbootstrap.com&utm_medium=display&utm_content=&utm_campaign=';
			//url = 'http://foundation.zurb.com/docs/';
			//url = 'http://www.99lime.com/elements/';
			//url = 'http://twitter.github.io/bootstrap/';
			console.log('render: ' + url);


			// Set options
			//page.set('viewportSize', {width:2000,height:480});
			page.set('paperSize', { format: 'A4', orientation: 'portrait', border: '2cm' });
			page.set('zoomFactor', 1);

			return page.open(url, function(status) {

				var directory = './temp/';

				// Check if path exists
				fs.lstat(directory, function(err, stats) {

					// Create directory if neccessary
					if (err) {
						fs.mkdirSync(directory);
					} 

					// Create a new filename
					var filePath = directory + generateRandomFilename('pdf');


					


					// Render file
					page.render(filePath, function(err) {

						ph.exit();

						console.log("render finished: " + err);

						/*
						// Send file
						res.sendfile(filePath, function (err) {
							fs.unlink(filePath, function(err) {

							});
						});*/

						// Download instead
						res.download(filePath, 'invoice.pdf', function (err) {
							//fs.unlink(filePath, function(err) {

							//});
						});

					});



					
				});

			});
		});
	});
});


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});



