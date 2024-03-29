
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'), path = require('path'),
	phantom = require('phantom'),
	fs = require('fs');

var sys = require('sys');
var exec = require('child_process').exec;
var util = require('util');

var routes = require('./routes');
var locale = require('./locale');

var app = express();

// all environments
app.use(express.favicon(__dirname + '/public/images/favicon.ico')); 
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
	
	var random = s4() + '-' + s4() + '-' + s4() + '-' + s4();;

	var timestamp = new Date().getTime();

	return timestamp + '-' + random + '.' + ext;

};

app.get('/invoice', routes.invoice);

app.get('/', function(req, res) {
	res.redirect('/en');
});

app.get('/en', function(req, res) {
	res.render('index', {
		'locale': locale.en(),
		'countries': locale.countries()
	});
});

app.get('/se', function(req, res) {
	res.render('index', {
		'locale': locale.se(),
		'countries': locale.countries()
	});
});

app.get('/pl', function(req, res) {
	res.render('index', {
		'locale': locale.pl(),
		'countries': locale.countries()
	});
});

// 1. We have invoice data, generate HTML. Needs to be passed with jQuery call.
// 2. When the HTML is generated

app.get('/invoice/:type/:filename', function(req, res) {

	var filename = req.params.filename;
	var type = req.params.type; // download or view

	var filepath = './temp/' + filename;

	// View
	if (type === 'view') {
		console.log("send");
		res.sendfile(filepath, function(err) {
			console.log("send finished");
			//fs.unlink(filepath, function(err) {}); // Remove
		});
		
	} 

	// Download
	else if (type === 'download') {
		res.download(filepath, 'invoice.pdf', function (err) {
			fs.unlink(filepath, function(err) {}); // Remove
		});
	}

	
});

// Get invoice data and returns link to PDF
app.post('/invoice/generate/pdf', function(req, res) {
	console.log("generate pdf, body: " + JSON.stringify(req.body));
	//res.send(req.body);

	// Use res to render, but don't use reponse

	var invoice = (req.body);

	res.render('invoice/static', {'staticInvoice': JSON.stringify(invoice), 'static' : true}, function(err, html) {
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
			var filepath = directory + filename;

			// Write HTML to disk so phantom can access it
			fs.writeFile(filepath, html, function (err) {
				console.log('It\'s saved!');

				var htmlURL = req.protocol + '://' + req.host + ':' + app.get('port') + '/temp/' + filename;


				renderURL(htmlURL, function(err, pdfFilename) {

					var baseURL = req.protocol + '://' + req.host + ':' + app.get('port');

					var viewURL = baseURL + '/invoice/view/' + pdfFilename;
					var downloadURL = baseURL + '/invoice/download/' + pdfFilename;

					//res.json({'pdf': pdfURL});
					res.json({'viewURL': viewURL, 'downloadURL': downloadURL, 'htmlURL': htmlURL});
					
				});

			});
		});
		
	});

});

function renderURL(url, callback) {

	var directory = './temp/';

	// Check if path exists
	fs.lstat(directory, function(err, stats) {

		// Create directory if neccessary
		if (err) {
			fs.mkdirSync(directory);
		} 

		// Create a new filename
		var pdfFilename = generateRandomFilename('pdf');
		var filepath = directory + pdfFilename;

		var margin = '0mm';
		var options = 
		' --margin-bottom ' + margin +
		' --margin-left ' + margin +	
		' --margin-right ' + margin +
		' --margin-top ' + margin + 
		' --zoom 1.3'; // Why is this zoom factor needed? Why is it like the browser window is larger than the page content. Can we change it?
		var child = exec("xvfb-run --server-args=\"-screen 0, 1024x768x24\" wkhtmltopdf " + options + ' ' + url + " " + filepath, function(err, stdout, stderr) {
			console.log("render finished: " + err);

			callback(err, pdfFilename);

			/*
			// Send file
			res.sendfile(filePath, function (err) {
				fs.unlink(filePath, function(err) {

				});
			});

			// Download instead
			res.download(filePath, 'invoice.pdf', function (err) {
				//fs.unlink(filePath, function(err) {

				//});
			});
			*/

		});



		
	});

};

// Fetches the invoice and removes from disk
app.get('/invoice/download/id', function(req, res) {

});


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});



