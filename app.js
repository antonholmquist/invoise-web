
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

app.get('/render', function (req, res) {

	//res.send("test");
	phantom.create(function(ph) {
		ph.createPage(function(page) {

			var url = req.protocol + '://' + req.host + ':' + app.get('port') + '/invoice';

			console.log('url: ' + url);

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

						console.log("render finished: " + err);

						/*
						// Send file
						res.sendfile(filePath, function (err) {
							fs.unlink(filePath, function(err) {

							});
						});*/

						// Download instead
						res.download(filePath, 'invoice.pdf', function (err) {
							fs.unlink(filePath, function(err) {

							});
						});

					});



					
				});

				return page.evaluate((function() {
				
					return document.title;
				}), function(result) {
					console.log('Page title is ' + result);
				return ph.exit();
				});
			});
		});
	});
});


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});



