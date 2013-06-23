
/*
 * GET home page.
 */

// Invoice
exports.invoice = function(req, res){
	res.render('invoice/static');
};

// Render test
exports.render = function(req, res){
	res.send("respond with a resource");
};